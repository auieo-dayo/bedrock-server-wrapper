import chalk from "chalk";
import { spawn } from "child_process";
import readline from "readline";
import config from "../config/config.js";
import WebSocket from "ws";
class BDS {
    /**
     * 
     * @param {Logger} logger 
     */
    constructor(BDS_path,BDS_file,logger,wss,start=true) {

        this.logger = logger
        this.wss = wss
        this._events = {
            spawn: [],
            leave: [],
            started: [],
            line: [],
            close: [],
        }
        this.BDS_path = BDS_path
        this.BDS_file = BDS_file
        if (start) {
            this.started = true
            this.__start(this.BDS_path,this.BDS_file)
        }
    }
    restart() {
        if (this.started) return
        this.__start(this.BDS_path,this.BDS_file)
    }
    __start(BDS_path,BDS_file) {
        this.bds = spawn(BDS_file,{
            detached: true,
            stdio: ['pipe', 'pipe', 'pipe'],
            cwd: `${BDS_path}`
        });
        this.rl = readline.createInterface({
            input: this.bds.stdout,
            output: this.bds.stdin,
        });
        this.started = true
        this.bds.on("close",(code)=>{
            if (!this.started) return;
            this.emit("close",code)
            this.started = false
        })
        this.bds.on("error",(err)=>{
            this.emit("close","?",true)
            this.started = false
            throw err
        })


        this.rl.on("line",(_line)=>{
            const line = _line
                // なぜかたまについちゃうやつ
                .replace(/^NO LOG FILE! \- /,"")
                // なぜか入っちゃうnull文字
                .replace(/\u0000/g,"");
            
            if (!line.trim()) return

            let res = ""
            res = this.emit("line",line)

            if (/^\[.* INFO\] Version: .*$/.test(line)) {
                this.BDSver = line.match(/Version:\s*([0-9].*)/)[1]
                if (config.console.bsmSystemLogToConsole) console.log(chalk.bgBlue(`BDS-Version:${this.BDSver}`))
            }
            if (/^\[.* INFO\] Server started./.test(line)) {
                if (config.console.bsmSystemLogToConsole) console.log(chalk.bgBlue("Server Started"))
                this.server_started = true
                this.emit("started")
            }


            if (/^\[.* INFO\] Player Spawned: .* xuid: .*, pfid:.*$/.test(line)) {
                const playername = String(line.replace(/^\[.* INFO\] Player Spawned: /,"").replace(/ xuid:.*$/,""))
                const xuid = Number(line.replace(/^\[.* INFO\] Player Spawned: .* xuid: /,"").replace(/, pfid: .*$/,""))
                const json = {"name":playername,"tags":[""],xuid}
                this.emit("spawn",json)
            }

            if (/^\[.* INFO\] Player disconnected: .*, xuid: .*, pfid:.*$/.test(line)) {
                const playername = String(line.replace(/^\[.* INFO\] Player disconnected: /,"").replace(/, xuid: .*, pfid: .*$/,""))
                const xuid = Number(line.replace(/^\[.* INFO\] Player disconnected: .*, xuid: /,"").replace(/, pfid: .*$/,""))
                const json = {"name":playername,"tags":[""],xuid}
                this.emit("leave",json)
            }

            if (/^\[.* ERROR\] Exiting program/.test(line)) {
                this.started = false
                this.emit("close","?",true)
                this.bds.kill()
            }
            
            if (res?.skip) return
            this.logger.BDS(line)
            console.log(`${line}`);
            // Websocket Broadcast
            this.WSbroadcast({"type":"BDS","data":line})
        })
    }
    /**
     * 
     * @param {"started"|"spawn"|"leave"|"line"|"close"} event 
     * @param {Function} callback 
     * @returns 
     */
    on(event, callback) {
        if (!this._events[event]) {
            this._events[event] = []
        }
        this._events[event].push(callback)
    }
    /**
     * 
     * @param {"started"|"spawn"|"leave"|"line"|"close"} event 
     * @param {Function} callback 
     * @returns 
     */
    off(event, callback) {
        if (!this._events[event]) return
        this._events[event] = this._events[event].filter(fn => fn !== callback)
    }
    /**
     * 
     * @param {"started"|"spawn"|"leave"|"line"|"close"} event 
     * @param  {...any} args 
     * @returns 
     */
    emit(event, ...args) {
        if (!this._events[event]) return
        let skip = false
        for (const fn of this._events[event]) {
            const res = fn(...args)
            if (res?.skip) skip = true 
        }
        return {skip}
    }

    exit() {
        this.sendCommand("stop")
    }

    /**@param {NodeJS.Signals | number} signal  */
    forceExit(signal) {
        return this.bds.kill(signal)
    }

    sendCommand(cmd,hidden=false) {
        if (!hidden) {
            console.log(`${chalk.green(cmd)}\n`)
            this.WSbroadcast({"type":"cmd","data":cmd})
            this.logger.Cmd(cmd)
        }
        //BDS Input
        this.bds.stdin.write(`${cmd}\n`);
        
        
    }
    
    WSbroadcast(json) {
        this.wss.clients.forEach ((client) => {
            if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(json));
            }
        });
    }
    
    isProcessAlive() {
        const p = this.bds
        const alive = p.exitCode === null && p.signalCode === null
        return {
            alive,
            exitCode: p.exitCode,
            signalCode: p.signalCode
        }
    }
}

export default BDS
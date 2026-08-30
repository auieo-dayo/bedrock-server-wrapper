import { ApplicationCommandOptionType } from "discord.js"

/**
 * @type {import("discord.js").ApplicationCommandDataResolvable[]}
 */
export const commandlist = [
    {
        name:"pl",
        description: "プレイヤーリストを表示します。",
    },
    {
        name:"p",
        defaultMemberPermissions:"Administrator",
        description: "特定プレイヤーの情報を取得します。(特定チャンネルのみ)",
        options:[
            {
                name:"gamertag",
                description: "対象プレイヤーのゲーマータグ",
                type: ApplicationCommandOptionType.String,
                required: true
            }
        ]
    },
    {
        name:"d",
        defaultMemberPermissions:"Administrator",
        description: "特定プレイヤーの死亡ログ取得します。(特定チャンネルのみ)",
        options:[
            {
                name:"gamertag",
                description: "対象プレイヤーのゲーマータグ",
                type: ApplicationCommandOptionType.String,
                required: true
            }
        ]
    },
    {
        name:"ban",
        defaultMemberPermissions:"Administrator",
        description: "BAN系の操作。(特定チャンネルのみ)",
        options:[
            {
                name:"ban",
                description: "BANします。",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "gamertag",
                        description:"対象プレイヤーのゲーマータグ",
                        type: ApplicationCommandOptionType.String,
                        required: true
                    },
                    {
                        name: "reason",
                        description:"BAN理由",
                        type: ApplicationCommandOptionType.String,
                        required: true
                    },
                    {
                        name: "expired",
                        description: "BAN期間(時間)",
                        type: ApplicationCommandOptionType.Number,
                        required: false
                    }
                ]
            },
            {
                name: "isbanned",
                description: "プレイヤーがBANされているか確認します。",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "gamertag",
                        description:"対象プレイヤーのゲーマータグ",
                        type: ApplicationCommandOptionType.String,
                        required: true
                    }
                ]
            },
            {
                name: "list",
                description: "BANリストを表示します。",
                type: ApplicationCommandOptionType.Subcommand
            },
            {
                name: "pardon",
                description: "プレイヤーのBANを解除します。",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "gamertag",
                        description:"対象プレイヤーのゲーマータグ",
                        type: ApplicationCommandOptionType.String,
                        required: true
                    }
                ]
            }
        ]
    },
    {
        name: "backup",
        defaultMemberPermissions:"Administrator",
        description: "バックアップ系の操作をします。",
        options: [
            {
                name: "backup",
                description: "バックアップをします",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "isfull",
                        description: "フルバックアップ？",
                        type: ApplicationCommandOptionType.Boolean,
                        required: false
                    }
                ]
            },
            {
                name: "restore",
                description: "復元します(サーバーが一度停止します。)",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "target",
                        description: "どこまで戻すか",
                        type: ApplicationCommandOptionType.String,
                        autocomplete: true,
                        required: true
                    }
                ]
            },
            {
                name: "list",
                description: "バックアップリストを取得します",
                type: ApplicationCommandOptionType.Subcommand,
            }
        ]
    },
    {
        name: "block",
        defaultMemberPermissions:"Administrator",
        description: "ブロックの設置、破壊に関するイベント",
        options: [
            {
                name: "type",
                description: "イベントタイプ",
                type: ApplicationCommandOptionType.String,
                choices: [
                    {name: "設置",value: "place"},
                    {name: "破壊",value: "break"},
                    {name: "爆発による破壊",value: "explode"}
                ],
            },
            {
                name: "player",
                description: "プレイヤーで絞り込み",
                type: ApplicationCommandOptionType.String,
            },
            {
                name: "block",
                description: "ブロックで絞り込み",
                type: ApplicationCommandOptionType.String,
                autocomplete:true
            },
            {
                name: "minutes",
                description: "時間で絞り込み(分)",
                type: ApplicationCommandOptionType.Integer
            },
            {
                name: "dontskiptnt",
                description: "TNTのログををスキップしない",
                type:ApplicationCommandOptionType.Boolean
            }
        ]
    },
    {
        name: "debug",
        description: "debug用情報を取得します",
        defaultMemberPermissions:"Administrator",
        options: [
            {
                name:"option",
                description: "オプション",
                required: false,
                type: ApplicationCommandOptionType.String,
                choices: [
                    {name: "walCheckPoint(PASSIVE)",value:"WalCheckPoint"},
                    {name:"Info",value:"Info"},
                    {name:"Status",value:"Status"},
                    {name:"BDSを強制再起動",value:"forceRestart"}
                ]
            }
        ]
    },
    {
        name: "update",
        description: "BDSのアップデートに関する操作",
        defaultMemberPermissions: "Administrator",
        options: [
            {
                name: "option",
                description: "オプション",
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: [
                    {name:"CheckUpdate",value:"checkupdate"},
                    {name:"StartUpdate",value:"startupdate"},
                ]
            }
        ]
    }
]
/**
 * 
 * @param {import("discord.js").Client} client 
 * @param {*} guildid 
 * @returns 
 */
export async function setCommands(client,guildid) {
    const res = await client.application.commands.set(commandlist,String(guildid))
    return res
}

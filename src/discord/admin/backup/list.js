async function l(backup,message) {

    const blist = await backup.getlist("",true)
        
    const list = blist.data.todaybackuplist
    .sort((a, b) => {
        const da = new Date(a.date.yyyy, a.date.MM - 1, a.date.dd, a.date.hh, a.date.mm, a.date.ss);
        const db = new Date(b.date.yyyy, b.date.MM - 1, b.date.dd, b.date.hh, b.date.mm, b.date.ss);
        return da - db;
    });



    let md = ""
    for (const b of list) {
        md+=b.fullpathja + "\n"
    }

    message.editReply(md)
    
}
export default l
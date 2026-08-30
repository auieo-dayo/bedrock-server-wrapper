function normalizeDateInput(v) {
  // 数値ならそのまま
  if (typeof v === "number") return v;

  // 文字列で「数字だけ」の場合 → 数値に変換
  if (typeof v === "string" && /^\d+$/.test(v)) {
    return Number(v);
  }

  // それ以外（普通の日付文字列とか）はそのまま
  return v;
}

function r (backup,target,message,bds) {
    if (!target) return message.editReply("Targetを指定してください")
    const targetdate= new Date(normalizeDateInput(target))
    if (targetdate == "Invalid Date") return message.editReply("日付が無効です")
        

    const onclose = ()=>{
        bds.off("close",onclose)
        setTimeout(() => {
            backup.restore(targetdate)
                .then(()=>{
                    message.editReply("復元完了しました、再起動します。")
                })
                .catch((e)=>{
                    message.editReply(`バックアップ復元失敗...再起動します。\n-# ${e.message}`)
                    throw new Error(e)
                })
                .finally(()=>{
                    bds.restart()
                }) 
        },1000*5 );
    }
    bds.on("close",onclose)
    bds.exit()

    
}

export default r

## WebSocketの仕様

* URL: `ws://localhost:3000/ws?token=xxxxxxx`
* データ形式: JSON
* 受信データ:

```json
{
  "type": "chat | death | PlayerJoin | PlayerLeave | BDS | server | endJob",
  "data": "ログ内容（テキスト形式）"
}
```

* `time` は付与されません
* APIとの互換性は `type` と `data` で保持されます
* トークンは [API | /api/getwstoken](API.md#6-apigetwstoken)を参考に取得してください

### endJobイベント

ジョブが終了した際に、サーバーから以下の形式で通知されます。

```json
{
  "type": "endJob",
  "jobid": "9d0f6b7a-7f7d-4d72-aee2-3d4d6d2ea0f4",
  "isfailed": false
}
```

* `jobid`: 終了したジョブのID
* `isfailed`: 失敗したかどうか

### コマンド送信

サーバーにコマンドを送る場合：

```json
{
  "type": "cmd",
  "data": "say hello"
}
```

* `type`: `cmd`
* `data`: 実行するコマンド文字列
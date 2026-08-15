# API ドキュメント

## 1. `/api/getlog`

### 概要

サーバーログを取得する。

### メソッド

`GET`

### オプション(クエリパラメータ指定)

| パラメータ | 型     | 説明                                                                   |
| --------- | ------ | ---------------------------------------------------------------------  |
| `l`       | number | ログ取得の最大件数(デフォルト:300 最大値:1000)                            |

### レスポンス例

```json
[

  {
    "type": "BDS",
    "data": "[2026-08-14 19:10:59:142 INFO] Server started.",
    "time": 1766216088127
  },
  {
    "data": "Player1",
    "type": "PlayerJoin",
    "time": 1766216098127
  },
  {
    "type": "chat",
    "data": "[D]Hoge:hello world",
    "time": 1766216108127,
    "player": "Hoge",
    "message": "hello world",
    "source": "Discord"
  },
  {
    "type": "chat",
    "data": "Player1:hello world",
    "time": 1766216118127,
    "player": "Player1",
    "message": "hello world",
    "source": "Minecraft"
  },
  {
    "type": "death",
    "data": "Player1(void())",
    "time": 1766216128127,
    "player": "Player1",
    "reason": "void()",
    "location": {
      "z": 0,
      "y": 0,
      "x": 0
    },
    "dimension": "minecraft:the_end"
  },
  {
    "type": "server",
    "data": "BackupSuccessful(diff)(4.98 Seconds)",
    "time": 1766216138127
  }
]
```

*  取得したログは、日時の昇順（古い → 新しい）で返されます。

### フィールド

| フィールド  | 型      | 説明                                                                      |
| ------ | ------ | ----------------------------------------------------------------------- |
| `data` | string | ログ内容。テキスト形式。                                                            |
| `type` | string | ログの種類。`chat`, `death`, `PlayerJoin`, `PlayerLeave`, `BDS`, `server`, `cmd` など。 |
| `time` | number | UNIXタイムスタンプ。                                                            |

---

## 2. `/api/nowonline`

### 概要

現在サーバーに接続中のプレイヤー一覧を取得する。

### メソッド

`GET`

### レスポンス例

```json
[
  {
    "name": "Player1",
    "xuid": 2535430894533979
  },
  {
    "name": "Player2",
    "xuid": 2535469401581741
  }
]
```

### フィールド

| フィールド  | 型      | 説明         |
| ------ | ------ | ---------- |
| `name` | string | プレイヤー名。    |
| `xuid` | number | プレイヤー固有ID。 |

---

## 3. `/api/info`

### 概要

サーバー情報やBDS情報を取得する。

### メソッド

`GET`

### レスポンス例

```json
{
  "BDS": {
    "servername": "MyServer",
    "levelname": "world",
    "gamemode": "survival",
    "difficulty": "normal",
    "player": {
      "max": 10,
      "now": 2
    },
    "version": "1.21.131.1"
  },
  "server": {
    "mem": {
      "free": 7.5,
      "total": 16,
      "par": 53.125
    },
    "cpu": {
      "par": 12.3
    }
  }
}
```

### フィールド

| フィールド              | 型      | 説明              |
| ------------------ | ------ | --------------- |
| `BDS`              | object | Minecraftサーバー情報 |
| `BDS.servername`   | string | サーバー名           |
| `BDS.levelname`    | string | ワールド名           |
| `BDS.gamemode`     | string | ゲームモード          |
| `BDS.difficulty`   | string | 難易度             |
| `BDS.player.max`   | number | 最大プレイヤー数        |
| `BDS.player.now`   | number | 現在接続中のプレイヤー数    |
| `BDS.version`      | string | BDSのバージョン       |
| `server.mem.free`  | number | 空きメモリ(GB)       |
| `server.mem.total` | number | 総メモリ(GB)        |
| `server.mem.par`   | number | メモリ使用率(%)       |
| `server.cpu.par`   | number | CPU使用率(%)       |

---

## 4. `/api/backuplist`

### 概要

サーバーのバックアップ一覧を取得する。

### メソッド

`GET`

### レスポンス例

```json
{
  "allbackup": 77,
  "today": 77,
  "todaybackuplist": [
    {
      "fullpath": "2025/12/20/10-27-39",
      "date": {
        "yyyy": 2025,
        "MM": 12,
        "dd": 20,
        "hh": 10,
        "mm": 27,
        "ss": 39
      },
      "fullpathja": "2025年12月20日 10時27分39秒",
      "full": false
    },
    {
      "fullpath": "2025/12/20/23-36-49_FULL",
      "date": {
        "yyyy": 2025,
        "MM": 12,
        "dd": 20,
        "hh": 23,
        "mm": 36,
        "ss": 49
      },
      "fullpathja": "2025年12月20日 23時36分49秒 (FULL)",
      "full": true
    }
  ]
}
```

### フィールド

| フィールド                          | 型       | 説明             |
| ------------------------------ | ------- | -------------- |
| `allbackup`                    | number  | 全バックアップ件数      |
| `today`                        | number  | 今日のバックアップ件数    |
| `todaybackuplist`              | array   | 今日のバックアップ詳細リスト |
| `todaybackuplist[].fullpath`   | string  | バックアップフォルダパス   |
| `todaybackuplist[].date`       | object  | バックアップ日時       |
| `todaybackuplist[].date.yyyy`  | number  | 年              |
| `todaybackuplist[].date.MM`    | number  | 月              |
| `todaybackuplist[].date.dd`    | number  | 日              |
| `todaybackuplist[].date.hh`    | number  | 時              |
| `todaybackuplist[].date.mm`    | number  | 分              |
| `todaybackuplist[].date.ss`    | number  | 秒              |
| `todaybackuplist[].fullpathja` | string  | 日本語表記の日時       |
| `todaybackuplist[].full`       | boolean | フルバックアップかどうか   |

---

## 5. `/api/blockevents`

### 概要

プレイヤーによるブロック設置・破壊イベントのログを取得する。クエリパラメータでフィルタリング可能。

### メソッド

`GET`

### クエリパラメータ

| パラメータ     | 型      | 説明                                      | 例            |
| --------- | ------ | --------------------------------------- | ------------ |
| `actiontype` | string | イベントのタイプ（`place` 設置 / `break` 破壊 / `explode` 爆発による破壊） | `actiontype=place` |
| `player`  | string | プレイヤー名でフィルタ                         | `player=Player1` |
| `block`   | string | ブロックID でフィルタ（例: `minecraft:stone`）| `block=minecraft:stone` |
| `minutes` | number | 指定時間内のイベントを取得（分単位）               | `minutes=60` |

### レスポンス例

```json
[
  {
    "time": 1766216088127,
    "action": 0,
    "dimension": "minecraft:overworld",
    "location": {
      "x": 123,
      "y": 64,
      "z": 456
    },
    "block": "minecraft:stone",
    "player": "Player1"
  },
  {
    "time": 1766216090127,
    "action": 1,
    "dimension": "minecraft:overworld",
    "location": {
      "x": 123,
      "y": 63,
      "z": 456
    },
    "block": "minecraft:dirt",
    "player": "Player1"
  }
]
```

### フィールド

| フィールド     | 型      | 説明                        |
| --------- | ------ | ------------------------- |
| `time`    | number | UNIXタイムスタンプ（ミリ秒）      |
| `action`  | number | `0` = 設置、`1` = 破壊、`2` = 爆発による破壊        |
| `dimension` | string | ディメンション（例: `minecraft:overworld`) |
| `location` | object | ブロックの座標                 |
| `location.x` | number | X 座標                    |
| `location.y` | number | Y 座標                    |
| `location.z` | number | Z 座標                    |
| `block`   | string | ブロックID（例: `minecraft:stone`） |
| `player`  | string | プレイヤー名                  |

### 制限

- 最大 50 件までのイベントが返される
- 複数条件での AND 検索に対応
- タイムスタンプは直近のイベントから順に返される

---

## 5. `/api/dashboard`

### 概要

ダッシュボード用に、サーバー情報、オンラインプレイヤー、バックアップリストをまとめて取得する。

### メソッド

`GET`

### レスポンス例

```json
{
  "info": {
    "BDS": {
      "servername": "MyServer",
      "levelname": "world",
      "gamemode": "survival",
      "difficulty": "normal",
      "player": {
        "max": 10,
        "now": 2
      },
      "version": "1.21.131.1"
    },
    "server": {
      "mem": {
        "free": 7.5,
        "total": 16,
        "par": 53.125
      },
      "cpu": {
        "par": 12.3
      }
    }
  },
  "onlines": [
    {
      "name": "Player1",
      "xuid": 2535430894533979
    },
    {
      "name": "Player2",
      "xuid": 2535469401581741
    }
  ],
  "backups": {
    "allbackup": 77,
    "today": 77,
    "todaybackuplist": [...]
  }
}
```

### フィールド

| フィールド    | 型     | 説明                      |
| ------- | ----- | ----------------------- |
| `info`  | object | `/api/info` と同じ形式      |
| `onlines` | array | `/api/nowonline` と同じ形式 |
| `backups` | object | `/api/backuplist` と同じ形式 |

---

## 6. `/api/getwstoken`

### 概要

WebSocket接続時に使用するトークンを取得する。

### メソッド

`GET`

### レスポンス例

```json
{
  "token": "abcd1234-efgh5678-ijkl9012"
}
```

### フィールド

| フィールド | 型     | 説明                         |
| ----- | ----- | -------------------------- |
| `token` | string | WebSocket接続に使用するトークン文字列 |

### 使用方法

取得したトークンを使用してWebSocket接続時に以下のように指定します：

```
ws://localhost:3000/ws?token=<取得したトークン>
```

---

## 7. `/api/getbdspw`

### 概要

BDSアドオンからサーバーに送信するデータを認証する際に使用するパスワードを取得する。

### メソッド

`GET`

### レスポンス例

```json
{
  "password": "unique-password-string-1234567890"
}
```

### フィールド

| フィールド    | 型     | 説明                              |
| ------- | ----- | ------------------------------- |
| `password` | string | BDS送信用パスワード（Basic Auth用） |

### 注記

- このエンドポイントは `127.0.0.1` および `::1` からのアクセスのみ許可されます
- 取得したパスワードはBDSアドオンの `/api/bds/send` エンドポイント認証に使用されます

---

## 8. `/api/backup/export`

### 概要

バックアップのエクスポート処理を開始し、ジョブIDを返す。

### メソッド

`POST`

### リクエストボディ

```json
{
  "target": "2025-12-20T23:36:49.000Z"
}
```

### フィールド

| フィールド | 型 | 説明 |
| ----- | ----- | ---------------------------- |
| `target` | string | エクスポート対象のバックアップ日時（ISO文字列、UNIXタイムスタンプなど） |

### レスポンス例

```json
{
  "jobid": "9d0f6b7a-7f7d-4d72-aee2-3d4d6d2ea0f4"
}
```

---

## 9. `/api/jobs/:jobid`

### 概要

バックアップエクスポートなどのジョブ状態を取得する。

### メソッド

`GET`

### パスパラメータ

| パラメータ | 型 | 説明 |
| ----- | ----- | -------------------- |
| `jobid` | string | ジョブID |

### レスポンス例

```json
{
  "jobType": "BackupExport",
  "id": "9d0f6b7a-7f7d-4d72-aee2-3d4d6d2ea0f4",
  "ended": false,
  "isfailed": false,
  "result": {
    "path": ""
  }
}
```

### フィールド

| フィールド | 型 | 説明 |
| ----- | ----- | -------------------- |
| `jobType` | string | ジョブ種別 |
| `id` | string | ジョブID |
| `ended` | boolean | 終了済みかどうか |
| `isfailed` | boolean | 失敗したかどうか |
| `result` | object | 実行結果の情報 |

---

## 10. `/temp/ExportBackup/:file`

### 概要

バックアップエクスポートで生成したZIPファイルをダウンロードする。

### メソッド

`GET`

### パスパラメータ

| パラメータ | 型 | 説明 |
| ----- | ----- | -------------------- |
| `file` | string | 生成済みZIPファイル名 |

### 使用方法

```text
/temp/ExportBackup/1730000000000-2025-12-20-23-36-49.zip
```

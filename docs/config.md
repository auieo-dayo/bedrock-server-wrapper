# 設定ドキュメント

BSM（Bedrock Server Manager）の設定について説明します。設定は `config/config.js` ファイルで行います。`config/config.sample.js` をコピーして `config/config.js` に変更します

---

## 1. console（コンソール出力設定）

サーバーの標準出力に表示するログを選択できます。

### プロパティ

| プロパティ               | 型      | 説明                      |
| ------------------- | ------ | ----------------------- |
| `chatLogToConsole`  | boolean | チャットメッセージを標準出力に表示するか |
| `deathLogToConsole` | boolean | プレイヤー死亡ログを標準出力に表示するか |
| `backupLogToConsole` | boolean | バックアップログを標準出力に表示するか |
| `bsmSystemLogToConsole` | boolean | BSMシステムログを標準出力に表示するか |
| `joinPlayerLogToConsole` | boolean | プレイヤー参加を標準出力に表示するか |
| `leavePlayerLogToConsole` | boolean | プレイヤー退出を標準出力に表示するか |

### 設定例

```javascript
"console": {
    "chatLogToConsole": true,
    "deathLogToConsole": true,
    "backupLogToConsole": true,
    "bsmSystemLogToConsole": true,
    "joinPlayerLogToConsole": true,
    "leavePlayerLogToConsole": true
}
```

---

## 2. Discord（Discord連携設定）

BSMをDiscord Botと連携させて、チャットや通知をDiscordに送信できます。

### メイン設定

| プロパティ | 型      | 説明                   |
| ------ | ------ | -------------------- |
| `TOKEN` | string | Discord Bot トークン   |
| `enabled` | boolean | Discord連携を有効化するか |
| `guildId` | string | Discordサーバー（ギルド）ID |

### notifications（通知設定）

#### 2.1 chat

ゲーム内チャットとDiscordチャット間の送受信を設定します。

| プロパティ      | 型      | 説明                         |
| ---------- | ------ | -------------------------- |
| `enabled`   | boolean | チャット送受信を有効化するか        |
| `playerDeath` | boolean | プレイヤー死亡を通知するか       |
| `channelId` | string  | チャットを送受信するDiscordチャンネルID |

#### 2.2 serverStatus

サーバーのステータス情報を通知します。

| プロパティ      | 型      | 説明                         |
| ---------- | ------ | -------------------------- |
| `enabled`   | boolean | サーバーステータス通知を有効化するか |
| `channelId` | string  | 通知先のDiscordチャンネルID    |

#### 2.3 toAdmin

管理者用チャンネルの設定です。管理者はこのチャンネルから特定のコマンドを使用できます。

| プロパティ      | 型      | 説明                         |
| ---------- | ------ | -------------------------- |
| `channelId` | string  | 管理者用DiscordチャンネルID   |
| `enabled`   | boolean | 管理者機能を有効化するか        |

##### deathInfo（死亡情報取得）

プレイヤーの死亡情報を管理者チャンネルから取得できます。

| プロパティ    | 型    | 説明                                    |
| -------- | ----- | ------------------------------------- |
| `enabled` | boolean | 死亡情報取得を有効化するか                     |
| `prefix`  | array   | コマンドプレフィックス。例：`?d`, `?deathinfo` |

使用例：`?d PlayerName` または `?deathinfo PlayerName`

> 注：プレフィックスコマンド（`?d` / `?deathinfo` など）は非推奨です。代わりに Discord のスラッシュコマンドを使用してください。例：`/d gamertag`

##### playerInfo（プレイヤー情報取得）

プレイヤーの基本情報を管理者チャンネルから取得できます。

| プロパティ    | 型    | 説明                                    |
| -------- | ----- | ------------------------------------- |
| `enabled` | boolean | プレイヤー情報取得を有効化するか                 |
| `prefix`  | array   | コマンドプレフィックス。例：`?p`, `?playerinfo` |

使用例：`?p PlayerName` または `?playerinfo PlayerName`

> 注：プレフィックスコマンド（`?p` / `?playerinfo` など）は非推奨です。代わりに Discord のスラッシュコマンドを使用してください。例：`/p gamertag`

##### ban（BAN管理）

管理者用チャンネルからプレイヤーのBAN操作ができます。

| プロパティ    | 型    | 説明                                    |
| -------- | ----- | ------------------------------------- |
| `enabled` | boolean | BAN管理機能を有効化するか                     |
| `prefix`  | array   | コマンドプレフィックス。例：`?b`, `?ban` |

使用例：
- `?b list` - BAN一覧を表示
- `?b isbanned PlayerName` - プレイヤーがBANされているか確認
- `?b ban PlayerName reason` - プレイヤーをBAN
- `?b pardon PlayerName` - プレイヤーのBANを解除

> 注：プレフィックスコマンド（`?b` / `?ban` など）は非推奨です。代わりに Discord のスラッシュコマンドを使用してください。例：`/ban list`、`/ban isbanned gamertag`、`/ban ban gamertag reason`

### 設定例

```javascript
"Discord": {
    "TOKEN":"YOUR_BOT_TOKEN_HERE",
    "enabled":true,
    "guildId": "123456789012345678",
    "notifications": {
        "chat": {
            "enabled": true,
            "playerDeath": true,
            "channelId": "123456789012345678"
        },
        "serverStatus": {
            "enabled": true,
            "channelId": "987654321098765432"
        },
        "toAdmin": {
            "channelId": "111111111111111111",
            "enabled": true,
            "deathInfo": {
                "enabled":true,
                "prefix": ["?d","?deathinfo"]
            },
            "playerInfo": {
                "enabled":true,
                "prefix": ["?p","?playerinfo"]
            },
            "ban": {
                "enabled": true,
                "prefix": ["?b","?ban"]
            }
        }
    }
}
```

---

## 3. update（BDSアップデート設定）

BDSのアップデート設定を管理します。

### プロパティ

| プロパティ | 型      | 説明                                  |
| -------- | ------ | ------------------------------------- |
| `enabled` | boolean | BDSの更新機能を有効化するか               |
| `isPreview` | boolean | プレビュー版のサーバーを使用するか    |

### 設定例

```javascript
"update": {
    "Minecraft": {
        "enabled": true,
        "isPreview": false
    }
}
```

### 説明

- `enabled`: BDSのアップデート機能を有効化すると、Discordより更新開始コマンドが使用できます。
- `isPreview`: `true` に設定するとプレビュー版BDSを使用します。

---

## 4. backup（自動バックアップ設定）

サーバーワールドの自動バックアップを設定します。

### プロパティ

| プロパティ         | 型      | 説明                                   |
| -------------- | ------ | ------------------------------------ |
| `enabled`      | boolean | バックアップを有効化するか                    |
| `interval`     | number | バックアップの実行間隔（分）                    |
| `pauseIfNoPlayer` | boolean | プレイヤーがいない時にバックアップを停止するか    |
| `leavePlayerBackup` | boolean | プレイヤーが抜けたときにバックアップするか |
| `autoDeleteAfterDays` | number | 自動バックアップを保持する日数。`0` の場合は削除しません |

### 設定例

```javascript
"backup": {
    "enabled": true,
    "interval": 30,
    "leavePlayerBackup": true,
    "pauseIfNoPlayer": true,
    "autoDeleteAfterDays": 7
}
```

---

## 5. webUi（Web UI設定）

Web管理画面にアクセスする際の設定です。`webUi` 内で `basicAuth` を設定できます。

### プロパティ

| プロパティ    | 型      | 説明                    |
| --------- | ------ | --------------------- |
| `port`    | number | Web UIのポート番号（デフォルト3000） |
| `basicAuth.enable` | boolean | ベーシック認証を有効化するか |
| `basicAuth.username` | string  | ログインユーザー名           |
| `basicAuth.password` | string  | ログインパスワード           |
| `trustProxy` | boolean \| number | リバースプロキシを信頼するか（boolean または信頼するホップ数） |

### 設定例

```javascript
"webUi": {
    "port": 3000,
    "basicAuth": {
        "enable": true,
        "username":"admin",
        "password":"admin"
    },
    "trustProxy": false
}
```

---

## 6. blockLog（ブロックログ設定）

ブロックの設置・破壊・爆発ログを記録する設定です。

### プロパティ

| プロパティ | 型 | 説明 |
| --- | --- | --- |
| `enabled` | boolean | ブロックログを有効化するか |
| `autoDeleteAfterDays` | number | ログの最大保持期間。`0` の場合は削除しません |

### 設定例

```javascript
"blockLog": {
    "enabled": true,
    "autoDeleteAfterDays": 14
}
```

---

## セットアップ手順

1. `config/config.sample.js` をコピーしてファイル名を `config/config.js` に変更します
2. `config/config.js` をテキストエディタで開き、必要な設定を変更します
3. Discord Botを使用する場合は、`TOKEN` フィールドに DiscordのBotトークンを入力し、`guildId` に使うサーバーのIDを入力してください
4. 設定が完了したら、BSMを起動すると新しい設定が適用されます

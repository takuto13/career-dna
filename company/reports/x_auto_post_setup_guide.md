# X（Twitter）自動投稿 稼働準備手順書

作成日：2026-07-17  
作成者：AI CTO  
対象：Issue #16「Xの自動投稿について」  
関連ファイル：`.github/workflows/auto_post_x.yml` / `scripts/post_to_x.py`

---

## 概要

本手順書は、キャリアDNAのX（Twitter）自動投稿システムを本番稼働させるための設定手順を記録します。  
スクリプト・ワークフロー骨格はすでに実装済みです。たくとが以下の手順を実施することで即座に稼働できます。

---

## 1. X Developer Portal でのアプリ作成手順

### 1-1. Developer Portal にアクセス

1. ブラウザで [https://developer.twitter.com/en/portal/dashboard](https://developer.twitter.com/en/portal/dashboard) を開く
2. キャリアDNA運営用のXアカウントでログイン

### 1-2. プロジェクト・アプリを作成

1. 左メニューの「Projects & Apps」→「+ Create Project」をクリック
2. プロジェクト名：`CareerDNA Auto Post`（任意）
3. ユースケース：「Making a bot」を選択
4. アプリ名：`career-dna-autopost`（任意）
5. 利用目的の記載（英語）例：
   > This bot automatically posts pre-written Japanese career advice content to our X account for the career diagnostic service career-dna.jp. Content is prepared and approved in advance.

[画像省略：アプリ作成画面]

### 1-3. APIアクセスレベルの設定

- **「Free」プラン**では書き込みAPIが使えません。**「Basic」プラン（月$100）** が必要です。
- ただし、**OAuth 1.0a User Context** を使う場合、無料プランでも投稿できる場合があります（2026年時点の仕様を要確認）。
- 書き込み権限（Read and Write）を付与してください。

[画像省略：APIアクセスレベル設定画面]

### 1-4. APIキーを取得・記録

「Keys and Tokens」タブで以下の5種類を取得します。

| 項目 | 変数名（GitHub Secrets名） | 説明 |
|------|--------------------------|------|
| API Key | `X_API_KEY` | アプリの識別子 |
| API Key Secret | `X_API_SECRET` | アプリの秘密鍵 |
| Access Token | `X_ACCESS_TOKEN` | 投稿するアカウントのトークン |
| Access Token Secret | `X_ACCESS_TOKEN_SECRET` | 投稿するアカウントの秘密鍵 |
| Bearer Token | （使用しない） | 読み取り専用・本スクリプトでは不要 |

⚠️ **これらのキーは絶対にコードやファイルに直書きしないこと。**  
⚠️ **取得後はメモしてすぐに GitHub Secrets に登録する。**

---

## 2. Vercel 環境変数への設定（現時点では不要）

本スクリプトはGitHub Actionsで実行するため、Vercel環境変数は不要です。  
将来的にVercelのEdge FunctionでX APIを呼ぶ構成にする場合は下記に追加します。

- Vercel ダッシュボード → プロジェクト → Settings → Environment Variables
- 変数名：`X_API_KEY` / `X_API_SECRET` / `X_ACCESS_TOKEN` / `X_ACCESS_TOKEN_SECRET`

---

## 3. GitHub Actions シークレットへの登録

1. GitHubの `takuto13/career-dna` リポジトリを開く
2. 「Settings」→「Secrets and variables」→「Actions」→「New repository secret」をクリック
3. 以下を1件ずつ登録する：

| Secret名 | 値 |
|----------|-----|
| `X_API_KEY` | Developer Portalで取得したAPI Key |
| `X_API_SECRET` | Developer Portalで取得したAPI Key Secret |
| `X_ACCESS_TOKEN` | Developer Portalで取得したAccess Token |
| `X_ACCESS_TOKEN_SECRET` | Developer Portalで取得したAccess Token Secret |

[画像省略：GitHub Secrets登録画面]

---

## 4. ワークフローの有効化（たくとが実施）

GitHub Secrets登録後、以下をCTOに依頼する（またはたくとが直接編集）：

`.github/workflows/auto_post_x.yml` の以下の行を変更：

**変更前（現在）：**
```yaml
on:
  workflow_dispatch:  # 手動実行のみ（テスト用）

jobs:
  post_to_x:
    runs-on: ubuntu-latest
    if: false  # 承認前は実行しない
```

**変更後（本番稼働時）：**
```yaml
on:
  schedule:
    # 毎日 00:00 UTC（= 朝 9:00 JST）に実行
    - cron: '0 0 * * *'
  workflow_dispatch:  # 手動実行も可能

jobs:
  post_to_x:
    runs-on: ubuntu-latest
    # if: false の行を削除する
```

---

## 5. 動作確認コマンド

ローカルでのドライラン確認（実際には投稿しない）：

```bash
# リポジトリをクローンした環境で実行
cd /path/to/career-dna

# 環境変数を設定（テスト用ダミー値でOK）
export X_API_KEY="test"
export X_API_SECRET="test"
export X_ACCESS_TOKEN="test"
export X_ACCESS_TOKEN_SECRET="test"

# ドライランモードで確認（投稿ファイルのパース・バリデーションのみ実行）
python scripts/post_to_x.py --dry-run
```

---

## 6. 投稿ガイドライン（Issue #16 準拠）

自動投稿する原稿は以下のルールに従って作成・バリデーションされます：

- ❌ AIっぽい言葉遣い（「させていただきます」等）は禁止
- ❌ 絵文字は1投稿2個以内
- ❌ 炎上リスクワードは禁止
- ❌ 他社名・他サービス名を出さない
- ⚠️ 時事ネタを使う場合は原稿に `[時事ネタ]` フラグを付け、たくとが事前確認
- ❌ ハッシュタグは1投稿2〜3個以内
- ❌ 140文字超えは投稿しない（最大200文字まで警告）

---

## 7. トラブルシューティング

| エラーコード | 原因 | 対処法 |
|------------|------|--------|
| `401 Unauthorized` | APIキーが無効または期限切れ | Developer Portalでキーを再生成してGitHub Secretsを更新 |
| `403 Forbidden` | 書き込み権限がない | Developer PortalでApp permissionsを「Read and Write」に変更し、Access Tokenを再生成 |
| `429 Too Many Requests` | API制限に達した | 無料プランの月間制限（500ツイート）に達している可能性。Basicプランへアップグレードを検討 |
| `原稿ファイルが見つかりません` | 当日分の原稿ファイル（sns_原稿_YYYY-MM-DD.md）がない | SNS担当が原稿を作成しているか確認 |
| `[バリデーションNG]` | ガイドライン違反が検出された | 対象原稿をSNS担当に修正依頼 |

---

## 8. 現在の稼働状態サマリー

| 項目 | 状態 |
|------|------|
| scripts/post_to_x.py | ✅ 実装済み・バリデーション機能付き |
| .github/workflows/auto_post_x.yml | ✅ 骨格実装済み（コメントアウト状態） |
| GitHub Secrets | ❌ 未設定（X Developer Portal申請後に設定） |
| X Developer Portal アプリ | ❌ 未作成（たくとの申請が必要） |
| 本番稼働 | ❌ 待機中（上記2項目完了後に即稼働可能） |

---

## 9. 次のアクション（たくとへ）

1. X Developer Portalでアプリを作成しAPIキーを取得する
2. GitHubリポジトリのSecretsに4つのキーを登録する
3. CTOに「API申請完了」を報告する → CTOがワークフローを有効化してpushする


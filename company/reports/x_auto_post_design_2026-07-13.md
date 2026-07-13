# X自動投稿システム 技術設計書

**作成日**: 2026-07-13  
**作成者**: AI CEO（Issue #16 対応）  
**ステータス**: 設計書 ― たくと承認待ち

---

## 1. 目的

SNS担当が作成した投稿原稿（`requests/sns_原稿_YYYY-MM-DD.md`）を、  
たくとの手動操作なしに、指定日時にX（Twitter）へ自動投稿する仕組みを構築する。

---

## 2. システム全体像

```
【毎日 AI CEO・SNS担当が実行】
SNS担当 → requests/sns_原稿_YYYY-MM-DD.md に投稿原稿を保存

【GitHub Actions が毎日自動実行】
cron job（毎朝 8:00 JST）
  └── 当日の sns_原稿_YYYY-MM-DD.md を読む
  └── 投稿時刻が来たら X API v2 で自動投稿
  └── 投稿結果を company/x-posts/posted_log.md に記録
  └── 投稿完了をCEO報告書でたくとに通知（ファイルに記録）
```

---

## 3. 必要なもの一覧

### たくとが実施する作業（X Developer Portal 登録）

| 手順 | 作業内容 | 難易度 |
|------|---------|--------|
| 1 | https://developer.twitter.com にアクセス・Xアカウントでログイン | 低 |
| 2 | 「Create Project」→ App 作成（App name: career-dna-auto-post など） | 低 |
| 3 | 「User authentication settings」で Read + Write 権限を有効化 | 低 |
| 4 | Keys and Tokens から以下4つを取得・メモする | 低 |
| | - API Key（Consumer Key）| |
| | - API Secret（Consumer Secret）| |
| | - Access Token | |
| | - Access Token Secret | |
| 5 | GitHubリポジトリ → Settings → Secrets and variables → Actions | 低 |
| | 以下4つのSecretを追加：| |
| | - `X_API_KEY` | |
| | - `X_API_SECRET` | |
| | - `X_ACCESS_TOKEN` | |
| | - `X_ACCESS_TOKEN_SECRET` | |

**想定所要時間**: 20〜30分  
**コスト**: X API Free Tier（月1500投稿まで無料）→ **追加コストなし**  
※1日3投稿 × 30日 = 90投稿/月 → Free Tier (1500投稿) で十分対応可能

---

### CTOが実施する作業（承認後に実施）

1. `.github/workflows/auto_post_x.yml` の作成
2. `scripts/post_to_x.py`（投稿スクリプト）の作成
3. 原稿ファイルのパース処理（投稿1〜3本の抽出）
4. 投稿ログ更新処理

---

## 4. ファイル構成

```
career-dna/
├── .github/
│   └── workflows/
│       └── auto_post_x.yml        ← GitHub Actions cron定義
├── scripts/
│   └── post_to_x.py               ← X API投稿スクリプト
├── requests/
│   └── sns_原稿_YYYY-MM-DD.md     ← SNS担当が毎日作成
└── company/
    └── x-posts/
        └── posted_log.md          ← 投稿ログ（自動更新）
```

---

## 5. GitHub Actions Workflow 設計（`auto_post_x.yml`）

```yaml
name: Auto Post to X

on:
  schedule:
    # 毎日 8:00 JST (UTC 23:00 前日) に実行
    - cron: '0 23 * * *'
  workflow_dispatch:  # 手動実行も可能

jobs:
  post:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'
      
      - name: Install dependencies
        run: pip install tweepy
      
      - name: Post to X
        env:
          X_API_KEY: ${{ secrets.X_API_KEY }}
          X_API_SECRET: ${{ secrets.X_API_SECRET }}
          X_ACCESS_TOKEN: ${{ secrets.X_ACCESS_TOKEN }}
          X_ACCESS_TOKEN_SECRET: ${{ secrets.X_ACCESS_TOKEN_SECRET }}
        run: python scripts/post_to_x.py
```

---

## 6. 投稿スクリプト設計（`post_to_x.py`）

### 主な処理フロー

```
1. 当日の日付を取得（JST）
2. requests/sns_原稿_YYYY-MM-DD.md を読み込む
3. 投稿テキストを抽出（「投稿1」「投稿2」「投稿3」形式）
4. 各投稿について以下のチェックを実施：
   a. 文字数チェック（140字以内推奨）
   b. 禁止ワードチェック（他社名・炎上ワードリスト）
   c. 時事ネタフラグチェック（[時事ネタ] タグがあればスキップ）
   d. AIっぽい表現チェック（「させていただきます」等のリストをチェック）
5. チェックOKの投稿のみX APIで投稿
6. 投稿結果を company/x-posts/posted_log.md に記録
7. company/x-posts/auto_post_report_YYYY-MM-DD.md に当日報告を作成
```

---

## 7. 投稿原稿フォーマット（SNS担当向け）

`requests/sns_原稿_YYYY-MM-DD.md` のフォーマットを以下に統一する：

```markdown
# X投稿原稿 YYYY-MM-DD

## 投稿1（08:00予定）
[投稿テキスト（140字以内）]
#ハッシュタグ1 #ハッシュタグ2

## 投稿2（12:00予定）
[投稿テキスト（140字以内）]
#ハッシュタグ1

## 投稿3（20:00予定）
[投稿テキスト（140字以内）]
#ハッシュタグ1 #ハッシュタグ2
```

---

## 8. たくとのルール適用方法

| ルール | 適用箇所 | 方法 |
|--------|---------|------|
| AIっぽい言葉遣いをしない | SNS担当原稿作成 + スクリプトチェック | 禁止表現リスト（させていただきます/ございます等）でスキップ |
| 絵文字を多用しない | SNS担当原稿作成ガイドライン | 1原稿あたり2個以内ルールをSNS担当に徹底 |
| 炎上ネタ回避 | スクリプトチェック | 炎上ワードリストを `.github/auto_post_config.yml` で管理 |
| 他社情報・他社名を出さない | スクリプトチェック | 競合他社名リストで自動チェック・スキップ |
| 時事ネタは確認 | 原稿フォーマット | `[時事ネタ]` タグで自動スキップ → 手動投稿に回す |
| 投稿予約時に報告 | スクリプト | 毎日 `auto_post_report_YYYY-MM-DD.md` に記録 |
| ハッシュタグ数制限 | スクリプトチェック | ハッシュタグ3個超でスキップ |
| 長文禁止 | SNS担当ガイドライン + スクリプト | 140字超でスキップ・警告 |

---

## 9. たくとへの確認事項（承認前に確認が必要）

| 確認項目 | 内容 |
|---------|------|
| X API登録 | Developer Portal へのアプリ登録はたくとが実施 |
| Free Tier 確認 | 月1500投稿まで無料。超過時は追加費用が発生（要確認） |
| 投稿時刻の確認 | 08:00/12:00/20:00 JST でよいか |
| 禁止ワードリスト | 炎上ワード・競合他社名のリストをたくとが最終確認 |
| 自動投稿の対象原稿 | 既存の `sns_原稿_*.md` ファイル形式で問題ないか |

---

## 10. 実装スケジュール（承認後）

| ステップ | 作業 | 担当 | 所要時間 |
|---------|------|------|---------|
| 1 | X Developer Portal でアプリ作成・API Key取得 | たくと | 30分 |
| 2 | GitHub Secrets に4つのキーを設定 | たくと | 5分 |
| 3 | scripts/post_to_x.py 作成 | CTO | 1セッション |
| 4 | .github/workflows/auto_post_x.yml 作成 | CTO | 30分 |
| 5 | テスト投稿（非公開アカウント等で動作確認） | たくと+CTO | 1時間 |
| 6 | 本番稼働開始 | - | - |

---

## 更新履歴

| 日付 | 内容 | 更新者 |
|------|------|------|
| 2026-07-13 | 初版作成（Issue #16 対応） | AI CEO |

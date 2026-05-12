# ファイルマップ — キャリアDNA

最終更新：2026-05-09

---

## company/ — 組織・エージェント管理

### agents/ — エージェント定義（書き換え禁止）

| ファイル | 役割 |
|----------|------|
| `agents/RULES.md` | 全エージェント共通ルール・権限・報告フォーマット |
| `agents/CEO.md` | CEO定義（経営・報告・バックログ管理） |
| `agents/CTO.md` | CTO定義（技術実装・SEO・権限判断基準） |
| `agents/SNS.md` | SNS担当定義（投稿原稿・日次調査） |

### shared/ — 全エージェントが毎日読む共有情報

| ファイル | 内容 | 更新者 |
|----------|------|--------|
| `shared/strategy.md` | 現在の方針・やること/やらないこと | CEO・たくと |
| `shared/decisions.md` | 意思決定ログ（方針変更の根拠） | CEO・たくと |
| `shared/context.md` | プロジェクト背景・現状 | CEO |
| `shared/vision.md` | ビジョン・ミッション | CEO・たくと |
| `shared/competitive-intel.md` | 競合調査レポート（7日ルール） | CEO |
| `shared/sns-intel.md` | SNSトレンド調査（毎日上書き更新） | SNS担当 |
| `shared/handoff.md` | セッション途中終了時の引き継ぎ（次回セッションが最初に読む） | 各エージェント |
| `shared/file-map.md` | このファイル | CEO |

### reports/ — CEOの日次統合報告書（1日1本のみ）

| 命名規則 | 内容 |
|----------|------|
| `reports/YYYY-MM-DD.md` | CEO統合報告書（CTO・SNS実行内容・X投稿原稿・エスカレーション） |

### x-posts/ — X投稿原稿（SNS担当が作成・たくとが投稿）

| 命名規則 | 内容 |
|----------|------|
| `x-posts/YYYY-MM-DD_原稿.md` | その日作成した投稿原稿（たくとが確認して予約投稿） |

### archive/ — 完了済み・旧フォーマットのファイル

過去の reports・requests・提案書・指示書を保管。参照のみ。

### その他

| ファイル | 役割 |
|----------|------|
| `BACKLOG.md` | タスク一覧・進捗管理（全エージェントが更新） |
| `finance/summary.md` | 収益サマリー |

---

## public/ — フロントエンド（公開ページ）

### HTMLページ

| ファイル | 内容 |
|----------|------|
| `index.html` | トップページ |
| `result.html` | 診断結果ページ |
| `jobs.html` | 求人・転職サービス一覧（アフィリエイト） |
| `about.html` | サービス紹介ページ |
| `faq.html` | よくある質問 |
| `contact.html` | お問い合わせ |
| `privacy.html` | プライバシーポリシー |
| `disclaimer.html` | 免責事項 |
| `type-craftsman.html` | 職人タイプ詳細ページ |
| `type-strategist.html` | 戦略家タイプ詳細ページ |
| `type-mediator.html` | 調整役タイプ詳細ページ |
| `type-challenger.html` | 挑戦者タイプ詳細ページ |
| `type-analyst.html` | 分析者タイプ詳細ページ |
| `type-creator.html` | 表現者タイプ詳細ページ |
| `type-guardian.html` | 守護者タイプ詳細ページ |
| `type-nurturer.html` | 育成者タイプ詳細ページ |

### JavaScript

| ファイル | 役割 |
|----------|------|
| `diagnosis.js` | 診断ロジック（質問・スコアリング・タイプ判定） |
| `affiliate-config.js` | アフィリエイトリンク設定 |
| `social-share.js` | SNSシェア機能 |
| `back-to-top.js` | ページトップへ戻るボタン |

### CSS・その他

| ファイル | 役割 |
|----------|------|
| `style.css` | 全ページ共通スタイル |
| `sitemap.xml` | SEO用サイトマップ |
| `robots.txt` | クローラー制御 |

---

## api/ — サーバーレス関数

| ファイル | 役割 |
|----------|------|
| `api/diagnose.js` | Claude API呼び出し・診断結果生成 |
| `api/contact.js` | お問い合わせフォーム送信 |

---

## ルート設定ファイル

| ファイル | 役割 |
|----------|------|
| `vercel.json` | Vercelデプロイ設定 |
| `package.json` | Node.js依存関係 |
| `.env` | 環境変数（Git管理外） |
| `.env.example` | 環境変数のサンプル |
| `.gitignore` | Git除外設定 |

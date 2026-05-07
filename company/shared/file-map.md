# ファイルマップ — キャリアDNA

プロジェクトルート: `career-diagnosis/`

---

## ルート設定ファイル

| ファイル | 役割 |
|---|---|
| `vercel.json` | Vercelデプロイ設定（ルーティング・関数設定） |
| `package.json` | Node.js依存関係・スクリプト |
| `package-lock.json` | 依存関係ロックファイル |
| `server.js` | ローカル開発用サーバー |
| `server.js.bak` | server.jsのバックアップ |
| `api.js` | API共通処理 |
| `.env` | 環境変数（APIキー等・Git管理外） |
| `.env.example` | 環境変数のサンプル（Git管理対象） |
| `.gitignore` | Git除外設定 |

---

## public/ — フロントエンド（公開ページ）

### HTMLページ

| ファイル | 内容 |
|---|---|
| `index.html` | トップページ |
| `result.html` | 診断結果ページ |
| `jobs.html` | 求人・転職サービス一覧（アフィリエイト） |
| `about.html` | サービス紹介ページ |
| `faq.html` | よくある質問 |
| `contact.html` | お問い合わせ |
| `privacy.html` | プライバシーポリシー |
| `disclaimer.html` | 免責事項 |
| `glossary.html` | 用語集 |
| `type-strategy.html` | タイプ別戦略ページ（全タイプ共通テンプレート） |
| `type-craftsman.html` | 職人タイプ専用ページ（個別SEO用） |

### JavaScript

| ファイル | 役割 |
|---|---|
| `diagnosis.js` | 診断ロジック（質問・スコアリング・タイプ判定） |
| `affiliate-config.js` | アフィリエイトリンク設定（ASP・案件管理） |
| `social-share.js` | SNSシェア機能 |
| `back-to-top.js` | ページトップへ戻るボタン |

### CSS・その他

| ファイル | 役割 |
|---|---|
| `style.css` | 全ページ共通スタイル |
| `sitemap.xml` | SEO用サイトマップ |
| `robots.txt` | クローラー制御 |

### images/ — 画像素材

| ファイル | 内容 |
|---|---|
| `CareerDNA_logo.png` | ロゴ（縦） |
| `CareerDNA_hlogo.png` | ロゴ（横） |
| `ogp.png` | OGP画像（SNSシェア用） |
| `hero-dna.png` | トップページヒーロー画像 |
| `feature_ai.png` | 特徴セクション：AI診断 |
| `feature_career.png` | 特徴セクション：キャリア |
| `feature_sns.png` | 特徴セクション：SNS |
| `type-analyst.png` | タイプ画像：分析家 |
| `type-challenger.png` | タイプ画像：挑戦者 |
| `type-craftsman.png` | タイプ画像：職人 |
| `type-creator.png` | タイプ画像：創造者 |
| `type-guardian.png` | タイプ画像：守護者 |
| `type-mediator.png` | タイプ画像：調停者 |
| `type-nurturer.png` | タイプ画像：育成者 |
| `type-strategist.png` | タイプ画像：戦略家 |

---

## api/ — サーバーレス関数（Vercel Functions）

| ファイル | 役割 |
|---|---|
| `api/diagnose.js` | Claude API呼び出し・診断結果生成 |
| `api/contact.js` | お問い合わせフォーム送信（nodemailer） |

---

## company/ — 組織・エージェント管理

### agents/ — 各エージェントの指示書

| ファイル | 役割 |
|---|---|
| `agents/RULES.md` | エージェント共通ルール |
| `agents/CEO.md` | CEOエージェント指示書（戦略・意思決定） |
| `agents/CFO.md` | CFOエージェント指示書（財務・収益管理） |
| `agents/CTO.md` | CTOエージェント指示書（技術・開発） |
| `agents/marketing/SNS.md` | SNS担当エージェント指示書 |

### shared/ — 全エージェント共有ドキュメント

| ファイル | 内容 |
|---|---|
| `shared/context.md` | プロジェクト現状・背景 |
| `shared/vision.md` | ビジョン・ミッション |
| `shared/strategy.md` | 事業戦略 |
| `shared/decisions.md` | 意思決定ログ |
| `shared/competitive-intel.md` | 競合調査レポート |
| `shared/file-map.md` | このファイル（ファイル位置マップ） |

### reports/ — エージェント作業レポート（日付別）

`reports/YYYY-MM-DD_[担当].md` の形式で保存

| ファイル | 内容 |
|---|---|
| `reports/2026-05-07_CEO.md` | CEO定例レポート |
| `reports/2026-05-07_CTO.md` | CTO定例レポート |
| `reports/2026-05-07_CTO_proposal.md` | CTOからの提案書 |
| `reports/2026-05-07_CTO_typepage_proposal.md` | タイプページ制作提案 |
| `reports/2026-05-07_SNS.md` | SNS担当レポート |

### requests/ — エージェントへの依頼書

`requests/[担当]_YYYY-MM-DD.md` の形式で保存

| ファイル | 内容 |
|---|---|
| `requests/request_2026-05-07.md` | 全体への依頼 |
| `requests/CTO_2026-05-07.md` | CTO向け依頼 |
| `requests/SNS_2026-05-07.md` | SNS担当向け依頼 |

### その他

| ファイル | 役割 |
|---|---|
| `BACKLOG.md` | 機能バックログ・タスク一覧 |
| `finance/summary.md` | 収益サマリー |
| `archive/` | 完了済み指示書・計画書の保管場所 |

---

## .claude/ — Claude Code設定

| ファイル | 役割 |
|---|---|
| `.claude/settings.local.json` | Claude Codeローカル設定（権限等） |
| `.claude/scheduled_tasks.lock` | スケジュールタスクのロックファイル |

---

## .vercel/ — Vercel設定

| ファイル | 役割 |
|---|---|
| `.vercel/project.json` | VercelプロジェクトID・組織ID |

---

*最終更新: 2026-05-07*

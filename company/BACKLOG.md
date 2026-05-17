# バックログ

> AI CEOとたくとが共同で管理するタスク一覧。優先度順に並べる。
> CEOは毎日このファイルを確認して作業を進め、完了したタスクは完了済みに移動すること。

---

## ステータス凡例
- `[ ]` 未着手
- `[→]` 進行中
- `[x]` 完了
- `[-]` 保留

---

## 優先タスク

###  最優先（今週中）

- [-] **アフィリエイトリンクの配置・遷移改善** `方針変更により後回し`
  - データ取得前のUI・遷移改善は行わない方針に変更（2026-05-09・たくと決定）
  - 流入データが取れてから改めて検討する

- [x] **タイプ別詳細ページ作成・デプロイ（8ページ）** `完了 2026-05-09`
  - 8/8完成・たくとがデプロイ済み：type-craftsman / type-strategist / type-mediator / type-challenger / type-analyst / type-creator / type-guardian / type-nurturer
  - 各ページ：タイプ固有カラー・アフィリエイトカード3枚・GA4計測・JSON-LD実装済み

- [→] **Xアカウント継続投稿（07/20〜以降の原稿作成）** `SNS担当`
  - 05/14〜05/20の原稿7本：予約設定済み ✅
  - 05/21〜05/26の原稿6本：完成済み・たくとの予約設定待ち（x-posts/2026-05-08_原稿.md）
  - 05/27〜05/31の原稿5本：完成済み（x-posts/2026-05-09_原稿.md）・たくとの予約設定待ち
  - 06/01〜06/06の原稿3本：完成済み（x-posts/2026-05-10_原稿.md）・たくとの予約設定待ち
  - 06/07〜06/13の原稿3本：完成済み（x-posts/2026-05-10_原稿.md）・たくとの予約設定待ち
  - 06/14〜06/21の原稿6本：完成済み（x-posts/2026-05-11_原稿.md）・たくとの予約設定待ち
  - 06/22〜06/28の原稿4本：完成済み（x-posts/2026-05-11_原稿.md）・たくとの予約設定待ち
  - 06/29〜07/05の原稿4本：完成済み（x-posts/2026-05-12_原稿.md）・たくとの予約設定待ち
  - 07/06〜07/12の原稿3本：完成済み（x-posts/2026-05-12_原稿.md）・たくとの予約設定待ち
  - 07/13〜07/19の原稿7本：完成済み（x-posts/2026-05-13_原稿.md）・たくとの予約設定待ち ✅
  - 07/20〜07/27の原稿4本：完成済み（x-posts/2026-05-14_原稿.md）・たくとの予約設定待ち ✅
  - 07/28〜08/03の原稿3本：完成済み（x-posts/2026-05-14_原稿.md）・たくとの予約設定待ち ✅
  - 08/04〜08/10の原稿5本：完成済み（x-posts/2026-05-15_原稿.md）・たくとの予約設定待ち ✅
  - 08/11〜08/17の原稿4本：完成済み（x-posts/2026-05-15_原稿.md）・たくとの予約設定待ち ✅
  - 08/18〜09/01の原稿11本：完成済み（requests/sns_原稿_2026-05-15.md）・たくとの確認・予約設定待ち ✅
  - 09/02〜09/15の原稿9本：完成済み（requests/sns_原稿_2026-05-16.md）・たくとの確認・予約設定待ち ✅
  - 09/16〜09/28の原稿10本：完成済み（x-posts/2026-05-17_原稿.md）・たくとの確認・予約設定待ち ✅
  - 09/29〜10/05の原稿6本：未作成・SNS_2026-05-18.md で明日作成依頼済み
  - 10/06〜以降の原稿：未作成・次回SNS担当が作成

###  高優先（今月中）

- [x] **index.html LLMO・SEOコンテンツ追加（2026-05-14・CTO実装完了）**
  - 「キャリアDNA診断とは？」「こんな人に使ってほしい」「診断結果でできること」コンテンツセクション3つ追加
  - FAQセクション（HTML本文）追加（JSON-LDと整合）
  - sitemap.xml index.html lastmod → 2026-05-14

- [x] **about.html analytics-events.js追加・E-E-A-Tコンテンツ充実（2026-05-14・CTO実装完了）**
  - analytics-events.js 追加（GA4計測統一）
  - サービス概要・運営方針セクション追加（E-E-A-T強化）
  - プライバシーポリシー・免責事項・お問い合わせへの内部リンク追加
  - sitemap.xml about.html lastmod → 2026-05-14

- [x] **contact/privacy/disclaimer SEO基盤整備** `CTO完了 2026-05-13`
  - 3ページ全てにcanonical・favicon・JSON-LD（ContactPage/WebPage + BreadcrumbList）追加
  - contact.htmlにanalytics-events.js追加（スクロール深度GA4計測）

- [x] **faq.html SEO・LLMOコンテンツ強化** `CTO完了 2026-05-13`
  - title・meta description 最適化（「AIキャリア診断」「転職自己分析」KW追加）
  - FAQ 5問追加（転職自己分析やり方・適職診断おすすめ・就活自己分析ツール・転職エージェント選び方・診断結果活用法）
  - JSON-LD FAQPage に新規5問追加（LLMO・リッチスニペット対策）
  - analytics-events.js 追加（スクロール深度GA4計測）
  - sitemap.xml lastmod 2026-05-13 に更新（faq/contact/privacy/disclaimer）

- [x] **全タイプページ 内部クロスリンク追加** `CTO完了 2026-05-12`
  - 全8タイプページに「他のタイプを見る」グリッドセクション実装済み
  - タイプ間のSEOリンクジュース分配・回遊率向上

- [x] **jobs.html SEO強化** `CTO完了 2026-05-12`
  - title「診断結果別おすすめ転職・就活サービス一覧」・meta description最適化
  - H1「あなたのキャリアタイプに合った転職・就活サービス」に変更
  - 診断CTAリンク追加・GA4クリック計測実装

- [x] **SEO・LLMOコンテンツ強化（2026-05-10・CTO実装）**
  - index.htmlのtitle・meta最適化（「AIキャリア診断」「AI自己分析」ブルーオーシャンKW導入）
  - sitemap.xmlにlastmod日付追加（全15URL）
  - 全8タイプページのmeta description更新（MBTI言及をコンプライアンス対応で除去、SEOキーワード改善）
  - 全8タイプページにFAQPage JSON-LD構造化データ追加（Googleリッチスニペット・LLMO対策）
  - 全8タイプページにFAQセクション追加（5Q×8ページ=40個のQ&A、長尾KW自然挿入）

- [x] **技術SEO・GA4計測強化（2026-05-12・CTO実装完了）**
  - jobs.html: canonical・favicon・WebPage JSON-LD追加（SEO補強）
  - result.html: noindex・canonical・favicon追加（動的ページのクロール予算最適化）
  - analytics-events.js 新規作成：スクロール深度（25/50/75/100%）・ページ滞在時間（30/60/120秒）GA4計測
  - 全8タイプページ・index.htmlにanalytics-events.js追加（10ページ）
  - sitemap.xml lastmod全更新（2026-05-12）

- [x] **LLMO・SEO基盤追加整備（2026-05-11・CTO実装完了）**
  - index.htmlにFAQPage JSON-LD追加（「AIキャリア診断とは」「AI自己分析とは」KW対応）
  - index.htmlにSpeakable JSON-LD追加（AI検索エンジン参照獲得対策）
  - about.htmlにOrganization JSON-LD・canonical・faviconリンク追加（E-E-A-T強化）
  - faq.htmlにcanonical・faviconリンク追加、AI系FAQを2問追加（JSON-LD・HTML本文）
  - robots.txtにAI botクロール明示許可（GPTBot・PerplexityBot・anthropic-ai等）
  - robots.txtにtype-strategy.html（旧ページ）のDisallow追加
  - type-strategy.htmlのcanonical → type-strategist.htmlに修正（重複コンテンツ回避）
  - sitemap.xml index/faq/about のlastmod更新（2026-05-11）

- [x] **全タイプページ BreadcrumbList JSON-LD追加** `CTO完了 2026-05-11`
  - 全8タイプページのheadにBreadcrumbList構造化データを追加
  - Googleリッチスニペット獲得・LLMO対策

- [x] **vercel.json リダイレクト設定（301）** `CTO完了 2026-05-11`
  - /type-strategy.html → /type-strategist.html の永続リダイレクト
  - 重複コンテンツ完全解消

- [x] **sitemap.xml priority・changefreq最適化** `CTO完了 2026-05-11`
  - faq.html 0.7 / about.html 0.6 / jobs.html 0.7 に修正・jobs.htmlのlastmodを2026-05-11に更新

- [x] **職人タイプ詳細ページ作成**（type-craftsman.html） `CTO完了 2026-05-09`
  - アフィリエイトカード・GA4実装済み

- [x] **調整役タイプ詳細ページ作成**（type-mediator.html） `CTO完了 2026-05-09`
  - ファイル名：type-coordinator.html → type-mediator.html（変更あり・要リンク確認）
  - アフィリエイトカード・GA4実装済み

- [x] **llms.txt 新規作成（AIO対策）** `CTO完了 2026-05-15`
  - ChatGPT・Perplexity・Claude等のAI検索エンジン向けサイト案内ファイル
  - public/llms.txt 新規作成：サービス概要・8タイプURL・FAQ要約・AI参照許可を明記

- [x] **faq.html 内部リンク強化（SEO・回遊率改善）** `CTO完了 2026-05-15`
  - 各FAQ回答に内部リンクを6箇所追加
  - 「各タイプの意味を詳しく知るには？」→ index.html、「おすすめ求人ページ」→ jobs.html
  - 「AIキャリア診断とは？」「転職の自己分析」「適職診断おすすめ」「就活自己分析」→ index.html

- [→] **Xリプライ戦略の整備** `SNS担当`
  - 毎日10リプライで拡散促進（strategy.md に記載）
  - リプライ対象アカウントリストを作成（転職/就活界隈のフォロワー1000〜10000人のアカウント）
  - SNS指示書発行済み（2026-05-07）

- [→] **週次パフォーマンスレポート作成** `CEO`
  - 毎週月曜にGA・X・アフィリエイト成果をまとめてたくとへ報告
  - `company/reports/` に保存
  - 第1回：2026-05-11（月）作成完了（ベースライン確認レポート・2026-05-11_CEO.md 内に収録）
  - 第2回：2026-05-18（月）予定（Search Console・GA4のデータ初蓄積後の確認レポート）→ たくとにGA4・Search Consoleデータの共有依頼済み（request_2026-05-18.md 依頼5）

- [x] **全8タイプページ Article JSON-LD強化（2026-05-16・CTO実装完了）**
  - datePublished/dateModified/author/image/speakable フィールドを全8タイプページに追加
  - Speakable JSON-LD（.type-overview / .job-grid）でAI検索からの参照獲得対策
  - sitemap.xml 全タイプページ lastmod → 2026-05-16

- [x] **jobs.html FAQPage JSON-LD追加・analytics-events.js追加（2026-05-16・CTO実装完了）**
  - 転職エージェント関連5問のFAQPage構造化データ追加（リッチスニペット・LLMO対策）
  - analytics-events.js追加（スクロール深度・滞在時間のGA4計測）
  - sitemap.xml jobs.html lastmod → 2026-05-16

- [x] **about.html meta description・title改善（2026-05-16・CTO実装完了）**
  - title/meta descriptionに「AIキャリア診断」「AI自己分析」キーワード追加
  - sitemap.xml about.html lastmod → 2026-05-16

- [→] **全8タイプページ 内部ナビリンク追加（CTO_2026-05-17.md タスク1）** `CTO`
  - faq/about/jobs/index への4リンクのナビブロックを各タイプページ末尾に追加
  - faq→タイプページ（実装済）との双方向リンク完成でPageRank循環強化

- [→] **jobs.html ItemList JSON-LD 追加（CTO_2026-05-17.md タスク2）** `CTO`
  - 掲載サービス一覧を ItemList スキーマで構造化
  - Googleリッチスニペット（リスト表示）獲得→アフィリエイト流入増加

- [→] **index.html Organization JSON-LD 追加（CTO_2026-05-17.md タスク3）** `CTO`
  - sameAs（Xアカウント）・contactPoint含む Organization スキーマ追加
  - エンティティ認識強化・ナレッジパネル表示促進

- [→] **about.html に 8タイプ内部リンクセクション追加（CTO_2026-05-18.md タスク1）** `CTO`
  - about.htmlから全8タイプページへのリンクグリッド追加
  - about.htmlのPageRankをタイプページへ分配・E-E-A-T強化

- [→] **contact/privacy/disclaimer ページに診断TOPへのCTAリンク追加（CTO_2026-05-18.md タスク2）** `CTO`
  - 各リーフページのフッター近辺に「AIキャリア診断を始める」CTAリンク追加
  - クロール深度改善・直帰率改善

- [→] **全8タイプページ title/H1 SEOキーワード最適化（CTO_2026-05-18.md タスク3）** `CTO`
  - 各タイプページのtitle・H1・meta descriptionに属性KW（「コツコツできる仕事 転職」等）を追加
  - 競合サイトと同等KW配置でインプレッション増加を狙う

###  中優先（来月以降）

- [→] **キャリア協会まとめ記事への掲載依頼** `SNS担当→たくと`
  - job.or.jp「適職診断おすすめ12選」への掲載申請
  - 依頼文草稿：完成済み（requests/sns_キャリア協会依頼文.md・2026-05-10）
  - たくとが問い合わせフォームから申請（request_2026-05-10.md 依頼3参照）
  - 達成すれば大幅な被リンク・流入増が期待できる

- [→] **アフィリエイト提携先の拡充** `CTO調査完了→たくとへASP登録依頼`
  - 現在のA8.net提携先（ファルマスタッフ・明光・PE-BANK等8サービス）は全て正常なトラッキングURL設定済み
  - 追加候補調査完了（2026-05-10_CTO_affiliate_report.md 参照）：ビズリーチ・Green・パソナキャリア
  - **たくとへ：** A8.netでビズリーチ・Green・パソナキャリアの提携申請が必要（優先：ビズリーチ）

- [→] **OGP画像の作成** `CTO提案書完成→たくと承認待ち`
  - SNSシェア時の見た目改善（現状 ogp.png が不在）
  - 提案書完成（2026-05-10_CTO_ogp_proposal.md）：Canvaで作成・タイプ別OGP8枚の設計案あり
  - **たくとへ：** 承認・Canvaでの画像作成後にCTOが実装（承認後に実装）

- [ ] **横展開ビジネスの調査** `CEO`
  - キャリア診断以外の横展開できるビジネスモデルを調査・提案
  - 例：業界別診断・スキル診断・副業適性診断 等

---

## 保留中

- 有料プラン・広告出稿（収益発生後に検討）

---

## 完了済み

- [x] SEO基盤整備：全9ページのtitle/meta/OGP最適化（2026-05-05）
- [x] SNS戦略書策定（2026-05-05）
- [x] お問い合わせフォーム Formsubmit 移行（2026-05-05）
- [x] Search Console TXTレコード設定（2026-05-07・たくとが実行）
- [x] sitemap.xml 送信（2026-05-07・たくとが実行）
- [x] GAコンバージョン計測設定：jobs.htmlにaffiliate_clickイベント実装（2026-05-07・CTO実装）
- [x] Xアカウント継続投稿原稿作成：05/14〜05/20分7本完成（2026-05-07・SNS担当）
- [x] 全ページGA4タグ設置確認・漏れ修正：全10ページ設置完了（2026-05-08・CTO実装）
- [x] sitemap.xmlへのタイプページURL追加（2026-05-08 / 2026-05-09更新・CTO実装）
- [x] 全8タイプ詳細ページ完成：type-craftsman / type-strategist / type-mediator / type-challenger / type-analyst / type-creator / type-guardian / type-nurturer（2026-05-09・CTO実装・デプロイ承認待ち）
- [x] Xアカウント継続投稿原稿作成：05/21〜05/26分6本完成（2026-05-08・SNS担当）

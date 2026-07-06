# CTOへの指示書 2026-07-25

作成者：AI CEO
作成日：2026-07-06
優先度：高

---

## ⛔ FAQ STOP ORDER 継続中

**Issue #9「FAQは指示するまで絶対増やさないで」（たくと）**

- faq.html への新規FAQ追加：禁止
- 全タイプページへの新規FAQ追加：禁止
- CTO_2026-07-10〜13.md のFAQ追加タスク：全てBLOCKED

本指示書は **FAQ以外のSEO・構造化データ施策** のみを対象とする。

---

## 背景・目的

FAQ STOP ORDER中も、SEOインデックスの向上・AI Overview対応・アフィリエイトCVR改善に直結する非FAQ施策を継続する。本指示書では **result.html の技術SEO強化** と **AIO（AI Overview）最適化** を中心に対応する。

---

## タスク1（最優先）：result.html 構造化データ強化

**目的：** 診断結果ページ（result.html）はユーザーが診断を完了した直後に表示される最重要ページ。構造化データが未整備な場合、Google・AI検索エンジンからの評価が低い。

**実装内容：**

1. `result.html` に **WebPage JSON-LD** を追加（既存のSoftwareApplicationとの整合性を確認）
   - `@type: "WebPage"`
   - `name`: 「キャリアDNA 診断結果｜あなたのキャリアタイプ」
   - `description`: 各タイプの結果ページの説明
   - `breadcrumb`: `[{"@type":"ListItem","position":1,"name":"ホーム","item":"https://career-dna.jp"},{"@type":"ListItem","position":2,"name":"診断結果","item":"https://career-dna.jp/result.html"}]`

2. `result.html` の **title タグ・meta description** を確認・最適化
   - title: 「キャリアDNA診断結果｜あなたのキャリアタイプと向いてる仕事が分かる」
   - description: 「キャリアDNA診断の結果ページ。8タイプのキャリアDNAに基づいてあなたの強み・向いてる仕事・おすすめ転職エージェントを表示します。登録不要・無料。」

3. `result.html` の **canonical URL** 確認
   - `<link rel="canonical" href="https://career-dna.jp/result.html">` が正しく設定されているか確認

**注意：** result.html のデザイン・表示内容は変更禁止。メタタグ・JSON-LDのみ変更。

---

## タスク2：llms.txt の2026年7月更新

**目的：** AIクローラー（Claude・ChatGPT・Perplexity等）に最新のサイト内容を正確に伝える。

**実装内容：**

`llms.txt` に以下のセクションを追記または更新：

```
## 2026年7月の主な更新（2026-07-25）

- result.html: WebPage JSON-LD追加・canonical/meta確認完了
- faq.html: 319問体制（FAQ検索機能実装済み・7カテゴリCTA構成・Issue #14 対応済み）
- タイプページFAQ: 98問体制（3問ピックアップ+もっと見る表示形式に変更済み・Issue #14 対応済み）
- FAQ STOP ORDER中: 現在のFAQ追加は停止中（Issue #9）
```

---

## タスク3：sitemap.xml 確認・更新

**目的：** result.html がsitemap.xmlに含まれているか確認し、最終更新日を正しく設定する。

**実装内容：**

1. result.html のsitemap.xml エントリを確認
   - 存在しない場合は追加（priority 0.8・changefreq weekly）
   - 存在する場合は lastmod を 2026-07-25 に更新

2. 全ページのlastmod を確認し、2026-07-06以降に変更されたページのみ更新

---

## 実行後の手順

1. BACKLOG.md の本タスクを `[x]` に更新
2. 本指示書を `company/archive/` に移動
3. git commit / push（コミットメッセージ例：`CTO 2026-07-25: result.html WebPage JSON-LD・meta確認・llms.txt更新・sitemap確認`）

---

## 注意事項

- **デザイン変更禁止**：表示コンテンツ・UIは変更しない
- **FAQ追加禁止**：Issue #9 STOP ORDER継続中
- **実装で迷ったら**：CEO報告書に記録してエスカレーション（実装せず）
- **Git push**：承認不要で自律実行してよい

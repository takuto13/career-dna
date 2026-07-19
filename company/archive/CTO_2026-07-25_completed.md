# CTOへの指示書 2026-07-25

作成者：AI CEO  
作成日：2026-07-18  
優先度：高

---

## ⛔ FAQ STOP ORDER 継続中

**Issue #9「FAQは指示するまで絶対増やさないで」（たくと）**

- faq.html への新規FAQ追加：禁止
- 全タイプページへの新規FAQ追加：禁止

本指示書は **FAQ以外のSEO・構造化データ施策** のみを対象とする。

---

## 背景・目的

前日（CTO_2026-07-24.md）でresult.html SEOパラグラフ・faq.html OGP・sitemap/llms.txtを更新完了。本日は **faq.htmlの構造化データ補強** と **result.htmlのWebPage JSON-LD確認** を実施し、全主要ページのJSON-LD体制を完成させる。

---

## タスク1（最優先）：faq.html BreadcrumbList JSON-LD 追加

**目的：** faq.htmlにパンくずリスト構造化データを追加し、Google検索でパンくず表示を獲得してCTRを改善する。全8タイプページには CTO_2026-07-22.md で実装済み。faq.htmlのみが未実装。

**実装内容：**

`faq.html` の `<head>` 内（既存のFAQPage JSON-LDの直後）に以下を追加：

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "ホーム",
      "item": "https://career-dna.jp/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "よくある質問（FAQ）",
      "item": "https://career-dna.jp/faq.html"
    }
  ]
}
</script>
```

**注意：**
- faq.htmlの既存コンテンツ・デザインは一切変更しない
- FAQPage JSON-LDは既に実装済み（変更不要）
- BreadcrumbListのみ追加する

---

## タスク2：result.html WebPage JSON-LD 確認・追加

**目的：** result.htmlは診断完了後の最重要ページ。SoftwareApplication JSON-LDはindex.htmlに実装済みだが、result.html自体にWebPage JSON-LDが実装されているか確認する。

**実装内容：**

1. result.htmlを開いて `<script type="application/ld+json">` タグを確認する
2. WebPage JSON-LDが存在しない場合は以下を追加：

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "キャリアDNA診断結果｜あなたのキャリアタイプと向いてる仕事",
  "description": "AIキャリア診断の診断結果ページ。あなたのキャリアタイプ・強み・向いてる仕事・おすすめ転職エージェントを表示します。登録不要・完全無料。",
  "url": "https://career-dna.jp/result.html",
  "inLanguage": "ja",
  "isPartOf": {
    "@type": "WebSite",
    "name": "キャリアDNA",
    "url": "https://career-dna.jp/"
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "ホーム",
        "item": "https://career-dna.jp/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "診断結果",
        "item": "https://career-dna.jp/result.html"
      }
    ]
  }
}
</script>
```

3. すでにWebPage JSON-LDが実装されている場合は `dateModified` を `2026-07-25` に更新するだけでよい

---

## タスク3：sitemap.xml + llms.txt 更新

**目的：** タスク1・2で変更したページをサイトマップ・llms.txtに反映する。

**実装内容：**

1. `sitemap.xml` で faq.html と result.html の `<lastmod>` を `2026-07-25` に更新
2. `llms.txt` に以下の更新セクションを追加：

```
## 2026-07-25 更新
- faq.html: BreadcrumbListJSON-LD追加（パンくずリスト構造化データ実装）
- result.html: WebPage JSON-LD確認・追加（診断結果ページの構造化データ完備）
- sitemap.xml: faq.html・result.html lastmod 2026-07-25に更新
```

---

## 完了後の作業

1. BACKLOG.md の本指示書タスクを `[x]` に更新
2. `company/requests/CTO_2026-07-25.md` → `company/archive/CTO_2026-07-25_completed.md` にアーカイブ
3. git commit & push（コミットメッセージ例：`CTO 2026-07-25: faq.html BreadcrumbList + result.html WebPage JSON-LD`）

---

## 注意事項

- デザイン変更は絶対禁止（JSON-LD・metaタグのみ変更）
- FAQ追加は絶対禁止（STOP ORDER継続中）
- 実装後はValidate（Google Rich Results Test等）で構造化データの正常性確認を推奨

# CTOへの指示書 2026-08-01

作成日：2026-07-19（CEO定例 第6セッション）  
実行予定日：2026-08-01  
作成者：AI CEO

---

## 優先タスク一覧

### タスク1：about.html WebPage JSON-LD確認・BreadcrumbList JSON-LD追加

**背景：**  
about.html および contact.html には2026-07-31にtwitter:card（twitter:title/description）を追加済み。次のステップとして構造化データ（BreadcrumbList JSON-LD）を追加し、Google SERP上でパンくずリストが正しく表示されるよう対応する。

**実施内容：**
- about.html に BreadcrumbList JSON-LD を追加（ホーム → 会社概要 の2項目形式）
- about.html の WebPage JSON-LD（dateModified）を 2026-08-01 に更新（存在する場合）
- BreadcrumbList 形式（他ページとの統一）：
  ```json
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://career-dna.jp/" },
      { "@type": "ListItem", "position": 2, "name": "会社概要", "item": "https://career-dna.jp/about.html" }
    ]
  }
  ```

**期待成果：**
- about.html のSERP表示にパンくずリストが追加される
- Google のリッチスニペット対応が向上する

---

### タスク2：contact.html WebPage JSON-LD確認・BreadcrumbList JSON-LD追加

**実施内容：**
- contact.html に BreadcrumbList JSON-LD を追加（ホーム → お問い合わせ の2項目形式）
- contact.html の WebPage JSON-LD（dateModified）を 2026-08-01 に更新（存在する場合）
- BreadcrumbList 形式：
  ```json
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://career-dna.jp/" },
      { "@type": "ListItem", "position": 2, "name": "お問い合わせ", "item": "https://career-dna.jp/contact.html" }
    ]
  }
  ```

**期待成果：**
- contact.html の構造化データが全ページで統一される

---

### タスク3：sitemap.xml + llms.txt 2026-08-01 更新

**実施内容：**
- sitemap.xml の about.html・contact.html lastmod を `2026-08-01` に更新
- llms.txt に `## 2026-08-01 更新` セクションを追加し、以下の内容を記録：
  - about.html BreadcrumbList JSON-LD追加
  - contact.html BreadcrumbList JSON-LD追加

---

## 注意事項

- **FAQ STOP ORDER継続中**：faq.html・全タイプページへのFAQ追加は一切禁止（Issue #9 解除待ち）
- デザイン・レイアウトに影響する変更は行わないこと
- 実装後は BACKLOG の該当タスクを `[x]` に更新し、本指示書を `company/archive/CTO_2026-08-01_completed.md` にアーカイブすること

---

## 参考情報

- 全8タイプページのBreadcrumbList形式：3項目（ホーム→AIキャリア診断→[タイプ名]）
- faq.html の BreadcrumbList：2項目（ホーム → よくある質問）
- result.html の BreadcrumbList：2項目（ホーム → 診断結果）
- jobs.html の BreadcrumbList：実装済み（ItemList + BreadcrumbList）
- about.html・contact.html：今回新規追加対象（2項目形式）

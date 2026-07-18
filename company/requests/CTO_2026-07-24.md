# CTOへの指示書 2026-07-24

作成者：AI CEO  
作成日：2026-07-18  
優先度：SEO技術改善・収益導線強化

---

## ⛔ FAQ STOP ORDER継続中

**Issue #9コメント（たくと指示）：FAQは指示するまで絶対増やさないで**

- faq.html（現在319問）・全タイプページへのFAQ追加は一切禁止
- 解除条件：たくとから「追加OK」の明示まで

---

## 本日のタスク（優先順）

### タスク1：result.html SEOパラグラフ追加

**目的：** 診断結果ページへの検索流入を強化し、アフィリエイトCTR向上に直結させる

**背景：** result.htmlは診断完了後のランディングページとして最も重要だが、現在SEOテキストが不足している。「キャリア診断 結果 向いてる仕事」「適職診断 タイプ別 活用方法」などのKWでインデックスされることで、診断完了直前の高意欲ユーザーを捕捉できる。

**実装方法：** `result.html` の `<body>` 内末尾付近（スクロール位置に影響しない位置）に `<section class="seo-paragraph">` を追加。デザイン変更は行わない（既存の他ページのseo-paragraphと同様の実装方法を使うこと）

**追加するSEOテキスト：**
```
キャリアDNA診断の結果は、あなたの強みと仕事スタイルを8タイプで示します。診断結果をもとに、向いてる仕事・適職・おすすめ転職エージェントをタイプ別に確認できます。AI自己分析ツールとして、転職活動・就活での自己分析に5分・登録不要で活用いただけます。スマホアプリ不要・ブラウザ完結で、いつでも診断結果を確認できます。
```

**期待効果：** 「キャリア診断 結果」「適職診断 タイプ別 向いてる仕事」KWでのインデックス → result.html経由の流入増加 → jobs.htmlへの誘導 → アフィリエイトCTR向上

---

### タスク2：faq.html OGPタグ確認・補強

**目的：** faq.htmlのSNSシェア・AI検索参照時の情報品質向上

**確認・実装内容：**
1. `<meta property="og:url">` が `https://career-dna.jp/faq.html` の正規形式になっているか確認
2. `<meta property="og:description">` に「転職・就活に関する319問のQ&A」「AI自己分析ツール FAQ」等のKWが含まれているか確認・なければ追加
3. `<meta name="twitter:description">` の内容がog:descriptionと一致しているか確認
4. `<link rel="canonical" href="https://career-dna.jp/faq.html">` が正しく実装されているか確認

**注意：** FAQ問数は変更しない（STOP ORDER）。メタタグのみ修正。

---

### タスク3：sitemap.xml lastmod更新 + llms.txt 2026-07-24セクション追加

**目的：** 定期的なクローラビリティ維持

**実装内容：**
1. `sitemap.xml` の `result.html`（seo-paragraph追加ページ）のlastmodを `2026-07-24` に更新
2. `llms.txt` に `2026-07-24` セクションを追加：
   - result.html SEOパラグラフ追加（8タイプ診断結果の活用方法・AI自己分析ツールとしての説明）
   - faq.html OGP補強（SNSシェア・AI検索参照品質向上）

---

## 完了後の作業

1. BACKLOG.md の本指示書タスクを `[x]` に更新
2. `company/reports/CTO実装確認_2026-07-24.md` に確認レポートを作成
3. `company/requests/CTO_2026-07-24.md` → `company/archive/` にアーカイブ
4. git commit & push

---

## 注意事項

- UI・デザイン変更は行わない（seo-paragraphは既存ページと同様の実装で）
- FAQ問数の増加は絶対に行わない（STOP ORDER）
- MBTIキーワードを使用しない
- 収益化に直結する変更のみ実施（SEO → 流入 → アフィリエイトクリック）

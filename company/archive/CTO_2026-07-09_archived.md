# CTOへの指示書 2026-07-09

作成者：AI CEO  
作成日：2026-07-07（Issue #14「FAQの内容を変更して」緊急対応として作成）  
優先度：**最高**（オーナー直接指示 – GitHub Issue #14）

---

## 背景・目的

オーナー（たくと）から Issue #14「FAQの内容を変更して」として以下の明示的指示が出ています。

**指示内容（原文要約）：**
1. faq.html に**検索機能を実装**（項目が多くても知りたいことがすぐ見つかるように）
2. faq.html の構成を「カテゴリ名 → FAQピックアップ5問 → もっと見る → CTA」の繰り返しに変更
3. タイプページ（8枚）のFAQセクションを「ピックアップ3問 + もっと見る（FAQ遷移）」に簡略化
4. FAQは**広告の下に配置**（タイプページ）

**⚠️ STOP ORDER継続：**
- FAQ STOP ORDER（Issue #9）は引き続き有効 → **新規FAQ問を追加しない**
- 表示レイアウト・構成の変更のみ（既存問をそのまま使う）
- これはオーナーからの明示的デザイン変更指示のため実装OK（RULES.md「たくとへエスカレーション」のデザイン変更禁止ルールの上位指示として扱う）

---

## タスク1【最優先】：faq.html 検索機能実装

### 実装仕様

faq.htmlの全カテゴリ・全問の上部（ページタイトルの直下）に検索バーを追加してください。

**検索動作：**
- バニラJavaScript（外部ライブラリ・CDN不使用）
- `<input type="search">` によるリアルタイム絞り込み
- 検索対象：各FAQのquestion（summary）テキスト・answerテキスト
- 一致しない質問は非表示、一致する質問を含むカテゴリブロックのみ表示
- 検索フィールドが空→ 元の「各カテゴリ5問ピックアップ」表示に戻す

**HTMLサンプル（既存デザインに合わせること）：**
```html
<div class="faq-search-wrapper">
  <input type="search" id="faqSearch" placeholder="FAQを検索（例：転職エージェント、自己分析）" autocomplete="off">
  <span class="faq-search-count" id="faqSearchCount"></span>
</div>
```

検索結果0件時：「該当するFAQが見つかりませんでした」と表示する。

---

## タスク2【最優先】：faq.html レイアウト変更

### 変更後の構成（カテゴリ単位）

```
[カテゴリ名ヘッダー]
  │
  ├── FAQ問1（details/summary 展開式）
  ├── FAQ問2
  ├── FAQ問3
  ├── FAQ問4
  ├── FAQ問5
  │
  ├── [もっと見る（+XX問）] ボタン
  │     └── クリックで残り全問を展開（2回目クリックで閉じる）
  │
  └── [CTAボタン] → /jobs.html または /index.html
```

### 実装方針

- 各カテゴリで先頭5問は常時表示
- 6問目以降は `class="faq-hidden-items"` で `display:none` → 「もっと見る」ボタンで `display:block`
- 「もっと見る」ボタンの文言：`もっと見る（+XX問）` ← XX は残り問数
- 折りたたんだ状態に戻すボタンは「閉じる」
- CTA文言・リンク先はカテゴリの内容に応じて選択：
  - 転職者向け（転職全般・エージェント・面接等）→ `/jobs.html`「タイプ別おすすめ転職エージェントを見る →」
  - 就活・診断系 → `/index.html`「AI適職診断を無料で受ける（登録不要）→」
- 外部CSS・CDN・外部フォント不使用、既存デザイントークン踏襲

---

## タスク3：タイプページ8枚 FAQセクション簡略化 + 広告の下に移動

### 対象ファイル（全8枚）

- type-craftsman.html
- type-strategist.html
- type-mediator.html
- type-challenger.html
- type-analyst.html
- type-creator.html
- type-guardian.html
- type-nurturer.html

### 変更内容

**① FAQセクションを3問表示に変更**

各タイプページのFAQセクションを以下に簡略化：
- 現在の全問表示 → **先頭3問のみ**表示
- 4問目以降は削除ではなく非表示（または削除してfaq.htmlで一元管理）

**② 「もっと見る」リンクを追加**

```html
<div class="faq-more-link-wrapper">
  <a href="/faq.html" class="faq-more-link">もっと見る（全FAQへ）→</a>
</div>
```

**③ FAQセクションを広告の下に移動**

各タイプページの構成を確認し、アフィリエイト広告（転職エージェントカード・ビズリーチ等）の表示ブロックの**直後**にFAQセクションを移動してください。

**注意：FAQ問の内容（テキスト）は変更しない。先頭3問の選定は既存順序のまま。**

---

## タスク4：sitemap.xml 更新

以下のページの `<lastmod>` を `2026-07-09` に更新：

- faq.html
- type-craftsman.html
- type-strategist.html
- type-mediator.html
- type-challenger.html
- type-analyst.html
- type-creator.html
- type-guardian.html
- type-nurturer.html

---

## 実装完了後の確認事項

- [ ] faq.html 検索バーが表示・動作する
- [ ] 検索で絞り込みが正常に動く（空欄でリセット含む）
- [ ] 各カテゴリ：5問表示 + もっと見る + CTAが配置されている
- [ ] 全8タイプページ：3問 + もっと見る（faq.html遷移）に変更されている
- [ ] タイプページのFAQが広告ブロックの下に移動している
- [ ] CDN・外部ライブラリを使用していない
- [ ] 新規FAQ問を追加していない（STOP ORDER遵守）
- [ ] sitemap.xml の lastmod が更新されている
- [ ] BACKLOGの該当タスクを [x] に更新

---

## 備考

- Issue #14（FAQの内容を変更して）はオーナーからの明示的デザイン変更指示のため実装OK
- Issue #9（FAQカテゴリ整理）と合わせて対応済みとなる
- faq.htmlの検索機能はSEO・UX両面で重要。長期的に滞在時間向上とCVR改善に貢献する
- 実装後、Search Consoleでfaq.htmlのURL検査 & クロール申請をたくとに依頼すること

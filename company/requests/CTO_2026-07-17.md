# CTOへの指示書 2026-07-17（金）

作成者：AI CEO  
作成日：2026-07-16  
優先度：高

---

## 前提確認

### ⛔ FAQ STOP ORDER 継続中（Issue #9）

- faq.html・全タイプページへの**FAQ新規追加は禁止**
- 解除条件：たくとから「FAQ追加してよい」と明示されるまで

---

## タスク1（最優先）：全8タイプページから jobs.html への内部リンク強化

### 背景

競合調査（2026-07-16）の結果、「転職AI」など新競合が「求人閲覧＋診断」を一体化しており、キャリアDNAは診断体験→求人閲覧への動線が弱い。type-*.html のアフィリエイトカードにjobs.htmlへの誘導テキストリンクを追加し、内部リンクを強化することで以下の効果を狙う：
- jobs.html のSEOページランク強化（被リンク効果）
- 診断後の転職エージェント閲覧への自然な誘導強化（CVR向上）

### 指示

全8タイプページ（type-craftsman.html, type-strategist.html, type-mediator.html, type-challenger.html, type-analyst.html, type-creator.html, type-guardian.html, type-nurturer.html）の**アフィリエイトカードセクションの直後**に、以下のテキストリンクを追加する。

デザイン変更は不要。既存のカードデザインは変えない。テキストリンク（`<a>`タグ）のみ追加。

```html
<p class="jobs-link-cta">
  <a href="/jobs.html">このタイプにおすすめの転職エージェント一覧を見る →</a>
</p>
```

各タイプページで「このタイプに」の部分を以下のように変更すること：

| ファイル | アンカーテキスト |
|---------|----------------|
| type-craftsman.html | 職人タイプにおすすめの転職エージェント一覧を見る → |
| type-strategist.html | 戦略家タイプにおすすめの転職エージェント一覧を見る → |
| type-mediator.html | 調整役タイプにおすすめの転職エージェント一覧を見る → |
| type-challenger.html | 挑戦者タイプにおすすめの転職エージェント一覧を見る → |
| type-analyst.html | 分析者タイプにおすすめの転職エージェント一覧を見る → |
| type-creator.html | 表現者タイプにおすすめの転職エージェント一覧を見る → |
| type-guardian.html | 守護者タイプにおすすめの転職エージェント一覧を見る → |
| type-nurturer.html | 育成者タイプにおすすめの転職エージェント一覧を見る → |

### 成果物

- 全8タイプページの更新完了
- git commit / push

---

## タスク2：index.html の meta description 更新（新競合「転職AI」対策）

### 背景

競合調査で「転職AI（tensyokuai.co.jp）」が「AI転職相談 無料」「転職AI 無料」という新興KWで参入しているを確認。キャリアDNAのindex.html meta descriptionにこれらのKWを自然に盛り込み、同一KWで上位表示を狙う。

### 指示

`index.html` の `<meta name="description">` と `<meta property="og:description">` を以下のように更新する。

現在の文言（推定）：
```
AIが25問の質問を解析し、あなたに向いている仕事・転職タイプを診断。登録不要・完全無料・約5分。
```

更新後の文言（120〜160字に収める）：
```
AIが25問を解析して転職タイプ・向いてる仕事を診断する無料AIキャリア診断。登録不要・約5分・スマホ完結。AI転職相談ではなく「診断×8タイプ×即結果」で自己分析を深める新しいかたちのキャリアDNA。
```

**注意：** MBTIキーワード（MBTI・ENFJ等）は絶対に使用しない

### 成果物

- index.html の meta description / og:description 更新
- git commit / push

---

## タスク3：CTO_2026-07-09.md 実装状況の最終確認レポート作成

### 背景

Issue #9（FAQカテゴリ整理）・Issue #14（FAQ構成変更・検索機能追加・広告下にFAQ移動）への対応としてCTO_2026-07-09.mdを実装済みとBACKLOGに記録されているが、実装内容の最終確認レポートが未作成。

### 指示

実際にfaq.html と type-*.html を開いて以下の項目を確認し、`company/reports/CTO実装確認_2026-07-17.md` に結果を記録する。

| 確認項目 | 期待する状態 | 実際の状態 | 対応 |
|---------|------------|----------|------|
| faq.html 検索機能 | キーワード検索UIが動作する | ？ | 未実装なら即実装 |
| faq.html カテゴリ構成 | カテゴリ別「5問ピックアップ＋もっと見る」構造 | ？ | 未実装なら即実装 |
| faq.html カテゴリ別CTA | 各カテゴリの下にCTAボタン配置 | ？ | 未実装なら即実装 |
| type-*.html FAQの位置 | アフィリエイトカード（広告）の**下**にFAQが配置 | ？ | 未対応なら即修正 |
| type-*.html FAQピックアップ3問 | 「3問ピックアップ＋もっと見る（FAQ遷移）」が表示 | ？ | 未実装なら実装 |

未実装箇所が見つかった場合は、**このセッション中に実装する**。  
実装後は git commit / push する。

---

## 注意事項

- ⛔ FAQ問数は増やさない（FAQ STOP ORDER 継続中）
- MBTIキーワード（MBTI・ENFJ等）は使用しない
- UI・デザインの大幅変更は行わない（内部リンク追加・テキスト変更の範囲内）
- すべて日本語で記述
- 各タスク完了後に BACKLOG の該当タスクを `[x]` に更新
- git push は実装完了後に実行

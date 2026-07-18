# CTO指示書 2026-07-23

作成者：AI CEO  
作成日：2026-07-18  
対象：AI CTO

---

## ⚠️ 前提確認（作業前に必ずチェック）

- **FAQ STOP ORDER継続中**：faq.html（319問）・全タイプページへのFAQ追加は一切禁止
- **UI・デザイン変更禁止**：見た目・遷移・レイアウト変更は行わない
- **Google Search Console クロール申請**（たくと担当）：BreadcrumbList JSON-LD・SoftwareApplication JSON-LD 追加済みページを申請してもらうようエスカレーション記録

---

## 本日のタスク（優先順）

### タスク1：全12ページ `<link rel="canonical">` タグ追加（SEO基礎要件）

**対象ページ：**
- `public/index.html`
- `public/faq.html`
- `public/jobs.html`
- `public/result.html`
- `public/type-strategist.html`
- `public/type-analyst.html`
- `public/type-craftsman.html`
- `public/type-mediator.html`
- `public/type-challenger.html`
- `public/type-creator.html`
- `public/type-guardian.html`
- `public/type-nurturer.html`

**実装方法：** 各ページの `<head>` 内（`<title>` タグの直後推奨）に以下を追加：
```html
<link rel="canonical" href="https://career-dna.jp/[ページパス]">
```

各ページのURL：
- index.html → `https://career-dna.jp/`
- faq.html → `https://career-dna.jp/faq.html`
- jobs.html → `https://career-dna.jp/jobs.html`
- result.html → `https://career-dna.jp/result.html`
- type-strategist.html → `https://career-dna.jp/type-strategist.html`
- type-analyst.html → `https://career-dna.jp/type-analyst.html`
- type-craftsman.html → `https://career-dna.jp/type-craftsman.html`
- type-mediator.html → `https://career-dna.jp/type-mediator.html`
- type-challenger.html → `https://career-dna.jp/type-challenger.html`
- type-creator.html → `https://career-dna.jp/type-creator.html`
- type-guardian.html → `https://career-dna.jp/type-guardian.html`
- type-nurturer.html → `https://career-dna.jp/type-nurturer.html`

**すでに canonical が実装済みのページがある場合** は内容を確認して正しいURLになっているか検証すること。

**期待効果：** 重複コンテンツ問題の防止・クローラビリティ向上・SEOランキング安定化

---

### タスク2：全8タイプページ seo-paragraph に差別化KW補強

**目的：** index.html で追加済みの「スマホアプリ不要・ブラウザ完結」差別化KWをタイプページにも展開し、AI診断ツール検索での差別化を強化する。

**対象：** 全8タイプページの `.seo-paragraph` セクション（または同等のSEO非表示テキストエリア）

**追加する1文の例（タイプに合わせて自然に調整）：**
```
キャリアDNAは登録不要・スマホアプリ不要でブラウザのみで診断が完結するAIキャリア診断ツールです。
```

**注意事項：**
- 既存テキストを上書きしないこと（末尾に追加）
- 各タイプページで文意が自然になるよう1文を調整してよい（「[タイプ名]タイプの方は」など書き出しを変えてもよい）
- UIや見た目の変更は行わない（seo-paragraphは検索エンジン向けの非表示/薄色テキスト）

---

### タスク3：sitemap.xml lastmod更新 + llms.txt 2026-07-23 セクション追加

**sitemap.xml 更新対象ページ（lastmod → 2026-07-23）：**
- タスク1でcanonical追加した全12ページ（変更あり）
- タスク2でseo-paragraph更新した全8タイプページ

**llms.txt 追加内容（2026年7月23日セクション）：**
```
## 2026年7月23日の主な更新
- 全12ページ <link rel="canonical"> タグ追加（canonical URL統一・SEO基礎要件）
- 全8タイプページ seo-paragraph に「スマホアプリ不要・ブラウザ完結」差別化KW追加
- sitemap.xml lastmod 2026-07-23 更新
```

---

## 完了後の作業

1. BACKLOG.md の本指示書タスクを `[x]` に更新
2. `company/requests/CTO_2026-07-23.md` → `company/archive/` にアーカイブ
3. git commit（"CTO定例 canonical tags + SEO差別化KW補強 2026-07-23"）& push
4. handoff.md に完了記録を追加

---

## エスカレーション（たくとへ報告）

- **Google Search Console クロール申請**：今回変更した全12ページのURL申請をお願いします（特にcanonical追加・seo-paragraph追加ページ）
- **FAQ STOP ORDER（Issue #9）**：解除していただいた場合、CTO_2026-07-10〜07-13.md のFAQ追加タスク群が即実行可能です

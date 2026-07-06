# CTOへの指示書 2026-07-26

作成者：AI CEO
作成日：2026-07-06
優先度：高

---

## ⛔ FAQ STOP ORDER 継続中

Issue #9「FAQは指示するまで絶対増やさないで」（たくと）

- faq.html への新規FAQ追加：禁止
- 全タイプページへの新規FAQ追加：禁止

本指示書は **FAQ以外のSEO・技術施策** のみを対象とする。

---

## 背景・目的

2026-07-05〜07-06のCTO作業（BreadcrumbList JSON-LD全ページ追加・title/meta SEO最適化・秋採用SEOパラグラフ追加）の仕上げ確認を行う。特に canonical URL の設定漏れと Article JSON-LD の dateModified 更新を重点的に確認する。

---

## タスク1：canonical URL 全ページ確認・未設定ページへの追加

**目的：** canonical URL が設定されていないページは、Googleが重複コンテンツとして扱うリスクがある。全11ページの設定を確認する。

**対象ページ：**

| ページ | URL |
|-------|-----|
| index.html | https://career-dna.jp/ |
| result.html | https://career-dna.jp/result.html |
| faq.html | https://career-dna.jp/faq.html |
| jobs.html | https://career-dna.jp/jobs.html |
| types/strategist.html | https://career-dna.jp/types/strategist.html |
| types/analyst.html | https://career-dna.jp/types/analyst.html |
| types/challenger.html | https://career-dna.jp/types/challenger.html |
| types/coordinator.html | https://career-dna.jp/types/coordinator.html |
| types/craftsman.html | https://career-dna.jp/types/craftsman.html |
| types/guardian.html | https://career-dna.jp/types/guardian.html |
| types/nurturer.html | https://career-dna.jp/types/nurturer.html |
| types/creator.html | https://career-dna.jp/types/creator.html |

**実装内容：**
- 各ページの `<head>` に `<link rel="canonical" href="https://career-dna.jp/[path]">` が存在するか確認
- 存在しない場合は追加する（metaタグの直後に配置）
- `result.html` については CTO_2026-07-25.md タスク1 でも対応予定のため重複対応不要

**注意：** デザイン・表示内容は変更禁止。`<head>` 内のメタタグのみ変更。

---

## タスク2：全タイプページ Article JSON-LD の dateModified 更新

**目的：** 2026-07-05〜07-06に秋採用SEOパラグラフを追記したタイプページの Article JSON-LD `dateModified` を最新日付に更新する。

**対象：** 全8タイプページ（types/*.html）

**実装内容：**

各タイプページの Article JSON-LD 内の `dateModified` を以下に更新：

```json
"dateModified": "2026-07-06"
```

**確認方法：**
```bash
grep -n "dateModified" types/*.html
```

`datePublished` は変更せず、`dateModified` のみ `2026-07-06` に更新する。

---

## タスク3：llms.txt の秋採用コンテンツ追加セクション確認

**目的：** 2026-07-05〜06に追加した秋採用SEOコンテンツがllms.txtに反映されているか確認する。

**確認内容：**

以下の内容が `llms.txt` に記載されているか確認し、なければ追記：

```
## 2026年7月の主な更新（2026-07-06）

- index.html: 秋採用向けSEOセクション追加
- jobs.html: 秋採用特集セクション追加
- 全8タイプページ: 秋採用向けSEOパラグラフ追加・Article JSON-LD dateModified更新
- BreadcrumbList JSON-LD: 全11ページに追加完了
- title/meta description: 全主要ページSEO最適化完了
```

---

## タスク4：sitemap.xml 全ページ lastmod 最終確認

**目的：** 2026-07-05〜06の更新がsitemap.xmlに正しく反映されているか最終確認する。

**確認内容：**
- 更新を行った全ページの `<lastmod>` が `2026-07-06` になっているか確認
- `result.html` のエントリが存在するか確認（なければ追加・priority 0.8・changefreq weekly）

---

## 実行後の手順

1. BACKLOG.md の本タスクを `[x]` に更新
2. 本指示書を `company/archive/` に移動
3. git commit / push（コミットメッセージ例：`CTO 2026-07-26: canonical URL確認・Article dateModified更新・llms.txt確認・sitemap最終確認`）

---

## 注意事項

- **デザイン変更禁止**：表示コンテンツ・UIは変更しない
- **FAQ追加禁止**：Issue #9 STOP ORDER継続中
- **Git push**：承認不要で自律実行してよい

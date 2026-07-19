# CTO指示書 2026-07-28

作成者：AI CEO  
作成日：2026-07-19（第2セッション）  
実行予定：2026-07-28  
対象：AI CTO

---

## 前回完了確認（CTO_2026-07-27.md）

- jobs.html FaqPage JSON-LD → 既存実装確認済み（追加不要）✅
- 全8タイプページ 再診断CTAリンク確認 → 全ページ実装済み確認 ✅
- llms.txt 2026-07-27セクション確認済み ✅

---

## 本日のタスク

### ⚠️ 前提確認（必ず最初に実行）

- GitHub Issues確認（mcp__github__list_issues）
- FAQ STOP ORDER継続中（Issue #9）：faq.html 319問・全タイプページへのFAQ追加は引き続き禁止
- UI・デザイン変更禁止（流入データ取得前）

---

### タスク1：result.html HowTo JSON-LD追加（診断結果活用3ステップ）

**目的：** result.htmlにHowTo構造化データを追加してSERPリッチリザルト表示を狙う  
**背景：** result.htmlはユーザーが診断完了後に着地するページ。「診断結果をどう使うか」というステップをHowToスキーマで表現することで、「AI自己分析 使い方」「キャリア診断 活用方法」KWでのリッチリザルト表示が可能になる。  
**実装内容：**

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "AIキャリア診断結果の活用方法",
  "description": "キャリアDNAの診断結果（8タイプ）を転職・就活・自己分析に活かす3ステップ",
  "step": [
    {
      "@type": "HowToStep",
      "name": "ステップ1：自分のタイプを理解する",
      "text": "診断結果のタイプ名と特徴・強み・弱みを確認し、自分のキャリアDNAを把握する"
    },
    {
      "@type": "HowToStep",
      "name": "ステップ2：向いてる仕事・職種を確認する",
      "text": "タイプ別詳細ページで、自分のタイプに向いている仕事・職種・転職エージェントを確認する"
    },
    {
      "@type": "HowToStep",
      "name": "ステップ3：転職エージェントに登録する",
      "text": "タイプ別おすすめの転職エージェントに登録し、自分の強みを活かした求人を探す"
    }
  ]
}
```

**配置場所：** result.htmlの既存JSON-LDブロック群の末尾（WebPage JSON-LDの後）に追加  
**dateModified：** result.htmlのWebPage JSON-LD dateModified → 2026-07-28 に更新

---

### タスク2：index.html SEOテキスト微調整（転職AI差別化KW）

**目的：** 競合「転職AI（tensyokuai.co.jp）」が「AI求人検索×AI転職相談×適職診断」で参入している。キャリアDNAのindex.html meta descriptionに「登録不要・ブラウザ完結」の差別化KWを自然に追加する。  
**背景：** competitive-intel.md 2026-07-16 発見①参照。「転職AI 適職診断 違い 登録不要」の比較KWが出現しつつあり、早期対応が重要。  
**実装内容：**

1. index.html の `<meta name="description">` タグを確認し、以下のKWが含まれていない場合のみ追加：
   - 「スマホアプリ不要」「ブラウザ完結」「登録不要」
   - 既に含まれている場合は変更不要（スキップ可）
2. index.htmlの `seo-paragraph` セクション（`id="seo-paragraph"` または類似）に以下を確認・追加：
   - 「スマホアプリのインストール不要・ブラウザ完結」の文言が含まれているか確認
   - 含まれていなければ追記（1文程度）
   - 既に含まれている場合はスキップ

**注意：** 既存テキスト・デザインに影響しない範囲での微調整のみ

---

### タスク3：sitemap.xml + llms.txt 2026-07-28更新

**sitemap.xml：**
- result.html lastmod → `2026-07-28`（HowTo JSON-LD追加・WebPage dateModified更新のため）
- index.htmlに変更があった場合 → lastmod → `2026-07-28`
- 変更なしの場合はスキップ

**llms.txt：**
以下のセクションを末尾に追加：

```
## 2026-07-28 更新
- result.html: HowTo JSON-LD追加（診断結果活用3ステップ：タイプ理解→向いてる仕事確認→転職エージェント登録）
- index.html: meta description / seo-paragraph SEOテキスト差別化KW確認・微調整（スマホアプリ不要・ブラウザ完結）
```

---

## 完了後の作業

1. BACKLOG.md の本指示書タスクを `[x]` に更新
2. `company/reports/2026-07-28_CTO.md` に作業報告書を作成
3. `company/requests/CTO_2026-07-28.md` → `company/archive/CTO_2026-07-28_completed.md` にアーカイブ
4. `company/shared/handoff.md` に完了内容を記録
5. git commit & push

---

## 注意事項

- UI・デザイン変更は行わない
- FAQ追加は一切禁止（FAQ STOP ORDER継続中）
- MBTIキーワード使用禁止
- 変更が軽微または不要な場合は「確認済み・変更不要」として記録
- 破壊的変更（既存コード大幅削除）は禁止

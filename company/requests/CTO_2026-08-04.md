# CTO指示書 2026-08-04

作成日：2026-07-20（CEO定例 第2セッション 前倒し作成）  
実行予定日：2026-08-04  
作成者：AI CEO

---

## 今日のタスク（優先順）

### タスク1：privacy.html WebPage JSON-LD追加（E-E-A-T強化）

`privacy.html` に WebPage 型の JSON-LD を追加する。
プライバシーポリシーページに構造化データを付与することで、GoogleのE-E-A-T（信頼性）シグナルを強化する。

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "プライバシーポリシー | キャリアDNA",
  "url": "https://career-dna.jp/privacy.html",
  "description": "AIキャリア診断ツール「キャリアDNA」のプライバシーポリシーです。個人情報の取り扱いについて説明しています。",
  "isPartOf": {
    "@type": "WebSite",
    "name": "キャリアDNA",
    "url": "https://career-dna.jp/"
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://career-dna.jp/" },
      { "@type": "ListItem", "position": 2, "name": "プライバシーポリシー", "item": "https://career-dna.jp/privacy.html" }
    ]
  }
}
</script>
```

※BreadcrumbListが既存で別スクリプトタグとして存在する場合、WebPageのbreadcrumbプロパティに内包するか、別スクリプトとして追加するか、重複しない方法を選ぶこと。

---

### タスク2：disclaimer.html WebPage JSON-LD追加（E-E-A-T強化）

`disclaimer.html` に WebPage 型の JSON-LD を追加する。
免責事項ページに構造化データを付与することで、サイトの信頼性・透明性シグナルをさらに強化する。

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "免責事項 | キャリアDNA",
  "url": "https://career-dna.jp/disclaimer.html",
  "description": "AIキャリア診断ツール「キャリアDNA」の免責事項です。診断結果の利用に関する注意事項を説明しています。",
  "isPartOf": {
    "@type": "WebSite",
    "name": "キャリアDNA",
    "url": "https://career-dna.jp/"
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://career-dna.jp/" },
      { "@type": "ListItem", "position": 2, "name": "免責事項", "item": "https://career-dna.jp/disclaimer.html" }
    ]
  }
}
</script>
```

---

### タスク3：sitemap.xml + llms.txt 2026-08-04更新

- `sitemap.xml`：privacy.html・disclaimer.html の `lastmod` を `2026-08-04` に更新
- `llms.txt`：2026-08-04 の更新セクションを追記
  - 追記内容：「privacy.html WebPage JSON-LD追加・disclaimer.html WebPage JSON-LD追加（E-E-A-T信頼性強化）」

---

## 背景・理由

- E-E-A-T強化キャンペーン（CTO_2026-08-01〜03で about.html/contact.html/result.html を整備済み）の継続
- privacy.html・disclaimer.html は法的情報ページとして「信頼性（Trustworthiness）」の核心。JSON-LDで構造化することでGoogleの信頼性評価を後押しする
- キャリア協会への掲載申請（たくと担当）に備え、全ページの構造化データ整備を完成させることが目的
- 作業コスト：小（JSON-LD 2ブロック追加 + sitemap/llms.txt更新）

---

## 期待する成果物

- `privacy.html`：WebPage JSON-LD 追加済み（BreadcrumbListと重複なし）
- `disclaimer.html`：WebPage JSON-LD 追加済み（BreadcrumbListと重複なし）
- `sitemap.xml`：privacy.html・disclaimer.html の lastmod `2026-08-04` 更新済み
- `llms.txt`：2026-08-04 セクション追加済み

---

## 注意事項

- UI・デザインの変更は行わない（JSON-LDはHTMLのheadタグ内に追加するのみ）
- デザインに関わる変更が必要と判断した場合は、**提案書を作成してたくとに確認を求めること**
- FAQ追加は引き続き STOP ORDER 中（たくとの明示的許可があるまで厳禁）
- MBTI・16Personalities 関連のキーワードはサイト内に実装しない

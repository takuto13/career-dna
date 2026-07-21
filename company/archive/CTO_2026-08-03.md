# CTO指示書 2026-08-03

作成日：2026-07-20（CEO定例 前倒し作成）  
実行予定日：2026-08-03  
作成者：AI CEO

---

## 今日のタスク（優先順）

### タスク1：contact.html ContactPage JSON-LD追加（E-E-A-T強化）

`contact.html` に ContactPage 型の JSON-LD を追加する。
お問い合わせページに構造化データを付与することで、Googleのクロールボット・AIクローラーへのシグナルを強化し、サイトのE-E-A-T（専門性・権威性・信頼性）向上に貢献する。

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "お問い合わせ | キャリアDNA",
  "url": "https://career-dna.jp/contact.html",
  "description": "AIキャリア診断ツール「キャリアDNA」へのお問い合わせページです。",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://career-dna.jp/" },
      { "@type": "ListItem", "position": 2, "name": "お問い合わせ", "item": "https://career-dna.jp/contact.html" }
    ]
  }
}
</script>
```

※BreadcrumbListは既存実装済みのため、ContactPage型のみ追加する形でもよい（重複しないよう確認すること）。

---

### タスク2：about.html AboutPage JSON-LD追加・確認（E-E-A-T強化）

`about.html` に AboutPage 型の JSON-LD を追加する（Organization + BreadcrumbListは実装済みのため確認のみ）。
AboutPage として明示することでサイトの信頼性シグナルをさらに強化する。

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "キャリアDNAについて | AIキャリア診断ツール",
  "url": "https://career-dna.jp/about.html",
  "description": "AIキャリア診断ツール「キャリアDNA」の概要・運営方針・プライバシー情報です。",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://career-dna.jp/" },
      { "@type": "ListItem", "position": 2, "name": "キャリアDNAについて", "item": "https://career-dna.jp/about.html" }
    ]
  }
}
</script>
```

※BreadcrumbListが既存で別スクリプトタグとして存在する場合、AboutPage JSONに内包するか、別スクリプトとして追加するか、重複しない方法を選ぶこと。

---

### タスク3：sitemap.xml + llms.txt 2026-08-03更新

- `sitemap.xml`：contact.html・about.html の `lastmod` を `2026-08-03` に更新
- `llms.txt`：2026-08-03 の更新セクションを追記
  - 追記内容：「contact.html ContactPage JSON-LD追加・about.html AboutPage JSON-LD追加（E-E-A-T強化）」

---

## 背景・理由

- Google の E-E-A-T（Experience, Expertise, Authoritativeness, Trustworthiness）シグナルにおいて、ContactPage・AboutPage の JSON-LD は「信頼性」の強化に直接寄与する
- キャリア協会への掲載申請（たくと担当）に備え、ドメイン信頼性の地盤を整備することが目的
- 作業コスト：小（JSON-LD 2ブロック追加 + sitemap/llms.txt更新）

---

## 期待する成果物

- `contact.html`：ContactPage JSON-LD 追加済み
- `about.html`：AboutPage JSON-LD 追加済み（Organization/BreadcrumbListとの重複なし）
- `sitemap.xml`：contact.html・about.html の lastmod 更新済み
- `llms.txt`：2026-08-03 セクション追加済み

---

## 注意事項

- UI・デザインの変更は行わない（JSON-LDはHTMLのheadタグ内に追加するのみ）
- デザインに関わる変更が必要と判断した場合は、**提案書を作成してたくとに確認を求めること**
- FAQ追加は引き続き STOP ORDER 中（たくとの明示的許可があるまで厳禁）
- MBTI・16Personalities 関連のキーワードはサイト内に実装しない

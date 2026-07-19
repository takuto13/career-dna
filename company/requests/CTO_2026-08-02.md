# CTOへの指示書 2026-08-02

作成日：2026-07-19（CEO定例 第7セッション）  
実行予定日：2026-08-02  
作成者：AI CEO

---

## 前提確認（必ず最初に実行）

- GitHub Issues確認（mcp__github__list_issues）
- **FAQ追加は禁止**（Issue #9 FAQ STOP ORDER継続中・faq.html 319問固定）
- **MBTIキーワード不使用**
- UI・デザイン変更禁止（流入データ取得前）

**⛔ FAQ STOP ORDER継続中：** faq.htmlおよび全タイプページへのFAQ追加は一切禁止

---

## 本日のタスク

### タスク1：about.html Organization JSON-LD確認・追加（E-E-A-T強化）

**背景：**  
about.html には2026-07-31にtwitter card、2026-08-01にBreadcrumbList JSON-LDを追加済み。E-E-A-Tをさらに強化するため、Organization JSON-LDの存在を確認し、存在しない場合は追加する。

**確認事項：**
- about.html の `<head>` 内に Organization または LocalBusiness の JSON-LDが存在するか確認
- Person JSON-LD（運営者情報）の存在も確認

**Organization JSON-LDが存在しない場合の実装内容：**

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "キャリアDNA",
  "url": "https://career-dna.jp/",
  "description": "AIキャリア診断ツール「キャリアDNA」の運営組織。25問・8タイプ・登録不要の無料AI診断を提供。",
  "foundingDate": "2026",
  "areaServed": "JP",
  "serviceType": "キャリア診断・転職支援コンテンツ"
}
```

**WebPage JSON-LD の dateModified を 2026-08-02 に更新（存在する場合）**

**期待成果：**  
- Googleの E-E-A-T（専門性・権威性・信頼性）評価向上
- about.htmlのリッチスニペット表示の可能性向上

---

### タスク2：result.html BreadcrumbList JSON-LD確認・追加

**背景：**  
result.htmlはHowTo JSON-LD・WebPage JSON-LDの実装が完了しているが、BreadcrumbListについては未確認。全ページのBreadcrumbList統一方針に従い確認・追加する。

**確認事項：**
- result.html の `<head>` 内に BreadcrumbList JSON-LDが存在するか確認

**BreadcrumbList JSON-LDが存在しない場合の実装内容：**

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://career-dna.jp/" },
    { "@type": "ListItem", "position": 2, "name": "診断結果", "item": "https://career-dna.jp/result.html" }
  ]
}
```

**WebPage JSON-LD の dateModified を 2026-08-02 に更新**

**期待成果：**  
- result.html のSERP表示にパンくずリストが追加される

---

### タスク3：sitemap.xml + llms.txt 2026-08-02更新

**実施内容：**
1. sitemap.xml：変更があったページ（about.html・result.html）の `<lastmod>` を `2026-08-02` に更新
2. llms.txt に `## 2026-08-02 更新` セクションを追加：
   - about.html Organization JSON-LD追加（E-E-A-T強化）
   - result.html BreadcrumbList JSON-LD追加（パンくず統一）

---

## 実装優先順位

1. **タスク1（about.html）**：E-E-A-T強化（SEO信頼性向上）
2. **タスク2（result.html）**：BreadcrumbList統一（リッチスニペット対応）
3. **タスク3（sitemap/llms.txt）**：変更記録

---

## 注意事項

- **FAQ追加・デザイン変更・UI変更は禁止**
- JSON-LDのみの変更（コンテンツ・レイアウトには一切触れない）
- 既に実装済みの場合はタスクをスキップ・確認済みとして報告すること

---

## 完了後の作業

1. BACKLOG.md の本指示書タスクを `[x]` に更新
2. `company/archive/CTO_2026-08-02_completed.md` にアーカイブ
3. git commit & push
4. handoff.md に完了記録を追加

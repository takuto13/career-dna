# CTO指示書 2026-07-29

作成者：AI CEO  
作成日：2026-07-19（定例スケジュール実行・第4セッション）  
実行予定：2026-07-29  
対象：AI CTO

---

## 前提確認（必ず最初に実行）

- GitHub Issues確認（mcp__github__list_issues）
- **FAQ追加は禁止**（Issue #9 FAQ STOP ORDER継続中・faq.html 319問固定）
- **MBTIキーワード不使用**
- UI・デザイン変更禁止（流入データ取得前）

**⛔ FAQ STOP ORDER継続中：** faq.htmlおよび全タイプページへのFAQ追加は一切禁止

---

## 本日のタスク

### タスク1：jobs.html OGP twitter card補強

**目的：** jobs.html（タイプ別転職エージェント比較ページ）にOGP twitter cardメタタグを追加・補強し、X（Twitter）でのリンクシェア時の表示を改善する。  
**背景：** result.html（CTO_2026-07-24.md）でtwitter:title/descriptionを追加済み。jobs.htmlも同様の対応で一貫性を確保する。

**実装内容：**
- `<meta name="twitter:card" content="summary_large_image">` の確認・追加
- `<meta name="twitter:title" content="タイプ別おすすめ転職エージェント比較 | キャリアDNA">` 確認・追加
- `<meta name="twitter:description" content="8タイプ診断結果に合わせたおすすめ転職エージェントを比較。登録不要・5分で診断・タイプ別に転職成功率の高いエージェントを紹介します。">` 確認・追加
- `<meta property="og:title">` / `<meta property="og:description">` の内容も合わせて確認・最適化

**期待成果：** jobs.htmlのSNSシェア時に画像付き大きいカードで表示 → クリック率向上

---

### タスク2：全8タイプページ og:description確認・「スマホアプリ不要」差別化KW追加

**目的：** 全8タイプページのog:descriptionに競合差別化キーワードを確認・追加し、SNSシェア時の訴求力を高める。  
**背景：** index.htmlは「スマホアプリ不要・ブラウザ完結」KWを実装済み（CTO_2026-07-28.md）。タイプページも同様の一貫した差別化メッセージを持つ。

**実装内容：**
各タイプページの `<meta property="og:description">` に「登録不要・5分・スマホアプリ不要」等の差別化KWが含まれているか確認し、未設定または不足の場合は追加。

- type-strategist.html（戦略家タイプ）
- type-analyst.html（分析者タイプ）
- type-craftsman.html（職人タイプ）
- type-mediator.html（調整役タイプ）
- type-challenger.html（挑戦者タイプ）
- type-creator.html（表現者タイプ）
- type-guardian.html（守護者タイプ）
- type-nurturer.html（育成者タイプ）

**参考：** 既存og:descriptionに「登録不要」「スマホ完結」が含まれていれば問題なし（スキップOK）。含まれていない場合のみ末尾に追加。

---

### タスク3：sitemap.xml + llms.txt 2026-07-29更新

**目的：** 本日の変更を反映したsitemap.xmlとllms.txtを更新する。

**実装内容：**
1. sitemap.xml：jobs.html（タスク1変更対象）+ 全8タイプページ（タスク2変更対象）の `<lastmod>` を `2026-07-29` に更新（変更があった場合のみ）
2. llms.txt：2026-07-29 セクションを追加
   - jobs.html OGP twitter card追加
   - タイプページ og:description差別化KW確認

---

## 実装優先順位

1. **タスク3（sitemap/llms.txt）**：変更なしでも更新ログとして実施
2. **タスク1（jobs.html OGP）**：最重要・収益ページのシェア訴求力向上
3. **タスク2（タイプページog:description）**：確認して未対応ページのみ修正

---

## 注意事項

- **FAQ追加・デザイン変更・UI変更は禁止**
- jobs.htmlの大幅リスト構成変更は禁止（meta/OGPのみ変更）
- 変更後はローカルで`<head>`内容を確認すること
- 実装難易度が高い・予期しないリスクがある場合はエスカレーション

---

## 完了後の作業

1. BACKLOG.md の本指示書タスクを `[x]` に更新
2. `company/reports/2026-07-29_CTO.md` に実装レポートを作成
3. `company/requests/CTO_2026-07-29.md` → `company/archive/CTO_2026-07-29_completed.md` にアーカイブ
4. git commit & push
5. handoff.md に完了記録を追加

# CTO指示書 2026-07-23（水）

作成者：AI CEO  
作成日：2026-07-21  
実行予定日：2026-07-23（月・水・金の週3稼働・水曜分）

---

## 本日の優先タスク（2〜3件に絞る）

### タスク1：全8タイプページ WebPage JSON-LD dateModified 更新（SEO freshness維持）

**背景：**
- 全8タイプページのWebPage JSON-LDのdateModifiedを最新日付に更新することで、Googleのfreshness評価を維持する
- 秋採用シーズン（8〜9月）に向けてコンテンツが最新であることをクローラーに示す

**作業内容：**
- 全8タイプページ（type-strategist.html / type-analyst.html / type-craftsman.html / type-coordinator.html / type-challenger.html / type-creator.html / type-guardian.html / type-mentor.html）の WebPage JSON-LD 内 `"dateModified"` を `"2026-07-23"` に更新
- sitemap.xml 内の全8タイプページの `<lastmod>` を `2026-07-23` に更新
- llms.txt に 2026-07-23 セクション追加（「全8タイプページ WebPage dateModified更新・秋採用シーズン向けfreshness維持」）

**成果物：**
- 全8タイプページ HTML更新
- sitemap.xml 更新
- llms.txt 更新

---

### タスク2：index.html SoftwareApplication JSON-LD の operatingSystem / applicationCategory 確認・強化

**背景：**
- 競合「転職AI」「ASSIGN」などがAI診断ツールとしてStructured Dataを強化中
- キャリアDNAのindex.html SoftwareApplication JSON-LDにoperatingSystem・applicationCategoryを明示することでAI診断ツールとしての検索認識を強化

**作業内容：**
- index.html の SoftwareApplication JSON-LD を確認
- `"operatingSystem": "Web"` `"applicationCategory": "BusinessApplication"` が未設定の場合は追加
- `"dateModified": "2026-07-23"` に更新
- sitemap.xml の index.html lastmod を `2026-07-23` に更新（既に2026-08-06より新しい日付がある場合はスキップ）

**成果物：**
- index.html JSON-LD更新（確認のみの場合は確認結果をBACKLOGに記録）
- 必要な場合のみ sitemap.xml 更新

---

## 注意事項

- **FAQ STOP ORDER継続中**：faq.html の319問は変更しないこと（Issue #9 解除待ち）
- **デザイン・UI変更禁止**：見た目・遷移・レイアウト変更は実施しないこと
- 完了後は BACKLOG の本タスクを `[x]` に更新すること
- git commit & push まで実施すること

---

## 参考情報

- 次回競合調査：**2026-07-23 必須実施**（前回2026-07-16から7日・CEO定例で実施）
- SNSカバレッジ（現状）：日次〜2027-03-07 / 2030バッチ〜2030/09/24
- エスカレーション継続：キャリア協会掲載申請・Issue #16 X自動投稿API申請

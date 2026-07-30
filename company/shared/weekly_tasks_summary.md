# 週次業務サマリー（Issue #18 対応）

> たくとが「毎週どんな業務をしているか分かるように」と依頼（Issue #18 / 2026-07-21）したため作成。
> AI CEO / CTO / SNS担当の定例業務を箇条書きでまとめています。

最終更新：2026-07-30  
更新者：AI CEO

---

## 稼働スケジュール

| エージェント | 稼働日 | 頻度 |
|------------|--------|------|
| CEO | 月・水・金 | 週3回 |
| CTO | 指示書に基づき実行（週2〜3回が目安） | 週3回前後 |
| SNS担当 | 指示書に基づき実行（週1〜2回が目安） | 週1〜2回 |

---

## CEO の週次業務（月・水・金）

### 毎回必ず行うこと

- [ ] GitHub Issue確認（`mcp__github__list_issues` でオーナー指示を確認）
- [ ] コンテキストファイル読み込み（以下を順番に読む）
  - `company/shared/handoff.md`（前回の引き継ぎ）
  - `company/agents/RULES.md`（ルール確認）
  - `company/shared/strategy.md`（方針確認）
  - `company/shared/decisions.md`（最新の意思決定）
  - `company/BACKLOG.md`（タスク確認）
  - `company/shared/competitive-intel.md`（競合状況）
- [ ] BACKLOGから今週のタスクを選定（収益直結を最優先）
- [ ] CTO指示書作成（`company/requests/CTO_YYYY-MM-DD.md`）
  - SEO freshness更新・FAQコンテンツ追加・技術SEO施策
- [ ] SNS担当指示書作成（`company/requests/SNS_YYYY-MM-DD.md`）
  - 日次原稿3本 + 2031年バッチ7本
- [ ] BACKLOGの完了タスクを `[x]` に更新
- [ ] CEO日次報告書作成（`company/reports/YYYY-MM-DD_CEO.md`）
- [ ] handoff.md 更新（引き継ぎ事項を記録）
- [ ] git add / commit / push

### 7日ごとに行うこと

- [ ] 競合調査（`company/shared/competitive-intel.md` を更新）
  - 新規競合サイトの確認
  - ロングテールキーワード発掘
  - 転職市場動向の確認
  - キャリア協会掲載状況の確認

---

## CTO の週次業務

### 毎回必ず行うこと（指示書に従って実行）

- [ ] GitHub Issue確認
- [ ] 指示書読み込み（`company/requests/CTO_YYYY-MM-DD.md`）
- [ ] SEO freshness更新
  - JSON-LD `dateModified` の更新（index/result/faq/タイプページ/各静的ページ）
  - `sitemap.xml` の `lastmod` 更新
  - `llms.txt` にセクション追加
- [ ] FAQコンテンツ追加（指示書にある場合）
  - `faq.html` に新規Q&A追加
- [ ] BACKLOG の該当タスクを `[x]` に更新
- [ ] git commit / push

### 実施しないこと（たくとの承認が必要）

- デザイン・レイアウト変更
- UI・遷移・CVR最適化
- 破壊的なコード削除・大幅リファクタ

---

## SNS担当 の週次業務

### 毎回必ず行うこと（指示書に従って実行）

- [ ] GitHub Issue確認
- [ ] `company/shared/sns-intel.md` 更新（Xトレンド・競合投稿調査）
- [ ] 日次投稿原稿作成（`x-posts/YYYY-MM-DD_原稿.md` に3本）
  - 07:30 / 12:00 / 21:00 の3投稿時刻で設定
  - ターゲット：転職者 or 就活生
  - 狙い：認知拡大 / 共感 / サイト誘導（診断or求人）
- [ ] 2031年バッチ原稿作成（週7本）
  - 保存先：`x-posts/YYYY-MM-DD_SNS_バッチ_原稿.md`
- [ ] BACKLOG の該当タスクを `[x]` に更新
- [ ] git commit / push

### 実施しないこと

- Xへの実際の投稿（原稿作成・保存まで。投稿はたくとが行う）

---

## ファイル格納場所 一覧（シンプル化版）

| ファイル種別 | 格納先 | 命名規則 |
|------------|--------|---------|
| CEO日次報告書 | `company/reports/` | `YYYY-MM-DD_CEO.md` |
| CTO指示書 | `company/requests/` | `CTO_YYYY-MM-DD.md` |
| SNS指示書 | `company/requests/` | `SNS_YYYY-MM-DD.md` |
| X投稿原稿（日次） | `company/x-posts/` | `YYYY-MM-DD_原稿.md` |
| X投稿原稿（バッチ） | `company/x-posts/` | `YYYY-MM-DD_SNS_バッチ_原稿.md` |
| 競合情報 | `company/shared/` | `competitive-intel.md` |
| SNSトレンド情報 | `company/shared/` | `sns-intel.md` |
| 引き継ぎ | `company/shared/` | `handoff.md` |
| アーカイブ済み指示書 | `company/archive/` | そのまま |

---

## たくとが行う作業（権限が必要なもの）

- Search Console の操作（sitemap送信・クロール申請）
- X（Twitter）への実際の投稿（原稿確認→予約設定or即時投稿）
- GitHub Issues の手動クローズ
- Vercel 環境変数の変更
- 外部サービスの契約・支払い
- X Developer Portal APIキーの登録（Issue #16対応）

---

## 現在のエスカレーション事項（たくとへ）

| 優先度 | 内容 | 対応方法 |
|--------|------|---------|
| 最高 | **キャリア協会への掲載申請** | `company/requests/sns_キャリア協会依頼文.md` 参照・問い合わせフォームから申請 |
| 最高 | **GitHub Issues 手動クローズ** | #6/#9/#12/#14/#15/#16/#17/#18 → GitHubで手動クローズをお願いします |
| 高 | **スケジュール過剰実行の確認** | Claude Code on the Webのスケジュール設定を週3回（月・水・金）に変更してください |
| 高 | **Issue #14 FAQ再設計の承認** | `company/reports/issue14_FAQ再設計提案.md` を確認・承認後CTOが実装します |
| 高 | **X自動投稿APIキーの登録** | `x_auto_post_setup_guide.md` 参照・X Developer Portalで登録 |
| 中 | **GA4アクセス確認** | `company/reports/issue15_GA4確認_2026-07-16.md` の手順を参照 |

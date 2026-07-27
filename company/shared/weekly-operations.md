# キャリアDNA 週次業務一覧（AI CEO / CTO / SNS担当）

> 更新日：2026-07-27 / 更新者：AI CEO（Issue #18 対応）
> たくとがAI運用の全体像を把握できるよう、毎週どんな業務をしているかをまとめたファイルです。

---

## 週3稼働スケジュール（月・水・金）

2026-07-21の意思決定（Issue #17対応）により、毎日→週3回（月・水・金）に変更済み。

---

### AI CEO（毎稼働日）

**所要時間目安：1セッション（トークン3割残し）**

| # | 業務 | 詳細 | 出力ファイル |
|---|------|------|------------|
| 1 | GitHub Issues確認 | ownerラベル含む全件確認 | — |
| 2 | handoff.md確認 | 前回セッションの引き継ぎ事項を確認 | — |
| 3 | 競合調査（7日ルール） | 前回から7日以上経過時のみ実施 | competitive-intel.md |
| 4 | BACKLOG確認 | 今週・来週タスクの進捗確認 | — |
| 5 | CTO指示書作成 | 次稼働日のCTO向けタスク定義（2〜3タスクに絞る） | requests/CTO_YYYY-MM-DD.md |
| 6 | SNS指示書作成 | 次稼働日のSNS担当向けタスク定義 | requests/SNS_YYYY-MM-DD.md |
| 7 | CEO報告書作成 | 本日の実行サマリー・流入施策提案 | reports/YYYY-MM-DD.md |
| 8 | BACKLOG更新 | 完了タスクを[x]に変更、次週タスクを追加 | BACKLOG.md |
| 9 | handoff.md更新 | 次回セッションへの引き継ぎ記録 | shared/handoff.md |
| 10 | requests/アーカイブ | 完了した指示書をarchive/へ移動 | archive/ |
| 11 | git commit & push | 全変更をmainへプッシュ | — |

---

### AI CTO（CEO指示書に基づき実行）

**実行タイミング：CEO定例と同じ稼働日（同一セッション内）**

| # | 業務 | 詳細 | 出力ファイル |
|---|------|------|------------|
| 1 | GitHub Issues確認 | ownerラベル含む全件確認 | — |
| 2 | 指示書の読み込み | requests/CTO_YYYY-MM-DD.md を確認 | — |
| 3 | SEO・構造化データ更新 | dateModified・OGP・meta等の最適化 | 各ページHTML |
| 4 | sitemap.xml更新 | lastmod を最新日付に更新 | sitemap.xml |
| 5 | llms.txt更新 | 実施内容を新セクションとして追加 | llms.txt |
| 6 | robots.txt等の確認 | 必要時のみ | robots.txt |
| 7 | BACKLOG更新 | 完了タスクを[x]に変更 | BACKLOG.md |
| 8 | git commit & push | 全変更をmainへプッシュ | — |

---

### SNS担当（CEO指示書に基づき実行）

**実行タイミング：CEO定例と同じ稼働日（同一セッション内）**

| # | 業務 | 詳細 | 出力ファイル |
|---|------|------|------------|
| 1 | 指示書の読み込み | requests/SNS_YYYY-MM-DD.md を確認 | — |
| 2 | X投稿原稿の作成（日次3日分） | 各日3本（計9本） | x-posts/sns_原稿_YYYY-MM-DD.md |
| 3 | X投稿原稿の作成（バッチ7本） | まとめてバッチ形式で作成 | x-posts/YYYY-MM-DD_SNS_バッチ_原稿.md |
| 4 | sns-intel.md更新 | トレンド調査・競合動向を記録 | shared/sns-intel.md |
| 5 | BACKLOG更新 | 完了タスクを[x]に変更・SNSカバレッジ記録 | BACKLOG.md |

---

## ファイル格納先一覧（シンプル版）

| コンテンツ | 格納先 | 命名規則 |
|-----------|--------|---------|
| CEO日次報告書 | company/reports/ | YYYY-MM-DD.md（1日1本） |
| CTO指示書 | company/requests/ | CTO_YYYY-MM-DD.md |
| SNS指示書 | company/requests/ | SNS_YYYY-MM-DD.md |
| **X投稿原稿（日次）** | **company/x-posts/** | **sns_原稿_YYYY-MM-DD.md** |
| **X投稿原稿（バッチ）** | **company/x-posts/** | **YYYY-MM-DD_SNS_バッチ_原稿.md** |
| 完了したrequests/ファイル | company/archive/ | （移動後はそのまま） |
| 競合情報 | company/shared/competitive-intel.md | — |
| 戦略・方針 | company/shared/strategy.md | — |
| 意思決定ログ | company/shared/decisions.md | — |
| 引き継ぎ | company/shared/handoff.md | — |

### 重要ルール：SNS原稿の格納場所

**すべてのX投稿原稿は `company/x-posts/` に保存すること。**

- `requests/` フォルダ = CTO/SNS担当への「指示書」のみ（原稿は置かない）
- `x-posts/` フォルダ = 実際のX投稿原稿のみ（日次・バッチ問わず全部ここ）
- `archive/` フォルダ = 実行済みの指示書を移動する場所

---

## 月次・不定期業務

| 業務 | トリガー | 担当 |
|------|---------|------|
| 競合調査・competitive-intel.md更新 | 前回から7日以上経過 | AI CEO |
| BACKLOGの古いタスクをarchive/へ整理 | 月1回程度 | AI CEO |
| requests/の完了ファイルをarchive/へ移動 | 毎稼働日（セッション末尾） | AI CEO |
| たくとへの権限依頼（request_YYYY.md） | 必要時のみ | AI CEO |
| decisions.mdへの意思決定ログ追加 | 新たな方針変更時 | AI CEO |
| strategy.md更新 | 戦略転換時 | AI CEO |

---

## SNSカバレッジ現状（2026-07-27時点）

| コンテンツ種別 | カバレッジ |
|--------------|---------|
| X日次投稿 | 〜2027-05-01（土）完成 |
| 2031年バッチ | 〜2031/01/14（火）完成 |
| 次回追加予定 | 2026-09-05(金): 2027-05-02〜04 + 2031/01/15〜21 |

---

## たくとへのエスカレーション一覧（継続中）

| 優先度 | 内容 | 状況 |
|--------|------|------|
| 最高 | キャリア協会への掲載申請 | sns_キャリア協会依頼文.md 完成済み・申請待ち |
| 高 | GitHub Issues手動クローズ | MCP 403エラーのため自動クローズ不可。手動対応要 |
| 高 | X Developer Portal API登録 | 自動投稿設計完了・APIキーのみ待ち |
| 高 | Issue #14 FAQ再設計提案書の確認 | reports/issue14_FAQ再設計提案.md 完成済み・承認待ち |
| 中 | GA4アクセス確認 | reports/issue15_GA4確認_2026-07-16.md 手順参照 |

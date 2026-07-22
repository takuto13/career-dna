# CTO指示書 2026-07-25（金）

作成者：AI CEO  
作成日：2026-07-22  
実行予定日：2026-07-25（月・水・金の週3稼働・金曜分）

---

## 重要ルール確認

- **FAQ STOP ORDER継続中**：faq.html 319問固定（Issue #9 解除待ち）
- **UI・デザイン変更禁止**：流入データ取得まで見た目変更は行わない
- **自律実行可能**：下記タスクはすべて承認不要で実行してよい

---

## 本日の作業（2〜3タスク）

### タスク1：jobs.html SEOテキスト追加（転職エージェント比較・タイプ別選び方KW）

`jobs.html` に以下の内容のSEOパラグラフを追加してください。

**追加場所**：既存のseo-paragraphまたはコンテンツ下部（アフィリエイトカードの下）

**追加内容**（例文・適宜調整可）：

```
転職エージェントの選び方はタイプによって異なります。論理的に動ける「戦略家タイプ」や「分析者タイプ」には専門性の高い業界特化型エージェントが向いており、人との関係を重視する「調整役タイプ」や「育成者タイプ」はキャリアアドバイザーとの相性を重視した選び方がおすすめです。まずはAIキャリア診断で自分のタイプを確認してから、タイプ別おすすめエージェントを参考にしてください。
```

**狙いKW**：「転職エージェント 比較 タイプ別」「転職エージェント 選び方 自分に合う」「転職 タイプ別 エージェント」

---

### タスク2：index.html SoftwareApplication JSON-LDの品質向上

`index.html` の `SoftwareApplication` JSON-LDを確認・改善してください。

**確認・追加内容**：
- `applicationCategory` が単一値の場合、`["CareerDevelopment", "SelfImprovement"]` のような配列形式に更新
- `inLanguage: "ja"` が未設定の場合は追加
- `offers` > `availability` に `https://schema.org/OnlineOnly` が設定されているか確認
- `dateModified` を `"2026-07-25"` に更新

---

### タスク3：llms.txt 2026-07-25セクション追加 + sitemap.xml整合更新

**llms.txt**に以下のセクションを追加：

```
## 2026-07-25
- jobs.html: SEOテキスト「転職エージェント比較・タイプ別選び方」追加
- index.html: SoftwareApplication JSON-LD品質向上（applicationCategory配列化・inLanguage追加）
```

**sitemap.xml**：
- jobs.html の `<lastmod>` を `2026-07-25` に更新
- index.html の `<lastmod>` を `2026-07-25` に更新
- 既存の日付より新しい場合のみ更新すること（ダウングレード禁止）

---

## 完了後の処理

- BACKLOG の本タスクを `[x]` に更新
- 本指示書を `company/archive/CTO_2026-07-25_completed.md` にアーカイブ
- git commit & push
- handoff.md に完了内容を記録

---

## 参考情報

- 競合情報：company/shared/competitive-intel.md（次回2026-07-25に更新予定）
- 戦略：company/shared/strategy.md（流入増加最優先）
- エスカレーション継続：
  - Google Search Console クロール申請（jobs.html・index.html）
  - キャリア協会掲載申請（最優先被リンク施策）
  - Issue #16 X自動投稿：X Developer Portal申請待ち

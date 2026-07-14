#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
X（Twitter）自動投稿スクリプト
ステータス: 承認待ち（コメントアウト状態）

たくとの X API 申請完了後に有効化する。
設計書: company/reports/x_auto_post_design_2026-07-13.md
投稿ルール: company/shared/x-posting-rules.md
"""

import os
import re
import sys
from datetime import datetime, timezone, timedelta
from pathlib import Path

# ========================================
# 設定
# ========================================

# JSTタイムゾーン
JST = timezone(timedelta(hours=9))

# リポジトリルート（スクリプトの2階層上）
REPO_ROOT = Path(__file__).parent.parent

# 投稿ログ
LOG_FILE = REPO_ROOT / "company" / "x-posts" / "posted_log.md"
REPORT_DIR = REPO_ROOT / "company" / "x-posts"

# 投稿禁止ワードリスト（炎上リスクワード）
BANNED_WORDS = [
    # 他社名・競合他社（明示的な他社名提示を避ける）
    # 必要に応じてたくとと相談して追加
]

# AIっぽい表現リスト（検出してスキップまたは警告）
AI_LIKE_EXPRESSIONS = [
    "させていただきます",
    "ございます",
    "おります",
    "いたします",
    "承りました",
    "かしこまりました",
]

# ハッシュタグ上限
MAX_HASHTAGS = 3

# 推奨文字数上限
MAX_CHARS = 140

# 時事ネタフラグ
JIJI_FLAG = "[時事ネタ]"


# ========================================
# メイン処理
# ========================================

def get_today_jst() -> str:
    """今日の日付（JST）を YYYY-MM-DD 形式で返す"""
    return datetime.now(JST).strftime("%Y-%m-%d")


def load_posts(date: str) -> list[str]:
    """
    requests/sns_原稿_YYYY-MM-DD.md から投稿テキストを読み込む

    期待フォーマット:
    ## 投稿1（08:00予定）
    投稿テキスト

    ## 投稿2（12:00予定）
    投稿テキスト
    """
    post_file = REPO_ROOT / "requests" / f"sns_原稿_{date}.md"
    if not post_file.exists():
        print(f"原稿ファイルが見つかりません: {post_file}")
        return []

    content = post_file.read_text(encoding="utf-8")
    posts = []

    # ## 投稿N で区切る
    sections = re.split(r"^## 投稿\d+", content, flags=re.MULTILINE)
    for section in sections[1:]:  # 最初の空セクションをスキップ
        lines = section.strip().split("\n")
        # 最初の行（時刻コメント）をスキップし、テキストを抽出
        text_lines = []
        for line in lines:
            if line.startswith("（") or line.startswith("("):
                continue  # 時刻コメント行をスキップ
            text_lines.append(line)
        post_text = "\n".join(text_lines).strip()
        if post_text:
            posts.append(post_text)

    return posts


def check_post(text: str) -> tuple[bool, str]:
    """
    投稿テキストをチェックし、投稿可否と理由を返す

    Returns:
        (True, "") → 投稿OK
        (False, reason) → 投稿スキップ
    """
    # 時事ネタフラグ
    if JIJI_FLAG in text:
        return False, f"時事ネタフラグあり → 手動投稿が必要"

    # 文字数チェック
    if len(text) > MAX_CHARS:
        return False, f"文字数超過: {len(text)}文字（上限{MAX_CHARS}文字）"

    # ハッシュタグ数チェック
    hashtags = re.findall(r"#\S+", text)
    if len(hashtags) > MAX_HASHTAGS:
        return False, f"ハッシュタグ超過: {len(hashtags)}個（上限{MAX_HASHTAGS}個）"

    # 禁止ワードチェック
    for word in BANNED_WORDS:
        if word in text:
            return False, f"禁止ワード検出: {word}"

    # AIっぽい表現チェック（警告のみ・スキップはしない）
    for expr in AI_LIKE_EXPRESSIONS:
        if expr in text:
            print(f"  ⚠️ AIっぽい表現検出（警告）: 「{expr}」")

    return True, ""


def post_to_x(text: str) -> bool:
    """
    X API v2 を使って投稿する

    DISABLED: たくとの X API 申請完了後に有効化
    """
    # ==============================
    # DISABLED: 承認前は実際の投稿を行わない
    # 有効化する場合は以下のコメントを外す
    # ==============================

    # import tweepy
    # client = tweepy.Client(
    #     consumer_key=os.environ["X_API_KEY"],
    #     consumer_secret=os.environ["X_API_SECRET"],
    #     access_token=os.environ["X_ACCESS_TOKEN"],
    #     access_token_secret=os.environ["X_ACCESS_TOKEN_SECRET"],
    # )
    # response = client.create_tweet(text=text)
    # return response.data is not None

    print(f"  [DRY RUN] 投稿テキスト（文字数: {len(text)}）:")
    print(f"  {text[:100]}...")
    return False  # 承認前は常に False（投稿しない）


def update_log(date: str, results: list[dict]) -> None:
    """投稿結果をログファイルに追記する"""
    log_entry = f"\n## {date}\n"
    for i, result in enumerate(results, 1):
        status = "✅ 投稿済み" if result["posted"] else f"⏭️ スキップ（{result['reason']}）"
        log_entry += f"- 投稿{i}: {status}\n"
        if result["posted"]:
            log_entry += f"  テキスト: {result['text'][:50]}...\n"

    LOG_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(log_entry)

    # 当日報告ファイルを作成
    report_file = REPORT_DIR / f"auto_post_report_{date}.md"
    with open(report_file, "w", encoding="utf-8") as f:
        f.write(f"# X自動投稿レポート {date}\n\n")
        f.write(f"実行日時（JST）: {datetime.now(JST).strftime('%Y-%m-%d %H:%M')}\n\n")
        for i, result in enumerate(results, 1):
            status = "投稿済み" if result["posted"] else f"スキップ（{result['reason']}）"
            f.write(f"## 投稿{i}: {status}\n")
            f.write(f"```\n{result['text']}\n```\n\n")


def main():
    date = get_today_jst()
    print(f"=== X自動投稿スクリプト 実行日: {date} ===")

    # 承認前チェック
    print("\n⛔ DISABLED: このスクリプトは承認待ちのため実際の投稿を行いません。")
    print("  たくとの X API 申請完了後に有効化してください。")
    print("  設計書: company/reports/x_auto_post_design_2026-07-13.md\n")

    posts = load_posts(date)
    if not posts:
        print(f"投稿原稿が見つかりません（requests/sns_原稿_{date}.md）")
        sys.exit(0)

    print(f"原稿を読み込みました: {len(posts)}本")

    results = []
    for i, text in enumerate(posts, 1):
        print(f"\n--- 投稿{i} チェック ---")
        ok, reason = check_post(text)
        if ok:
            print(f"  チェック: ✅ 投稿OK（{len(text)}文字）")
            posted = post_to_x(text)
        else:
            print(f"  チェック: ⏭️ スキップ → {reason}")
            posted = False

        results.append({"text": text, "posted": posted, "reason": reason})

    update_log(date, results)
    posted_count = sum(1 for r in results if r["posted"])
    print(f"\n=== 完了: {posted_count}/{len(posts)}本 投稿済み ===")


if __name__ == "__main__":
    main()

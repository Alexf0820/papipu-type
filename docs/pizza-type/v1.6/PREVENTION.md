# lint / diff checkの最小予防策

今回追加するのは運用メモだけ。ルール無効化、ignore追加、依存更新、自動format、hook/CI追加はしない。

1. **QA helperもlint対象に含める。** 新規のNode helperが必要な時は既存環境に合う標準ESM importを使う。v1.5で`.cjs`→`.mjs`へ修正したhelperを正本とし、過去の失敗logの参照を消さない。今回の資料には実行scriptを追加しない。
2. **最後に保存するtracked treeで判定する。** コード/QA scriptを変えた時だけ影響するlint/tests等を更新し、lintのerrorsとwarningsを別に読む。候補`0a2d198…`は0 errors / 既存2 warnings。summaryがraw logと一致することを確認し、以前の誤記を新結果で隠さない。
3. **空白整形は新規logの保存時に限定する。** 機密・機械固有pathを確認し、必要な置換、行末空白とEOF空行の扱いを記録する。数値/時刻/警告/失敗を保持し、raw/saved SHA256を分ける。既存証拠の一括再整形はしない。
4. **diff checkは2つの境界で行う。** `git diff --cached --check`で今回の保存分、`git diff --check <直前に読取したmain SHA> <candidate SHA>`で公開候補全体を確認する。docs commit後はmain→docs HEADも確認し、docs-onlyをpath一覧で検査する。作業差分0だけでは公開候補の空白品質を証明できない。
5. **証拠を候補に固定する。** branch/SHA、入力hash、command、exit、実行日、環境、未実施を同じ記録で持つ。既存同一SHAの109 tests・Scaffold6・buildや統計を再実行と記録しない。新しい差分・失敗がなければ重い試験を重ねない。

保存前の最小ゲート：最新remoteを再読取→新しい仕事がないか確認→追加資料だけをstage→staged diff check→commit→通常push→GitHub branch SHAと保存内容の独立再読取。一致確認を報告し、公開操作は別の本人承認まで行わない。

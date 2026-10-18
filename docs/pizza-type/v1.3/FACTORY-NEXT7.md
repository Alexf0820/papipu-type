# 制作の振り返りと次7本の準備

2026-10-18。Pizzaの結果を既存5診断とScaffold0.2の運用に戻すための記録。新しい診断の制作開始・新基盤・M/W依頼は行っていない。

## 今回確認できた事実

| 工程 | 実際に行ったこと・残った証拠 |
|---|---|
| 回収と保全 | 空のScaffold0.2と既存画像を一度調べ、未確定原稿の状態を記録。PNG8枚を回収し、type対応・実形式・1254×1254・byte数・SHA256を保存。`RECOVERY-2026-10-15.md` とasset manifest |
| authoring承認 | 原稿/採点が見つからない状態に対し、本人がdot管理下で新規制作を明示承認。承認範囲をcheckpointへ保存。承認済み部分の全面作り直しはしない |
| 原稿と採点 | 一つのhandoffへ8type/trait、32問/128択、JAEN、結果a/b/c、motto/GOOD/BAD/Homeを集約。Main/Secondaryと配置を独立確認。既存5診断の本文は変更しなかった |
| 画像 | 保存済み原画像をそのまま使用。再生成・顔の描込み・加工/圧縮/差替えなし。生成prompt原本は未回収、埋込来歴の署名検証はしていない |
| 文章QA | v1.1は独立文章/構造レビューを受け49箇所の明確化を記録。v1.2は本人承認の文章調整で48個のJA/EN文字列を変更（JA21/EN27、編集操作50）。これは作業イベントの事実であり「手戻り回数」ではない |
| import | Scaffold0.2の既存importerで5ファイルへ一括反映。生成物とhandoffの一致を確認。Home・visual・routeの接続は個別レビュー |
| 統計 | 100万回＋8×50万回・parityを実測。v1.2の84 count rowsはv1.1と一致。正式閾値がなく統計総合PASSにはしなかった |
| ブラウザ | 最初はChromium download 403でSTOP。後の実行環境で既存system Chromiumが使用可能になりlocal実画面QAを実施。download拒否の再試行による解決ではない |
| Preview | team指定APIの403後は同経路を繰り返さず、後の許可されたteamなし読取で既存Git PreviewのREADY/branch/SHAを確認。実ブラウザtunnel失敗は未解決のまま記録 |
| Git保存 | 明示branchへの通常commit/push、fetch後のSHA照合でcheckpointを保存。main/Productionは触れない。原画像remote byte読戻し記録も保持 |
| v1.3監査 | 重い既存試験を無条件再実行せず、原稿/採点hash・ソース同一性を確認。不足する320px/言語切替だけ追加。親の保存証拠レビューも区別して採用 |
| v1.3 lint修復 | 保存summaryの誤りを見つけ、固定SHAのlint FAILを訂正。追加指示を受けdocs branchのQA helperだけ標準ESMへ修復し、そのhelperの画面QAを再実行。固定公開対象は維持 |

dotは承認境界、原稿/画像の保全、実装の接続、検証、Git/Preview照合、未完の報告を管理した。v1.1では明示依頼に基づく文章/構造の独立agentレビューがあり、v1.2/v1.3では親から独立確認が届いた。今回新規のM/W作業依頼はない。これを「別workerにすべて任せた」「本人が各工程を中継した」とは記録しない。

## 計測値と未計測を分ける

| 指標 | 状態 |
|---|---|
| 本人介入の総回数 | **未計測**。承認/追加指示の存在は分かるが、全会話を一貫した基準で計数していない |
| 本人のコピペ総回数 | **未計測**。Git保存成功やrelay要求の限定記録から0回とは推定しない |
| 総制作時間・実作業時間 | **未計測**。ログ日付の差や個々のtest所要時間を制作時間に置き換えない |
| 手戻り総回数 | **未計測**。48文字列/50編集操作、timeout再試行、lint訂正は記録済みだが定義した手戻り指標ではない |
| 測定済みQA | 100万＋8×50万、JAEN10,000、109tests、6scaffold、48結果fixture、16clipboard、既存10route、今回320px64問表示など。実行回と再利用を各JSONで区別 |

本人中継なしに実行できた範囲は、許可済み内容の保存、handoff import、ローカル実装/検証、通常feature/docs commit-pushとremote読戻し、許可されたdeployment読取、Git docs引継ぎ。新規authoring・文章改訂・docs helper修復はそれぞれ明示指示があって進めた。Production承認や実機確認まで自動化できたとは言わない。

## 運用で直す点

- 検証記録には対象SHAまたは入力hash、command、開始/終了、exit code、測定内容、判定、未完を一緒に残す。空ログやexit0だけからPASSを生成しない。今回のlint記録不整合を同じsummary運用で再発させない。
- QA scriptもrepo全体lintの対象。実装後の最終tracked treeでlintを読む。ES Modulesを使い、検証ファイルをignoreして隠さない。
- CPU負荷の大きいtest/build/百万runを同時に重ねない。v1.2の既存camp-gear 5秒timeoutは負荷を下げた再実行で109件成功し、テスト/timeout変更は不要だった。
- Reactのretry/back後は新しい質問の表示を待つ。モバイル試験はtouch入力を使う。初期harnessの待機/hover問題と製品不具合を混同しない。
- 原画像hash、原稿hash、採点投影hashを先に保存する。同じ入力に対する重い検証は証拠を再利用し、変更が影響する試験だけ追加する。
- log追加後にも全差分の `git diff --check` と公開repo向け内容確認を行う。直前feature基準だけでなく統合先main基準も確認する。v1.3保存時にmain基準で旧v1.1ログの空白6件を検出したため、今回docs差分PASSと候補全体FAILを分けて記録した。固定候補・docs branch・Git Preview・ProductionのSHAを一つの欄へ混ぜない。
- cancel/UNKNOWN/権限拒否は操作・対象・理由と確定状態を保存してSTOP。既知403の総当たり、Secret/認証変更、別repoへの回避はしない。新しく許可された経路が明示された時だけその範囲で進める。

## 次7本に使う標準手順

元の [新規診断workflow](../../PAPIPU_TYPE_NEW_QUIZ_WORKFLOW.md) と [共通engine仕様](../../PAPIPU_TYPE_ENGINE_SPEC.md) を正本として使う。Scaffold0.2は変更しない。Camp Gearを参照実装、Spaghettiを複数診断の接続例、Sushi・Ice Cream・Donutを含む既存5診断を文章/構造比較対象とし、Pizzaだけをテンプレートにしない。Pizzaのdot authoring例外を他テーマへ自動適用しない。

1. 本人の「次はXタイプ」で対象repo/quiz ID/制作権限/原稿責任者/画像範囲を特定。既存確定原稿と素材を一度確認し、branch/remote/dirty状態/保全checkpointを作る。新規原稿制作が承認されていれば存在しない稿の探索を繰り返さない。
2. 既存5診断の笑いの強さ、文長、BADでも傷つけない対立、英語の自然さを比較し、X固有の納得できる行動差を作る。確定文を不用意に再制作せず、採点に対応する意味をレビューする。許可のある時だけ独立文章/構造QAへ渡す。
3. `create-quiz -- <id> --dry-run` で予定を確認し、未使用IDへScaffold0.2を作る。一つのhandoffに8types/traits、32問/128択、JAEN全文、Main/Secondary、a/b/c、motto3、GOOD/BAD、visualKeyを完成させ、Homeは別途明示して保持する。
4. 原画像8枚の承認・type対応・来歴・実形式/寸法/SHA256を確認する。素材変更は別の明示権限がある場合だけ。顔は既存overlayとし、実画像と描画結果からfaceTransformを決める。存在しない画像を代用しない。
5. 構造/全文/採点/JAENを検査してから既存importerで5ファイルへ一括反映。**importにはdry-runがない**のでcreateのflagと混同しない。生成物差分を確認し、既存registry/BodyCharacterFace/QuizFlow/Home/routes/Share/TryAgainへ接続する。共通engine仕様と既存診断は保持する。
6. validate、百万runと8×50万感度、Main/Secondary/ABCD、質問偏り、JAEN parityを測定。正式基準がなければ未判定とする。問題があれば原稿責任者の承認範囲で最小修正し、影響する検証を更新。npm test、test:scaffold、lint、typegen、tsc、diff check、buildも対象入力/exitとともに保存する。
7. local実ブラウザでJAEN8問・全8結果/a/b/c/画像/顔/GOODBAD/motto/共有/retry/back/言語/長文を確認し、既存5×JAENを回帰。feature commit/push→remote再取得→既存Git Preview READY/branch/SHA照合→JAEN固定URLと証拠/未完/戻し先を本人へ一括提示する。本人の実機確認と明示公開承認を待ち、承認後だけmain/Productionと公開後確認へ進む。

各工程ではdotが原稿・素材・検証結果を直接管理し、本人への断片コピペ要求を工程として設けない。利用可能な連携で保存し、TSURUHASHIが使えなければ許可されたGit docsへ保存する。公開前判断だけを具体的な成果物にまとめる。接続拒否など実際の制約は隠さない。

次7本のテーマ・順番・期限は未指定であるため、以下は準備枠のみ。quiz ID・branch・新規ファイル・worker依頼・automationは作成していない。

| 枠 | テーマ / quiz ID | 開始条件 | 現状 |
|---|---|---|---|
| 1 | 未指定 | 本人の次テーマ指示と制作範囲 | 未着手 |
| 2 | 未指定 | 同上 | 未着手 |
| 3 | 未指定 | 同上 | 未着手 |
| 4 | 未指定 | 同上 | 未着手 |
| 5 | 未指定 | 同上 | 未着手 |
| 6 | 未指定 | 同上 | 未着手 |
| 7 | 未指定 | 同上 | 未着手 |

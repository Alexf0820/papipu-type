# Pizza Type — 公開準備と戻し方

2026-10-18時点の読み取り記録。**実行手順の準備のみ。main merge / Production deploy / promotion / rollbackを実行していない。**

## 固定レビュー対象

| 対象 | 値 |
|---|---|
| repository | `Alexf0820/papipu-type`（ID 1328708469） |
| feature | `feat/pizza-type` |
| 固定SHA | `4dfcbe0a5c4c554e6dcd2095236bc277e4252c53` |
| Git Preview | `dpl_6WgZHxZ83nNobZCqZS6pnzBg4aB5`、READY、source git、target null |
| docsのみの保存先 | `docs/pizza-v1.3-final-qa`。最終commitは引渡し報告とbranchで照合する |

固定deploymentの直リンク：

- [JA Pizza](https://papipu-type-9fhrqt976-alex-fujiokas-projects.vercel.app/ja/pizza)
- [EN Pizza](https://papipu-type-9fhrqt976-alex-fujiokas-projects.vercel.app/en/pizza)
- [JA Home](https://papipu-type-9fhrqt976-alex-fujiokas-projects.vercel.app/ja)
- [EN Home](https://papipu-type-9fhrqt976-alex-fujiokas-projects.vercel.app/en)

branch aliasは `https://papipu-type-git-feat-pizza-type-alex-fujiokas-projects.vercel.app`。将来のpushで移動するため承認時は上の固定deploymentとSHAを優先する。docsブランチの自動Git Previewは公開候補の置換ではない。

## mainとの差分

比較元mainは `6252305bceaeb1a823b91b8e58ee6f6707c9b6d7`。固定候補との差分はPizzaデータ・専用route・テスト、原画像8枚、Pizza Body/visual登録、quiz registry、Home追加、制作/QA記録、回収確認script。`src/`・`public/`・`scripts/` の変更パスは [main-diff.txt](main-diff.txt) に全件保存する。

既存5診断の本文/採点/各route、共通engineの採点・抽選・variation処理、Scaffold0.2のcreate/import/validate/verify CLIは変更していない。Home等の共通接続ファイルにはPizza追加がある。docs修正版と固定SHAのアプリ・画像・設定・依存ファイルの全byte一致は [final-summary.json](final-summary.json) で確認する。

## 未完了と公開判断

1. 固定SHAのlintは3 errorsでFAIL。docsブランチで修復したQA helperは別SHAとなる。修正を含む新候補を採用するかは本人の判断が必要で、featureを勝手に進めない。
2. 固定Previewの実ブラウザ試験は過去の `ERR_TUNNEL_CONNECTION_FAILED` により未確認。API READYを画面PASSと扱わない。既知失敗経路は再試行していない。
3. 本人の固定版JA/EN iPhone/Safari確認、native share sheetの実確認が未完了。320pxの日本語ヘッダー折返しも確認項目に含める。
4. 統計は測定済みだが正式閾値未定義のため未判定。q14b/d、q16a/c、q24a/cの意味の近さは前版から保留。今回の凍結範囲で質問や採点を変えない。
5. local Chromiumの新規EN fullPage captureに描画欠けを観測。実viewport captureでは描画を確認したが、capture差の原因は未特定。実Preview/iPhoneの確認で画面表示も確認する。
6. main→固定候補の `diff --check` は既存v1.1ログの空白6件でFAIL。docs修正版でも同じ6件が残り、今回docs追加分自体はPASS。公開候補を更新する際はこの記録整形の扱いも含める。今回の追加修正指示はQA helperに限定されているため旧ログは保持した。

本人へ渡す判断は、この証拠一式・上記未完・戻し先をまとめた一回の判断とする。**現時点では公開可能の承認を求めずSTOP。** 残件解消または明示的な扱いの決定後、公開対象のbranchと完全SHAを改めて特定し、その対象へのmain統合・Production公開を本人が明示承認する。別SHAへの自動読み替えはしない。

## 明示承認後に実施する順序

1. remoteを再取得し、承認SHA、feature、main、Productionの現在値を比較する。差分や未保存変更が増えていればその内容を保存し、承認範囲を越えて進めない。
2. 承認対象の変更を通常のレビュー/merge経路でmainへ統合する。force push、reset、無関係な履歴の巻戻しを使わない。docs修正を含める場合も事前に特定した候補だけを採用する。
3. 既存Vercel Git連携が作るProductionを確認する。Previewを手動で複製deployしたり、Previewの成功をProduction成功と読み替えたりしない。Production側のGit SHA・target・READY・公開aliasを照合する。
4. 公開URLのJA/EN Home→Pizza、8問→結果、画像/顔/GOOD/BAD/motto、Share/Try Again/Back/言語切替を確認する。既存5診断のJA/EN10routeも確認し、実機とブラウザ種別を分けて記録する。
5. 実測した公開SHA、deployment、URL、確認範囲、時刻、未完を保存する。公開後の重大不具合では次項に従い、承認済みの範囲で戻す。

## 公開前Productionとrollback候補

2026-10-18、mainのGitHub Vercel statusから得たdeploymentをteam指定なしAPIで読み取った。

| 項目 | 確認値 |
|---|---|
| Git SHA | `6252305bceaeb1a823b91b8e58ee6f6707c9b6d7` |
| Deployment | `dpl_2LvUCjnhfx39qhMXw46frLKbEzRG` |
| 状態 | READY、source git、target production |
| 固定URL | `https://papipu-type-kqfxqz9st-alex-fujiokas-projects.vercel.app` |
| 公開alias | `www.papiputype.com` / `papiputype.com` / `papipu-type.vercel.app` |

公開直前にもこの値を再確認する。これ以降に別のProductionが公開されていた場合、ここを無条件に戻し先にしない。

戻す場合は、明示承認した既存deploymentへのプラットフォームrollback、または公開mergeを打ち消す通常のrevert commit→Git Productionを用いる。いずれも実際の権限・対象deployment・公開aliasとGit履歴を照合し、実施方法を決めてから行う。rollback APIの書込権限や成功は今回試験していない。DB/Secret/DNSの変更は含まれない。

cancel / UNKNOWN / 権限拒否の場合はそこで保全STOPし、同じ経路を強行再試行しない。記録には操作・対象・拒否理由・最後の確定SHAを残す。

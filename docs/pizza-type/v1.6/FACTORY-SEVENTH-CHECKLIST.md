# 第7診断の最小factoryチェックリスト

**準備READY／制作未開始。** 今夜は新規診断・原稿・画像・Scaffoldを作らない。次の1本の制作が明示された後に使う。Scaffold0.2、共通engine、既存5診断およびPizzaの確定内容は維持する。

正本は[既存workflow](../../PAPIPU_TYPE_NEW_QUIZ_WORKFLOW.md)と[engine仕様](../../PAPIPU_TYPE_ENGINE_SPEC.md)。[v1.3振返り](https://github.com/Alexf0820/papipu-type/blob/4bc2324bae19b3a1c539ec416054cde9059a2028/docs/pizza-type/v1.3/FACTORY-SEVENTH-QUIZ.md)の運用を、次の1本に必要な順番へ整理した。Pizzaのdot authoring例外を次テーマへ自動適用しない。複雑な自動化やScaffold改修は不要。

| 完了欄 | 工程 | 受渡し・確認する最小成果 |
|---|---|---|
| □ | 1. 制作範囲を一括確定 | テーマ、未使用quiz ID、原稿責任者、JA/EN、既存素材の再利用/新規生成範囲、費用制限。remote・dirty状態を確認してfeature branchと保全checkpointを作る |
| □ | 2. 内容を1つに集約 | `content/handoff.json`へ8types/8traitsと対応、8カテゴリ×4問＝32問、JA/EN各128択、全Main/Secondary、全8結果のa/b/c・motto3・GOOD/BAD・visualKey。HomeのJA/EN文言・label・iconも別項目として明示 |
| □ | 3. 原稿・採点を照合 | 安全なID、trim後非空欄、重複/欠落なし。自然な日本語・英語、選択肢と結果の意味、GOOD/BAD対応を確認。既存5診断の文長や表現強度を比較し、承認済み文を勝手に書換えない |
| □ | 4. Scaffold0.2→import | 将来の承認済み新IDに`create-quiz -- <id> --dry-run`後、通常生成。完全handoffを既存validatorで読取検査してからimport。生成5ファイルと原稿の全文・採点・順序を照合 |
| □ | 5. 原画像8枚を生成/確認/保存 | 下記の画像手順で承認された8原本・manifestを受け渡す。未完成素材を代用品で埋めない |
| □ | 6. 最小接続 | quiz registry、visualKey、Body、visual registry、個別faceTransform、route、Homeを既存方式で接続。共通QuizFlow/CharacterFace/Share/TryAgainを再利用し、engineと既存診断を変更しない |
| □ | 7. 採点・品質検証 | validate、100万run＋8条件×50万、10k JA/EN parity、Main/Secondary/ABCD位置、a/b/c到達性を記録。tests、Scaffold6、lint、typegen→tsc、build、diff check。入力SHA/hashと結果を保存 |
| □ | 8. Git checkpoint | final tree確認→内容・画像・QAを保存→通常commit/push→GitHubで独立再読取。SHAと保存ファイルが一致しなければ次へ進めない |
| □ | 9. 固定Previewと画面QA | Git PreviewのREADY/source branch/SHA一致を確認。JA/ENの8問、全8結果×a/b/c、画像8枚/3表情、GOOD/BAD/Motto、Share/Retry/Back/言語、320px/横overflow、既存5×JA/EN。local/Hosted/Safari/native shareを別記録 |
| □ | 10. 判断を一括提示 | 固定branch/SHA、JA/EN URL、実main差分、QAと未確認、戻し先を一つのpacketにまとめる。本人のPreview確認と明示公開承認後にだけ通常main/Production手順へ進む |

通常は完全な原稿handoff 1〜2回、画像8原本のまとめた受渡し1回、Preview判断1回、公開判断1回を目標にする。これは目標であり、今回計測した介入数ではない。断片のコピペ中継を工程にしない。

## 画像8枚の再現可能な受渡し

1. 制作承認後に8type ID→visualKey→filenameを確定。利用可能な原本を先に確認し、新規生成の必要と権限がある場合だけ生成する。生成プロンプト・日付・tool・承認範囲を保存する。今夜は実行していない。
2. `papipu-type-image/<quiz-id>/reference/`と`candidates/`で比較し、選択した8原本を`handoff/`へ保存する。実装が参照する正本は`handoff/`だけ。TSURUHASHIは承認済み通常経路がある場合のみ使い、それ以外は許可済みGitHubで受け渡す。
3. 全8枚の実pixelを確認。白背景のシンプルな3D対象物、typeとの対応、顔/手足/文字なし。実形式・拡張子・寸法・bytes・SHA256、由来、承認参照をmanifestに残す。生成物の来歴が欠ければ欠けたまま明記する。
4. 承認原本を無加工で`public/characters/`へ保存し、copy前後・GitHub読戻しのSHA256一致を確認。圧縮・再生成・差替えを暗黙に行わない。
5. 実画像と描画を見てtypeごとのfaceTransformを決める。既存`smile` / `sweat-smile` / `noon`を使い、8画像それぞれで3表情の位置・切れ・重なりを確認。原画像への顔描込みはしない。

## 間違えやすい点

- `import-quiz-content`にdry-runはない。未知flagを付けても書込みを防げない。`scripts/lib/content-handoff.mjs`の`validateContentHandoff`で完全入力を先に確認する。
- importerは5ファイルを生成する。Home・registry・画像・faceTransformは自動生成対象外。handoffにHomeがあるかは実際のschemaと承認内容を確認する。
- 共通採点はMain +3 / Secondary +1。各typeのMain/Secondary件数とA/B/C/D位置を可視化する。16件なら4/4/4/4は参考だが、自然な内容を無断で変更して達成しない。
- `verify-quiz`のexit 0だけで統計PASSにしない。parityFailures、分布、max–min、tie-break、hash winners、質問差、感度を読む。正式閾値がなければ総合未判定とし、内容責任者の判断を記録する。
- 検証入力が同一なら証拠を再利用してよい。入力SHA/hash、環境、実行日、再利用/新規実行を分ける。Hosted失敗をlocal成功で埋めない。
- 403・認証拒否・tunnel失敗は対象/理由/状態を記録して停止し、独立した作業を続ける。別actor/認証/接続回避へ自動切替しない。

今回の最小改善は[PREVENTION.md](PREVENTION.md)の手順追加だけ。Scaffold・CI・基盤・新テーマの変更はない。

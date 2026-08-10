import { createCampGearQuiz, type CampGearText } from "./definition";

/** Display text only — judgement data lives in CAMP_GEAR_SCORING. */
const CAMP_GEAR_TEXT_JA: CampGearText = {
  title: "キャンプ道具タイプ診断",
  questions: {
    q1: {
      text: "キャンプ場に到着！まず何する？",
      choices: {
        a: "全体を見て、設営の段取りを考える",
        b: "とりあえず荷物を運び始める",
        c: "みんなに声をかけながら準備する",
        d: "まずチェアを出す。話はそれからだ",
      },
    },
    q2: {
      text: "テントの設営方法がよく分からない！",
      choices: {
        a: "構造を見ながら冷静に考える",
        b: "とりあえず組み立ててみる",
        c: "分かる人と一緒にやる",
        d: "一回休憩してから考える",
      },
    },
    q3: {
      text: "キャンプで一番好きな時間は？",
      choices: {
        a: "みんなで焚き火を囲んでいるとき",
        b: "ランタンを灯して夜を楽しむとき",
        c: "シュラフに入った瞬間",
        d: "朝、一人で静かに過ごす時間",
      },
    },
    q4: {
      text: "隣の人がペグ打ちに苦戦している。どうする？",
      choices: {
        a: "さりげなく手伝う",
        b: "コツを教える",
        c: "「貸して！」と代わりに打つ",
        d: "チェアから心の中で応援する",
      },
    },
    q5: {
      text: "突然の雨！どうする？",
      choices: {
        a: "みんなの荷物を濡れない場所へ移す",
        b: "状況を見て、必要なことから片付ける",
        c: "「雨キャンプもいいじゃん！」と楽しむ",
        d: "テントに入る。雨がやむまで出ない",
      },
    },
    q6: {
      text: "撤収完了！最後に何する？",
      choices: {
        a: "忘れ物がないかもう一度確認する",
        b: "「次いつ行く？」ともう次のキャンプの話",
        c: "まだ終わっていない人を手伝う",
        d: "帰ったら寝る。それしか考えられない",
      },
    },
  },
};

export const campGearQuizJa = createCampGearQuiz("ja", CAMP_GEAR_TEXT_JA);

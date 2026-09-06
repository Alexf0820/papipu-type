import { describe, expect, it } from "vitest";

import { CAMP_GEAR_QUIZ_ID } from "@/data/quizzes/camp-gear/definition";
import { SPAGHETTI_QUIZ_ID } from "@/data/quizzes/spaghetti/definition";
import { SUSHI_QUIZ_ID } from "@/data/quizzes/sushi/definition";
import { ICE_CREAM_QUIZ_ID } from "@/data/quizzes/ice-cream/definition";
import { HOME_COPY, HOME_QUIZZES, HOME_SHARE_COPY } from "@/lib/home/content";
import { getQuiz } from "@/lib/type-engine/registry";

describe("home page content", () => {
  it("lists Camp Gear, Spaghetti, Sushi, and Ice Cream with locale copy for both languages", () => {
    expect(HOME_QUIZZES).toHaveLength(4);
    expect(HOME_QUIZZES[0]?.id).toBe(CAMP_GEAR_QUIZ_ID);
    expect(HOME_QUIZZES[1]?.id).toBe(SPAGHETTI_QUIZ_ID);
    expect(HOME_QUIZZES[2]?.id).toBe(SUSHI_QUIZ_ID);
    expect(HOME_QUIZZES[3]?.id).toBe(ICE_CREAM_QUIZ_ID);

    for (const locale of ["ja", "en"] as const) {
      const quiz = getQuiz(CAMP_GEAR_QUIZ_ID, locale);
      expect(quiz?.title).toBeTruthy();
      expect(HOME_QUIZZES[0]?.description[locale]).toBeTruthy();
      expect(HOME_QUIZZES[0]?.cardTitle[locale].line1).toBeTruthy();
      expect(HOME_QUIZZES[0]?.cardTitle[locale].line2).toBeTruthy();
      expect(HOME_COPY[locale].heroTitle).toBeTruthy();
      expect(HOME_COPY[locale].heroMainCta).toBeTruthy();
      expect(HOME_COPY[locale].takeQuiz).toBeTruthy();
      expect(HOME_COPY[locale].comingSoonLabel).toBeTruthy();
      expect(HOME_COPY[locale].comingSoonDescription).toBeTruthy();
    }
  });

  it("uses the approved Spaghetti card copy and accessible labels", () => {
    const spaghetti = HOME_QUIZZES.find((entry) => entry.id === SPAGHETTI_QUIZ_ID);
    expect(spaghetti?.cardTitle.ja).toEqual({ line1: "スパゲッティ", line2: "タイプ診断" });
    expect(spaghetti?.cardTitle.en).toEqual({ line1: "Spaghetti", line2: "Type" });
    expect(spaghetti?.description.ja).toBe("もしあなたがスパゲッティだったら？");
    expect(spaghetti?.description.en).toBe("What if you were spaghetti?");
    expect(spaghetti?.accessibleLabel).toEqual({
      ja: "スパゲッティタイプ診断を始める",
      en: "Start the Spaghetti Type quiz",
    });
  });

  it("uses the approved Sushi card copy and accessible labels", () => {
    const sushi = HOME_QUIZZES.find((entry) => entry.id === SUSHI_QUIZ_ID);
    expect(sushi?.cardTitle.ja).toEqual({ line1: "お寿司", line2: "タイプ診断" });
    expect(sushi?.cardTitle.en).toEqual({ line1: "Sushi", line2: "Type" });
    expect(sushi?.description.ja).toBe("もしあなたがお寿司だったら？");
    expect(sushi?.description.en).toBe("What if you were sushi?");
    expect(sushi?.accessibleLabel).toEqual({ ja: "お寿司タイプ診断を始める", en: "Start the Sushi Type quiz" });
  });

  it("uses the approved Ice Cream card copy and accessible labels", () => {
    const iceCream = HOME_QUIZZES.find((entry) => entry.id === ICE_CREAM_QUIZ_ID);
    expect(iceCream?.cardTitle.ja).toEqual({ line1: "アイスクリーム", line2: "タイプ診断" });
    expect(iceCream?.cardTitle.en).toEqual({ line1: "Ice Cream", line2: "Type" });
    expect(iceCream?.description.ja).toBe("もしあなたがアイスクリームだったら？");
    expect(iceCream?.description.en).toBe("What if you were ice cream?");
    expect(iceCream?.accessibleLabel).toEqual({ ja: "アイスクリームタイプ診断を始める", en: "Start the Ice Cream Type quiz" });
  });

  it("uses the approved locale-specific home share copy", () => {
    expect(HOME_SHARE_COPY.ja).toEqual({
      title: "Papipu Type",
      text: "Papipu Typeで遊んでみよう！\nキャンプ道具、スパゲッティ、お寿司、アイスクリーム…あなたはどのタイプ？",
      label: "Papipu Typeをシェア",
      accessibleLabel: "Papipu Typeのトップページをシェアする",
    });
    expect(HOME_SHARE_COPY.en).toEqual({
      title: "Papipu Type",
      text: "Try Papipu Type!\nCamp gear, spaghetti, sushi, ice cream… what type are you?",
      label: "Share Papipu Type",
      accessibleLabel: "Share the Papipu Type home page",
    });
  });
});

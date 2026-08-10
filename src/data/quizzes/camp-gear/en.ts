import { createCampGearQuiz, type CampGearText } from "./definition";

/** Display text only — judgement data lives in CAMP_GEAR_SCORING. */
const CAMP_GEAR_TEXT_EN: CampGearText = {
  title: "What Camping Gear Are You?",
  questions: {
    q1: {
      text: "You’ve arrived at the campsite! What do you do first?",
      choices: {
        a: "Look around and figure out the setup plan",
        b: "Start unloading. We’ll figure it out as we go",
        c: "Get everyone together and start setting up",
        d: "Set up my chair first. Priorities.",
      },
    },
    q2: {
      text: "You can’t figure out how to pitch the tent.",
      choices: {
        a: "Study the structure and work it out",
        b: "Start putting things together and see what happens",
        c: "Find someone and solve it together",
        d: "Take a break first. The tent isn’t going anywhere.",
      },
    },
    q3: {
      text: "What’s your favorite part of camping?",
      choices: {
        a: "Sitting around the campfire with everyone",
        b: "Enjoying the night by lantern light",
        c: "The moment I crawl into my sleeping bag",
        d: "A quiet morning by myself",
      },
    },
    q4: {
      text: "Someone nearby is struggling to hammer in a tent peg.",
      choices: {
        a: "Quietly give them a hand",
        b: "Show them a better way to do it",
        c: "“Give me that!” and hammer it in for them",
        d: "Cheer them on silently from my chair",
      },
    },
    q5: {
      text: "Suddenly, it starts raining. What now?",
      choices: {
        a: "Get everyone’s gear somewhere dry",
        b: "Assess the situation and deal with what matters first",
        c: "“Camping in the rain is fun too!”",
        d: "Get inside the tent. I live here now.",
      },
    },
    q6: {
      text: "Camp is packed up. What’s your final move?",
      choices: {
        a: "Do one last check for anything left behind",
        b: "“So… when’s the next camping trip?”",
        c: "Help anyone who’s still packing",
        d: "Go home. Sleep. That is the entire plan.",
      },
    },
  },
};

export const campGearQuizEn = createCampGearQuiz("en", CAMP_GEAR_TEXT_EN);

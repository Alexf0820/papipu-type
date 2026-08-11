import { createCampGearQuiz, type CampGearText } from "./definition";

/** Display text only — judgement data lives in CAMP_GEAR_SCORING. */
const CAMP_GEAR_TEXT_EN: CampGearText = {
  title: "What Camping Gear Are You?",
  questions: {
    q01: {
      text: "You’ve arrived at the campsite! What do you do first?",
      choices: {
        a: "Look around and figure out the setup plan",
        b: "Start unloading. We’ll figure it out as we go",
        c: "Get everyone together and start setting up",
        d: "Set up my chair first. Priorities.",
      },
    },
    q02: {
      text: "You can’t figure out how to pitch the tent.",
      choices: {
        a: "Study the structure and work it out",
        b: "Start putting things together and see what happens",
        c: "Find someone and solve it together",
        d: "Take a break first. The tent isn’t going anywhere.",
      },
    },
    q03: {
      text: "What’s your favorite part of camping?",
      choices: {
        a: "Sitting around the campfire with everyone",
        b: "Enjoying the night by lantern light",
        c: "The moment I crawl into my sleeping bag",
        d: "A quiet morning by myself",
      },
    },
    q04: {
      text: "Someone nearby is struggling to hammer in a tent peg.",
      choices: {
        a: "Quietly give them a hand",
        b: "Show them a better way to do it",
        c: "“Give me that!” and hammer it in for them",
        d: "Cheer them on silently from my chair",
      },
    },
    q05: {
      text: "Suddenly, it starts raining. What now?",
      choices: {
        a: "Get everyone’s gear somewhere dry",
        b: "Assess the situation and deal with what matters first",
        c: "“Camping in the rain is fun too!”",
        d: "Get inside the tent. I live here now.",
      },
    },
    q06: {
      text: "Camp is packed up. What’s your final move?",
      choices: {
        a: "Do one last check for anything left behind",
        b: "“So… when’s the next camping trip?”",
        c: "Help anyone who’s still packing",
        d: "Go home. Sleep. That is the entire plan.",
      },
    },
    q07: {
      text: "You just got to the campsite! What's the first thing you do?",
      choices: {
        a: "Unload everything and line it up in the order I'll need it.",
        b: "Start a fire. Everything else can wait.",
        c: "Ask, \"How about this spot?\" and check out the vibe together.",
        d: "Put out a chair and sit down. Setup can wait.",
      },
    },
    q08: {
      text: "How do you pick where to pitch the tent?",
      choices: {
        a: "Check the slope, drainage, and wind direction—just to be safe.",
        b: "Find a spot that feels right and say, \"This'll work!\"",
        c: "Pick somewhere everyone will be comfortable.",
        d: "The most important question: Will I sleep well here?",
      },
    },
    q09: {
      text: "Setup is done... but there's one mysterious part left over.",
      choices: {
        a: "Something is definitely wrong. I need to figure out where it belongs.",
        b: "If everything's standing, we're good. I'll worry about it if I need it.",
        c: "Show everyone and ask, \"Any idea what this is?\"",
        d: "Uh... spare part?",
      },
    },
    q10: {
      text: "The peg absolutely refuses to go in!",
      choices: {
        a: "Check the ground and try a different spot or angle.",
        b: "More power. I haven't even used my full strength yet.",
        c: "Immediately try another method or tool.",
        d: "Good enough. It doesn't have to go all the way in... right?",
      },
    },
    q11: {
      text: "Setup is taking way longer than planned.",
      choices: {
        a: "Figure out what's left and reorganize the order.",
        b: "Just keep moving. I'll think while I work.",
        c: "Finish the important stuff first.",
        d: "As long as we finish sometime today, we're fine.",
      },
    },
    q12: {
      text: "Setup is finally done! What do you want to do first?",
      choices: {
        a: "Do one last check to make sure we didn't forget anything.",
        b: "Finish my sleeping setup and flop down.",
        c: "\"We did it!\" Time for a toast.",
        d: "Admire the campsite, take some photos, and hang out.",
      },
    },
    q13: {
      text: "Suddenly, it starts raining!",
      choices: {
        a: "Get anything that can't get wet under cover first.",
        b: "Tarp first! Move, move, move!",
        c: "Watch where the water is going and reorganize the whole site.",
        d: "Camping in the rain isn't so bad. Let's see what happens.",
      },
    },
    q14: {
      text: "You forgot something fairly important.",
      choices: {
        a: "Look through what I brought and find a substitute.",
        b: "If I can buy one nearby, I'll go get it.",
        c: "Change the plan so we don't need it.",
        d: "I have a feeling we'll survive without it.",
      },
    },
    q15: {
      text: "The wind picks up and everything is about to fly away!",
      choices: {
        a: "Secure anything that looks even remotely capable of flying.",
        b: "Run straight to whatever looks most dangerous.",
        c: "Look around and start calling out, \"Can you grab that?\"",
        d: "Protect the essentials and retreat to the tent.",
      },
    },
    q16: {
      text: "A piece of camping gear suddenly breaks.",
      choices: {
        a: "Check how it's built and see if I can repair it.",
        b: "MacGyver it back to life with whatever's nearby.",
        c: "Ask everyone, \"Okay, how are we fixing this?\"",
        d: "Guess we're camping without it today.",
      },
    },
    q17: {
      text: "When you're cooking at camp, you're the type to...",
      choices: {
        a: "Check the ingredients and steps before starting.",
        b: "Get way too excited the moment there's fire involved.",
        c: "Make everyone taste-test while I'm cooking.",
        d: "If everyone ends up full, I'd call that a success.",
      },
    },
    q18: {
      text: "The recipe says, \"Low heat for 10 minutes.\"",
      choices: {
        a: "Mostly follow it, but adjust as needed.",
        b: "More heat means food sooner.",
        c: "Go by feel. \"Yeah... this looks about right.\"",
        d: "As long as it doesn't burn, we're good.",
      },
    },
    q19: {
      text: "You accidentally made way too much food.",
      choices: {
        a: "Figure out how to store it or use it for breakfast tomorrow.",
        b: "If everyone eats enough, it'll disappear!",
        c: "Call out, \"Anyone want more?\"",
        d: "That's tomorrow-me's problem.",
      },
    },
    q20: {
      text: "Dinner didn't quite turn out as planned.",
      choices: {
        a: "I need to know what went wrong.",
        b: "Add more seasoning and force it across the finish line.",
        c: "\"You know what? This actually works!\" Eat it together anyway.",
        d: "It's camp food. Everything tastes better outside.",
      },
    },
    q21: {
      text: "You're sitting around the campfire. What are you doing?",
      choices: {
        a: "Casually checking that everyone's comfortable.",
        b: "Quietly watching the fire. That's the best part.",
        c: "Enjoying the conversation more than anything.",
        d: "If I get sleepy, I'm perfectly happy dozing off right here.",
      },
    },
    q22: {
      text: "At night, you hear a mysterious rustle nearby.",
      choices: {
        a: "Grab a light and check the area.",
        b: "Go see what it was.",
        c: "\"You heard that too, right?!\" Ask someone immediately.",
        d: "I heard nothing. Absolutely nothing.",
      },
    },
    q23: {
      text: "The stars are ridiculously beautiful tonight.",
      choices: {
        a: "Open a stargazing app and start asking, \"What constellation is that?\"",
        b: "Go find the spot with the best view.",
        c: "Call everyone over. \"Come look at this!\"",
        d: "Wish I could see all this without leaving my sleeping bag.",
      },
    },
    q24: {
      text: "It's about time for bed.",
      choices: {
        a: "Do a little prep for tomorrow first.",
        b: "I still feel like there's something else I should be doing.",
        c: "Stay up and talk just a little longer.",
        d: "Finally. I've been waiting for this.",
      },
    },
    q25: {
      text: "You're going camping with a complete beginner.",
      choices: {
        a: "Tell them the few things they're most likely to struggle with.",
        b: "They'll learn by doing. Let's just do it together!",
        c: "Explain the overall plan first so they know what to expect.",
        d: "Don't make them do anything. If they're having fun, that's enough.",
      },
    },
    q26: {
      text: "Someone is struggling to pitch their tent.",
      choices: {
        a: "Figure out exactly where they're stuck and help with that part.",
        b: "\"Here, let me help!\" Jump in and power through it together.",
        c: "Explain what to do while putting it together with them.",
        d: "Take over another task so they don't have to rush.",
      },
    },
    q27: {
      text: "Everyone disagrees about dinner. What now?",
      choices: {
        a: "Sort out the constraints and suggest the most practical option.",
        b: "\"Okay, let's make this!\" Somebody has to decide.",
        c: "Find an option everyone can live with.",
        d: "I'm good with anything. Wake me when you've decided.",
      },
    },
    q28: {
      text: "One person looks a little tired.",
      choices: {
        a: "Casually check in: \"You doing okay?\"",
        b: "Do a little extra myself so we can finish sooner.",
        c: "Adjust the plan and make some time for a break.",
        d: "Take a break with them. Resting is part of camping too.",
      },
    },
    q29: {
      text: "You're buying a new piece of camping gear. How do you choose?",
      choices: {
        a: "Research the specs and reviews. A lot.",
        b: "Pick the one that makes me excited to use it.",
        c: "Choose something that'll last and fits my camping style.",
        d: "If it makes camping more comfortable, that's the one.",
      },
    },
    q30: {
      text: "Your camping gear collection keeps growing.",
      choices: {
        a: "Go through everything and figure out what I actually need.",
        b: "There are still things I want. It can't be helped.",
        c: "I'd rather narrow it down to the things I genuinely use.",
        d: "If it still fits in storage, we don't have a problem.",
      },
    },
    q31: {
      text: "What's your ideal campsite setup?",
      choices: {
        a: "Everything I need, exactly where it needs to be.",
        b: "A lively setup where I can actually use and play with my gear.",
        c: "A place where everyone naturally ends up hanging out together.",
        d: "A setup where once I sit down, I never have to stand up again.",
      },
    },
    q32: {
      text: "What does camping mean to you?",
      choices: {
        a: "A place to try things I don't get to do in everyday life.",
        b: "A place to create my own little home in nature.",
        c: "A place to enjoy doing things my own way.",
        d: "A place to relax with the people I care about.",
      },
    },
  },
};

export const campGearQuizEn = createCampGearQuiz("en", CAMP_GEAR_TEXT_EN);

import type { CampGearResultContent } from "./types";

export const campGearResultContentEn: CampGearResultContent = {
  peg: {
    displayName: "Tent Peg",
    visualKey: "camp-gear-peg",
    variations: {
      a: {
        body: "You're not the loudest person in the group, but you're often the one quietly keeping everything together.\n\nYou notice what needs doing, step in without making a fuss, and somehow stop the whole thing from falling apart.\n\nYou may not think you're doing anything special.\n\nYou are.\n\nThe problem is, for someone this important, you're surprisingly easy to forget.\n\nSometimes literally. At the campsite.",
      },
      b: {
        body: "You're reliable, steady, and a lot tougher than people realize.\n\nYou take pressure well.\nYou don't complain much.\nYou keep holding on.\n\nWhich is impressive, considering how often life seems to hit you with a hammer.",
      },
      c: {
        body: "Everyone else is packing up.\n\nThe tent is gone.\nThe chairs are gone.\nThe cooler is in the car.\n\nAnd somehow…\n\nyou're still in the ground.\n\nPlease send help.",
      },
    },
    good: {
      typeId: "tent",
      reason:
        "You keep them grounded. They give everyone shelter. It just works.",
    },
    bad: {
      typeId: "hammer",
      reason: "Probably a perfectly nice person.\n\nStill hits you every time you meet.",
    },
    mottos: [
      "Please count us before you leave.",
      "Quietly essential.",
      "You'll notice me when I'm gone.",
    ],
  },
  tent: {
    displayName: "Tent",
    visualKey: "camp-gear-tent",
    variations: {
      a: {
        body: "You're the person people naturally feel comfortable around.\n\nYou make space for others, take care of the group, and somehow end up being the place everyone brings their problems.\n\nWarm, dependable, welcoming.\n\nAlso carrying way too much stuff.",
      },
      b: {
        body: "You're generous with your time, your energy, and your attention.\n\nSomeone needs help? Come in.\nSomeone needs somewhere to sit? Come in.\nSomeone brought three extra bags?\n\nApparently those are coming in too.\n\nAt some point you may wonder:\n\n“Why is everything in here?”",
      },
      c: {
        body: "You take protecting your people seriously.\n\nRain? Covered.\nWind? Covered.\nCold? Covered.\n\nYou've got everyone.\n\nThe only danger is going a little too far and turning “cozy” into:\n\n“Can somebody open a vent?”",
      },
    },
    good: {
      typeId: "peg",
      reason: "Quiet, dependable, and there when things get windy.",
    },
    bad: {
      typeId: "knife",
      reason:
        "Nothing personal.\n\nYou'd just prefer they stay a respectful distance away.",
    },
    mottos: [
      "Everybody in.",
      "We'll figure it out inside.",
      "Packing up is tomorrow's problem.",
    ],
  },
  lantern: {
    displayName: "Lantern",
    visualKey: "camp-gear-lantern",
    variations: {
      a: {
        body: "You naturally brighten the room.\n\nYou're good at making people feel welcome, filling awkward silences, and keeping things warm when the energy starts to drop.\n\nYou really come alive at night.\n\nDuring the day?\n\nShockingly little to do.",
      },
      b: {
        body: "You might be perfectly normal all day.\n\nThen the sun goes down.\n\nSuddenly you're talking more, laughing more, and somehow starting a brand-new conversation at the exact moment everyone else says:\n\n“Should we go to bed?”\n\nNo.\n\nApparently not.",
      },
      c: {
        body: "You like helping people feel comfortable.\n\nSometimes a little too much.\n\nYou see darkness and think:\n\n“I can fix that.”\n\nAnd then somebody says:\n\n“Could you maybe turn it down a bit?”",
      },
    },
    good: {
      typeId: "chair",
      reason:
        "You provide the glow. They provide the sitting. Excellent system.",
    },
    bad: {
      typeId: "sleepingBag",
      reason: "You're warming up.\n\nThey're shutting down.",
    },
    mottos: [
      "Night is when things get interesting.",
      "Did anyone charge me?",
      "Still too early to turn me off.",
    ],
  },
  chair: {
    displayName: "Camp Chair",
    visualKey: "camp-gear-chair",
    variations: {
      a: {
        body: "You refuse to be rushed for no good reason.\n\nEveryone else arrives at camp and immediately starts unloading, pitching, organizing.\n\nYou?\n\nChair first.\n\nEverything else can wait thirty seconds.\n\nOr twenty minutes.",
      },
      b: {
        body: "You like people, but you also appreciate the rare art of doing absolutely nothing.\n\nQuiet morning.\nCoffee.\nA little breeze.\n\nThirty minutes go by.\n\nYou have accomplished nothing.\n\nPerfect.",
      },
      c: {
        body: "You're calm under pressure because you don't panic easily.\n\nThat's a strength.\n\nThe downside is that once you've settled in, motivation becomes increasingly theoretical.\n\nSomeone says:\n\n“Can you help?”\n\nYou look at the chair.\n\nThe chair looks back.",
      },
    },
    good: {
      typeId: "lantern",
      reason:
        "They provide just enough light for you to continue not moving.",
    },
    bad: {
      typeId: "hammer",
      reason: "Why is that person always doing something?",
    },
    mottos: [
      "Sit first. Decide later.",
      "The campsite isn't going anywhere.",
      "I currently have no reason to stand up.",
    ],
  },
  firePit: {
    displayName: "Fire Pit",
    visualKey: "camp-gear-firePit",
    variations: {
      a: {
        body: "People gather around you without you even trying.\n\nYou bring energy, conversation, and that feeling that maybe nobody needs to go to bed just yet.\n\nYou don't ask to be the center of attention.\n\nYou just somehow become it.\n\nAnd occasionally get a little too fired up.",
      },
      b: {
        body: "When you care about something, you care a lot.\n\nYou don't do half-hearted enthusiasm.\n\nOne log.\n\nAnother log.\n\nMaybe one more.\n\nAt some point somebody quietly moves their chair back.",
      },
      c: {
        body: "You give everything you've got.\n\nWork, hobbies, parties, projects—you go all in.\n\nWhich is great.\n\nUntil the moment it's over and you become:\n\na small pile of ash.\n\nPlease allow recovery time.",
      },
    },
    good: {
      typeId: "lantern",
      reason: "You bring the heat. They bring the glow. Nobody sleeps.",
    },
    bad: {
      typeId: "tent",
      reason: "Nothing personal.\n\nJust… distance is healthy.",
    },
    mottos: [
      "One more log.",
      "If we're doing this, we're doing it properly.",
      "I'll rest when I'm ash.",
    ],
  },
  sleepingBag: {
    displayName: "Sleeping Bag",
    visualKey: "camp-gear-sleepingBag",
    variations: {
      a: {
        body: "You have a calming effect on people.\n\nYou listen well, you don't create unnecessary drama, and people tend to feel safer around you.\n\nWarm. Dependable. Comforting.\n\nAlso:\n\nvery interested in lying down.",
      },
      b: {
        body: "You don't enjoy pointless conflict.\n\nIf everyone can relax and get along, that sounds much better.\n\nBut after about 10 p.m., your priorities shift.\n\nPeace is still important.\n\nSleep is more important.",
      },
      c: {
        body: "You know how to create a comfortable little world for yourself.\n\nThat's a genuine skill.\n\nThe problem is that once you're in there…\n\nyou're not coming out.\n\nMorning has arrived.\n\nPlease exit the sleeping bag.",
      },
    },
    good: {
      typeId: "tent",
      reason:
        "They protect you from the outside world. You fully support this arrangement.",
    },
    bad: {
      typeId: "lantern",
      reason: "“Can we turn the light off?”\n\n“No.”\n\nEvery time.",
    },
    mottos: [
      "Most things look better after sleep.",
      "I live here now.",
      "Morning is a suggestion.",
    ],
  },
  knife: {
    displayName: "Knife",
    visualKey: "camp-gear-knife",
    variations: {
      a: {
        body: "You're good at cutting through confusion and getting straight to the actual problem.\n\nWhile everyone else is still discussing possibilities, you've already identified what matters.\n\nUseful.\n\nEfficient.\n\nOccasionally a little too sharp.",
      },
      b: {
        body: "You don't like carrying unnecessary baggage.\n\nPhysical or emotional.\n\nYou ask:\n\n“Do we really need this?”\n\noften enough that eventually somebody realizes your entire camping setup may soon consist of:\n\none knife.",
      },
      c: {
        body: "Your brain moves fast.\n\nYou notice inconsistencies, weak plans, and things everyone else is politely pretending not to notice.\n\nThen you say something perfectly reasonable.\n\nEveryone goes quiet.\n\nApparently the delivery was a little sharp.",
      },
    },
    good: {
      typeId: "hammer",
      reason: "You think. They act. Surprisingly effective.",
    },
    bad: {
      typeId: "tent",
      reason: "For some reason, they get nervous when you come close.",
    },
    mottos: [
      "Keep what matters.",
      "Cut the unnecessary.",
      "Sharp doesn't mean angry.",
    ],
  },
  hammer: {
    displayName: "Hammer",
    visualKey: "camp-gear-hammer",
    variations: {
      a: {
        body: "You don't believe every problem needs a meeting.\n\nSometimes it needs action.\n\nWhile everyone else is still asking “What should we do?”\n\nyou are already doing something.\n\nPossibly with a hammer.",
      },
      b: {
        body: "You're the person who sees someone struggling and says:\n\n“Give me that.”\n\nHelpful? Absolutely.\n\nFast? Definitely.\n\nThe only risk is solving the problem so quickly that nobody else gets to learn anything.",
      },
      c: {
        body: "You trust movement.\n\nObstacle? Keep going.\nProblem? Keep going.\nTent peg?\n\nHit it.\n\nThis strategy works surprisingly often.\n\nNot always. But surprisingly often.",
      },
    },
    good: {
      typeId: "knife",
      reason: "They decide what needs doing. You make it happen.",
    },
    bad: {
      typeId: "peg",
      reason:
        "You consider this a professional relationship.\n\nThey do not.",
    },
    mottos: [
      "Try something first.",
      "Momentum solves a lot.",
      "Check before hitting. Ideally.",
    ],
  },
};

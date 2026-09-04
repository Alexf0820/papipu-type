import { createSushiQuiz, type SushiText } from "./definition";

// Display text only. Copy approved in English belongs here.
const SUSHI_TEXT_EN: SushiText = {
  title: "Sushi Type",
  questions: {
    q01: {
      text: "You're somewhere with lots of people you've never met. What do you do?",
      choices: {
        a: "Look around first. I'll talk when it feels natural.",
        b: "One interesting person is enough for me.",
        c: "I'm actually pretty happy when someone starts talking to me.",
        d: "Start a conversation with someone nearby.",
      },
    },
    q02: {
      text: "Your friend brings along someone you've never met.",
      choices: {
        a: "I'm curious what they're like.",
        b: "Welcome them normally. They'll probably fit right in.",
        c: "Bring up something everyone can talk about.",
        d: "No need to force a friendship. We'll get there eventually.",
      },
    },
    q03: {
      text: "Your group chat suddenly explodes with messages.",
      choices: {
        a: "I'm reading it. I'm definitely reading it.",
        b: "I'm usually part of the conversation.",
        c: "If the conversation starts going nowhere, I want to summarize what's happening.",
        d: "If it looks interesting, I'll jump in halfway through.",
      },
    },
    q04: {
      text: "Which sounds most like your friendships?",
      choices: {
        a: "I like people who are fun to be around.",
        b: "I want people I can relax around without trying too hard.",
        c: "A few people I can know for years matter more to me.",
        d: "People who see things differently from me can be interesting.",
      },
    },
    q05: {
      text: "You have absolutely nothing planned today.",
      choices: {
        a: "Maybe grab a meal with someone I like.",
        b: "Stay home and relax. Honestly, this is great.",
        c: "Go outside and see what happens.",
        d: "Finally get something done that I've been meaning to do.",
      },
    },
    q06: {
      text: "You're traveling and spot an interesting place that wasn't in the plan.",
      choices: {
        a: "Something about it is weirdly calling to me.",
        b: "Go in. This is part of traveling.",
        c: "Check the schedule. If there's time, sure.",
        d: "If everyone wants to go, let's go.",
      },
    },
    q07: {
      text: "You had plans to go out, but it's raining all morning.",
      choices: {
        a: "Rearrange the plan.",
        b: "Find something else fun to do.",
        c: "Think of something that's actually more fun because it's raining.",
        d: "Stay in instead. That's not bad either.",
      },
    },
    q08: {
      text: "You suddenly find out tomorrow is a day off.",
      choices: {
        a: "Go somewhere I've been wanting to visit.",
        b: "Wonder if anyone's free.",
        c: "Yes! I don't have to do anything.",
        d: "I'll decide after I wake up.",
      },
    },
    q09: {
      text: "You come up with an interesting idea.",
      choices: {
        a: "I want to tell someone about it.",
        b: "First, figure out whether it's actually possible.",
        c: "I want to add my own twist instead of doing it the usual way.",
        d: "Try a little bit and see what happens.",
      },
    },
    q10: {
      text: "You're making a big purchase. What's the final deciding factor?",
      choices: {
        a: "Whether I genuinely love it.",
        b: "Whether I'll be able to use it for a long time.",
        c: "Whether I can look at it and think, \"Yep. This is the one.\"",
        d: "Whether buying it makes me excited.",
      },
    },
    q11: {
      text: "Everyone keeps debating and nothing is getting decided.",
      choices: {
        a: "Find an option everyone can live with.",
        b: "I'm fine with any of them. I'll wait.",
        c: "\"Okay, let's do this one.\"",
        d: "Organize the conditions and narrow down the choices.",
      },
    },
    q12: {
      text: "You're starting something new.",
      choices: {
        a: "Learn the basics first.",
        b: "If I'm going to do it, I'd rather do something a little different.",
        c: "Start first. I'll learn the details afterward.",
        d: "It's easier to start with someone else.",
      },
    },
    q13: {
      text: "You're running an hour behind schedule.",
      choices: {
        a: "Tell everyone what's happening and adjust the plan.",
        b: "Eh, being a little late probably won't ruin everything.",
        c: "Reorganize what's left and rebuild the schedule.",
        d: "Hurry. A lot.",
      },
    },
    q14: {
      text: "Something you just bought breaks.",
      choices: {
        a: "Tell someone, \"This thing already broke 😂\"",
        b: "See if I can fix it myself first.",
        c: "Check the warranty or return policy.",
        d: "Now I'm strangely curious about why it broke.",
      },
    },
    q15: {
      text: "It's the meeting time, but the other person hasn't arrived.",
      choices: {
        a: "Look around and find something to do while I wait.",
        b: "Contact them first.",
        c: "Find somewhere to sit and relax.",
        d: "Start wondering if something happened to them.",
      },
    },
    q16: {
      text: "You messed something up. What do you do?",
      choices: {
        a: "Figure out why so I can do better next time.",
        b: "That's frustrating. I'm doing it again.",
        c: "Talking to someone about it usually helps a little.",
        d: "Honestly, even the failed method is kind of interesting.",
      },
    },
    q17: {
      text: "You're making something as a group.",
      choices: {
        a: "I like the feeling of everyone working on it together.", b: "I keep an eye on how the whole thing is progressing.", c: "I want to add at least one part that feels like me.", d: "Do my part properly.",
      },
    },
    q18: {
      text: "One person in the group isn't really part of the conversation.",
      choices: {
        a: "Let them join at their own pace. No need to force it.", b: "Casually bring them into the conversation.", c: "If they're nearby, just talk to them normally.", d: "Create an opening that makes it easier for them to join.",
      },
    },
    q19: {
      text: "There's one extremely energetic person on the team.",
      choices: {
        a: "Slow them down a little if they're about to go off the rails.", b: "Let them handle the things they're good at.", c: "I'll keep doing things at my own pace.", d: "Join in. Looks fun.",
      },
    },
    q20: {
      text: "There's one job left that nobody wants to do.",
      choices: {
        a: "Split it up. It'll be over quickly.", b: "Maybe it'll actually be interesting once I try it.", c: "First question: does this really need to be done?", d: "If it needs doing, I'll do it.",
      },
    },
    q21: {
      text: "At your favorite restaurant, what do you order?",
      choices: {
        a: "I notice what the person I'm with ordered too.", b: "That mysterious item hiding on the edge of the menu.", c: "Usually the same thing I always get.", d: "A new menu item definitely gets my attention.",
      },
    },
    q22: {
      text: "When choosing something, what matters a little more than you'd admit?",
      choices: {
        a: "Whether it feels like me.", b: "Whether using it makes me feel good.", c: "Whether it's interesting.", d: "Quality.",
      },
    },
    q23: {
      text: "You have an old favorite you've been using for years.",
      choices: {
        a: "I want to keep using it until it finally gives up.", b: "It's hard to replace because nothing else feels quite right.", c: "New stuff still catches my attention.", d: "It has memories attached to it, so it's hard to let go.",
      },
    },
    q24: {
      text: "Something is suddenly trendy.",
      choices: {
        a: "I'd like to try it once.", b: "If I actually need it, I'll use it.", c: "If it's good, I don't mind following the trend.", d: "\"Everyone has one\" isn't really a reason for me to care.",
      },
    },
    q25: {
      text: "Something great happens to you.",
      choices: {
        a: "Enjoy the feeling quietly by myself.", b: "Now I feel like I can do the next thing too.", c: "I want to tell someone.", d: "My excitement level goes way up.",
      },
    },
    q26: {
      text: "Something makes you a little angry.",
      choices: {
        a: "Calm down first, then think about it.", b: "It probably shows on my face.", c: "I'm more curious about why it happened.", d: "I want someone to hear me out.",
      },
    },
    q27: {
      text: "A friend compliments you.",
      choices: {
        a: "\"That's what you noticed?\" That's kind of interesting.", b: "\"I know, right?\" I might get slightly carried away.", c: "I'm just genuinely happy.", d: "I say, \"No, no...\" while being extremely pleased inside.",
      },
    },
    q28: {
      text: "Someone disagrees with you.",
      choices: {
        a: "I'm actually curious to hear an opinion that's different from mine.", b: "Ask why they think that.", c: "Say what I think too.", d: "We can disagree and still get along.",
      },
    },
    q29: {
      text: "What's your ideal everyday life?",
      choices: {
        a: "Laughing and having a good time with people I care about.", b: "Being able to live the way I like.", c: "Having little things to look forward to.", d: "Stable, without any major problems.",
      },
    },
    q30: {
      text: "Which sounds most like one of your strengths?",
      choices: {
        a: "I'm a little different from other people.", b: "I'm pretty responsible.", c: "I usually get along with people.", d: "I can step up when it really matters.",
      },
    },
    q31: {
      text: "What helps you stick with something?",
      choices: {
        a: "Having a goal.", b: "Finding my own way to make it interesting.", c: "Having someone to enjoy it with.", d: "Being able to keep going without exhausting myself.",
      },
    },
    q32: {
      text: "When do you feel most like yourself?",
      choices: {
        a: "When I can throw myself into something I really want to do.", b: "When I can naturally be myself around people I care about.", c: "When I'm taking care of what needs to be done.", d: "When I like something even if I'm the only one who does.",
      },
    },
  },
};

export const sushiQuizEn = createSushiQuiz(
  "en",
  SUSHI_TEXT_EN,
);

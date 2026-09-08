import { createDonutQuiz, type DonutText } from "./definition";

const DONUT_TEXT_EN: DonutText = {
  "title": "Donut Type",
  "questions": {
    "q01": {
      "text": "Your plans suddenly open up. What do you do?",
      "choices": {
        "a": "Find something easy and enjoyable nearby",
        "b": "Dive into something you've wanted to do",
        "c": "See if someone is free",
        "d": "Rebuild the day around how you feel"
      }
    },
    "q02": {
      "text": "Someone looks like they're struggling. What do you do?",
      "choices": {
        "a": "Help naturally if it seems useful",
        "b": "Figure out exactly what the problem is",
        "c": "Ask how they're feeling",
        "d": "Leave room for them to handle it their way"
      }
    },
    "q03": {
      "text": "You find a new shop. What happens?",
      "choices": {
        "a": "Try it if it looks reliable",
        "b": "Go in if something really catches your eye",
        "c": "Think of someone who'd enjoy it too",
        "d": "Go in if it looks fun, even if it wasn't planned"
      }
    },
    "q04": {
      "text": "Your group can't agree. What do you do?",
      "choices": {
        "a": "Look for a workable middle ground",
        "b": "State your view clearly",
        "c": "Notice what each person is worried about",
        "d": "Adjust the plan to fit the situation"
      }
    },
    "q05": {
      "text": "What matters most when buying something?",
      "choices": {
        "a": "That it'll last and won't be a mistake",
        "b": "Whether I really, really like it",
        "c": "Whether it feels good for the people using it",
        "d": "Whether it fits what I need right now"
      }
    },
    "q06": {
      "text": "What are you best at when working?",
      "choices": {
        "a": "Keeping the whole thing moving steadily",
        "b": "Going deep and finishing one thing well",
        "c": "Reading the room and adjusting",
        "d": "Changing methods as you go"
      }
    },
    "q07": {
      "text": "Someone praises you. Your reaction?",
      "choices": {
        "a": "Happy—and I want to do well again",
        "b": "Glad they noticed that specific part",
        "c": "Even happier if it made them happy",
        "d": "A little embarrassed, then on to the next thing"
      }
    },
    "q08": {
      "text": "You mess something up. What happens?",
      "choices": {
        "a": "Check why and avoid repeating it",
        "b": "Want to redo it until it feels right",
        "c": "Worry whether it affected someone else",
        "d": "Fix what you can and move on"
      }
    },
    "q09": {
      "text": "Your ideal day off?",
      "choices": {
        "a": "A comfortable plan that just works",
        "b": "Spend a lot of time on something I love",
        "c": "Spend good time with people I care about",
        "d": "Keep it flexible and decide as I go"
      }
    },
    "q10": {
      "text": "Someone asks you for advice. What do you do?",
      "choices": {
        "a": "Organize the situation and suggest something practical",
        "b": "If they mean it, really dig into it with them",
        "c": "Listen to how they feel first",
        "d": "Offer a few options that work right now"
      }
    },
    "q11": {
      "text": "You're somewhere new. What are you like?",
      "choices": {
        "a": "Look around and get oriented first",
        "b": "Head straight toward what interests me",
        "c": "Move based on the vibe of the people around me",
        "d": "Change direction if something looks more interesting"
      }
    },
    "q12": {
      "text": "Someone asks to change the plan. Your response?",
      "choices": {
        "a": "Adjust if it's reasonable",
        "b": "Change it if the reason makes sense",
        "c": "Try to help if it matters to them",
        "d": "Reshape things into what works best now"
      }
    },
    "q13": {
      "text": "What's the secret to sticking with something?",
      "choices": {
        "a": "Make it sustainable",
        "b": "Find a reason I genuinely care about",
        "c": "Having someone with me helps",
        "d": "Change the method when it gets stale"
      }
    },
    "q14": {
      "text": "A friend is down. What do you do?",
      "choices": {
        "a": "Stay nearby without making a fuss",
        "b": "Ask what really happened",
        "c": "Try to help them feel a little lighter",
        "d": "Suggest a change of scene"
      }
    },
    "q15": {
      "text": "How do you make a choice?",
      "choices": {
        "a": "Choose the option least likely to go wrong",
        "b": "Choose what pulls me in the most",
        "c": "Think about how it affects the people around me",
        "d": "Choose what fits the current situation"
      }
    },
    "q16": {
      "text": "The deadline is getting close. You...",
      "choices": {
        "a": "Prioritize and work through it",
        "b": "Lock in and finish it",
        "c": "Check in with others as I go",
        "d": "Rearrange things to make it work"
      }
    },
    "q17": {
      "text": "At a gathering, what do you often do?",
      "choices": {
        "a": "Help things run smoothly",
        "b": "Get intense when the topic is something I love",
        "c": "Talk to people who seem left out or quiet",
        "d": "Shift roles depending on the mood"
      }
    },
    "q18": {
      "text": "How do you choose a gift?",
      "choices": {
        "a": "Something useful and hard to miss with",
        "b": "Find one thing that really suits them",
        "c": "Imagine what would make them smile",
        "d": "Match it to what they need lately"
      }
    },
    "q19": {
      "text": "What do you do on a low-motivation day?",
      "choices": {
        "a": "Do the minimum and keep the rhythm",
        "b": "Focus on the part I care about most",
        "c": "Talk to someone and reset",
        "d": "Change the approach and start another way"
      }
    },
    "q20": {
      "text": "Someone has an idea you don't love. You...",
      "choices": {
        "a": "Keep what's useful and improve the rest",
        "b": "Explain clearly why I disagree",
        "c": "Say it without crushing their enthusiasm",
        "d": "Try combining it with another idea"
      }
    },
    "q21": {
      "text": "What matters most on a trip?",
      "choices": {
        "a": "Being able to relax and enjoy it",
        "b": "Having something I really want to see",
        "c": "That the people with me enjoy it",
        "d": "Being able to enjoy surprises too"
      }
    },
    "q22": {
      "text": "When cooking, you're more likely to...",
      "choices": {
        "a": "Follow the basics and make it reliable",
        "b": "Push it toward the flavor I love",
        "c": "Adjust it for the people eating",
        "d": "Improvise with what's available"
      }
    },
    "q23": {
      "text": "Before a big purchase, you...",
      "choices": {
        "a": "Compare carefully",
        "b": "Decide if I really want it",
        "c": "Think about how it affects others",
        "d": "Keep options open if circumstances change"
      }
    },
    "q24": {
      "text": "Unexpected compliment. You...",
      "choices": {
        "a": "Take it happily",
        "b": "Want to know exactly what they liked",
        "c": "Feel happy about their kindness too",
        "d": "Enjoy it, then quickly return to normal"
      }
    },
    "q25": {
      "text": "What's one of your strengths?",
      "choices": {
        "a": "I can be steady",
        "b": "I can go deep",
        "c": "I notice how people feel",
        "d": "I can adapt"
      }
    },
    "q26": {
      "text": "Something annoying happens. You...",
      "choices": {
        "a": "Handle it one piece at a time",
        "b": "Want to get to the root cause",
        "c": "Check whether anyone else is affected",
        "d": "Find the quickest workable route"
      }
    },
    "q27": {
      "text": "When people rely on you...",
      "choices": {
        "a": "Help if it's reasonable",
        "b": "If I take it on, I finish it",
        "c": "Want them to feel supported",
        "d": "Adjust the help to fit the situation"
      }
    },
    "q28": {
      "text": "Someone asks about something you love. You...",
      "choices": {
        "a": "Explain it simply",
        "b": "Accidentally give a very detailed answer",
        "c": "Start with what they might enjoy",
        "d": "Adjust how much I say"
      }
    },
    "q29": {
      "text": "Your ideal team?",
      "choices": {
        "a": "A team where roles work smoothly",
        "b": "A team where people really care",
        "c": "A team where people feel heard",
        "d": "A team that can adapt quickly"
      }
    },
    "q30": {
      "text": "Your schedule falls apart. You...",
      "choices": {
        "a": "Re-prioritize",
        "b": "Protect the one thing I really care about",
        "c": "Contact the people affected",
        "d": "Build a new plan on the spot"
      }
    },
    "q31": {
      "text": "What makes time feel well spent?",
      "choices": {
        "a": "Comfortable and satisfying",
        "b": "Time spent deeply engaged",
        "c": "Time shared well with someone",
        "d": "Time that took an interesting turn"
      }
    },
    "q32": {
      "text": "Finally, what matters most to you?",
      "choices": {
        "a": "Something that keeps working over time",
        "b": "Having something I can care deeply about",
        "c": "Feeling connected to people",
        "d": "Being able to adapt without losing myself"
      }
    }
  }
};

export const donutQuizEn = createDonutQuiz("en", DONUT_TEXT_EN);

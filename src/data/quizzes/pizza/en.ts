import { createPizzaQuiz, type PizzaText } from "./definition";

const PIZZA_TEXT_EN: PizzaText = {
  "title": "Pizza Type",
  "questions": {
    "q01": {
      "text": "Plans with friends fall through. What do you do first?",
      "choices": {
        "a": "Book our usual place so everyone can relax",
        "b": "Suggest somewhere interesting and get us moving",
        "c": "Suggest spending proper time at a longtime favorite",
        "d": "Ask what changed and work through the next option until it feels right"
      }
    },
    "q02": {
      "text": "Everyone wants to go somewhere different. You would…",
      "choices": {
        "a": "Put the ideas together into a plan we can act on",
        "b": "Drop a few requirements and try a completely different third option",
        "c": "Ask the people who have not had a say yet",
        "d": "Narrow it down to what matters most today"
      }
    },
    "q03": {
      "text": "Which part of travel planning do you tend to spend time on?",
      "choices": {
        "a": "Booking something new to do before slots fill up",
        "b": "Leaving plenty of time for a favorite place",
        "c": "Comparing reviews and spotting the differences",
        "d": "Checking the essentials so nobody gets stuck"
      }
    },
    "q04": {
      "text": "Rain interrupts an outdoor day. What now?",
      "choices": {
        "a": "Skip the long trip and explore an unfamiliar place nearby",
        "b": "Check on anyone struggling with the rain and find somewhere we can all move to",
        "c": "Trim the plan to what we can comfortably do",
        "d": "Pick an indoor meeting place and get everyone moving"
      }
    },
    "q05": {
      "text": "Someone gives you a new task. Your first instinct?",
      "choices": {
        "a": "Try a small version and learn by doing",
        "b": "Choose a standard and work until it feels right",
        "c": "Understand how it works before starting",
        "d": "Check the usual steps so users are not left with missing pieces"
      }
    },
    "q06": {
      "text": "The group project has stalled. You would…",
      "choices": {
        "a": "Drop the current approach and try a different one",
        "b": "Ask whoever is struggling what would help",
        "c": "Keep only the tasks that are actually needed",
        "d": "Sort out roles and decide the next step"
      }
    },
    "q07": {
      "text": "When reviewing something finished, you notice…",
      "choices": {
        "a": "Whether the part I care about meets my standard",
        "b": "Whether any small detail still feels off",
        "c": "Whether people can use it without confusion",
        "d": "Whether we can try it out and get a reaction"
      }
    },
    "q08": {
      "text": "A deadline is approaching. What is your move?",
      "choices": {
        "a": "Take a little work off someone who is overloaded",
        "b": "Decide what we can leave out",
        "c": "Redistribute the remaining work and get going together",
        "d": "Look for a different, shorter route"
      }
    },
    "q09": {
      "text": "At a gathering of new people, you tend to…",
      "choices": {
        "a": "Have a long chat with someone who shares a longtime interest",
        "b": "Listen first, then dig into a topic that catches my interest",
        "c": "Say hello and settle somewhere we can both talk comfortably",
        "d": "Start a conversation with someone"
      }
    },
    "q10": {
      "text": "The conversation goes quiet. You would…",
      "choices": {
        "a": "See whether anyone is waiting to speak",
        "b": "Read the room and avoid filling silence unnecessarily",
        "c": "Connect it to an earlier topic and bring others in",
        "d": "Ask a slightly unexpected question without a long setup"
      }
    },
    "q11": {
      "text": "A friend starts telling you about a new hobby. You…",
      "choices": {
        "a": "Ask exactly what makes it interesting",
        "b": "Ask how it fits their life and encourage them",
        "c": "If it sounds fun, arrange to try it",
        "d": "Get into how it connects with something I have loved for years"
      }
    },
    "q12": {
      "text": "What comes naturally in a group chat?",
      "choices": {
        "a": "Replying briefly with just the essentials",
        "b": "Gathering ideas so we can make a decision",
        "c": "Dropping in something unexpected that needs no long explanation",
        "d": "Helping someone who seems unsure how to reply"
      }
    },
    "q13": {
      "text": "What settles a shopping decision for you?",
      "choices": {
        "a": "Differences in how it is made that I noticed while comparing",
        "b": "Something dependable I could recommend to others",
        "c": "The urge to put it to use right away",
        "d": "Details I could keep appreciating for years"
      }
    },
    "q14": {
      "text": "How would you fix a small annoyance at home?",
      "choices": {
        "a": "Remove something and simplify the problem away",
        "b": "Ask everyone what they need and rearrange things",
        "c": "Try an unfamiliar tool that replaces several others",
        "d": "Notice what people need and arrange things to work for everyone"
      }
    },
    "q15": {
      "text": "Why do you keep returning to a favorite place?",
      "choices": {
        "a": "Everyone I bring can relax there every time",
        "b": "Every visit makes me want to try something",
        "c": "It has something unique that I have loved for years",
        "d": "I enjoy noticing the little thoughtful details"
      }
    },
    "q16": {
      "text": "How do you choose a gift?",
      "choices": {
        "a": "Compare ideas with others and choose something the recipient would enjoy",
        "b": "Something unexpected that is easy to look after",
        "c": "Remember a recent difficulty and compare ideas with others",
        "d": "Something simple with a clear use"
      }
    },
    "q17": {
      "text": "An unplanned day off. What feels right?",
      "choices": {
        "a": "Take it easy somewhere familiar, without putting pressure on myself or others",
        "b": "Get started on one thing I have thought of but never tried",
        "c": "Stay with a favorite activity until a satisfying stopping point",
        "d": "Look carefully into something I have been wondering about"
      }
    },
    "q18": {
      "text": "How do you spend a break?",
      "choices": {
        "a": "Get people together for a little time out",
        "b": "Try a different route or shop without making a big outing of it",
        "c": "Arrange a break that tired people can comfortably join",
        "d": "Check how tired I am, then turn off notifications and do nothing"
      }
    },
    "q19": {
      "text": "What helps you reset?",
      "choices": {
        "a": "Try a different physical activity and enjoy a small win",
        "b": "Spend time with a favorite creative work or hobby",
        "c": "Write down what is bothering me and work through it until it makes sense",
        "d": "Return to a familiar routine so I can be gentler with others too"
      }
    },
    "q20": {
      "text": "At the end of a busy week, what do you want?",
      "choices": {
        "a": "A small experience outside my routine that takes little preparation",
        "b": "Gentle company where we look after each other",
        "c": "Time to reconsider what I need and pare down plans and belongings",
        "d": "Time to reach out to people I like and get a gathering organized"
      }
    },
    "q21": {
      "text": "How do you like learning something unfamiliar?",
      "choices": {
        "a": "Get hands-on and learn from mistakes",
        "b": "Practice the part I enjoy until it feels right",
        "c": "Look into why it works the way it does",
        "d": "Check the basics in order so things go smoothly for others too"
      }
    },
    "q22": {
      "text": "You discover something interesting. What next?",
      "choices": {
        "a": "Try a simple combination with something I already have",
        "b": "Tell the people it could help and work out how they could use it together",
        "c": "Keep only the part that is useful to me",
        "d": "Bring interested people together to discuss it"
      }
    },
    "q23": {
      "text": "When showing someone how to do something, you…",
      "choices": {
        "a": "Cover the basics reliably, then take time over the details that matter",
        "b": "Ask what puzzles them and explain the reasoning",
        "c": "Explain the basics in an order they can follow",
        "d": "Jump in and try it together"
      }
    },
    "q24": {
      "text": "You need a fresh idea. How do you approach it?",
      "choices": {
        "a": "Ask who needs help with what, then connect people's ideas",
        "b": "Drop a few requirements and find the simplest version",
        "c": "Combine ideas from people into something workable",
        "d": "Try an unusual combination using only a few ingredients"
      }
    },
    "q25": {
      "text": "You notice a small mistake. You would…",
      "choices": {
        "a": "Redo the part I care about until I am satisfied",
        "b": "Trace the steps to see where things went off track",
        "c": "Check the basics so others do not get caught by the same mistake",
        "d": "Start fixing it right away, trying a different approach too"
      }
    },
    "q26": {
      "text": "When opinions clash, you tend to…",
      "choices": {
        "a": "Listen for what someone is finding hard to say",
        "b": "Focus on only what needs deciding now",
        "c": "Find common ground and propose a way forward",
        "d": "Step outside the two options and suggest a simpler alternative"
      }
    },
    "q27": {
      "text": "Something is taking longer than expected. Your thought?",
      "choices": {
        "a": "I want to trace what is slowing it down until I understand it properly",
        "b": "Let us find a pace that does not strain anyone",
        "c": "Let us try a new approach on one part and build momentum",
        "d": "If this part matters, I want to give it more time"
      }
    },
    "q28": {
      "text": "Requests suddenly pile up. You would…",
      "choices": {
        "a": "Be clear about what I can take on",
        "b": "Find people to share the work and divide it up",
        "c": "Try a different method that handles several at once",
        "d": "Hear from the person who needs help most"
      }
    },
    "q29": {
      "text": "Which compliment feels most like you?",
      "choices": {
        "a": "You notice things others miss",
        "b": "I can count on you to make sure nobody gets stuck",
        "c": "You spot something interesting to try and get started right away",
        "d": "You really care about what you love"
      }
    },
    "q30": {
      "text": "If you host a small gathering, what matters to you?",
      "choices": {
        "a": "Spot what creates extra work and simplify setup and cleanup",
        "b": "A plan that lets everyone join in",
        "c": "Keep preparation simple and add one unexpected touch",
        "d": "Making sure nobody feels pressured"
      }
    },
    "q31": {
      "text": "What makes you choose something again and again?",
      "choices": {
        "a": "It is dependable on a rough day, and I can recommend it with confidence",
        "b": "It makes me want to try something next",
        "c": "The more I know it, the more I appreciate it",
        "d": "I notice a new detail each time"
      }
    },
    "q32": {
      "text": "What one thing would make today better?",
      "choices": {
        "a": "Reaching out to get a plan going with someone",
        "b": "One small thing I have never tried that needs no preparation",
        "c": "A shared plan that is considerate of both me and others",
        "d": "Room made by checking what is actually needed"
      }
    }
  }
};

export const pizzaQuizEn = createPizzaQuiz("en", PIZZA_TEXT_EN);

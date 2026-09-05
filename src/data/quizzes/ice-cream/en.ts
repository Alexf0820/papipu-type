import { createIceCreamQuiz, type IceCreamText } from "./definition";

const ICE_CREAM_TEXT_EN: IceCreamText = {
  "title": "Ice Cream Type",
  "questions": {
    "q01": {
      "text": "You're somewhere with lots of people you don't know. What do you do?",
      "choices": {
        "a": "I don't force it. I talk when it feels natural.",
        "b": "I approach someone I'm curious about and read the vibe.",
        "c": "If someone seems interesting, I want to talk to them.",
        "d": "I'm fine on my own. I'll join when I feel like it."
      }
    },
    "q02": {
      "text": "A friend suddenly asks, “Can you hang out today?”",
      "choices": {
        "a": "If I'm free and in the mood, I'm in.",
        "b": "I check my plans and how I feel first.",
        "c": "If they seem to need me, I'll try to make it work.",
        "d": "If I need a day alone, I'll just say no."
      }
    },
    "q03": {
      "text": "When you're chatting in a group, which sounds most like you?",
      "choices": {
        "a": "My reactions tend to show on my face.",
        "b": "I like slipping a little humor into serious conversations.",
        "c": "I enjoy it when the topic keeps changing.",
        "d": "I'm happy just talking normally about what matters."
      }
    },
    "q04": {
      "text": "What matters most to you in relationships?",
      "choices": {
        "a": "A comfortable distance where nobody tries too hard.",
        "b": "Being able to care about the other person.",
        "c": "Being able to step back and be alone when I need to.",
        "d": "Being honest enough to really engage, likes and dislikes included."
      }
    },
    "q05": {
      "text": "You have a completely free day. What sounds best?",
      "choices": {
        "a": "I want to add one little twist to the day.",
        "b": "Go somewhere that catches my attention.",
        "c": "Nothing special—just an easy, comfortable day.",
        "d": "Spend a good time with someone I like."
      }
    },
    "q06": {
      "text": "You spot an unplanned shop while traveling.",
      "choices": {
        "a": "If the person I'm with wants to go in, I'm happy to join.",
        "b": "If it doesn't click with me, I just keep walking.",
        "c": "If it looks fun, I really want to check it out.",
        "d": "If the atmosphere and look appeal to me, I'm going in."
      }
    },
    "q07": {
      "text": "You suddenly get some unexpected free time at home.",
      "choices": {
        "a": "Try something I've been curious about.",
        "b": "Do something familiar and settle in.",
        "c": "Message someone or catch up for a bit.",
        "d": "Invent some slightly weird way to entertain myself."
      }
    },
    "q08": {
      "text": "Your plans get canceled because of rain.",
      "choices": {
        "a": "Fine by me—I switch gears and do something else.",
        "b": "Dive deep into something I love at home.",
        "c": "Turn it into a calm, nicely spent day.",
        "d": "Think of an alternative everyone can enjoy."
      }
    },
    "q09": {
      "text": "You come up with an interesting idea.",
      "choices": {
        "a": "First, I think of a simple way to make it doable.",
        "b": "I get excited and want to tell someone.",
        "c": "I want to give it my own playful twist.",
        "d": "I start wondering what other possibilities there are."
      }
    },
    "q10": {
      "text": "How do you decide on a big purchase?",
      "choices": {
        "a": "If I love it, I research it intensely.",
        "b": "I want the design and feel to be right too.",
        "c": "I choose something I can enjoy using for a long time.",
        "d": "If I don't need it, great reviews won't make me buy it."
      }
    },
    "q11": {
      "text": "When starting something new, which is most like you?",
      "choices": {
        "a": "If it sounds fun, my feelings move first.",
        "b": "I'd rather learn by playing than be perfect from the start.",
        "c": "I try different things and decide the direction as I go.",
        "d": "I learn the basics and start at a comfortable pace."
      }
    },
    "q12": {
      "text": "When you're torn, what usually decides it?",
      "choices": {
        "a": "Whether it feels right and aesthetically satisfying to me.",
        "b": "Whether everyone involved can move forward comfortably.",
        "c": "Whether I actually need it.",
        "d": "Which one I feel more strongly about."
      }
    },
    "q13": {
      "text": "You make a small mistake.",
      "choices": {
        "a": "If there's a funny side, I turn it into a little story.",
        "b": "Try a different approach.",
        "c": "Figure out why it happened and simply fix it next time.",
        "d": "If someone else is upset too, I check on them first."
      }
    },
    "q14": {
      "text": "Your plans fall apart unexpectedly.",
      "choices": {
        "a": "Adjust things so nobody is left in trouble.",
        "b": "Detach from it and switch to something else.",
        "c": "If it bothers me, I want to redo it properly.",
        "d": "Calm down and reconsider the whole picture."
      }
    },
    "q15": {
      "text": "What happens when you're annoyed?",
      "choices": {
        "a": "I look for something that can reset my mood.",
        "b": "I calm down and return to my usual self.",
        "c": "It tends to show in my face or voice.",
        "d": "Finding a slightly funny angle helps me feel better."
      }
    },
    "q16": {
      "text": "How do you recover after a rough day?",
      "choices": {
        "a": "I take some time alone and clear my head.",
        "b": "I pour myself into something I love.",
        "c": "I seek a quiet place or something that feels beautiful and calm.",
        "d": "I talk to someone or spend warm, comforting time together."
      }
    },
    "q17": {
      "text": "When making something as a team, what role feels natural?",
      "choices": {
        "a": "Do my part properly without making a fuss.",
        "b": "Pay attention to the mood and everyone's reactions.",
        "c": "Suggest an idea with a little playfulness.",
        "d": "Keep coming up with new options and alternate routes."
      }
    },
    "q18": {
      "text": "One person in the group seems to be struggling.",
      "choices": {
        "a": "Help in a practical way that I can manage.",
        "b": "If they don't want help, I won't force myself in.",
        "c": "If I decide to help solve it, I get seriously involved.",
        "d": "Quietly arrange things so it's easier for them to move forward."
      }
    },
    "q19": {
      "text": "A meeting is going nowhere.",
      "choices": {
        "a": "Say something that lightens the mood a little.",
        "b": "Throw in a playful twist or odd angle.",
        "c": "Suggest something from a completely different direction.",
        "d": "Go back to the basics and organize the situation."
      }
    },
    "q20": {
      "text": "Your team is split between different opinions.",
      "choices": {
        "a": "Judge by the overall balance and quality.",
        "b": "Look for a solution everyone can live with.",
        "c": "I'm fine splitting paths instead of forcing agreement.",
        "d": "If I strongly believe in an option, I'll explain why."
      }
    },
    "q21": {
      "text": "At a favorite restaurant, what do you order?",
      "choices": {
        "a": "Something familiar with a small twist.",
        "b": "Something I've never tried catches my eye.",
        "c": "Usually the dependable thing I already like.",
        "d": "Something cute or expressive that lifts my mood."
      }
    },
    "q22": {
      "text": "When choosing something, what catches your attention most?",
      "choices": {
        "a": "Whether it feels good for the people using it.",
        "b": "Whether it's clean and has only what I need.",
        "c": "Whether it has enough character for me to really love it.",
        "d": "Whether the color, shape, and texture meet my own standards."
      }
    },
    "q23": {
      "text": "How do you react to something that's suddenly trendy?",
      "choices": {
        "a": "I want to check it out at least once.",
        "b": "If it suits me, I'll use it normally.",
        "c": "If it looks fun, I react quickly.",
        "d": "I'd rather put my own spin on it than follow it exactly."
      }
    },
    "q24": {
      "text": "You've had the same favorite thing for years.",
      "choices": {
        "a": "If I still like it, I keep using it even if everyone else moves on.",
        "b": "If something excites me more, I can switch decisively.",
        "c": "I like the details too much to replace it casually.",
        "d": "The memories and connections make it hard to let go."
      }
    },
    "q25": {
      "text": "A completely new option suddenly appears.",
      "choices": {
        "a": "First I ask whether the current way is actually a problem.",
        "b": "If it excites me, I feel strongly pulled toward it.",
        "c": "I start imagining unusual ways to use it.",
        "d": "I research it and open up the possibilities."
      }
    },
    "q26": {
      "text": "Your environment changes dramatically.",
      "choices": {
        "a": "Once I know what to do, I focus and move.",
        "b": "Quietly reshape things until they fit me.",
        "c": "If people around me seem uneasy, I pay attention to them.",
        "d": "Cut what I don't need and build a new rhythm quickly."
      }
    },
    "q27": {
      "text": "You hear about a field you know nothing about.",
      "choices": {
        "a": "If it sounds interesting, I get visibly excited.",
        "b": "Some odd little detail is what hooks me.",
        "c": "I want to ask question after question.",
        "d": "I want to understand the basics first."
      }
    },
    "q28": {
      "text": "How are you with sudden changes?",
      "choices": {
        "a": "I take in the whole situation and return to my rhythm.",
        "b": "If we can help each other, we'll probably be fine.",
        "c": "Cut the unnecessary parts and switch quickly.",
        "d": "If it matters, change can make me move even harder."
      }
    },
    "q29": {
      "text": "Which sounds closest to your ideal everyday life?",
      "choices": {
        "a": "Little bits of play and surprise.",
        "b": "Frequent small discoveries.",
        "c": "Being myself without trying too hard.",
        "d": "Sharing feelings and good moments with people I love."
      }
    },
    "q30": {
      "text": "Which feels closest to one of your strengths?",
      "choices": {
        "a": "I can support people and make them feel at ease.",
        "b": "I can think for myself and move on when needed.",
        "c": "I can get intensely passionate about what I love.",
        "d": "I have my own sense of taste and standards."
      }
    },
    "q31": {
      "text": "When do you feel most like yourself?",
      "choices": {
        "a": "When something new has me excited.",
        "b": "When I'm simply being myself without forcing anything.",
        "c": "When I can openly show that I'm happy or excited.",
        "d": "When I've come up with something slightly weird."
      }
    },
    "q32": {
      "text": "What do you want to value most in life?",
      "choices": {
        "a": "My own pace and freedom.",
        "b": "Something I can care about deeply.",
        "c": "A sense of what feels beautiful and right to me.",
        "d": "Enough room in my life to be kind to people."
      }
    }
  }
};

export const iceCreamQuizEn = createIceCreamQuiz("en", ICE_CREAM_TEXT_EN);

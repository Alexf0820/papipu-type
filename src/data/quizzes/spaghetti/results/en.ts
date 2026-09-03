import type { QuizResultContent } from "@/lib/type-engine/resolveResult";

export const spaghettiResultContentEn: QuizResultContent = {
  carbonara: {
    displayName: "Carbonara",
    visualKey: "spaghetti-carbonara",
    variations: {
      a: {
        body: "You're the kind of person who just can't ignore someone who needs help.\n\nWhen people around you are having a good time, somehow you feel better too. You don't think you're doing anything special, but people naturally seem to gather around you.\n\nThe downside? You occasionally help so much that you end up involved in the whole mess.\n\nYour relationships are just like your pasta: rich and creamy.",
      },
      b: {
        body: "There's something reassuring about having you around.\n\nYou don't need to take over the room. Somehow, things just feel a little warmer when you're there.\n\nWhen someone needs help, you'll say, \"Fine, fine...\" and then proceed to do way more than expected.\n\nThe funny part is, you probably don't even realize how much you do for people.\n\nBasically, you're the sauce holding everyone together.",
      },
      c: {
        body: "You care a lot about your favorite people, places, and little routines.\n\nNew experiences are great, but sooner or later you tend to come back to, \"Yeah... this is where I belong.\"\n\nYou get attached to people too.\n\nOnce you're tangled up with someone, you're not getting loose that easily. Just like spaghetti.",
      },
    },
    mottos: [
      "Everything tastes better together.",
      "If you need help... fine, I'll help.",
      "A little extra richness never hurt anyone.",
    ],
    good: {
      typeId: "bolognese",
      reason:
        "Your warmth pairs perfectly with Bolognese's steady reliability. You can relax without worrying about everything yourself.",
    },
    bad: {
      typeId: "squidInk",
      reason:
        "Carbonara wants to get closer. Squid Ink occasionally wants everyone to back up three feet.",
    },
  },
  bolognese: {
    displayName: "Bolognese",
    visualKey: "spaghetti-bolognese",
    variations: {
      a: {
        body: "You're dependable.\n\nWhen something goes wrong, people tend to think, \"Ask them. They'll know what to do.\"\n\nYou prefer steady progress over dramatic last-minute miracles.\n\nTo you, you're just doing the obvious thing. To everyone else, you're surprisingly reassuring.\n\nYou're basically the classic menu item of humanity.",
      },
      b: {
        body: "Before jumping in, you tend to ask, \"Wait... is this actually a good idea?\"\n\nYou're not against trying new things. You just don't see why everyone needs to sprint toward something nobody understands yet.\n\nThat means fewer disasters.\n\nIt also means Arrabbiata may already be halfway there while you're still checking the map.\n\nYou win on stability. Speed? Let's not discuss that.",
      },
      c: {
        body: "You're the kind of person who'll probably still be around after every trend has disappeared.\n\nWith people, possessions, and decisions, you care about whether something will actually last.\n\nYou may not make the loudest first impression.\n\nBut the longer people know you, the more they think:\n\n\"Huh. You're actually really great.\"",
      },
    },
    mottos: [
      "If it's solid, it'll probably be fine.",
      "When in doubt, go with the classic.",
      "Reliability beats flash.",
    ],
    good: {
      typeId: "carbonara",
      reason:
        "Warmth plus stability. Extremely low drama. Excellent sauce compatibility.",
    },
    bad: {
      typeId: "arrabbiata",
      reason: '"Let\'s think about this" meets "I already did it."',
    },
  },
  aglioOlio: {
    displayName: "Aglio e Olio",
    visualKey: "spaghetti-aglio-e-olio",
    variations: {
      a: {
        body: "You don't feel the need to do everything as a group.\n\nIt's not that you dislike people. You just occasionally wonder why something one person could handle requires a committee meeting.\n\nYou like what you like. You skip what you don't need.\n\nYour relationships—and probably your luggage—are fairly lightweight.",
      },
      b: {
        body: "You look simple on the surface, but you're surprisingly particular.\n\nYou might say, \"Anything's fine,\" while secretly knowing that anything is absolutely not fine.\n\nYou don't need extras.\n\nBut the important stuff? That needs to be right.\n\nThe fewer the ingredients, the harder it is to hide mistakes.",
      },
      c: {
        body: "You like moving at your own pace.\n\nBeing rushed doesn't help. Everyone else doing something doesn't automatically mean you should do it too.\n\nBut once you decide something matters, you're perfectly capable of doing it alone.\n\nSome people may mistake that for being distant.\n\nYou're not distant. You're just properly seasoned with garlic.",
      },
    },
    mottos: [
      "If I don't need it, I don't need it.",
      "My pace is a perfectly good pace.",
      "Simple doesn't mean lazy.",
    ],
    good: {
      typeId: "mushroom",
      reason:
        "Neither of you needs constant conversation. Quiet can actually be comfortable.",
    },
    bad: {
      typeId: "seafood",
      reason:
        'Seafood: "Come on, let\'s go!"\n\nAglio e Olio: "No."\n\nNobody is angry. This is just how it is.',
    },
  },
  pesto: {
    displayName: "Pesto",
    visualKey: "spaghetti-pesto",
    variations: {
      a: {
        body: 'You have a pretty clear sense of what you like.\n\nPopular, famous, trending—none of those automatically mean much to you.\n\nIf something clicks, you love it.\n\nIf it doesn\'t, the entire internet could be obsessed and your response would still be:\n\n"Huh."',
      },
      b: {
        body: 'You have strangely specific standards about certain things.\n\nOther people may look at you and think, "Wait... that\'s the part you care about?"\n\nYes. That part.\n\nThose little preferences are also what make you distinctly you.\n\nNot every plate needs to be tomato red. Someone has to be green.',
      },
      c: {
        body: 'When the conversation reaches something you love, your resolution suddenly increases to 4K.\n\nNormally you\'re easygoing.\n\nThen someone says something slightly wrong about your favorite subject and suddenly:\n\n"Well, technically..."\n\nCongratulations. You are now the expert.\n\nYes, you probably have opinions about the basil ratio.',
      },
    },
    mottos: [
      "I like what I like.",
      "Different is fine.",
      "That part is non-negotiable.",
    ],
    good: {
      typeId: "squidInk",
      reason:
        "Neither of you is particularly bothered by being different. Weirdly compatible weirdos.",
    },
    bad: {
      typeId: "bolognese",
      reason:
        'Bolognese: "The classic works."\n\nPesto: "That\'s exactly the problem."',
    },
  },
  arrabbiata: {
    displayName: "Arrabbiata",
    visualKey: "spaghetti-arrabbiata",
    variations: {
      a: {
        body: "Sometimes you're already moving before you've finished thinking.\n\nWhen something sounds worth trying, you tend to start.\n\nThat means you catch opportunities other people are still discussing.\n\nOf course, starting first also means occasionally discovering the problem first.\n\nSometimes life gets spicy. Appropriate, really.",
      },
      b: {
        body: "People can usually tell how you feel.\n\nHappy means happy. Annoyed means annoyed. Excited means very excited.\n\nYou're relatively low on hidden agendas, which actually makes you easy to understand.\n\nBut when you're fired up, perhaps give yourself a minute.\n\nThe sauce is boiling.",
      },
      c: {
        body: "You'd rather try something once than spend forever wondering whether it might work.\n\nIf it fails? Fine. Try the next thing.\n\nWhile everyone else is still discussing the plan, you've already made a prototype.\n\nInstructions can be read afterward. Probably.",
      },
    },
    mottos: ["Just try it.", "Move while the idea is hot.", "Failed? Next."],
    good: {
      typeId: "seafood",
      reason:
        "Curiosity meets action. Something is definitely going to happen. Whether it was planned is another question.",
    },
    bad: {
      typeId: "bolognese",
      reason:
        "One wants another five minutes to think. The other left ten minutes ago.",
    },
  },
  seafood: {
    displayName: "Seafood",
    visualKey: "spaghetti-seafood",
    variations: {
      a: {
        body: "Interesting things have a habit of catching your attention.\n\nNew places. New people. New ideas.\n\nIf your brain says, \"What's that?\" there's a decent chance you're going to investigate.\n\nAs a result, you tend to collect experiences, stories, and connections.\n\nYour plate—and possibly your calendar—is fully loaded.",
      },
      b: {
        body: 'You can enjoy things alone, but sharing them makes them better.\n\nWhen you discover something fun, your first instinct is often:\n\n"Hey, look at this."\n\nKeeping all the good stuff to yourself just feels wasteful.\n\nWhy stop at shrimp when you can add clams too?',
      },
      c: {
        body: 'Your curiosity points in several directions at once.\n\nYou can suddenly become obsessed with something you didn\'t care about yesterday.\n\nMore hobbies appear.\n\nMore places get added to the list.\n\nMore people somehow enter your life.\n\nEventually you may stop and wonder:\n\n"Wait... what exactly am I busy with?"',
      },
    },
    mottos: [
      "Looks interesting. Let's go.",
      "We're here. We might as well enjoy it.",
      "Why have one thing when you can try several?",
    ],
    good: {
      typeId: "arrabbiata",
      reason: '"That looks fun!" → "Let\'s do it!" happens dangerously fast.',
    },
    bad: {
      typeId: "aglioOlio",
      reason:
        "Seafood keeps inviting. Aglio e Olio keeps being perfectly happy at home.",
    },
  },
  mushroom: {
    displayName: "Mushroom",
    visualKey: "spaghetti-mushroom",
    variations: {
      a: {
        body: "You may look quiet, but there's quite a lot happening upstairs.\n\nYou notice things other people miss and sometimes, much later, casually say something that goes straight to the heart of the problem.\n\nNot talking doesn't mean not thinking.\n\nThere's an entire underground network happening down there.",
      },
      b: {
        body: "When something catches your attention, you want to know a little more.\n\nThen a little more.\n\nThen somehow you're reading something so specific that even you have to wonder how you got there.\n\nWas all that information necessary?\n\nProbably not.\n\nWill it become unexpectedly useful six months from now? Absolutely.",
      },
      c: {
        body: "You're pretty good at listening and observing before deciding what you think.\n\nYou don't always rush toward conclusions. You let things sit for a while.\n\nThat can make your decisions slower.\n\nBut once they're ready,\n\nthey tend to have some depth. Consider them slow-grown.",
      },
    },
    mottos: [
      "Let me think about it.",
      "If I'm curious, I'm looking it up.",
      "Quiet doesn't mean inactive.",
    ],
    good: {
      typeId: "aglioOlio",
      reason: "Comfortable distance. Comfortable silence. Nobody panics.",
    },
    bad: {
      typeId: "arrabbiata",
      reason:
        "Mushroom is still considering the options. Arrabbiata has completed option three.",
    },
  },
  squidInk: {
    displayName: "Squid Ink",
    visualKey: "spaghetti-squid-ink",
    variations: {
      a: {
        body: 'Being different doesn\'t bother you very much.\n\nWhen someone says, "Most people do it this way," your reaction may simply be:\n\n"Oh. Okay."\n\nYou\'re not necessarily trying to rebel.\n\nYou just forgot that "normal" was supposed to be the reference point.',
      },
      b: {
        body: "You're not always easy to read at first.\n\nPeople may occasionally wonder what you're thinking.\n\nThen they get to know you and realize you're actually pretty normal.\n\nAnd just when they relax...\n\nyou say something extremely strange.\n\nNever let them get too comfortable.",
      },
      c: {
        body: "You have your own category of \"I just like this.\"\n\nMaybe you can't explain it.\n\nMaybe it's not popular.\n\nMaybe nobody else understands.\n\nThat's fine.\n\nOver time, those unusual preferences become part of what makes you interesting.\n\nThere is, however, the small matter of turning your entire mouth black.",
      },
    },
    mottos: [
      "Normal is optional.",
      "The right people will get it.",
      "If I find it interesting, that's enough.",
    ],
    good: {
      typeId: "pesto",
      reason:
        "Two independent operating systems that somehow communicate surprisingly well.",
    },
    bad: {
      typeId: "carbonara",
      reason:
        "Carbonara moves closer. Squid Ink moves one step back. Repeat until friendship is achieved.",
    },
  },
};

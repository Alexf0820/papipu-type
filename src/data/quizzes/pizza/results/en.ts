import type { QuizResultContent } from "@/lib/type-engine/resolveResult";

export const pizzaResultContentEn: QuizResultContent = {
  "margherita": {
    "displayName": "Margherita",
    "visualKey": "pizza-margherita",
    "variations": {
      "a": {
        "body": "You do not make a big production of things, but you follow through.\n\nWhen everyone is undecided, you get the basics in place. It may feel ordinary to you; it is quite a relief to everyone else.\n\nTomato, cheese, basil. You can stop there when the foundations are good."
      },
      "b": {
        "body": "You are interested in new things, but would rather keep what works than change everything at once.\n\nThat care helps people feel secure.\n\nIt is fine to stray from the usual sometimes. Even Margherita had to be ordered for the first time."
      },
      "c": {
        "body": "When you find people or places you like, you want them in your life for a while.\n\nA comfortable return matters more than a spectacular one-off.\n\nSomeone says, “This again?” You say, “This again!”\n\nThere is no hesitation in your usual order."
      }
    },
    "mottos": [
      "Good basics keep their appeal.",
      "“The usual” says it all.",
      "Dependability has its own flavor."
    ],
    "good": {
      "typeId": "veggie",
      "reason": "Margherita provides a steady base while Veggie checks on everyone. It makes for a comfortable table."
    },
    "bad": {
      "typeId": "hawaiian",
      "reason": "Margherita says, “The usual.” Hawaiian says, “Add pineapple.” One shared pizza, two different orders."
    }
  },
  "pepperoni": {
    "displayName": "Pepperoni",
    "visualKey": "pizza-pepperoni",
    "variations": {
      "a": {
        "body": "If too much thinking means letting things go cold, you would rather take the first bite.\n\nYou start small and adjust as you go. When you move, others find it easier to join in.\n\nNot everyone is at the same temperature, though.\n\nA quick heads-up before setting off helps keep the group together."
      },
      "b": {
        "body": "When “Will someone do it?” hangs in the air, you can raise your hand.\n\nYou do not need perfect preparation to give something a try. Even a failed attempt is useful if it reveals a next step.\n\nWith that momentum, breaks can slip your mind.\n\nEven an oven has an off switch."
      },
      "c": {
        "body": "When something interests you, watching is not quite enough.\n\nYou make the booking, send the invitation, or try it yourself. You turn a first step into an actual action.\n\nThat speed is useful. Just leave time for people to reply.\n\nPizza is best while hot. Set off once everyone has answered."
      }
    },
    "mottos": [
      "Quick on the first bite.",
      "Try a little while the idea is hot.",
      "Momentum needs breaks too."
    ],
    "good": {
      "typeId": "seafood",
      "reason": "Seafood turns Pepperoni’s first step into a group plan. A starter and an organizer can get moving quickly."
    },
    "bad": {
      "typeId": "mushroom",
      "reason": "Pepperoni takes another bite. Mushroom asks, “What makes that flavor different?” Before the tasting notes are ready, another slice is gone."
    }
  },
  "quattroFormaggi": {
    "displayName": "Quattro Formaggi",
    "visualKey": "pizza-quattro-formaggi",
    "variations": {
      "a": {
        "body": "Bring up something you love and your explanations suddenly get very detailed.\n\n“They are all the same” does not sound right to you. The more differences you discover, the more you appreciate them.\n\nThat enthusiasm shows in the care you put into things.\n\nOne cheese might be enough. Just not always in your book."
      },
      "b": {
        "body": "You do not like leaving an important detail at “close enough.”\n\nYou would rather take time to adjust it and feel satisfied before sharing it.\n\nSometimes, though, the other person was only asking for a quick answer.\n\nServe the rich explanation one slice at a time."
      },
      "c": {
        "body": "You would rather go deep with something you love than skim lots of things.\n\nEach return reveals a detail you missed. Instead of getting bored, you find more to talk about.\n\nThat is a lovely quality.\n\nJust check occasionally whether your listener is full."
      }
    },
    "mottos": [
      "More to say. More cheese.",
      "Keep the important parts rich.",
      "Rich stories, one slice at a time."
    ],
    "good": {
      "typeId": "mushroom",
      "reason": "Mushroom asks about the details Quattro Formaggi cares about. Even after a long explanation, there is another question."
    },
    "bad": {
      "typeId": "marinara",
      "reason": "Quattro Formaggi says, “One more cheese.” Marinara says, “It is finished.” Their definitions of done are one cheese apart."
    }
  },
  "mushroom": {
    "displayName": "Mushroom",
    "visualKey": "pizza-mushroom",
    "variations": {
      "a": {
        "body": "You notice small differences beneath the obvious ones.\n\nYou listen and check before offering an opinion. You may be quiet, but there is plenty going on in your head.\n\nFlavor is not measured by how loudly a topping announces itself."
      },
      "b": {
        "body": "You find it hard to leave a “why?” unexplored.\n\nFollowing the reasons can uncover something everyone else missed.\n\nOf course, one answer sometimes opens three more questions.\n\nIt is fine to stop at “enough for now” before the pizza goes cold."
      },
      "c": {
        "body": "You want to hear someone out before finding the right thing to say.\n\nYou may not reply instantly, but you remember what they said. People often appreciate that care a little later.\n\nIt is also fine to share a thought before it is perfectly ready.\n\nYou do not have to keep all the flavor inside."
      }
    },
    "mottos": [
      "Small differences add flavor.",
      "Even a bite has a backstory.",
      "Share what you notice."
    ],
    "good": {
      "typeId": "quattroFormaggi",
      "reason": "Mushroom notices details; Quattro Formaggi cares deeply about them. One tiny difference could keep the conversation going all evening."
    },
    "bad": {
      "typeId": "pepperoni",
      "reason": "While Mushroom considers what makes a bite different, Pepperoni takes the next one. Just as a question comes up, Pepperoni’s mouth is full again."
    }
  },
  "seafood": {
    "displayName": "Seafood",
    "visualKey": "pizza-seafood",
    "variations": {
      "a": {
        "body": "You can hear different opinions and turn them into a workable whole.\n\nRather than doing everything yourself, you like bringing people’s strengths together.\n\nSomehow, you often become the person coordinating messages.\n\nYou can bring shrimp and squid together without taking responsibility for the entire order."
      },
      "b": {
        "body": "You naturally think about who could work well together.\n\nFinding a plan people can act on matters more than having the one perfect answer yourself.\n\nBut piling on every wish can make things heavy.\n\nA pizza base has limits. So does your schedule."
      },
      "c": {
        "body": "When a conversation gets scattered, you want to say, “So, shall we do this?”\n\nYou keep the useful parts of different ideas and make a next step. It feels good when things start moving.\n\nPeople can rely on that ability.\n\nRemember to include a topping you like too."
      }
    },
    "mottos": [
      "Try putting the differences together.",
      "The organizer gets a slice too.",
      "I can get shrimp and squid together."
    ],
    "good": {
      "typeId": "pepperoni",
      "reason": "Seafood gets the plan together and Pepperoni gets it started. Their discussions tend to become actions."
    },
    "bad": {
      "typeId": "marinara",
      "reason": "Seafood wants everyone’s toppings on the pizza. Marinara wants fewer. Addition and subtraction start on the very same base."
    }
  },
  "hawaiian": {
    "displayName": "Hawaiian",
    "visualKey": "pizza-hawaiian",
    "variations": {
      "a": {
        "body": "“You would put those together?” makes you a little curious.\n\nYou enjoy stepping outside familiar combinations and finding something unexpectedly good.\n\nOf course, not everyone will love it.\n\nTrying it on your own slice first keeps the table peaceful."
      },
      "b": {
        "body": "Given two fixed options, you sometimes bring in a third.\n\nYou may not be trying to be different; you can simply see another interesting route.\n\nThat idea can get a stuck conversation moving.\n\nJust explain the new topping before putting it on everyone’s pizza."
      },
      "c": {
        "body": "A different route, an unfamiliar shop, a slightly odd combination.\n\nSmall experiments lift your mood. You do not need a grand adventure to make a day feel fresh.\n\nIf it does not suit you, you can go back next time.\n\nYou have not bet your whole life on one piece of pineapple."
      }
    },
    "mottos": [
      "Look for the unexpected match.",
      "Try it on your own slice first.",
      "The usual, with pineapple."
    ],
    "good": {
      "typeId": "pepperoni",
      "reason": "Hawaiian asks, “What about this?” Pepperoni says, “Let us try.” The tasting happens quickly."
    },
    "bad": {
      "typeId": "margherita",
      "reason": "Hawaiian says, “Pineapple works too.” Margherita says, “I like the usual.” Go half-and-half and the border becomes unusually clear."
    }
  },
  "veggie": {
    "displayName": "Veggie",
    "visualKey": "pizza-veggie",
    "variations": {
      "a": {
        "body": "You tend to notice whether everyone is enjoying themselves.\n\nRather than taking over, you quietly check on someone who seems stuck. That small gesture can make the whole group more comfortable.\n\nYou do not have to shrink your own wishes, though.\n\nThere is room for your bell pepper on this pizza too."
      },
      "b": {
        "body": "You often spot a small inconvenience before anyone mentions it.\n\nYou bring what is missing or help someone join the conversation. Your help can be so subtle it goes unnoticed.\n\nStill, you do not have to take on everything.\n\nAdding color to the table is not the same as running the whole restaurant."
      },
      "c": {
        "body": "You care about people being comfortable enough to be themselves.\n\nEven with different preferences, you want everyone to have a place.\n\nThat kindness can bring quite a few requests your way.\n\nLet yourself say, “That is enough for today.” Even a vegetable patch needs a rest."
      }
    },
    "mottos": [
      "Remember your own portion.",
      "Small acts of care still reach people.",
      "My plate counts too."
    ],
    "good": {
      "typeId": "margherita",
      "reason": "Margherita’s steady pace supports Veggie’s care. Neither needs to do all the work alone."
    },
    "bad": {
      "typeId": "pepperoni",
      "reason": "Veggie is checking that everyone has a plate. Pepperoni is already on the first bite. Setting the table and starting to eat run on slightly different clocks."
    }
  },
  "marinara": {
    "displayName": "Marinara",
    "visualKey": "pizza-marinara",
    "variations": {
      "a": {
        "body": "Before adding something, you ask whether it is needed.\n\nOnce you know what matters, you can let other things go. Having less does not feel empty when you know it is enough.\n\nTomato and garlic already make you happy.\n\nYou did not forget the cheese."
      },
      "b": {
        "body": "You are good at pulling the main point out of a complicated discussion.\n\nOnce there is one clear decision, you can move.\n\nBeing too brief can leave someone searching for your reasoning, though.\n\nA light topping and an extra spoonful of explanation can work well together."
      },
      "c": {
        "body": "You like leaving space in your schedule and your bag.\n\nRather than carrying everything, you choose what matters and stay light.\n\nTurning down an invitation does not mean you have stopped liking someone.\n\nA pizza with some base showing can still be complete."
      }
    },
    "mottos": [
      "Leaving it out is an option.",
      "Leave room to see what matters.",
      "No cheese. On purpose."
    ],
    "good": {
      "typeId": "mushroom",
      "reason": "Marinara narrows the focus and Mushroom checks the reasoning. A few ingredients can still make a satisfying result."
    },
    "bad": {
      "typeId": "quattroFormaggi",
      "reason": "Marinara says, “That is enough.” Quattro Formaggi says, “One more cheese.” Even an empty patch of pizza divides opinion."
    }
  }
};

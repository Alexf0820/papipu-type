import type { QuizResultContent } from "@/lib/type-engine/resolveResult";

// Replace only with approved English result content.
export const sushiResultContentEn: QuizResultContent = {
  tuna: { displayName: "Tuna", visualKey: "sushi-tuna", variations: { a: { body: `You're the kind of person who generally has things together.

If you say you'll do something, you try to do it. If someone relies on you, you tend to remember.

To you, this probably feels completely normal.

To everyone else, it's surprisingly reassuring.

You don't hate unusual things.

But sooner or later, you tend to come back to the classics.

In sushi and in life, tuna is hard to beat.` }, b: { body: `You'd rather think for a moment than charge ahead on pure momentum.

You might say, "It'll probably be fine," but that doesn't mean you haven't already checked three things in your head.

As a result, major disasters are relatively rare.

Does that sound a little boring?

Don't worry.

Not many people complain when tuna shows up.` }, c: { body: `You value things that can stay in your life for a long time.

People, possessions, places—once something really matters to you, you don't replace it easily.

It's not:

"This is good enough."

It's:

"This is the one I like."

Same people. Same places. Same tuna.

Honestly, that's not a bad life.` } }, mottos: ["If you've got things handled, you'll probably be fine.", "Classics become classics for a reason.", "I like things that last."], good: { typeId: "egg", reason: "Tuna brings stability; Egg brings calm. Almost nothing happens. Surprisingly, that's wonderful." }, bad: { typeId: "salmonRoe", reason: "Tuna says, \"Let's think about this first.\" Salmon Roe has already wandered off toward something interesting." } },
  salmon: { displayName: "Salmon", visualKey: "sushi-salmon", variations: { a: { body: `You're pretty good at making people feel comfortable around you.

You're not necessarily the loudest or most social person in the room.

You're just... easy to talk to.

Before you know it, people are asking your opinion, telling you things, or inviting you somewhere.

You probably don't think you're doing anything special.

Some things are just naturally popular. Salmon understands.` }, b: { body: `Spending good time with people you care about matters to you.

Being alone is fine.

But sometimes you'll discover something and immediately think:

"This would be more fun with someone."

Good food? Share it.

Something funny? Show somebody.

Rich in fat. Rich in friendship.` }, c: { body: `You're friendly, but that doesn't mean you agree with everyone.

You have your own likes and dislikes.

You just don't feel the need to turn every disagreement into an event.

That makes people think:

"You're easy to be around."

Turns out being popular—in sushi and in life—usually has a reason.` } }, mottos: ["It's better when we're having fun together.", "Good things are better shared.", "Let's just get along."], good: { typeId: "shrimp", reason: "Salmon is approachable, Shrimp brings the energy. Somehow more people keep joining." }, bad: { typeId: "squid", reason: "Salmon says, \"Let's do it together.\" Squid says, \"I'm fine on my own.\" Nobody is upset." } },
  shrimp: { displayName: "Shrimp", visualKey: "sushi-shrimp", variations: { a: { body: `Fun has a way of getting your attention.

If people nearby are laughing, you want to know why.

If something sounds entertaining, you're tempted to join.

It's not that you can't sit quietly.

You just occasionally think:

"If everyone's having fun, why am I over here?"` }, b: { body: `Doing things with other people gives you energy.

Going somewhere. Eating something. Talking about absolutely nothing.

Sometimes what you remember most isn't what you did—it's who was there.

You can travel alone.

But afterward, you're definitely telling somebody about it.

Even your tail looks enthusiastic.` }, c: { body: `When things get a little too quiet, you tend to want something to happen.

Start a conversation.

Suggest something.

Invite somebody.

You may not even realize you're helping the room come alive.

Of course, on low-energy days you do absolutely none of this.

Even shrimp don't jump every day.` } }, mottos: ["We're here. Let's have fun.", "Better together.", "If it looks fun, I'm joining."], good: { typeId: "salmon", reason: "Friendly Salmon plus energetic Shrimp. Somehow this becomes a group activity." }, bad: { typeId: "egg", reason: "Shrimp: \"Let's go do something!\" Egg: \"Do we have to?\" Different weekend speeds." } },
  egg: { displayName: "Egg", visualKey: "sushi-egg", variations: { a: { body: `You don't push yourself harder than necessary.

Not because you can't.

You're just capable of asking:

"Do we really need to try this hard?"

Everyone else can sprint if they want.

If walking gets you there just fine, you'll walk.

Strangely enough, you often arrive at about the same time.

Yellow, yes.

Reckless, no.` }, b: { body: `You're easy to relax around.

Nobody has to keep talking.

Nobody has to entertain anybody.

You can just be in the same place, doing your own things.

That kind of time actually feels pretty good.

Not everything needs excitement.

A life that's exciting every five minutes sounds exhausting.` }, c: { body: `You're relatively gentle with yourself and with other people.

If something goes wrong:

"Well, some days are like that."

If someone's tired, you don't drag them forward just because the schedule says so.

One warning:

Don't let people mistake your kindness for permission to dump all their work on you.

Egg has limits too.` } }, mottos: ["You don't have to force it.", "Take it easy.", "Peace is underrated."], good: { typeId: "tuna", reason: "Egg brings calm; Tuna brings stability. Very peaceful. Almost suspiciously peaceful." }, bad: { typeId: "shrimp", reason: "\"Let's go out!\" meets \"Can't we just stay home?\" Weather may decide the winner." } },
  salmonRoe: { displayName: "Salmon Roe", visualKey: "sushi-salmon-roe", variations: { a: { body: `You say "What's that?" a lot.

Something unfamiliar? Interesting.

A new restaurant? Interesting.

Someone doing something fun? Also interesting.

You won't try everything.

But the antenna is always moving.

Lots of little eggs. Lots of little interests.` }, b: { body: `You're good at finding small things that make life more interesting.

A new product.

A street you've never taken.

A slightly strange shop everyone else walks past.

You notice things other people might ignore and think:

"Huh. That looks fun."

This occasionally adds several things to a day that had absolutely no room for them.

Worth it? Probably.` }, c: { body: `When something catches your interest, you can accelerate very quickly.

Yesterday you knew nothing about it.

Today you've somehow read twelve articles.

Then something else catches your eye.

Do you go broad?

Sometimes.

Deep?

Also sometimes.

Even you don't know what's next.` } }, mottos: ["If I'm curious, I'm looking.", "Interesting is usually a good reason.", "Don't miss the little fun things."], good: { typeId: "squid", reason: "Salmon Roe discovers something weird. Squid immediately takes it in an even weirder direction." }, bad: { typeId: "tuna", reason: "Salmon Roe wants a detour. Tuna would like to remain on the route. Oddly useful travel partners, though." } },
  eel: { displayName: "Eel", visualKey: "sushi-eel", variations: { a: { body: `Most of the time, you seem pretty normal.

Then the switch flips.

Once you decide, "I'm doing this," you can suddenly move very fast.

By the time everyone else realizes you were serious, you've already made progress.

The sauce isn't the only thing with intensity.` }, b: { body: `You don't love ending on a loss.

Failure bothers you.

But after the disappointment comes another thought:

"Okay. Again."

You're good at turning frustration into fuel.

Just don't turn everything into a competition.

Three losses at rock-paper-scissors can be allowed to disappear into history.` }, c: { body: `When the moment matters, you can commit.

That doesn't mean you make every decision instantly.

But when something inside says:

"Now."

you move.

For that moment, you're often one step ahead.

You don't run at full power all the time.

That's exactly why there's power left when you need it.` } }, mottos: ["Once I decide, I go.", "One more try.", "Move when it matters."], good: { typeId: "sushiRoll", reason: "Eel moves things forward; Sushi Roll keeps everything together. Surprisingly strong team." }, bad: { typeId: "egg", reason: "Eel says, \"One more try!\"\n\nEgg says, \"Haven't we done enough for today?\"\n\nYour definitions of \"enough\" may be slightly different." } },
  sushiRoll: { displayName: "Sushi Roll", visualKey: "sushi-sushi-roll", variations: { a: { body: `You somehow end up watching the whole picture.

Who's doing what?

Where are things getting stuck?

Is somebody being left out?

You don't necessarily want to be in charge.

But when everything starts going in different directions, you feel a strange urge to wrap it all together.

It's the seaweed. You can't help it.` }, b: { body: `You're pretty good at connecting people who don't naturally agree.

Even when Person A and Person B want completely different things, you tend to look for the middle:

"What if we do it this way?"

Maybe nobody gets 100% of what they wanted.

But if everyone gets 80%, that's actually pretty good.

Different ingredients. One roll.` }, c: { body: `You're often more concerned with whether the whole group is working than whether your part alone is going well.

That can mean noticing problems that technically aren't yours.

Useful?

Very.

Dangerous?

Also yes.

Don't wrap absolutely everything.

Sometimes you're allowed to be one of the ingredients.` } }, mottos: ["If everyone comes together, we'll figure it out.", "Look at the whole picture.", "Different doesn't mean we can't work together."], good: { typeId: "eel", reason: "Eel brings momentum. Sushi Roll keeps everything organized. Put them together and things actually get done." }, bad: { typeId: "squid", reason: "Sushi Roll wants everyone aligned.\n\nSquid asks, \"Why do we need to be aligned?\"\n\nThe meeting may run a little long." } },
  squid: { displayName: "Squid", visualKey: "sushi-squid", variations: { a: { body: `Being different from everyone else doesn't bother you very much.

If everyone goes right but something interesting is happening on the left, you may simply go left.

You're not trying to rebel.

You're just using your own sensors.

Occasionally, everyone else forgets to follow.` }, b: { body: `There's something slightly unusual about the way your mind works.

You can be having a perfectly normal conversation and suddenly someone asks:

"Wait... why did THAT catch your attention?"

You don't know.

It just did.

And honestly, that little difference is part of what makes you interesting.

White sushi. Strong personality.` }, c: { body: `You don't always need a reason for liking something.

"Why do you like it?"

"I don't know. I just do."

Good enough.

You don't feel much need to change your tastes just so other people understand them.

The people who get it will get it.

The people who don't?

That's fine too.

Very squid of you.` } }, mottos: ["Different is fine.", "I don't need a reason to like it.", "Trust your own sensors."], good: { typeId: "salmonRoe", reason: "Salmon Roe finds something interesting. Squid takes it somewhere nobody expected. Normal plans are unlikely to survive." }, bad: { typeId: "sushiRoll", reason: "Sushi Roll says, \"Let's get everyone on the same page.\"\n\nSquid says, \"Do we need to be on the same page?\"\n\nNeither is technically wrong." } },
};

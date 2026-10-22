/** Birthday journal for Kashvi (Kashu) */

export const wish = {
  to: "Kashvi",
  nickname: "Kashu",
  from: "Vaidehi",
  ageLine:
    "Dear Kashvi, congratulations on surviving 24 years of being you.",
};

export type JournalPage =
  | { type: "cover" }
  | { type: "chapter"; title: string; blurb?: string; chapter: string }
  | {
      type: "note";
      title: string;
      body: string;
      chapter: string;
    };

/**
 * Exact letter copy — chapter titles are bold headings;
 * each paragraph is its own note page. EndCard (moo-rvelous) is last.
 */
export const pages: JournalPage[] = [
  { type: "cover" },

  // —— Just A Reminder Of How Loved You Are ——
  {
    type: "chapter",
    chapter: "how loved you are",
    title: "Just A Reminder Of How Loved You Are",
    blurb: "Happy Birthday, Kashu! ❤️",
  },
  {
    type: "note",
    chapter: "how loved you are",
    title: "Just A Reminder Of How Loved You Are",
    body: "Wishing you all the happiness, love, and everything beautiful that life has to offer. I miss you so much, and I wish you were here. We would have been celebrating your birthday together, but even though you're miles away, that's not stopping us from celebrating you! 🥹❤️",
  },
  {
    type: "note",
    chapter: "how loved you are",
    title: "Just A Reminder Of How Loved You Are",
    body: "I've seen you grow so much over the past few years, and the woman you've become makes me incredibly happy and proud. The strength it takes to move miles away from your comfort zone, your loved ones, and everything familiar, and to build a life for yourself all alone is something I genuinely admire. I couldn't be prouder of you, my sister.",
  },
  {
    type: "note",
    chapter: "how loved you are",
    title: "Just A Reminder Of How Loved You Are",
    body: "I hope life gives you everything your heart wishes for and that you achieve every single thing you dream of. You deserve all the love, happiness, success, and beautiful moments in this world.",
  },
  {
    type: "note",
    chapter: "how loved you are",
    title: "Just A Reminder Of How Loved You Are",
    body: "I LOVE YOU SO MUCH, MORE THAN YOU COULD EVER IMAGINE. No matter how many miles are between us, you'll always have me by your side. ❤️🫂",
  },

  // —— What Makes You, YOU ❤️ ——
  {
    type: "chapter",
    chapter: "what makes you, you",
    title: "What Makes You, YOU ❤️",
  },
  {
    type: "note",
    chapter: "what makes you, you",
    title: "What Makes You, YOU ❤️",
    body: "One of the things I love most about you is how you always stand up for yourself and the people you love. The way you show up for your loved ones in every phase of their lives, no matter what, is something I genuinely admire. You're such a good listener, and you have this beautiful way of making people feel special.",
  },
  {
    type: "note",
    chapter: "what makes you, you",
    title: "What Makes You, YOU ❤️",
    body: "The way you always include me in all your plans makes me feel so loved and important. And I used to think it was because I was special to you, but I've realised that it's actually because you see beauty in people and make everyone around you feel valued. ❤️",
  },
  {
    type: "note",
    chapter: "what makes you, you",
    title: "What Makes You, YOU ❤️",
    body: "I also admire despite how much people may hurt you, you never let that pain stay with you for too long. You somehow find your way back to being happy, staying focused, and moving forward. That strength in you is something I wish you could see the way I see it.",
  },
  {
    type: "note",
    chapter: "what makes you, you",
    title: "What Makes You, YOU ❤️",
    body: "And YOUR SKILLS, MY GOD! 😭❤️ You dance, you sing so well, you cook MashaAllah, and you have THE BEST FIGURE. You somehow have the power to look absolutely gorgeous and still be the cutest person in the room at the same time. And those brown eyes of yours? They are literally the kind of eyes people could stare into for hours.",
  },
  {
    type: "note",
    chapter: "what makes you, you",
    title: "What Makes You, YOU ❤️",
    body: "And on top of all that, you're so intelligent! I genuinely think there's nothing left to add to your list of skills. YOU HAVE GOT EVERYTHING, GIRL! 😭❤️",
  },

  // —— HOW I MET MY SISTER 💕 ——
  {
    type: "chapter",
    chapter: "how i met my sister",
    title: "HOW I MET MY SISTER 💕",
  },
  {
    type: "note",
    chapter: "how i met my sister",
    title: "HOW I MET MY SISTER 💕",
    body: "Our story started when we were just chotu bacchas, and honestly, I don't even remember our first meeting, but I do remember that Christmas time and also the time you wearing my one-piece, us clicking pictures and all those little moments. And obviously, I thought you were kind of a bitch at first, but turns out we both are, so I guess that was a perfect match. 😭❤️",
  },
  {
    type: "note",
    chapter: "how i met my sister",
    title: "HOW I MET MY SISTER 💕",
    body: "Being an elder sister myself, there are so many times when I relate to you on a different level. I don't even have to explain what I'm feeling or make you understand things because somehow, you just feel it. And the day we actually got close at my house, after IFYKYK, I genuinely cannot thank God enough for that day. Because that's when I got an elder sister, a best friend, and the most chaotic elder-sister duo ever. 🥹❤️",
  },
  {
    type: "note",
    chapter: "how i met my sister",
    title: "HOW I MET MY SISTER 💕",
    body: "After that, we started staying at each other's places, getting closer, meeting so often, going to parties, long drives, movies, and ESPECIALLY SHOPPING. My favourite thing to do with you will always be shopping, because somehow even the most random plans with you become memories I cherish.",
  },
  {
    type: "note",
    chapter: "how i met my sister",
    title: "HOW I MET MY SISTER 💕",
    body: "I genuinely hope our story continues just like this, with countless more memories, random plans, laughter, endless conversations, and all the little things that make us US.",
  },
  {
    type: "note",
    chapter: "how i met my sister",
    title: "HOW I MET MY SISTER 💕",
    body: "And one day, I hope we get to sit together and tell our children all these stories, laugh about how we started, and probably embarrass them with every little detail. 😭❤️",
  },
  {
    type: "note",
    chapter: "how i met my sister",
    title: "HOW I MET MY SISTER 💕",
    body: "Here's to us, to our bond, and to a lifetime of stories yet to be made. I LOVE YOU SO MUCH. 🫂❤️",
  },

  // —— BRB, Planning Our Entire Future Together🛫🌍 ——
  {
    type: "chapter",
    chapter: "our future plans",
    title: "BRB, Planning Our Entire Future Together🛫🌍",
  },
  {
    type: "note",
    chapter: "our future plans",
    title: "BRB, Planning Our Entire Future Together🛫🌍",
    body: "My dream right now is probably just to hug you because GOD, you are so far away, and I miss you so much. 🥹❤️",
  },
  {
    type: "note",
    chapter: "our future plans",
    title: "BRB, Planning Our Entire Future Together🛫🌍",
    body: "But in the long run, all I genuinely wish for is that wherever life takes you, you're always happy, healthy, and achieving everything you've ever dreamed of. I hope we get to spend at least 15–20 days together every year, go on abroad trips, explore new places every single time, click a million pictures, eat lots of good food, meet new people, and make the craziest reels because DUHH, obviously, we have to. 😭❤️",
  },
  {
    type: "note",
    chapter: "our future plans",
    title: "BRB, Planning Our Entire Future Together🛫🌍",
    body: "I hope you always stay this fit, healthy, happy, and full of life. And most importantly, I hope we never lose the little things that make us US.",
  },
  {
    type: "note",
    chapter: "our future plans",
    title: "BRB, Planning Our Entire Future Together🛫🌍",
    body: "And PLEASE, I want us to do Garba together again. God, I miss that so much, Kashu. I miss having you around, doing the most random things together, and just being US without having to plan everything around distance.",
  },
  {
    type: "note",
    chapter: "our future plans",
    title: "BRB, Planning Our Entire Future Together🛫🌍",
    body: "I hope life gives us countless opportunities to make all these dreams come true. Until then, just know that one of my biggest wishes will always be to have you close enough to hug whenever I want. 🫂❤️",
  },
];

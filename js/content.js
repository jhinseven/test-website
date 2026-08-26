/**
 * ===== SITE CONTENT (edit this file most often) =====
 * Frequently changed text, images, and links live here so you do not
 * have to hunt through HTML/CSS. Search this file for EDIT THIS.
 */

export const siteContent = {
  // ===== EDIT THIS: SITE NAME / SEO =====
  siteName: "Nini Uppuluri",
  seoDescription:
    "Official website of Nini Uppuluri — a 15-year-old pop artist.",

  hero: {
    // ===== EDIT THIS: HERO TITLE & TAGLINE =====
    title: "Nini Uppuluri",
    tagline: "SINGER · SONGWRITER · POP ARTIST",
    // ===== EDIT THIS: HERO PROMO LINE =====
    // Shown under the tagline. Change the label and href when the featured
    // song changes. Leave the href as a placeholder to hide the line.
    promo: {
      label: "Stream Pretty Wings Now!",
      href: "https://open.spotify.com/track/5tR2w78xV17M5q1nea5zyw",
    },
    // ===== EDIT THIS: NINI HERO IMAGE =====
    // Replace the placeholder below with the final image path, e.g. "/public/images/nini-hero.jpg"
    image: "public/images/nini-hero.jpg",
    imageAlt: "Nini Uppuluri",
    primaryCta: {
      label: "Listen Now",
      href: "#music",
    },
    secondaryCta: {
      label: "Watch",
      href: "#videos",
    },
  },

  // ===== EDIT THIS: ABOUT =====
  // The paragraphs below are starter copy. Replace them with Nini's own words.
  // Keep each paragraph short — 2 or 3 sentences reads best.
  about: {
    eyebrow: "About",
    title: "Hey, I'm Nini",
    paragraphs: [
      "I'm a 15-year-old pop artist. I write and sing songs about the things I'm living through right now.",
      "a few sentences on how you started, what you're working on, or what your music is about.",
    ],
    // ===== EDIT THIS: ABOUT IMAGE =====
    // Put the photo in public/images/ and use a path like "public/images/nini-about.jpg"
    image: "public/images/nini-about.png",
    imageAlt: "Nini Uppuluri",
    // Optional button. Leave the placeholder to hide it, or point it at a page/link.
    learnMore: {
      label: "Learn More",
      href: "[REPLACE_WITH_LEARN_MORE_URL]",
    },
  },

  // ===== EDIT THIS: FEATURED MUSIC =====
  // Add or replace songs here. The first item is the large featured player.
  // The next 6 items appear in the grid under it.
  // Use a Spotify track or album URL (or an embed URL).
  // Example: "https://open.spotify.com/embed/track/REPLACE_WITH_TRACK_ID"
  music: {
    sectionTitle: "Featured Music",
    viewAllLabel: "View All Music",
    // If this is still a placeholder, the button will reveal extra songs below (if you add them).
    viewAllHref: "https://open.spotify.com/artist/13XNrE7VNUoipQC30YNyHA",
    featured: {
      title: "Pretty Wings",
      artist: "Nini Uppuluri",
      artwork: "public/images/nini-hero.jpg",
      spotifyUrl: "https://open.spotify.com/embed/track/5tR2w78xV17M5q1nea5zyw?utm_source=generator&si=73933ea599ab4951",
    },
    tracks: [
      {
        title: "We Own The Now",
        artist: "Nini Uppuluri",
        artwork: "[REPLACE_WITH_SONG_1_COVER]",
        spotifyUrl: "https://open.spotify.com/embed/track/3InLlBSBpWbykDKBW2HCWd?utm_source=generator&si=e96fb843f66b42e7",
      },
      {
        title: "Cold Shoulder",
        artist: "Nini Uppuluri",
        artwork: "[REPLACE_WITH_SONG_2_COVER]",
        spotifyUrl: "https://open.spotify.com/embed/track/1FCmPinglbrh7z1r6R6J6p?utm_source=generator&si=b2ed4185e5164f52",
      },
      {
        title: "They Notice",
        artist: "Nini Uppuluri",
        artwork: "[REPLACE_WITH_SONG_3_COVER]",
        spotifyUrl: "https://open.spotify.com/embed/track/4yLj6KfVJdlEt7YnMAjEok?utm_source=generator&si=6f6222cdc359471d",
      },
      {
        title: "Fire",
        artist: "Nini Uppuluri",
        artwork: "[REPLACE_WITH_SONG_4_COVER]",
        spotifyUrl: "https://open.spotify.com/embed/track/5m7LOMwQLEmAQEK0ztiIxr?utm_source=generator&si=43adffd7ea9f4ae1",
      },
      {
        title: "One Last Miracle",
        artist: "Nini Uppuluri",
        artwork: "[REPLACE_WITH_SONG_5_COVER]",
        spotifyUrl: "https://open.spotify.com/embed/track/6bNbLCkB4dxrMmadu2T6K8?utm_source=generator&si=62a70215ef0847dd",
      },
      {
        title: "Lil Brother",
        artist: "Nini Uppuluri",
        artwork: "[REPLACE_WITH_SONG_6_COVER]",
        spotifyUrl: "https://open.spotify.com/embed/track/3X5NHem9EwAuGYli6JV4uj?utm_source=generator&si=9a334b1cc9174045",
      },
    ],
    // Optional extra songs shown after "View All Music" is clicked.
    more: [],
  },

  // ===== EDIT THIS: FEATURED VIDEO =====
  // 1 featured YouTube video, then up to 7 in the grid under it.
  // Paste a normal YouTube watch URL or an embed URL.
  // Example: "https://www.youtube.com/watch?v=REPLACE_WITH_VIDEO_ID"
  videos: {
    sectionTitle: "Featured Video",
    viewAllLabel: "View All Videos",
    viewAllHref: "[REPLACE_WITH_YOUTUBE_URL]",
    featured: {
      title: "Pretty Wings",
      caption: "Visualizer / music video",
      thumbnail: "[REPLACE_WITH_FEATURED_VIDEO_THUMBNAIL]",
      videoUrl: "https://youtu.be/NkEAQphst-8?si=Hm7KilFfxs-kEZUu",
    },
    items: [
      {
        title: "We Own The Now",
        caption: "Visualizer / music video",
        thumbnail: "[REPLACE_WITH_VIDEO_1_THUMBNAIL]",
        videoUrl: "https://youtu.be/ZP1JqQbBE6A?si=TaWHRgxFxIcrLQ0_",
      },
      {
        title: "Cold Shoulder",
        caption: "Visualizer / music video",
        thumbnail: "[REPLACE_WITH_VIDEO_2_THUMBNAIL]",
        videoUrl: "https://youtu.be/1M5imeOmP1k?si=tHbuukg8Jk2jAgJl",
      },
      {
        title: "My First Song Ever - Lil Brother",
        caption: "Visualizer / music video",
        thumbnail: "public/images/LilBrother-tn.png",
        videoUrl: "https://youtu.be/RQqht7-ibeU",
      },
      {
        title: "FIRE",
        caption: "Visualizer / music video",
        thumbnail: "[REPLACE_WITH_VIDEO_3_THUMBNAIL]",
        videoUrl: "https://youtu.be/WVzt8ixlOKQ?si=cunh934RMNqpk_P8",
      },
      {
        title: "All That I Wanna Be",
        caption: "Visualizer / music video",
        thumbnail: "[REPLACE_WITH_VIDEO_4_THUMBNAIL]",
        videoUrl: "https://youtu.be/mCQAPQ4ctuI?si=5Kq2r_-xP7U5Kd3v",
      },
      {
        title: "Shame",
        caption: "Visualizer / music video",
        thumbnail: "[REPLACE_WITH_VIDEO_5_THUMBNAIL]",
        videoUrl: "https://youtu.be/GJsROw--osA?si=6HcVG3mtMzef9ZVV",
      },
      {
        title: "If You Only Knew Me",
        caption: "Visualizer / music video",
        thumbnail: "[REPLACE_WITH_VIDEO_6_THUMBNAIL]",
        videoUrl: "https://youtu.be/bY1rV_ViHiQ?si=Mo4WUwSbWSmS5_NB",
      },
    ],
    // Optional extra videos shown after "View All Videos" is clicked.
    more: [],
  },

  // ===== EDIT THIS: LATEST UPDATES =====
  // Newest first. Keep it to 3 cards — the section shows at most 3.
  // Delete an item to show fewer. Delete all of them to hide the section.
  // date: any text you like, e.g. "March 2026". link is optional.
  updates: {
    eyebrow: "News",
    sectionTitle: "Latest Updates",
    items: [
      {
        date: "August 2026",
        title: "Join my Discord server!",
        text: "Come hang out for new songs, friendly chats, and access to exclusive song snippets!",
        linkLabel: "Join Discord",
        linkHref: "https://discord.gg/ezebgj4hq",
      },
      {
        date: "DATE HERE 2",
        title: "TITLE HERE 2",
        text: "one or two sentences about a release or any kind of announcement.",
        linkLabel: "Read more",
        linkHref: "[REPLACE_WITH_UPDATE_1_URL]",
      },
      {
        date: "DATE HERE 3",
        title: "TITLE HERE 3",
        text: "one or two sentences about a release or any kind of announcement.",
        linkLabel: "Read more",
        linkHref: "[REPLACE_WITH_UPDATE_1_URL]",
      },
    ],
  },

  // ===== EDIT THIS: SOCIALS =====
  // Icons sit in the right-side rail (and the footer). URLs come from `links`
  // at the bottom of this file. A platform with a placeholder URL is skipped.
  socials: {
    // ===== EDIT THIS: BUSINESS EMAIL =====
    // Shown on the contact section for bookings, press, and business enquiries.
    // Leave the placeholder to hide the email line there.
    businessEmailLabel: "Business & bookings",
    businessEmail: "[REPLACE_WITH_BUSINESS_EMAIL]",
  },

  // ===== EDIT THIS: MAILING LIST (MAILCHIMP) =====
  // How to get the two values below:
  //   Mailchimp > Audience > Signup forms > Embedded form
  //   1. formAction  = the <form action="..."> URL in the generated code
  //   2. honeypotName = the name of the hidden input near the end of that
  //      code, which looks like b_1a2b3c..._4d5e6f. It blocks spam bots.
  // Both are public form values, not secrets, so they belong here.
  // Until formAction is filled in, the form shows a short "not connected" note.
  mailingList: {
    eyebrow: "Newsletter",
    title: "Join the mailing list",
    text: "Be first to hear about new songs, videos, and shows.",
    emailLabel: "Email address",
    emailPlaceholder: "you@example.com",
    buttonLabel: "Subscribe",
    successMessage: "Almost there — check your inbox to confirm.",
    formAction: "https://gmail.us3.list-manage.com/subscribe/post?u=39fa9ff5f54c3443ce7cbbe4e&id=7273754a1b&f_id=00e6cee1f0",
    honeypotName: "b_39fa9ff5f54c3443ce7cbbe4e_7273754a1b",
  },

  // ===== EDIT THIS: CONTACT FORM =====
  // The form needs a form service to receive the messages, because this
  // site has no server of its own. Formspree is the easiest one:
  //   formspree.io > New form > copy the URL that looks like
  //   https://formspree.io/f/abcdwxyz  and paste it into formEndpoint below.
  // That URL is public by design, so it is safe here.
  // Until it is filled in, the form is disabled and the email below is shown
  // instead. The email address itself is edited once, in `socials` above.
  contact: {
    eyebrow: "Say hello",
    title: "Get in touch",
    text: "Questions, bookings, or just want to say hi? Send a message.",
    nameLabel: "Your name",
    namePlaceholder: "First and last name",
    emailLabel: "Your email",
    emailPlaceholder: "you@example.com",
    messageLabel: "Message",
    messagePlaceholder: "Write your message here…",
    buttonLabel: "Send message",
    sendingMessage: "Sending…",
    successMessage: "Thanks! Your message is on its way.",
    errorMessage: "Something went wrong. Please try again, or use the email below.",
    directEmailLabel: "Or email directly:",
    formEndpoint: "https://formspree.io/f/xgawjlpn",
  },

  // ===== EDIT THIS: FOOTER =====
  // The year is filled in automatically. Social buttons reuse the `links`
  // object at the bottom of this file — a platform with a placeholder URL
  // is skipped, so nothing in the footer links nowhere.
  footer: {
    name: "Nini",
    copyright: "All rights reserved.",
    backToTop: "Back to top",
    // Optional extra links (privacy, credits, etc.). Leave empty to hide.
    extraLinks: [],
  },
};

/**
 * ===== EDIT THIS: EXTERNAL LINKS =====
 * Keep social and shop URLs here.
 */
export const links = {
  discord: "https://discord.gg/ezebgj4hq",
  tiktok: "https://www.tiktok.com/@niniuppuluri",
  youtube: "https://www.youtube.com/channel/UC96TGOrWeIWxr6noks2ipzw",
  spotify: "https://open.spotify.com/artist/13XNrE7VNUoipQC30YNyHA",
  shop: "[REPLACE_WITH_SHOP_URL]",
};

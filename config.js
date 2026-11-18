/*
 * Everything personal lives here. Forking this repo? Change this file, swap the photos, done.
 * Funds targets and the gift list come from the Google Sheet once apiUrl is set;
 * the values below are only used when apiUrl is empty (no backend yet).
 */
window.REGISTRY = {
  couple: {
    a: "Subham",
    b: "Shilpa",
    tag: "#Sushi",
    tagline: "Subham + Shilpa = Sushi. Two people, rolled into one.",
    date: "2027-01-24",            // wedding day, drives the countdown
    time: "16:15",                 // wedding ceremony, 4:15 PM
    dateLabel: "24 Jan 2027 · Berhampur",
    instagram: "sushi.roams"       // leave "" to hide
  },

  upi: {
    vpa: "subham.sethi3@ybl",
    payee: "Subham and Shilpa"
  },

  // Google Apps Script web app URL (ends in /exec). See README > Live backend.
  apiUrl: "https://script.google.com/macros/s/AKfycbxRVf67UN0RbpI1e7GiCeu3jHJVNL6JeJ2l3WNqVRJylgsBdMX5AIue7Fr2mWS1F9Q21w/exec",

  // The public link you hand out. The share section builds every deep link (#japan, #gift-microwave…) from this.
  // Also published as a Claude artifact at https://claude.ai/artifact/QuZP7btSChxFPtLxkFKCve
  shareUrl: "https://subhamshilpa.com/",

  homeAirport: "BLR",

  // The wedding section. Fill in any blank field and it appears on the page; blank fields stay hidden.
  // date: YYYY-MM-DD · time: 24-hour "HH:MM" ("" if not fixed yet) · hours: rough length, for calendar invites
  // venue: the hall, hotel or home · address: street / area · mapUrl: paste a Google Maps link, or leave "" and
  // the Directions button searches venue + address + city · dress: what to wear · note: anything else
  events: [
    { name: "Haldi", date: "2027-01-23", time: "11:00", hours: 3, city: "Gopalpur-on-Sea, Berhampur",
      venue: "Storyline Cafe", address: "", mapUrl: "https://maps.app.goo.gl/hbN44PJ52bn1maHN6", dress: "", note: "" },
    { name: "Sangeet", date: "2027-01-23", time: "19:00", hours: 4, city: "Gopalpur-on-Sea, Berhampur",
      venue: "Storyline Cafe", address: "", mapUrl: "https://maps.app.goo.gl/hbN44PJ52bn1maHN6", dress: "", note: "" },
    { name: "Wedding", date: "2027-01-24", time: "16:15", hours: 6, city: "Berhampur", main: true,
      venue: "Saanaira Resorts & Spa", address: "", mapUrl: "https://maps.app.goo.gl/4vzAYWqkDmQVLmoN7", dress: "", note: "The wedding ceremony is at 4:15 PM. Come early for lunch and the mocktail bar." },
    { name: "Reception", date: "2027-01-27", time: "19:00", hours: 4, city: "Bhubaneswar",
      venue: "Pipul Padmaja Premium Hotel and Convention", address: "", mapUrl: "https://maps.app.goo.gl/6CZwrM1jBBmgM3tb8", dress: "", note: "" }
  ],

  photos: {
    hero: "photos/traditional.jpg",
    heroBack: ["photos/dinner.jpg", "photos/jerseys.jpg"],
    // The photo strip, oldest first. wide: width ÷ height for landscape photos, so they get a wider frame. when: optional year label.
    story: [
      { src: "photos/early-1-selfie.jpg", caption: "The early days", wide: 1.33 },
      { src: "photos/early-2-river.jpg", caption: "Feet in the river" },
      { src: "photos/early-3-dressed-up.jpg", caption: "All dressed up" },
      { src: "photos/early-4-watchtower.jpg", caption: "On top of the world", wide: 1.5 },
      { src: "photos/early-5-rafting.jpg", caption: "White water, big grins", wide: 1.78 },
      { src: "photos/traditional.jpg", caption: "Dressed up, cracking up" },
      { src: "photos/dinner.jpg", caption: "Candles and heliconias" },
      { src: "photos/hills-wide.jpg", caption: "Hill-station mode" },
      { src: "photos/cottage.jpg", caption: "Practising for our first home" },
      { src: "photos/jerseys.jpg", caption: "Matching jerseys, zero shame" }
    ]
  },

  funds: {
    home: {
      title: "Our first home",
      blurb: "We're saving up to buy a place of our own: somewhere with a sofa big enough for two naps, and a kitchen where we can argue about how much masala is too much.",
      target: 300000,
      photo: "photos/cottage.jpg",
      photoCaption: "The practice run",
      chips: [
        [501, "a few bricks"],
        [1101, "a bag of cement, and then some"],
        [2101, "a little corner of the balcony"],
        [5101, "about a square foot of our home"],
        [11000, "two square feet"],
        [21000, "four square feet, roughly where the sofa goes"]
      ]
    },
    wedding: {
      title: "Our wedding",
      blurb: "Four celebrations, three venues, and a lot of people to feed. If you'd like, you can chip in towards the big day itself.",
      target: 1000000,
      photo: "photos/traditional.jpg",
      photoCaption: "Practising for the big day",
      chips: [
        [501, "a round of mocktails"],
        [1101, "one guest's lunch"],
        [2101, "lunch for two"],
        [5101, "flowers for the mandap"],
        [11000, "an hour of the sangeet DJ"],
        [21000, "a day's worth of decor"]
      ]
    },
    honeymoon: {
      title: "The honeymoon",
      blurb: "We haven't decided yet, but it'll be one of these two. Anything you send goes towards the trip.",
      target: 450000,
      photo: "photos/hills-wide.jpg",
      photoCaption: "Next: your call",
      options: [
        {
          id: "japan", name: "Japan", code: "KIX", color: "#E5484D",
          pitch: "Ramen, bullet trains, temples, and a sushi pilgrimage (obviously).",
          chips: [
            [501, "a bowl of ramen"],
            [1101, "matcha and mochi for two in Kyoto"],
            [2101, "a day of metro rides for both of us"],
            [5101, "a conveyor-belt sushi feast"],
            [11000, "a night in a Kyoto guesthouse"],
            [21000, "the bullet train Tokyo to Kyoto, both of us"]
          ]
        },
        {
          id: "mara", name: "Masai Mara", code: "NBO", color: "#C9822B",
          pitch: "Lions at breakfast, the great migration, and sundowners on the savanna.",
          chips: [
            [501, "masala chai at camp"],
            [1101, "sundowner drinks on the savanna"],
            [2101, "a Maasai village visit"],
            [5101, "binoculars, hats and a lot of sunscreen"],
            [11000, "a day's park entry for one of us"],
            [21000, "half a hot-air balloon ride over the Mara"]
          ]
        }
      ]
    }
  },

  // Shown in the FAQ section. Plain text.
  faq: [
    ["Do we have to bring or send a gift?", "Not at all. Having you with us is what we'll remember. This page is only for the friends and family who asked what we'd like."],
    ["How do I pay?", "On your phone, tap Open my UPI app and it opens GPay, PhonePe, Paytm or your bank's app with everything filled in. On a laptop, scan the QR code with your phone."],
    ["How will you know it was from me?", "After paying, come back to the page and tap Done, I've paid. Add your name and a note if you like. That's how we know who to thank."],
    ["Can a few of us share one gift?", "Yes. Tap Share with friends on any gift and put in whatever you like. It comes off the list once it's fully covered."],
    ["I'd rather buy the gift myself.", "Tap I'll buy and bring it. We'll take it off the list so nobody else buys the same thing."],
    ["Will others see how much I gave?", "No. Your note shows only your name and message, unless you tick the box to show the amount."],
    ["Can I just give an envelope at the wedding?", "Of course. Your blessings matter most to us, however you'd like to give them."]
  ],

  gifts: [
    { id: "microwave", name: "Microwave (convection)", price: 15000, qty: 1, note: "For reheating dal at midnight and pretending we bake." },
    { id: "sofa-bed", name: "Sofa cum bed", price: 35000, qty: 1, note: "Couch by day, guest room by night. Your future crash pad." }
  ]
};

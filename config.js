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
    dateLabel: "24 Jan 2027 · Berhampur",
    instagram: "sushi.romas"       // leave "" to hide
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
    { name: "Haldi", date: "2027-01-23", time: "11:00", hours: 3, city: "Gopalpur-on-Sea",
      venue: "", address: "", mapUrl: "", dress: "", note: "" },
    { name: "Sangeet", date: "2027-01-23", time: "19:00", hours: 4, city: "Gopalpur-on-Sea",
      venue: "", address: "", mapUrl: "", dress: "", note: "" },
    { name: "Wedding", date: "2027-01-24", time: "", hours: 6, city: "Berhampur", main: true,
      venue: "", address: "", mapUrl: "", dress: "", note: "" },
    { name: "Reception", date: "2027-01-27", time: "", hours: 4, city: "Bhubaneswar",
      venue: "", address: "", mapUrl: "", dress: "", note: "" }
  ],

  photos: {
    hero: "photos/traditional.jpg",
    heroBack: ["photos/dinner.jpg", "photos/jerseys.jpg"],
    story: [
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
      blurb: "Bricks, a sofa big enough for two naps, and a kitchen where we argue about masala levels.",
      target: 300000,
      photo: "photos/cottage.jpg",
      photoCaption: "The practice run",
      chips: [
        [501, "a doormat that says #Sushi"],
        [1101, "the doorbell"],
        [2101, "curtains for one window"],
        [5101, "a bookshelf"],
        [11000, "the dining table"],
        [21000, "most of the fridge"]
      ]
    },
    honeymoon: {
      title: "The honeymoon",
      blurb: "We're off to Japan or the Masai Mara. Wherever we land, every rupee here gets us there.",
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
    ["How do I pay?", "Tap Open my UPI app on your phone, or scan the QR code from a laptop. Any UPI app works: GPay, PhonePe, Paytm, BHIM or your bank's own app."],
    ["Are there any fees?", "None at all. Your payment goes straight from your bank to ours over UPI. No gateway, no middleman, no cut."],
    ["What if someone already picked the gift I want?", "Gifts leave the belt the moment they're fully covered, so you only ever see what's still needed. The site also double-checks right before you pay."],
    ["Can a few of us split a big gift?", "Yes. Tap Chip in on any gift and add what you like. The bar fills up as friends join in, and the gift disappears once it's covered."],
    ["I'd rather buy the gift myself.", "Tap I'll buy it and bring it. We take it off the list straight away so nobody else buys the same one."],
    ["Will everyone see how much I gave?", "Only if you tick Show my amount. Otherwise the wall shows just your name, your note and your sushi sticker."],
    ["How will you know it was me?", "After paying, stamp the wall with your name. We match it against our bank app and add a tick once we spot it."],
    ["Can I give an envelope at the wedding instead?", "Of course. Your blessings matter most to us. This page is simply for those who asked what we'd like."]
  ],

  gifts: [
    { id: "microwave", name: "Microwave (convection)", price: 15000, qty: 1, note: "For reheating dal at midnight and pretending we bake." },
    { id: "sofa-bed", name: "Sofa cum bed", price: 35000, qty: 1, note: "Couch by day, guest room by night. Your future crash pad." }
  ]
};

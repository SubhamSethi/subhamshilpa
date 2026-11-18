# #Sushi · Subham & Shilpa's wedding registry

A static wedding registry for 24 January 2027: a home fund, a honeymoon fund (Japan or the Masai Mara), and a gift belt. Guests pay over UPI.

## Files
- `index.html`: the whole site (styles, script and markup).
- `config.js`: everything personal: names, date, UPI ID, funds, gifts, FAQ, events and `shareUrl`.
- `photos/`: the photos used on the page.

## Publishing on GitHub Pages
Settings → Pages → Source: "Deploy from a branch", branch `main`, folder `/ (root)`.
The site then appears at `https://subhamsethi.github.io/subhamshilpa/`.

## Custom domain (subhamshilpa.com)
1. In GoDaddy DNS, add A records for `@` pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`, and a CNAME record for `www` pointing to `subhamsethi.github.io`.
2. In Settings → Pages, set the custom domain to `subhamshilpa.com` and tick "Enforce HTTPS" once it is offered.
3. In `config.js`, set `shareUrl` to `"https://subhamshilpa.com/"` and update the `og:image` URL in `index.html`.

## Share links
Every link is the site address plus a `#` section: `#home`, `#add-brick`, `#honeymoon`, `#fly-us`, `#gifts`, `#gift-<id>`, `#wall`, `#faq`.

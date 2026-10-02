# Priya's Drawing Studio

Website for Priya's live online drawing classes for children aged 4–14 in the Netherlands.

**Live site:** https://priyagit-ar.github.io/Drawing/ (Dutch: https://priyagit-ar.github.io/Drawing/nl/)

It's a plain static site (HTML, CSS and a little JavaScript), hosted on GitHub Pages. It has no build step, no cookies, no trackers and makes no requests to other sites (fonts are self-hosted).

## Files

| File | What it is |
| --- | --- |
| `index.html` | English page |
| `nl/index.html` | Dutch page (same structure, translated) |
| `assets/css/style.css` | All styling |
| `assets/js/main.js` | Mobile menu, curriculum tabs and the WhatsApp booking helper |
| `assets/img/` | Logo, favicon and the social-media preview image (`og-image.png`) |
| `assets/fonts/` | Baloo 2 and Nunito fonts (SIL Open Font License) |

## Common edits

Make each change in **both** `index.html` and `nl/index.html`.

- **Prices:** search for `€`. Prices also appear in the `application/ld+json` block at the top of `index.html` (for search engines).
- **WhatsApp number:** search for `31616311063` (in both HTML files and in `assets/js/main.js`).
- **Timetable:** search for `id="timetable"`.
- **About Priya:** search for `id="about"`. To use a photo, add it as `assets/img/priya.jpg` and replace the palette illustration with the `<img>` tag shown in the comment there.
- **Curriculum:** search for `id="curriculum"`. Each level has five blocks.

You can edit files directly on GitHub (open a file, click the pencil icon, then commit). The site updates about a minute after a change lands on `main`.

## Publishing

`.github/workflows/publish.yml` copies every push on `main` to the `gh-pages` branch, which GitHub Pages serves. You can also switch Pages to serve `main` directly under **Settings → Pages**, and then delete the workflow.

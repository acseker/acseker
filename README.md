# Personal Webpage

A single-page personal/academic webpage: About, Projects, Publications, Teaching Honors & Awards, and Education. Built with plain HTML, CSS, and vanilla JavaScript —
no build step, no dependencies beyond a Google Fonts stylesheet.

## Folder Structure

```
.
├── index.html
├── README.md
└── static/
    ├── assets/     # misc downloadable files (CV PDF, etc.)
    ├── css/
    │   └── styles.css
    ├── images/     # project thumbnails / photos
    ├── js/
    │   └── script.js
    └── videos/     # project demo videos
```

`index.html` is the only page. It links to `static/css/styles.css` and
`static/js/script.js` by relative path, so the folder can be moved or renamed
as a whole without breaking anything, as long as those two files stay in
place relative to it.

The `assets/`, `images/`, and `videos/` folders are provided as landing spots
for real project media (screenshots, demo clips, a downloadable CV, etc.).

## License

Feel free to use it as a template for
your own webpage, but please don't reuse the biographical content.

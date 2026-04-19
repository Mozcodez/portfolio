# ◈ Personal Portfolio Template

A dark luxury portfolio website inspired by the Jayden portfolio design.
Built with pure HTML, CSS, and JavaScript — no frameworks required.

---

## 📁 File Structure

```
portfolio/
├── index.html          ← Main homepage
├── project.html        ← Project detail page
│
├── css/
│   ├── style.css       ← Core styles, layout, components
│   ├── animations.css  ← All keyframes & animation classes
│   └── project.css     ← Project detail page styles
│
├── js/
│   ├── main.js         ← Core interactions (cursor, nav, forms, etc.)
│   └── animations.js   ← Canvas particles, magnetic buttons, parallax
│
└── assets/             ← ⚠️ CREATE THIS FOLDER and add your images
    ├── profile.jpg     ← Your hero card photo (portrait)
    ├── about.jpg       ← About section photo
    ├── resume.pdf      ← Your CV (for download button)
    ├── project1.jpg    ← Project thumbnails
    ├── project2.jpg
    ├── project3.jpg
    ├── project4.jpg
    ├── project5.jpg
    └── project6.jpg
```

---

## 🚀 Quick Start

1. **Create the `assets/` folder** inside `portfolio/`
2. **Add your images** (see list above). The site uses placeholder backgrounds if images are missing.
3. **Open `index.html`** in any browser — no build step needed.
4. For best results, use a local server:
   - VS Code → install **Live Server** extension → right-click `index.html` → Open with Live Server
   - Or: `python -m http.server 8000` in the `portfolio/` folder

---

## ✏️ How to Personalize

### index.html
Search and replace these placeholders:

| Placeholder             | Replace with              |
|-------------------------|---------------------------|
| `Your Name`             | Your full name            |
| `YourName`              | Short name / brand        |
| `yourname@email.com`    | Your email                |
| `Your City, Country`    | Your location             |
| `Luminary Finance App`  | Your project names        |
| `20` (stat count)       | Your actual numbers       |
| `98` (stat count)       | Your success rate         |
| `150` (stat count)      | Your project count        |

### css/style.css — Change Colors
At the top of `style.css`, edit the CSS variables:

```css
:root {
  --bg:        #0c0c0e;    /* Main background */
  --accent:    #e8703a;    /* Orange accent — change to your brand color */
  --accent-2:  #f0a070;    /* Lighter accent */
  --text:      #e8e4dc;    /* Body text */
}
```

### Add Real Projects
In `index.html`, find the `.work__grid` section and edit each `.project-card`:
- Change `data-category` to `branding`, `web`, or `ui`
- Replace `src="assets/projectX.jpg"` with your image
- Update the title and category label

---

## ✨ Features

- **Custom cursor** with magnetic pull effect
- **Canvas particle background** with connecting lines
- **3D tilt card** on the hero profile card
- **Text scramble** effect on navigation hover
- **Scroll reveal** animations for all sections
- **Counter animations** for statistics
- **Animated skill bars**
- **Project filter** with smooth transitions
- **Testimonial carousel** with auto-play
- **Parallax** on background shapes
- **Page loader** animation
- **Scroll progress bar** at the top
- **Magnetic buttons**
- **Contact form** with validation
- **Scroll-to-top** button
- **Fully responsive** mobile layout

---

## 📦 No Dependencies

Everything is vanilla HTML/CSS/JS.
The only external resources are **Google Fonts** (loaded via CDN) — works offline if fonts are cached.

---

## 🎨 Design Notes

- **Fonts**: Playfair Display (headings) + DM Sans (body) + Caveat (script/name)
- **Colors**: Deep charcoal `#0c0c0e` background + warm burnt orange `#e8703a` accent
- **Style**: Dark luxury — inspired by high-end creative agency portfolios

---

Made with ♥ — personalize it and make it yours!

# 30 AI SaaS Landing Page Templates

Welcome to the collection of 30 AI SaaS Landing Page Templates! This project provides a diverse set of unique, single-page web app templates designed for various AI-based or SaaS products.

The goal is to offer clean, human-readable, and easily customizable templates that developers and marketers can adapt for their specific needs.

## Project Structure

The repository is organized as follows:

*   **`/` (Root Directory):**
    *   `*.html`: Individual landing page templates (e.g., `NeuroVision.html`, `TalkBot.html`, etc.). There are 30 such templates.
    *   `main.css`: The main stylesheet containing shared CSS rules, utility classes, and styles for all 7 visual themes.
    *   `main.js`: The main JavaScript file handling shared functionalities like lazy loading (Lozad.js), animations on scroll (AOS), and providing helper functions or initializations. Form validation (Parsley.js) is set up to be initialized per-form.
    *   `common_head.html`: A snippet file (not directly browsable) that contains the common `<head>` content (CDN links, meta tag structure, font links). This content is embedded in each HTML template.
    *   `README.md`: This file.
*   **`/assets/`:**
    *   This directory is intended for all static assets. Currently, it contains placeholder filenames for:
        *   Generic logos (e.g., `ai-logo-generic.png`)
        *   Product mockups/showcases (e.g., `ai-product-showcase-1.png`)
        *   Hero backgrounds (e.g., `ai-hero-background-abstract.jpg`)
        *   Feature icons (e.g., `ai-feature-icon-abstract.svg`)
        *   User avatars (e.g., `ai-avatar-neutral.png`)
        *   A default OpenGraph image (e.g., `ai-og-preview-default.jpg`)
    *   **Important:** You should replace these placeholders with your actual AI-generated images and other assets. The HTML templates reference these paths.
    *   For OpenGraph images specific to each page, the templates reference paths like `assets/ai-og-PAGENAME-default.jpg` (e.g., `assets/ai-og-neurovision-default.jpg`). You will need to create images with these specific names in the `/assets/` folder for them to display correctly in social shares.

## How to Use the Templates

1.  **Choose a Template:** Browse through the 30 HTML files in the root directory. Each file is named after the AI/SaaS product it represents (e.g., `SynthCode.html`).
2.  **Open in Browser:** Open the desired HTML file in your web browser to view the template.
3.  **Customize Content:**
    *   Open the HTML file in a text editor.
    *   The code is clean, well-indented, and includes HTML comments to guide you (e.g., `<!-- Suggested Image: ... Replace assets/... -->`, `<!-- Hero Section -->`).
    *   **Text:** Update headlines, paragraphs, feature descriptions, pricing details, etc., directly in the HTML.
    *   **Images:** Replace placeholder image paths in the `<img>` tags (or CSS background URLs if applicable) with your actual image files located in the `/assets/` directory.
    *   **Links:** Update navigation links, button links, and footer links (`href="..."`).
    *   **Metadata:** While the core structure for SEO tags (title, description, canonical, OpenGraph, Twitter, Schema.org) is in `common_head.html`, each page's JavaScript block dynamically updates these. You can modify the content within that script block in each HTML file for fine-tuned SEO.
4.  **Understanding Themes:**
    *   Each template is assigned one of 7 visual themes via a class on the `<body>` tag (e.g., `<body class="theme-glassy">`).
    *   The available themes are: `theme-glassy`, `theme-matte`, `theme-vibrant`, `theme-elegant`, `theme-scifi`, `theme-friendly`, `theme-retro`.
    *   You can change the theme of a page by changing this class. Styles for these themes are defined in `main.css`.
5.  **Forms:**
    *   Lead capture forms use Parsley.js for client-side validation. Ensure the `<form>` tag has `data-parsley-validate` and input fields have appropriate Parsley attributes (e.g., `required`, `data-parsley-type="email"`).
    *   The actual form submission (e.g., sending data to a server or email service) needs to be implemented by you. The current setup demonstrates client-side validation and provides a success/error message placeholder.

## Core Web Vitals & PageSpeed Optimization Notes

To maintain good performance and Core Web Vitals scores:

*   **Image Dimensions:** Always add `width` and `height` attributes to your `<img>` tags to prevent layout shifts (CLS). Example: `<img src="assets/my-image.jpg" width="800" height="600" alt="...">`. The `NeuroVision.html` template has examples of this.
*   **Critical Above-the-Fold Images:** For images that appear high on the page (e.g., main hero image, logo in header), avoid lazy-loading them. Ensure they have a direct `src="..."` attribute and are not using the `class="lozad"`. The `NeuroVision.html` template demonstrates this by making its header logo and showcase image non-lazy-loaded. Other images below the fold can benefit from lazy loading (using `class="lozad"` and `data-src="..."`).
*   **Font Loading:** Google Fonts are loaded efficiently with `font-display: swap`.
*   **Minification (Production):** While these templates are provided unminified for easy editing, for a production deployment, you should consider minifying HTML, CSS, and JS files to reduce file sizes.

## CDN Libraries Used

All external libraries are loaded via CDN to ensure consistency and reduce local project weight. The following libraries are included in `common_head.html` (and thus in every template):

*   **Bootstrap 5.3 (CSS & JS):** For layout, components, and responsiveness.
*   **jQuery 3.x:** Dependency for Bootstrap's JS and Parsley.js.
*   **Three.js:** For 3D visuals (example in `main.js`, to be implemented per template as needed).
*   **Google Fonts:** Roboto, Inter, Lexend, Space Grotesk.
*   **Chart.js:** For charts and data visualization (to be implemented per template as needed).
*   **Lozad.js:** For lazy loading images and other assets.
*   **Font Awesome:** For icons.
*   **Parsley.js:** For client-side form validation.
*   **AOS (Animate on Scroll):** For scroll-triggered animations.
*   **GSAP (GreenSock Animation Platform):** For advanced animations (core included, to be implemented per template as needed).

## Modifying or Creating New Pages

*   **Modifying:** Edit the HTML, `main.css` (for theme-wide changes), or `main.js` (for global script changes).
*   **Creating a New Page:**
    1.  Duplicate an existing HTML template file.
    2.  Rename it.
    3.  Change the theme class on the `<body>` if desired.
    4.  Update all product-specific content (text, images, CTAs).
    5.  Update the JavaScript block in the `<head>` to reflect the new page's title, description, canonical URL, OG tags, and Schema.org information.

## Code Quality

*   **No Minification:** All HTML, CSS, and JS are provided in a human-readable, unminified format.
*   **Well-Commented:** Code includes comments to explain sections and guide customization.
*   **Clean & Indented:** Standard indentation and clean code practices are followed.

These templates are designed to be a starting point. Feel free to customize them extensively to match your brand and product!

# Tweet Reply

![Extension Icon](./icons/icon128.png)

## Overview
**Tweet Reply** is a Chrome Extension designed to streamline the workflow of replying on X (Twitter). It injects a helper button directly into the Tweet composer that, when clicked, automatically extracts the original tweet's text and pastes it into your reply box.

This project was built to demonstrate proficiency in **JavaScript**, **DOM Manipulation**, and **Chrome Extension Architecture** without reliance on heavy frameworks like React or Vue.

---

## Features
*   **Seamless Integration**: The "Extension Button" appears natively within the X.com interface (only in Reply mode, never in New Post mode).
*   **Smart Extraction**: Intelligently identifies the correct tweet to quote, whether you are in a timeline inline reply or a popup modal.
*   **React-Compatible Injection**: Uses ClipboardEvent to ensure text insertion works perfectly with Twitter's React-based editor (which normally blocks simple `innerHTML` changes).
*   **Zero Dependencies**: Built with 100% pure JavaScript, CSS, and HTML.

---

## Project Structure
The codebase follows a modular architecture for scalability and readability.

```
Tweet-Reply/
├── manifest.json            # Extension Configuration & Permissions
├── icons/                   # App Icons
├── src/
│   ├── main.js              # Entry Point: Orchestrates the modules
│   ├── styles/
│   │   └── main.css         # Styling for the injected button
│   └── modules/
│       ├── config.js        # Centralized Selectors (The "Source of Truth") Used for Scaling in the future.
│       ├── dom-observer.js  # Watches the page for Reply Editors (MutationObserver)
│       ├── ui-injector.js   # Builds and places the custom button
│       ├── tweet-extractor.js # Logic to find and clean the tweet text
│       └── logger.js        # Internal logging utility
```

### Key Technical Decisions
1.  **MutationObserver**: Used instead of `setInterval` to efficiently detect when Twitter's dynamic Single Page Application (SPA) renders a new reply box.
2.  **Data-Testid Selectors**: The extension targets `data-testid` attributes (e.g., `[data-testid="tweetText"]`) instead of CSS classes. This makes the extension robust against Twitter's frequent CSS class name changes which are randomly generated.
3.  **Simulated Paste**: To bypass React's virtual DOM limitations, the extension creates a synthetic `paste` event. This forces the editor to accept the text input as if the user typed it, ensuring it saves correctly.

---

## How to Install & Run

Since this is a developer build, it is installed via "Unpacked" mode.

### Prerequisites
*   Google Chrome (or any Chromium-based browser like Brave,etc).

### Steps
1.  **Git Clone/Download**: Ensure you have this project folder (`Tweet-Reply`) on your computer.
2.  **Open Extensions Manager**:
    *   Open Chrome.
    *   Type `chrome://extensions` in the address bar and hit Enter.
3.  **Enable Developer Mode**:
    *   Look for the **"Developer mode"** toggle.
    *   Turn it **ON**.
4.  **Load the Extension**:
    *   Click the **"Load unpacked"** button.
    *   Navigate to and select the **`Tweet-Reply`** folder.
5.  **Verify**:
    *   You should see "Tweet Reply" appear in your list of extensions.
    *   Creating this README was the final step!

## Usage Guide
1.  Go to [x.com](https://x.com).
2.  Find a tweet you want to reply to.
3.  Click the **Reply** icon to open the composer.
4.  Look for the small **Blue and white Button** hovering just above the main "Reply" button.
5.  **Click it!** The text of the tweet you are replying to will instantly appear in your composer.

---

## Troubleshooting
*   **Button not appearing?**
    *   Refresh the page.
    *   Ensure you are in a "Reply" box, not a "New Post" box.


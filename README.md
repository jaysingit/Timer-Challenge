# Timer-Challenge

**The _Almost_ Final Countdown** is a small React game that tests how well you can feel time passing. Start a countdown, and stop it when you think time is *almost* up. The closer you get to zero without reaching it, the higher your score.

**Live demo:** https://jaysingit.github.io/Timer-Challenge/

## How to play

1. Type your name and click **Set Name**. The header then greets you by name; until then it says "Unknown Identity".
2. Pick a challenge:

   | Challenge | Target time |
   |-----------|-------------|
   | Easy      | 1 second    |
   | Medium    | 2 seconds   |
   | Hard      | 3 seconds   |
   | Extreme   | 4 seconds   |

3. Click **Start Challenge**. The timer runs in the background and isn't shown on screen.
4. Click **Stop Challenge** when you think time is nearly up.
5. A result dialog shows how much time was left and your score:
   - **Score** = `round((1 − remaining / target) × 100)`. Stopping just before zero gives a score close to 100.
   - If the timer reaches zero before you stop it, **You Lost**.
6. Close the dialog to reset that challenge.

## Tech stack

- [React 19](https://react.dev/)
- [Vite 4](https://vitejs.dev/) for the dev server and build
- ESLint with the React, React Hooks and React Refresh plugins
- GitHub Actions + GitHub Pages for deployment

## Project structure

```
├── index.html                  # Page shell: header, #root mount point, #modal portal target
├── vite.config.js              # Vite config (base path set for GitHub Pages)
├── .github/workflows/deploy.yml# Build and deploy to GitHub Pages
└── src/
    ├── main.jsx                # Entry point; renders <App /> in StrictMode
    ├── App.jsx                 # Player section + the four timer challenges
    ├── index.css               # Styles (Google Fonts: Quicksand, Handjet)
    └── components/
        ├── Player.jsx          # Name input
        ├── TimerChallenge.jsx  # Countdown logic for one challenge
        └── ResultModal.jsx     # Result dialog shown when a challenge ends
```

## React concepts used

The project is a practice exercise for **refs and portals**:

- **`useRef` for DOM access.** `Player` reads the input's value through a ref when you click the button, instead of tracking every keystroke in state.
- **`useRef` for values that don't trigger renders.** `TimerChallenge` keeps the `setInterval` ID in a ref, so each challenge has its own timer that survives re-renders.
- **Ref as a prop + `useImperativeHandle`.** `ResultModal` takes `ref` as a normal prop (supported from React 19 on) and exposes only an `open()` method. The parent can open the dialog without touching the underlying `<dialog>` element.
- **Portals.** `createPortal` renders the dialog into `#modal` at the top of `<body>`, outside the main component tree.
- **Native `<dialog>`.** The dialog uses `showModal()` and `<form method="dialog">` to close, and its `onClose` handler resets the timer.

## Getting started

Requires [Node.js](https://nodejs.org/) 18 or later (CI uses Node 20).

```bash
npm install      # install dependencies
npm run dev      # start the dev server
npm run build    # production build into dist/
npm run preview  # serve the production build locally
npm run lint     # run ESLint
```

> Because `base` is set to `/Timer-Challenge/` in `vite.config.js`, local URLs include that path, e.g. `http://localhost:5173/Timer-Challenge/`.

## Deployment

Every push to `main` triggers the [Deploy to GitHub Pages](.github/workflows/deploy.yml) workflow. It installs dependencies, builds the app, and publishes `dist/` to GitHub Pages. You can also start it by hand from the **Actions** tab.

One-time setup: in the repo, go to **Settings → Pages → Build and deployment → Source** and select **GitHub Actions**.

If you fork or rename the repo, change `base` in `vite.config.js` to match the new repo name.

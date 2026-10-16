<div align="center">

# 🕹️ Leandro Custódio · Game Dev Portfolio

**A portfolio that plays like an arcade game: insert a coin, watch the intro<br>and pick a project from a 3D character select screen.**

### [▶ Play it live](https://leandrocustodio2002.github.io/portifolio-gameDev/)

![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Three.js](https://img.shields.io/badge/Three.js-000000?logo=threedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222222?logo=githubpages&logoColor=white)

<!-- TODO: replace with a GIF of insert coin → intro → select screen -->
<!-- <img src="docs/demo.gif" alt="Portfolio demo" width="760"> -->

*🎬 Demo GIF coming soon*

</div>

---

## 🎮 How it plays

| | Screen | What happens |
|---|---|---|
| 1 | **Insert Coin** | A blinking `INSERT COIN` on a black screen. Click anywhere to start. |
| 2 | **Intro** | A 3D logo flies in over a sky of clouds, with music, then flashes to white. |
| 3 | **Select Screen** | Projects are laid out as slots on a 3D globe. Hover one to see its banner and portrait, with a spinning `PLAYER` ring locking onto it. Click to open it. |

## 🗂️ Projects inside

| Project | Where it goes |
|---|---|
| Trail To Elenki | [itch.io](https://lph-backspace.itch.io/trail-to-elenki-demo) |
| Eu Presidente | [itch.io](https://lph-backspace.itch.io/eupresidente2) |
| Until It Blooms | [itch.io](https://mihaellk.itch.io/until-it-blooms) |
| Flappy Bird | [GitHub](https://github.com/LeandroCustodio2002/flappyBird) |
| Bad Apple ASCII | [Live demo](https://leandrocustodio2002.github.io/Bad-Apple-ASCII/) |

## ✨ Highlights

- **Real-time 3D** with [React Three Fiber](https://github.com/pmndrs/react-three-fiber) and [drei](https://github.com/pmndrs/drei): the cloud sphere, the 3D logo, the project globe and the rotating ring.
- **Slots placed on a sphere**: each row of the globe is projected onto the sphere surface and turned to face outward, so the cards curve like a real select screen.
- **Arcade feel**: pixel font, select screen music and hover sound effects.
- **Data-driven**: every project on the globe comes from a single JSON file.
- **Static export**: built with `next build` (`output: "export"`) and deployed to GitHub Pages on every push to `main`.

## ➕ Adding a project

Add an entry to [`public/data/projects.json`](public/data/projects.json):

```json
{
  "id": "my-game",
  "name": "My Game",
  "icon": "/projects/icons/my-game.png",
  "portrait": "/projects/myGameBanner.png",
  "url": "https://example.itch.io/my-game"
}
```

Put the images in `public/projects/` and push. The globe picks it up automatically.

## 🛠️ Running locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

> [!NOTE]
> In production the site is served from `/portifolio-gameDev`, so `next.config.ts` sets a `basePath` only when `NODE_ENV=production`. Asset paths in components are prefixed with `NEXT_PUBLIC_BASE_PATH` for the same reason.

## 🚀 Deploy

Every push to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the static site into `out/` and publishes it to GitHub Pages.

## 📁 Structure

```
portifolio-gameDev/
├── app/                    # Next.js app router (layout, page, global styles)
├── components/
│   ├── InsertCoin/         # "INSERT COIN" start screen
│   ├── Intro/              # 3D intro: cloud sphere + logo
│   ├── Globe/              # 3D select screen: globe, slots, player ring, title
│   ├── ProjectBanner/      # Banner of the hovered project
│   ├── ProjectPortrait/    # Portrait of the hovered project
│   ├── Background/
│   └── Sfx/                # Music and hover sounds
├── lib/projects.ts         # Project type
├── public/
│   ├── data/projects.json  # Projects shown on the globe
│   ├── projects/           # Icons and banners
│   ├── music/              # Intro, select screen and hover sounds
│   └── fonts/
└── .github/workflows/      # GitHub Pages deploy
```

## 📫 Contact

[![GitHub](https://img.shields.io/badge/GitHub-LeandroCustodio2002-181717?logo=github)](https://github.com/LeandroCustodio2002)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-leandro--custodio-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/leandro-custodio/)

---

<div align="center">

**Press START to [play](https://leandrocustodio2002.github.io/portifolio-gameDev/)** · If you liked it, drop a ⭐

</div>

# Personal Portfolio

A clean, minimalist personal portfolio website built with [Astro](https://astro.build). Features a projects showcase, blog section, and contact page with a modern, responsive design.

## 📁 Project Structure

```
/
├── public/
│   ├── images/          # Project images and assets
│   └── favicon.png
├── src/
│   ├── components/      # Reusable Astro components
│   │   ├── Header.astro
│   │   ├── Navbar.astro
│   │   ├── Projects.astro
│   │   ├── BlogSection.astro
│   │   └── ...
│   ├── data/
│   │   ├── projects.json  # Projects data
│   │   └── blog/          # Blog markdown files
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       ├── index.astro
│       ├── projects.astro
│       ├── blog/
│       └── contact.astro
└── package.json
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/bdrn/astro-portfolio.git
cd astro-portfolio
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:4321](http://localhost:4321) in your browser

## 📜 Available Commands

| Command                | Action                                       |
| :--------------------- | :------------------------------------------- |
| `npm run dev`          | Starts local dev server at `localhost:4321`  |
| `npm run build`        | Build your production site to `./dist/`      |
| `npm run preview`      | Preview your build locally, before deploying |
| `npm run format`       | Format code with Prettier                    |
| `npm run format:check` | Check code formatting                        |

## 📝 Adding Content

### Projects

Edit `src/data/projects.json` to add or modify projects:

```json
{
  "title": "Project Name",
  "slug": "project-slug",
  "description": "Project description",
  "image": "/images/projects/project-image.png",
  "githubURL": "https://github.com/username/repo",
  "liveURL": "https://project-demo.com"
}
```

### Blog Posts

Add markdown files to `src/data/blog/` directory. The filename will be used as the slug for the blog post URL.

## 🚢 Deployment

This project can be deployed to various platforms:

- **Vercel** - Zero-config deployment
- **Netlify** - Automatic deployments
- **GitHub Pages** - Static site hosting
- **Cloudflare Pages** - Fast global CDN

Build the project:

```bash
npm run build
```

The `dist/` folder contains the static site ready for deployment.

## 📄 License

ISC

## 👤 Author

**Mohamad Badran**

- Website: [mohamadbadran.xyz](https://mohamadbadran.xyz)
- GitHub: [@bdrn](https://github.com/bdrn)

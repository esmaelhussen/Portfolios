(# Portfolio — Personal Website

This repository contains a personal portfolio website built with TypeScript and Vite. It includes a component library, route-based pages, and a small server entry for local development or simple SSR usage.

## Key Features

- Lightweight, component-driven UI built with `.tsx` components
- Route-based pages under `src/routes/` (projects, about, contact, skills)
- Reusable UI primitives in `src/components/ui/`
- Simple server entrypoint (`src/server.ts`) and client start (`src/start.ts`)

## Tech Stack

- TypeScript
- Vite
- React-style TSX components
- Tooling configured in `package.json`, `tsconfig.json`, and `vite.config.ts`

## Project Structure

- `src/` — main source files
  - `components/` — UI components and primitives
  - `routes/` — route pages (index, about, contact, projects)
  - `lib/` — utilities and data (e.g., `portfolio-data.ts`)
  - `server.ts`, `start.ts`, `router.tsx` — app entry and router
- `images/` — project and asset images

## Development

1. Install dependencies

```bash
npm install
```

2. Run the development server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

4. Start the production server

```bash
npm run start
```

Note: this project may also include Bun configuration (`bunfig.toml`). If you use Bun, replace `npm` commands with the equivalent `bun` commands.

## Contributing

Feel free to open issues or pull requests. Follow the existing code style and keep changes focused.

## License

Add a license file (e.g., `LICENSE`) or specify a license in `package.json`.

---

Updated README for the portfolio project.
)

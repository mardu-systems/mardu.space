# Repository Guidelines

## Project Structure & Module Organization
- `app/`: Next.js App Router pages, layouts, and API routes (`app/api/*`).
- `components/`: Reusable UI and feature components.
- `lib/`: Client/server utilities (GA, email, newsletter, etc.).
- `data/`: Static data sources (JSON, TS constants).
- `hooks/`: Reusable React hooks.
- `plugin/`: Local Tailwind plugin(s).
- `public/`: Static assets (favicons, images, sitemap).
- `types/`: Shared TypeScript types.
- `scripts/`: One‑off scripts (e.g., image compression).

## Build, Test, and Development Commands
- `npm run dev`: Start local dev server with Turbopack on 3000.
- `npm run build`: Production build.
- `npm start`: Run the production build locally.
- `npm run lint` / `npm run lint:fix`: Lint (Next + TypeScript) and auto‑fix.
- `npm run type-check`: Strict TypeScript check (no emit).
- `npm run clean`: Remove `.next` build artifacts.
- `npm run build:analyze`: Build with bundle analyzer enabled.
- `npm run images:compress:overwrite`: Optimize images in `public/`.

Engines: Node >= 18.17, pnpm >= 9 (npm/yarn also work). Env: copy `.env.example` → `.env.development`.

## Coding Style & Naming Conventions
- **Language**: TypeScript (strict). Path alias `@/*`.
- **Linting**: ESLint (`next/core-web-vitals`, `next/typescript`). Fix before PR.
- **Styling**: Tailwind CSS 4; prefer utility classes and component composition.
- **Files**: kebab-case filenames (e.g., `cookie-banner.tsx`).
- **Components**: PascalCase exports; variables/functions in camelCase.
- **API**: Place routes under `app/api/<route>/route.ts`.

## Testing Guidelines
- No formal test runner yet. Required: `npm run type-check` and `npm run lint` must pass.
- Prefer small, testable units in `lib/`. Add lightweight unit tests if adding critical logic.
- Manually verify pages and API endpoints via `npm run dev`.

## Commit & Pull Request Guidelines
- Use imperative, concise subjects; prefer Conventional Commits (e.g., `feat:`, `fix:`, `refactor:`) as seen in history.
- Scope PRs narrowly; include:
  - Purpose and screenshots/GIFs for UI changes.
  - Steps to test and affected routes.
  - Linked issues and updated docs (`README.md`, `publisher.md`) when applicable.
- CI hygiene: run `type-check`, `lint`, and local build before requesting review.

## Security & Configuration
- Do not commit secrets. Use `.env.development` locally; keep `.env.example` updated.
- Required vars: GA4 (`NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID`), email (`RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_TO`, `APP_URL`, `NEWSLETTER_SECRET`).
- Optimize large assets with `images:compress:overwrite` before committing.


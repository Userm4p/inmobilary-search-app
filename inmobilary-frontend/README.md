## Inmobilary Frontend

Frontend application for the Inmobilary project built with Next.js (App Router), TypeScript, Tailwind CSS v4, and UI components based on Radix/shadcn. It consumes the backend API via Axios.

### Stack

- **Framework**: Next.js 15 (App Router)
- **Libraries**: React 19, React DOM 19
- **Styling**: Tailwind CSS v4, PostCSS, `tw-animate-css`
- **UI**: Radix UI, shadcn/ui (generator configured via `components.json`), `lucide-react`
- **HTTP**: Axios
- **Carousel**: `embla-carousel-react`
- **Utilities**: `clsx`, `class-variance-authority`, `tailwind-merge`
- **Quality**: ESLint 9 (Next + TS config), Prettier 3
- **Testing**: Jest 30, `@testing-library/jest-dom`, `jest-environment-jsdom`

### Prerequisites

- Node.js 18+ (20+ recommended)
- PNPM 9+ (project includes `pnpm-lock.yaml`)

### Scripts

- `pnpm dev`: start development server with Turbopack
- `pnpm build`: build for production with Turbopack
- `pnpm start`: start production server
- `pnpm lint`: run ESLint
- `pnpm format`: format with Prettier
- `pnpm test`: run Jest and generate coverage (`coverage/`)

### Environment variables

Create a `.env.local` file at the root of `inmobilary-frontend/` with:

```bash
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

- `NEXT_PUBLIC_BACKEND_URL` is used as Axios `baseURL` and in `envs.ts`.

### Folder structure

```text
inmobilary-frontend/
  ├─ src/
  │  ├─ api/
  │  │  ├─ axios.ts                 # Axios instance (baseURL, headers, timeout)
  │  │  └─ helpers/
  │  │     └─ property.service.ts   # PropertyService (list and get by id)
  │  ├─ app/                        # Next.js App Router
  │  │  ├─ layout.tsx               # root layout
  │  │  ├─ page.tsx                 # Home page
  │  │  └─ property/[id]/           # property detail page
  │  ├─ components/
  │  │  ├─ Home/ ...                # Home view components
  │  │  ├─ Property/ ...            # Property view components
  │  │  └─ ui/                      # UI components (button, card, dialog, input, label, carousel)
  │  ├─ config/
  │  │  └─ envs.ts                  # access to public env variables
  │  ├─ context/                    # React Contexts (HomeContext, PropertyContext)
  │  ├─ hooks/                      # hooks (useHome, useProperty)
  │  ├─ lib/
  │  │  └─ utils.ts                 # utilities (e.g., cn)
  │  ├─ types/                      # types for Home and Property
  │  └─ __tests__/                  # unit tests
  ├─ public/                        # public assets
  ├─ components.json                # shadcn/ui config (style, aliases, tailwind)
  ├─ tailwind.config.js             # extensions (animations)
  ├─ postcss.config.mjs             # PostCSS plugins
  ├─ eslint.config.mjs              # ESLint (Next + TS) and test rules
  ├─ jest.config.js                 # Jest config (JSdom, coverage, mappers)
  ├─ jest.setup.ts                  # testing-library setup
  ├─ next.config.ts                 # Next.js config (placeholder)
  ├─ tsconfig.json                  # paths, strict, bundler resolution
  └─ pnpm-lock.yaml
```

### Import aliases

- `@/*` points to `src/*` (configured in `tsconfig.json`)
- shadcn aliases from `components.json`:
  - `components`: `@/components`
  - `ui`: `@/components/ui`
  - `lib`: `@/lib`
  - `utils`: `@/lib/utils`
  - `hooks`: `@/hooks`

### Main routes

- `/` Home (listing and filters)
- `/property/[id]` Property detail

### API consumption

- Axios instance (`src/api/axios.ts`):

```ts
export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
  withCredentials: true,
  validateStatus: status => status >= 200 && status < 500,
});
```

- Property service (`src/api/helpers/property.service.ts`):

```ts
getAllProperties(searchFilters);
getPropertyById(id);
```

Filters are sent as `params`, removing `undefined` values and empty strings.

### Styling & UI

- Tailwind v4 with PostCSS (`@tailwindcss/postcss`).
- `tailwind.config.js` extends animations (`fadeIn`).
- UI components based on Radix/shadcn under `src/components/ui/*`.

### Testing

- Environment: `jsdom`
- Coverage: enabled, output in `coverage/` (includes `lcov` report)
- Mappers: alias `@/components/*` and styles via `identity-obj-proxy`

Run tests:

```bash
pnpm test
```

### Linting & formatting

- ESLint: `pnpm lint`
- Prettier: `pnpm format`

### Local development

1. Install dependencies

```bash
pnpm install
```

2. Configure `.env.local`

```bash
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

3. Run development server

```bash
pnpm dev
```

4. Build & run production

```bash
pnpm build
pnpm start
```

### Notes

- This frontend expects a running backend (see `InmobilaryApi/`). If you use the root `docker-compose.yml`, make sure `NEXT_PUBLIC_BACKEND_URL` matches the published API port.

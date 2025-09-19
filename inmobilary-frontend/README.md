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

#### Overview

The project uses Jest 30 with React Testing Library for comprehensive unit testing. All tests are located in `src/__tests__/` and cover components, hooks, contexts, API services, and utilities.

#### Test Configuration

- **Environment**: `jsdom` (simulates browser environment)
- **Coverage**: Enabled with detailed reports in `coverage/` directory
- **Module Mapping**: All `@/` aliases properly configured for Jest
- **Mocking**: Comprehensive mocks for external libraries (Embla Carousel, Axios)

#### Test Structure

```
src/__tests__/
├── api/                    # API service tests
│   └── property.service.test.ts
├── app/                    # App Router page tests
│   ├── layout.test.tsx
│   ├── page.test.tsx
│   └── property/[id]/
├── components/             # Component tests
│   ├── Home/              # Home page components
│   ├── Property/          # Property page components
│   ├── LazyImage.test.tsx
│   ├── Loader.test.tsx
│   └── Logo.test.tsx
├── config/                # Configuration tests
│   └── envs.test.ts
├── context/               # Context tests
│   ├── HomeContext.test.tsx
│   └── PropertyContext.test.tsx
├── hooks/                 # Custom hooks tests
│   ├── useHome.test.tsx
│   └── useProperty.test.tsx
└── utils.test.ts          # Utility functions tests
```

#### Test Coverage

Current coverage metrics:

- **Statements**: 95.65%
- **Branches**: 86.53%
- **Functions**: 85.45%
- **Lines**: 95.98%

#### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Run specific test file
pnpm test -- PropertyImgCarousel.test.tsx

# Run tests with coverage
pnpm test --coverage

# Run tests matching pattern
pnpm test -- --testPathPattern="hooks|components"
```

#### Test Examples

**Component Testing:**

```tsx
import { render, screen } from '@testing-library/react';
import { PropertyImgCarousel } from '@/components/Property/components/PropertyImgCarousel/PropertyImgCarousel';

jest.mock('embla-carousel-react', () => ({
  useEmblaCarousel: jest.fn(() => [
    jest.fn(),
    { canScrollPrev: jest.fn(() => false), canScrollNext: jest.fn(() => false) },
  ]),
}));

test('renders carousel with property images', () => {
  render(<PropertyImgCarousel />);
  expect(screen.getByRole('region')).toBeInTheDocument();
});
```

**Hook Testing:**

```tsx
import { renderHook, act } from '@testing-library/react';
import { useProperty } from '@/hooks/useProperty';

test('should initialize with default values', () => {
  const { result } = renderHook(() => useProperty('1'));

  expect(result.current.isLoading).toBe(false);
  expect(result.current.error).toBe(null);
  expect(result.current.property).toBe(null);
});
```

**API Service Testing:**

```tsx
import { PropertyService } from '@/api/helpers/property.service';

jest.mock('@/api/axios', () => ({
  instance: { get: jest.fn() },
}));

test('should fetch properties with filters', async () => {
  const mockResponse = { data: [mockProperty] };
  instance.get.mockResolvedValue(mockResponse);

  const service = new PropertyService(instance);
  const result = await service.getAllProperties({ name: 'test' });

  expect(result).toEqual([mockProperty]);
});
```

#### Mocking Strategy

**External Libraries:**

- **Embla Carousel**: Mocked to prevent DOM-related errors in test environment
- **Axios**: Mocked for API service testing
- **React Context**: Properly mocked with test values

**Module Aliases:**
All `@/` paths are properly mapped in `jest.config.js`:

```js
moduleNameMapper: {
  '^@/api/(.*)$': '<rootDir>/src/api/$1',
  '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
  '^@/context/(.*)$': '<rootDir>/src/context/$1',
  '^@/types/(.*)$': '<rootDir>/src/types/$1',
  '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
  '^@/config/(.*)$': '<rootDir>/src/config/$1',
  '^@/components/(.*)$': '<rootDir>/src/components/$1',
}
```

#### Test Utilities

**Custom Render:**

```tsx
import { render } from '@testing-library/react';
import { PropertyContext } from '@/context/PropertyContext';

const renderWithContext = (component, contextValue) => {
  return render(
    <PropertyContext.Provider value={contextValue}>{component}</PropertyContext.Provider>
  );
};
```

**Mock Data:**

```tsx
const mockProperty = {
  id: '1',
  name: 'Test Property',
  address: '123 Test St',
  price: 100000,
  ownerId: 'owner1',
  owner: { id: 'owner1', name: 'John Doe' },
  images: ['image1.jpg', 'image2.jpg'],
  traces: [],
};
```

#### Best Practices

1. **Test Naming**: Use descriptive test names that explain the expected behavior
2. **Arrange-Act-Assert**: Structure tests clearly with setup, execution, and verification
3. **Mock External Dependencies**: Always mock external libraries and API calls
4. **Test User Interactions**: Focus on testing user-visible behavior
5. **Coverage Goals**: Maintain high coverage while focusing on meaningful tests
6. **Cleanup**: Use `beforeEach` and `afterEach` for proper test isolation

#### Debugging Tests

```bash
# Run tests with verbose output
pnpm test -- --verbose

# Run single test file with debug info
pnpm test -- --testPathPattern="PropertyImgCarousel" --verbose

# Run tests and update snapshots
pnpm test -- --updateSnapshot
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

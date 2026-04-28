# Architecture Documentation

## Overview

This project is a responsive single-page application (SPA) for browsing, filtering, and purchasing smartphones. 

It is built with **React 19**, **TypeScript**, and **Vite**, following a modular architecture inspired by **Clean Architecture** principles.

The application consumes an external REST API with `x-api-key` authentication and persists shopping cart state via `localStorage`.

---

## Architecture Diagram

- **Presentation**:

-Pages (orchestrator)

-Components (UI units)

-Hooks (useDebounce, useIsCartPage)

- **Application**:

-Flows 

-fetchApi (HTTP client)

- **Infrastructure**:

-CartContext (Context API) + localStorage persistence

- **Domain**:

-Models (interfaces + types)

-Constants (labels, paths, API config)

-Types (AppPathValues)

---

## Layer Breakdown

### 1. Domain Layer (`src/domain/`)

The **innermost layer** with zero external dependencies. It defines the language of the application.

#### `models/interfaces.ts`

TypeScript interfaces for all data structures and component props. Each interface is documented with TSDoc comments. Key entities:

- `ProductListItem` — Minimal product representation for catalog cards.

- `ProductDetail` — Extended product with specs, color/storage options, and similar products.

- `CartItemModel` — Shopping cart item with selected variant configuration.

- Component props: `SearchFormProps`, `ProductCardProps`, `CartItemProps`, etc.

#### `models/types.ts`

Derived types like `AppPathValues` that extract literal types from route constants.

#### `constants/`

Centralized string literals and configuration values:

- `paths.ts` — Route definitions (`HOME`, `CART`, `PRODUCT`).

- `api.ts` — API parameter keys and error messages.

- `*.labels.ts` — UI text strings per page (home, product, cart, shared), enabling future i18n.

### 2. Application Layer (`src/application/`)

Orchestrates **use cases** by connecting the domain to external services.

#### `fetchApi.ts`

Generic HTTP client that:

- Reads API credentials from Vite environment variables (`VITE_API_URL`, `VITE_API_KEY`).

- Injects the `x-api-key` authentication header in every request.

- Provides type-safe JSON parsing via generics.

#### `flows/`

Data-fetching use cases:

- `getProductsFlow.ts` — Retrieves the product catalog with optional `search`, `limit`, and `offset` query parameters.

- `getProductByIdFlow.ts` — Fetches detailed product data by ID.

### 3. Infrastructure Layer (`src/infrastructure/`)

Handles **external concerns** like state persistence and framework-specific integrations.

#### `context/CartContext.tsx`

React Context provider that manages the shopping cart:

- **State initialization**: Reads from `localStorage` on mount (with SSR-safe guard).

- **Persistence**: Syncs state to `localStorage` via `useEffect`.

- **Actions**: `addToCart` (with duplicate-variant detection) and `handleRemoveFromCart`.

- **Derived values**: `cartTotalItems` and `cartTotalPrice` computed on each render.

- Custom `useCart()` hook with a runtime guard to enforce provider hierarchy.

### 4. Presentation Layer (`src/presentation/`)

The **UI layer**, structured into three sub-modules:

#### Pages (`pages/`)

Top-level route views acting as **orchestrators**. Each page:

- Delegates logic to a co-located custom hook (`useXxxPageLogic`).

- Uses React 19 `Suspense` for declarative async loading.

- Uses `ErrorBoundary` for fault tolerance.

- Injects SEO metadata via `<title>` and `<meta>` tags.

| Page | Hook | Role |
|------|------|------|
| `HomePage` | `useHomePageLogic` | Catalog browsing with real-time search |
| `ProductPage` | `useProductPageLogic` | Product detail with variant selection |
| `CartPage` | `useCartPageLogic` | Cart management and checkout flow |

#### Components (`components/`)

Organized by feature domain:

- `shared/` — Reusable primitives: `Image`, `Loader`, `ErrorMessage`, `PrimaryButton`, `LinkButton`, `Layout`.

- `home-page/` — `SearchForm`, `SearchInfo`, `ProductList`, `ProductCard`.

- `product-page/` — `ProductDetailContent`, `ProductImage`, `ProductHeader`, `ProductOptions`, `ProductSpecs`, `SimilarProductsList`.

- `cart-page/` — `CartItem`, `CartTitle`, `CartTotal`, `CartPayButton`, `EmptyCart`.

#### Hooks (`hooks/`)

Shared UI logic:

- `useDebounce` — Generic debounce hook with configurable delay.

- `useIsCartPage` — Route-aware boolean for conditional rendering in the header.

### 5. Utilities (`src/utils/`)

Pure functions with no side effects:

- `formatPrice.ts` — Locale-aware price formatting using `Intl.NumberFormat` with German locale to enforce dot separators.

---

## Data Flow

```
User Action (search, navigate, add to cart)
       │
       ▼
  Page Hook (useXxxPageLogic)
       │
       ├── State update (useState, Context)
       │
       ▼
  Application Flow (getProducts, getProductById)
       │
       ▼
  fetchApi (HTTP + x-api-key auth)
       │
       ▼
  External REST API
       │
       ▼
  Promise resolution via React 19 use() hook
       │
       ▼
  Component re-render with new data
```

---

## State Management

The application uses two state management strategies:

1. **Local State**: `useState` within page logic hooks for transient UI state (search queries, selected variants).

2. **Global State**: React Context API (`CartContext`) for shared state across all views, with `localStorage` persistence for session survival.

---

## Testing Strategy

- **Framework**: Vitest + React Testing Library + jest-dom matchers.

- **Environment**: JSDOM (configured in `vite.config.ts`).

- **Post-test cleanup**: Automatic DOM teardown via `src/test/setup.ts`.

- **Coverage**: Component tests co-located in `__tests__/` folders alongside source files. Page-level tests in `src/presentation/pages/__tests__/`.

- **Patterns used**:
  - `act()` wrappers for React 19 Suspense components.
  - `vi.mock()` for API flow isolation.
  - `vi.fn()` for callback verification.
  - `MemoryRouter` for route-dependent components.

---

## Build & Deployment

| Command | Mode | Description |
|---------|------|-------------|
| `npm run dev` | Development | Vite dev server, unminified assets, HMR enabled |
| `npm run build` | Production | TypeScript compilation + Rollup bundling (minified, tree-shaken) |
| `npm run preview` | Production Preview | Local server for the `dist/` output |
| `npm run lint` | Quality | ESLint with TypeScript and React rules |
| `npm run format` | Quality | Prettier code formatting |
| `npm run test` | Testing | Vitest in watch mode |
| `npm run test:ui` | Testing | Interactive Vitest UI |
| `npm run test:coverage` | Testing | Coverage report |

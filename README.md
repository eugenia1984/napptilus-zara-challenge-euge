# Zara Smartphone Catalog Challenge

A high-performance, responsive web application for browsing and managing a smartphone catalog code by [María Eugenia Costa](https://github.com/eugenia1984).

This project is built with a focus on clean architecture, accessibility, and high-fidelity UI.

## 🚀 Technical Stack

* **Frontend**: React (v19.2.5), react-touter (v7.14.2) and React-Router-DOM (v7.14.2)

* **Build Tool**: Vite (v8.0.1)

* **State Management**: React Context API (for shopping cart persistence)

* **Environment**: Node.js (v22.12.0) 

* **Styling**: CSS Variables (Responsive Design)

* **Testing**: Vitest + React Testing Library 

## 🛠 Project Structure & Infrastructure

The project follows a modular architecture inspired by Clean Architecture principles to ensure scalability and separation of concerns:

```
src
 ├── mocks             # Mock data for testing and development
 ├── application       # Business logic and coordination
 │     └── use-cases   # Application logic for products and details
 ├── assets            # Static files (images, global fonts)
 ├── domain            # constants for literals and models (interfaces and types)
 ├── infrastructure    # External tools and state persistence
 │     └── context     # Cart state management and localStorage sync
 ├── presentation      # UI Layer
 │     ├── components  # Reusable UI atoms and molecules
 │     ├── hooks       # Custom React hooks (logic reuse)
 │     └── pages       # Main views (Home, Product, Cart)
 ├── test              # Set up test
 └── utils             # Formatting and helper functions
```

## 📋 Features

* **Product Listing**: Grid view of the top 20 devices with real-time API filtering by name or brand.

* **Smart Search**: Real-time results indicator and optimized API queries.

* **Dynamic Product Detail**: Technical specs with dynamic image switching based on color selection and storage price updates.

* **Persistent Shopping Cart**: State is maintained via `localStorage`, allowing users to keep their items after page refreshes.

* **Responsive UI**: Optimized experience for mobile and desktop following Figma specifications.

## 🧪 Testing Strategy

Automated testing is implemented using **Vitest** and **React Testing Library** to ensure component reliability and requirement compliance.

* **Unit & Integration Tests**: Focused on key UI components and the main application views (List, Detail, and Cart).

* **Post-Test Cleanup**: The suite includes an explicit `cleanup` cycle after each test case (configured in `src/test/setup.ts`). This ensures **test idempotency** by clearing the virtual DOM, preventing state leakage between tests.

* **DOM Validation**: Extensive use of `@testing-library/jest-dom` matchers to verify accessibility standards (ARIA labels, roles) and UI states.

* **Component Co-location**: Tests are located within `__tests__` folders alongside their respective components to improve discoverability and maintainability.

## App flow

- Home page: `/`

- Product detail page: `/product/id={id}`

- Cart page: `/cart`

## 🚦 Getting Started

### Prerequisites

* Node.js `v22.13.0`

* NPM (comes with Node)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/zara-challenge.git
   ```

2. Navigate to the project folder:
   ```bash
   cd zara-challenge
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Execution

* **Development Mode**: Assets are served without minification for easier debugging.
    ```bash
    npm run dev
    ```
* **Production Mode**: Compiles, concatenates, and minimizes assets for optimal performance.
    ```bash
    npm run build
    ```
* **Testing (Terminal)**: Run the automated test suite in watch mode.
    ```bash
    npm run test
    ```
* **Testing (Visual UI)**: Open the interactive Vitest UI in your browser to see detailed results and reports.
    ```bash
    npm run test:ui
    ```

## 🔑 Environment Variables

To interact with the REST API, create a `.env` file in the root directory:

```env
VITE_API_URL=https://prueba-tecnica-api-tienda-moviles.onrender.com
VITE_API_KEY=87909682e6cd74208f41a6ef39fe4191
```
*Note: All requests include the `x-api-key` header for authentication.*

## ♿ Accessibility & Quality

* **Semantic HTML**: Proper use of landmarks (`<main>`, `<section>`, `<header>`) and buttons for screen reader compatibility.

* **Styling**: Built using CSS Variables, strictly following the font-family: `Helvetica, Arial, sans-serif` requirement.

* **Code Quality**: Integrated ESLint and Prettier for consistent code style and linting.

* **Console Cleanliness**: Developed to ensure the browser console remains free of errors and warnings during execution.

---

*Developed as part of the Napptilus Tech Labs / Zara Technical Challenge.*

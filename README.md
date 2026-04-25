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
 ├── domain            # constants for literals and models
 ├── infrastructure    # External tools and state persistence
 │     └── context     # Cart state management and localStorage sync
 ├── presentation      # UI Layer
 │     ├── components  # Reusable UI atoms and molecules
 │     ├── hooks       # Custom React hooks (logic reuse)
 │     └── pages       # Main views (Home, Product, Cart)
 └── utils             # Formatting and helper functions
```

## 📋 Features

* **Product Listing**: Grid view of the top 20 devices with real-time API filtering by name or brand.

* **Smart Search**: Real-time results indicator and optimized API queries.

* **Dynamic Product Detail**: Technical specs with dynamic image switching based on color selection and storage price updates.

* **Persistent Shopping Cart**: State is maintained via `localStorage`, allowing users to keep their items after page refreshes.

* **Responsive UI**: Optimized experience for mobile and desktop following Figma specifications.


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
* **Testing**: Run the automated test suite.
    ```bash
    npm run test
    ```

## 🔑 Environment Variables

To interact with the REST API, create a `.env` file in the root directory:

```env
VITE_API_URL=https://prueba-tecnica-api-tienda-moviles.onrender.com
VITE_API_KEY=87909682e6cd74208f41a6ef39fe4191
```
*Note: All requests include the `x-api-key` header for authentication.*

## ♿ Accessibility & Quality

* **Semantic HTML**: Proper use of landmarks and buttons for screen reader compatibility.

* **Code Quality**: Strict Linting and Formatting (ESLint + Prettier) to ensure a clean codebase.

* **Console Cleanliness**: Zero errors or warnings in the browser console.

---

*Developed as part of the Napptilus Tech Labs / Zara Technical Challenge.*

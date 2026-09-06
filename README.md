# 1Fi Marketplace

## Project Overview

This project is a submission for the 1Fi SDE Intern Assignment.

The objective is to build the **1Fi Marketplace** section inside the existing Shop page of the 1Fi app, consistent with the app's UI and UX.

Top Brands and Nearby Stores are intentionally left unimplemented for this assignment and display a **Coming soon** placeholder.

## Features

- Three-tab Shop switcher: Top Brands, Nearby Stores, and 1Fi Marketplace
- Responsive marketplace product listing grid
- Product details page with variant selection
- EMI-plan selection for no-cost and interest-bearing plans
- Sticky CTA validation that remains disabled until required selections are made
- In-page demo confirmation modal
- Loading, error, empty, and not-found states
- Fully responsive layout: mobile single-column, tablet two-column, and desktop three-column product grids

## Tech Stack

- React (JavaScript) with Vite
- Tailwind CSS
- React Router for client-side routing
- Local component state only (`useState`/`useReducer`); no Redux or Zustand
- No backend: local JSON data with an async service layer simulating API calls
- No automated tests; they were explicitly out of scope for this assignment, with manual testing prioritized instead

## Architecture

- `pages/` contains route-level screens.
- `components/shop/` contains shared Shop chrome: the banner, tabs, search bar, and bottom navigation.
- `components/marketplace/` contains Marketplace-specific UI.
- `services/` contains the data-access layer.
- `data/` contains the product dataset and product image map.
- `utils/` contains formatting helpers.

## Data/API Approach

Product and EMI data lives in `src/data/products.json` and is accessed only through `src/services/productService.js`, which exposes `getProducts` and `getProductById`. The service adds an artificial delay to simulate network latency.

This avoids hardcoding data in UI components, demonstrates a realistic data-fetching pattern with loading and error states without requiring a real backend, and makes a future API swap straightforward because components never import the JSON directly.

All product names, prices, and EMI figures—including interest rates, tenures, and monthly amounts—are fictional and were created solely for this assignment demo. They do not represent real products or any actual 1Fi financial offering, rate, or partnership.

## Project Structure

```text
src/
├── App.jsx
├── components/
│   ├── marketplace/
│   │   ├── ConfirmationModal.jsx
│   │   ├── EmiPlanSelector.jsx
│   │   ├── EmptyState.jsx
│   │   ├── ErrorState.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductGrid.jsx
│   │   ├── ProductGridSkeleton.jsx
│   │   └── VariantSelector.jsx
│   └── shop/
│       ├── BottomNav.jsx
│       ├── SearchBar.jsx
│       ├── ShopBanner.jsx
│       └── ShopTabs.jsx
├── data/
│   ├── productImages.js
│   └── products.json
├── index.css
├── main.jsx
├── pages/
│   ├── MarketplacePage.jsx
│   ├── ProductDetailsPage.jsx
│   └── ShopPage.jsx
├── services/
│   └── productService.js
└── utils/
    └── formatCurrency.js
```

## Local Setup and Run Instructions

Prerequisite: Node.js `v22.17.1` was used for this project.

```bash
npm install
npm run dev
```

Vite serves the application on `http://localhost:5173` by default.

## Marketplace Flow

1. Open Shop.
2. Select the 1Fi Marketplace tab.
3. Browse the product listing.
4. Select a product to open its details.
5. Select a variant when the product has variants.
6. Select an EMI plan.
7. Select **Proceed with this plan**.
8. Review the in-page demo confirmation modal and order summary.

The confirmation flow is clearly marked as a demo: no real payment is processed and no order is created.

## Known Limitations

- Top Brands and Nearby Stores are intentionally unimplemented within the assignment scope.
- Product and EMI data is static and mocked; it is not connected to a real backend.
- There is no automated test suite; manual testing only was chosen for the assignment scope.
- There is no real payment or checkout integration; the CTA opens a demo confirmation only.
- All EMI figures are fictional and provided for demonstration purposes only.

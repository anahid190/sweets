# Anahita — Luxury Handmade Chocolate Storefront

A refined, RTL Persian storefront and commerce-control prototype for **Anahita**, a handmade chocolate brand. The experience combines quiet luxury on the storefront with dedicated private-client and atelier-management spaces.

## Live demo

[Open the Anahita demo](https://8328-i3k0irt2a21rb3cudl07e-7ab8868e.us5.manus.computer)

Use the **حساب من** button to open the customer dashboard, or the **مدیریت** button to open the admin control center.

This is a front-end commerce prototype. Product browsing, product details, cart updates, customer account views, admin dashboards, checkout form validation, and the order-success state are implemented in the browser. Payment processing, inventory persistence, customer authentication, and order persistence are not connected yet.

## Features

### Storefront

- RTL Persian interface with responsive desktop, tablet, and mobile layouts
- Luxury editorial landing page with brand story and gifting section
- Product catalog for 2, 4, 6, 9, 12, 24, and 36-piece chocolate boxes
- Product detail modal with quantity selection and product descriptions
- Shopping cart with add, remove, quantity controls, subtotal, shipping, and total
- Free-shipping threshold for orders above 1,500,000 toman
- Checkout form for customer name, phone, email, address, city, and postal code
- Simulated secure checkout and success confirmation state

### Customer panel

- Private-client dashboard with spend, order, and loyalty metrics
- Recent-order activity with status pills
- Order history with filters for preparation, shipping, and delivery status
- Saved favorites with product cards
- Saved delivery address with default-address treatment
- Profile information view and loyalty progress toward the next gift

### Admin panel

- Atelier dashboard with monthly revenue, new orders, active customers, and average order value
- SVG sales trend chart with date-range selector
- Top-products performance module
- Recent transactions table with order statuses
- Order-management table with search and CSV-export affordance
- Product and pricing management table
- Customer overview with segment and lifetime-value summaries
- Inventory dashboard with stock bars and low-stock alerts
- Store settings surface for shipping, notifications, gift cards, and visibility controls

## Tech stack

- React 19
- TypeScript
- Vite
- CSS with responsive breakpoints
- pnpm

## Run locally

Requirements: Node.js 18+ and pnpm.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Create a production build:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```

## Project structure

```text
.
├── public/
│   └── manus-routes.json     # Declared website routes
├── src/
│   ├── main.tsx              # Storefront, cart, customer panel, admin panel
│   ├── styles.css             # Visual system, dashboards, and responsive layout
│   └── vite-env.d.ts          # Vite type declarations
├── app.config.ts              # Project logo metadata
├── index.html                 # Persian document shell and SEO metadata
├── package.json               # Scripts and dependencies
├── tsconfig.json              # TypeScript configuration
└── vite.config.ts             # Vite configuration and port 3000
```

## Customization

Product names, box sizes, prices, descriptions, and image references are defined near the top of `src/main.tsx` in the `products` array. Update the image constants in the same file to use your own product photography. The main color tokens, typography, spacing, storefront, and dashboard behavior are defined in `src/styles.css`.

## Commerce integration notes

This repository currently contains a polished front-end demo. To make it production-ready, connect the checkout form to a server endpoint, add persistent products and orders, integrate a payment provider, add authenticated customer and admin sessions, validate inventory, and configure a durable image storage/CDN layer. Do not place payment secrets in browser code.

## Brand

Anahita is the current brand name throughout the interface, page metadata, product copy, contact email, and footer.

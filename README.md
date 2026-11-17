# Anahita — Luxury Handmade Chocolate Storefront

A refined, RTL Persian storefront for **Anahita**, a handmade chocolate brand. The experience is designed around quiet luxury, editorial product presentation, and a simple shopping flow.

## Live demo

[Open the Anahita demo](https://8328-i3k0irt2a21rb3cudl07e-7ab8868e.us5.manus.computer)

The live demo is a front-end commerce prototype. Product browsing, product details, cart updates, checkout form validation, and the order-success state are implemented in the browser. Payment processing, inventory, customer accounts, and order persistence are not connected yet.

## Features

- RTL Persian interface with responsive layouts for desktop, tablet, and mobile
- Luxury editorial landing page with brand story and gifting section
- Product catalog for 2, 4, 6, 9, 12, 24, and 36-piece chocolate boxes
- Product detail modal with quantity selection and product descriptions
- Shopping cart with add, remove, quantity controls, subtotal, shipping, and total
- Free-shipping threshold for orders above 1,500,000 toman
- Checkout form for customer name, phone, email, address, city, and postal code
- Simulated secure checkout and success confirmation state
- Custom SVG icon set with no icon-library dependency
- Dedicated route manifest at `/manus-routes.json`

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
│   ├── main.tsx              # App, product data, cart, modals, checkout
│   ├── styles.css             # Visual system and responsive layout
│   └── vite-env.d.ts          # Vite type declarations
├── app.config.ts              # Project logo metadata
├── index.html                 # Persian document shell and SEO metadata
├── package.json               # Scripts and dependencies
├── tsconfig.json              # TypeScript configuration
└── vite.config.ts             # Vite configuration and port 3000
```

## Customization

Product names, box sizes, prices, descriptions, and image references are defined near the top of `src/main.tsx` in the `products` array. Update the image constants in the same file to use your own product photography. The main color tokens, typography, spacing, and responsive behavior are defined in `src/styles.css`.

## Commerce integration notes

This repository currently contains a polished front-end demo. To make it production-ready, connect the checkout form to a server endpoint, add persistent products and orders, integrate a payment provider, validate inventory, and configure a durable image storage/CDN layer. Do not place payment secrets in browser code.

## Brand

Anahita is the current brand name throughout the interface, page metadata, product copy, contact email, and footer.

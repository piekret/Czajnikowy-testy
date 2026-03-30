# 🫖 Czajnikowy Playwright Tests

Automated end-to-end (E2E) test suite for the e-commerce website [czajnikowy.com.pl](https://www.czajnikowy.com.pl), built with [Playwright](https://playwright.dev/).

This project was created to test the most important user flows of an online store, including:

- product search
- product page validation
- cart behavior
- checkout redirects
- account-related flows
- cookies banner
- responsive/mobile behavior

---

## 📌 Project Goal

The goal of this project is to verify whether the most important features of the store work correctly from the user's perspective.

These tests simulate real user behavior in a browser and validate both:

- **functional behavior**
- **UI behavior**
- **basic responsive behavior**

---

## 🧪 Test Types Covered

This project contains mainly:

- **End-to-End (E2E) tests**
- **Functional tests**
- **UI tests**
- **Responsive tests**

Examples of tested scenarios:

- entering checkout with an empty cart
- adding a product to cart
- removing a product from cart
- searching for products
- verifying product availability
- checking login / password reset forms
- accepting cookies
- testing selected mobile behavior

---

## 🛠 Tech Stack

- **Node.js**
- **TypeScript**
- **Playwright**

---

## 📂 Project Structure

```bash
.
├── tests/
│   ├── account.spec.ts
│   ├── cart.spec.ts
│   ├── checkout.spec.ts
│   ├── cookies.spec.ts
│   ├── product.spec.ts
│   ├── responsive.spec.ts
│   ├── search.spec.ts
│   └── example.spec.ts
│
├── utils/
│   └── fixtures.ts
│
├── playwright.config.ts
├── package.json
└── README.md

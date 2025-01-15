# E-Commerce React Application

## Project Overview
This project is an e-commerce web application built using React, TypeScript, Vite, and Tailwind CSS. It features user authentication, product listings, a shopping cart, and category filtering. The application communicates with an external API for user and product management.

## Features
- **User Authentication**:
  - Register new users via the [POST] `https://api.escuelajs.co/api/v1/users`
  - Login users via the [POST] `https://api.escuelajs.co/api/v1/auth/login`

- **Product Listings**:
  - Fetch products from the API at [GET] `https://api.escuelajs.co/api/v1/products`
  - Filter products by category

- **Shopping Cart**:
  - Add products to the cart
  - Update product quantities in the cart
  - Remove products from the cart

- **Responsive Design**:
  - Styled with Tailwind CSS for a mobile-friendly and responsive layout

## Installation

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14 or later)
- npm (comes with Node.js) or yarn

### Steps
1. Install dependencies:
   ```bash
   npm install
2. Start the development server:
   ```bash
   npm run dev
3. Open the application in your browser at `http://localhost:5173`.

## Folder Structure
```
├── src
│   ├── components
│   │   ├── Cart.tsx         # Shopping cart page
│   │   ├── Login.tsx        # User login page
│   │   ├── Navbar.tsx       # Navigation bar
│   │   ├── Sidebar.tsx      # Category filtering sidebar
│   │   ├── ProductCard.tsx  # Individual product cards
│   │   ├── Register.tsx     # User registration page
│   ├── pages
│   │   ├── Home.tsx         # Product listing and filtering
│   │   ├── ProductDetail.tsx# Detailed product view
│   ├── App.tsx              # Main application file
│   └── main.tsx             # Entry point
├── public                   # Static assets
├── package.json             # Project dependencies
└── README.md                # Project documentation
```

## API Endpoints
### Products
- **Get All Products**: `https://api.escuelajs.co/api/v1/products`

### Users
- **Get All Users**: `https://api.escuelajs.co/api/v1/users`
- **Register User**: `https://api.escuelajs.co/api/v1/users`

### Authentication
- **Login User**: `https://api.escuelajs.co/api/v1/auth/login`

## Scripts
- **Start Development Server**:
  ```bash
  npm run dev
  ```
- **Build for Production**:
  ```bash
  npm run build
  ```
- **Preview Production Build**:
  ```bash
  npm run preview
  ```

## Dependencies
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- React Icons

## Future Enhancements
- Add payment integration
- Add user profile management
- Implement server-side rendering for SEO optimization

## License
This project is licensed under the MIT License. See the LICENSE file for details.

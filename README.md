# Genesis Electric - Project Documentation

## Table of Contents
- [Introduction](#introduction)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Build for Production](#build-for-production)
- [Architecture Overview](#architecture-overview)
- [Component Documentation](#component-documentation)
  - [Main Entry Point](#main-entry-point)
  - [Layout Component](#layout-component)
  - [Header Component](#header-component)
  - [Item Component](#item-component)
  - [Form Component](#form-component)
  - [ServiceOrderButton Component](#serviceorderbutton-component)
- [Page Documentation](#page-documentation)
  - [Home Page](#home-page)
  - [Products Page](#products-page)
  - [Dashboard Page](#dashboard-page)
- [Container Documentation](#container-documentation)
  - [Items Container](#items-container)
  - [ProductDashboardList Container](#productdashboardlist-container)
- [Services Documentation](#services-documentation)
  - [Authentication Service](#authentication-service)
- [Routing System](#routing-system)
- [State Management](#state-management)
- [Data Models](#data-models)
  - [Product Model](#product-model)
- [Styling Approach](#styling-approach)
- [Contributing Guidelines](#contributing-guidelines)
  - [Development Process](#development-process)
  - [Code Style](#code-style)
  - [Commit Message Format](#commit-message-format)
  - [Pull Request Process](#pull-request-process)
- [Notes](#notes)

---

## Introduction

Genesis Electric is a Progressive Web Application (PWA) for an air conditioning sales and service business based in Barranquilla, Colombia. The application allows customers to browse products, submit service requests, and interact with the company through a responsive web interface.

The application serves as both an e-commerce platform and a service management system for air conditioning products and services, designed to:

- Showcase available air conditioning products
- Allow customers to request maintenance and repair services
- Provide company information and contact details

---

## Project Structure

```
genesis-electric/  
├── public/             # Static assets and manifest  
├── src/  
│   ├── assets/         # Images and media files  
│   ├── components/     # Reusable UI components  
│   ├── containers/     # Container components that manage state  
│   ├── db/             # Data files (products.json)  
│   ├── layout/         # Layout components  
│   ├── Pages/          # Page-level components  
│   ├── routes/         # Routing configuration  
│   ├── services/       # API service functions  
│   ├── styles/         # CSS modules  
│   ├── index.css       # Global styles  
│   └── main.jsx        # Application entry point  
├── index.html          # HTML template  
├── package.json        # Dependencies and scripts  
└── vite.config.js      # Vite configuration  
```

---

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
git clone https://github.com/ricocondee/genesis-electric.git  
cd genesis-electric
npm install
npm run dev
```

### Build for Production

```bash
npm run build
```

### Environment Variables

The project requires several environment variables to be set for development and production. A template file named `.env.example` is included in the root of the project. Create a copy of this file named `.env` and replace the placeholder values with your actual credentials.

- `VITE_API_BASE_URL`: The base URL for the backend API.
- `VITE_CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name for image hosting.
- `VITE_REMOVEBG_API_KEY`: Your remove.bg API key for removing image backgrounds.
- `VITE_FEATURABLE_ID`: Your Featurable ID for customer reviews.

---

## Architecture Overview

| Category          | Technologies         |
|------------------|----------------------|
| Core Framework    | React 18             |
| Build Tool        | Vite                 |
| Routing           | React Router 6       |
| PDF Generation    | jsPDF, html2canvas   |
| Form Handling     | React Hook Form      |
| Animation         | Framer Motion        |
| UI Components     | React Icons, Lucide React |

Component-based architecture:

- Functional components with React Hooks
- CSS Modules for styling
- Local state via `useState`, `useEffect`
- Navigation via React Router

---

## Component Documentation

### Main Entry Point
`main.jsx` renders the App component.

### Layout Component
Wraps all pages. Conditionally renders Header and Footer.

### Header Component
Handles site navigation and routing between pages.

### Item Component
Displays product details: images, features, price, and WhatsApp contact.

Key features:

- Price formatting (COP)
- Conditional feature icons
- Discount display in May
- WhatsApp message builder

### Form Component
Contact form that:

- Collects user details (name, email, phone, address, inquiry)
- Sends the data to the backend via a POST request to `/api/contact`
- Shows a success or error message to the user

### ServiceOrderButton Component
Generates service order PDFs with:

- Customer & service details
- Order number
- Date, time, and signature

---

## Page Documentation

### Home Page
Landing page with:

- Hero banner
- About and services
- Testimonials
- Contact form
- Cookie consent

### Products Page
Displays:

- List of products
- Filtering, search, and sorting
- Pricing and capacity notices

### Dashboard Page
Admin interface with:

- Auth-protected access
- Mobile menu
- Product management tools

---

## Container Documentation

### Items Container
Handles:

- Fetching product data
- Calculating price + taxes + discounts
- Sorting & searching
- Rendering products

### ProductDashboardList Container
Admin tools for:

- Product listing with pagination
- Search and filter
- Add/edit/delete products

---

## Services Documentation

### Authentication Service
Handles:

- User registration
- Login and token storage
- Authenticated requests

---

## Routing System

Uses React Router v6.

Routes:

- Public: `/`, `/products`, `/privacy-policy`, etc.
- Dynamic: `/products/:id`
- Auth: `/login`, `/register`
- Protected: `/dashboard`

Features:

- Token-based access control
- Page transitions via Framer Motion
- Hash-based section scrolling

---

## State Management

React hooks:

- Local: `useState`, `useEffect`
- Auth: token in `localStorage` + App state
- Products: fetched and transformed on load
- UI: local loading/error states

---

## Data Models

### Product Model

```json
{
  "stock": Number,
  "seer": String,
  "color": String,
  "wifi": Boolean,
  "type": String,
  "publicId": String,
  "name": String,
  "specs": [
    {
      "volt": String,
      "btu": String
    }
  ],
  "refr": String,
  "price": String,
  "image": [String],
  "description": String
}
```

---

## Styling Approach

- CSS Modules per component
- Global variables via `:root`
- Responsive with media queries
- Framer Motion for animations
- Example: `Item.module.css` for product styles

---

## Contributing Guidelines

### Development Process
```bash
# Fork & clone
git checkout -b feature/amazing-feature
git commit -m "Add amazing feature"
git push origin feature/amazing-feature
# Then open a Pull Request
```

### Code Style

- Use functional components
- Use Hooks
- CSS Modules
- Spanish UI content

### Commit Message Format

- Clear, descriptive messages
- Reference issues if applicable

### Pull Request Process

- Update docs if necessary
- Get maintainer approval
- Pass all tests/checks

---

## Notes

This documentation offers a complete overview of Genesis Electric—a React-based PWA for a Colombian air conditioning business. It includes product showcases, service ordering with PDF generation, and responsive, mobile-friendly design.

For questions or help, please [open an issue](https://github.com/ricocondee/genesis-electric/issues).

### Suggested Wiki Pages:

- [Routing and Navigation](https://github.com/ricocondee/genesis-electric/wiki/Routing-and-Navigation)
- [Home and About Pages](https://github.com/ricocondee/genesis-electric/wiki/Home-and-About-Pages)
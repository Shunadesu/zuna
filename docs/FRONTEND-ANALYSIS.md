# Zuna Frontend - Technical Analysis Report

**Document Version:** 1.0  
**Date:** April 25, 2026  
**Author:** Claude Code Analysis

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [Routes & Pages](#3-routes--pages)
4. [API Endpoints](#4-api-endpoints)
5. [State Management](#5-state-management)
6. [Features Overview](#6-features-overview)
7. [SEO Implementation](#7-seo-implementation)
8. [Technology Stack](#8-technology-stack)
9. [Recommendations](#9-recommendations)

---

## 1. Project Overview

**Zuna** là một digital marketplace frontend được xây dựng bằng React, phục vụ như một nền tảng bán sản phẩm và dịch vụ kỹ thuật số.

### Project Metadata

| Property | Value |
|----------|-------|
| **Framework** | React 18.2.0 |
| **Build Tool** | Vite 5.0.8 |
| **Routing** | React Router DOM 6.20.0 |
| **Styling** | Tailwind CSS 3.3.6 |
| **State Management** | Zustand 4.4.7 |
| **HTTP Client** | Axios 1.6.2 |
| **Dev Server Port** | 7070 |
| **API Port** | 7777 |
| **Deployment** | Vercel |

---

## 2. Project Structure

```
zuna/
├── src/
│   ├── main.jsx              # React entry point
│   ├── App.jsx               # Main app with all routes
│   ├── index.css             # Global styles + Tailwind
│   │
│   ├── components/
│   │   ├── auth/             # Authentication components
│   │   │   ├── AuthModal.jsx         # Login/Register modal
│   │   │   └── ProtectedRoute.jsx   # Route guard
│   │   │
│   │   ├── backgrounds/      # Background effects
│   │   │   ├── AnimatedBackground.jsx
│   │   │   └── Prism.jsx
│   │   │
│   │   ├── home/             # Homepage sections
│   │   │   ├── CTASection.jsx
│   │   │   ├── FeaturesSection.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── RecentStoriesSection.jsx
│   │   │   ├── FeaturedProductsSection.jsx
│   │   │   └── StatsSection.jsx
│   │   │
│   │   ├── layout/           # Layout components
│   │   │   ├── Layout.jsx           # Main wrapper
│   │   │   ├── Logo.jsx
│   │   │   └── ScrollToTop.jsx
│   │   │
│   │   ├── sections/         # Reusable sections
│   │   │   ├── FluidCTA.jsx
│   │   │   └── MagicBento.jsx
│   │   │
│   │   ├── seo/              # SEO components
│   │   │   └── SEO.jsx
│   │   │
│   │   └── ui/               # UI components
│   │       ├── GlassCard.jsx
│   │       ├── GradientButton.jsx
│   │       ├── PricingCard.jsx
│   │       ├── ProductCard.jsx
│   │       ├── ScrollIndicator.jsx
│   │       ├── SectionHeader.jsx
│   │       └── StoryCard.jsx
│   │
│   ├── context/
│   │   └── CTAContext.jsx    # CTA modal context
│   │
│   ├── pages/
│   │   ├── public/           # Public pages
│   │   │   ├── About.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Portfolio.jsx
│   │   │   └── Services.jsx
│   │   │
│   │   ├── ecomerce/         # E-commerce pages
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── OrderDetail.jsx
│   │   │   └── Orders.jsx
│   │   │
│   │   ├── pricing/
│   │   │   └── Pricing.jsx
│   │   │
│   │   ├── products/         # Product pages
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── ProductForm.jsx
│   │   │   ├── Products.jsx
│   │   │   └── ReviewForm.jsx
│   │   │
│   │   ├── stories/          # Blog pages
│   │   │   ├── StoryDetail.jsx
│   │   │   └── Stories.jsx
│   │   │
│   │   └── user/             # User pages
│   │       ├── Dashboard.jsx
│   │       ├── Notifications.jsx
│   │       └── Profile.jsx
│   │
│   ├── store/                # Zustand stores
│   │   ├── authStore.js      # Authentication
│   │   ├── cartStore.js      # Shopping cart
│   │   └── dataStore.js      # Data cache
│   │
│   └── utils/
│       ├── api.js            # Axios instance
│       └── seo.js            # SEO utilities
│
├── public/
│   ├── robots.txt
│   └── sitemap.xml
│
├── docs/                     # Documentation
├── index.html
├── vite.config.js
├── tailwind.config.js
├── package.json
└── README.md
```

---

## 3. Routes & Pages

### 3.1 Public Routes (No Authentication Required)

| Route | Component | Description | Key Features |
|-------|-----------|-------------|--------------|
| `/` | `Home.jsx` | Landing page | Hero, stats, featured products, recent stories, CTA |
| `/about` | `About.jsx` | About us | Team, testimonials, clients |
| `/services` | `Services.jsx` | Services | Dynamic services from API |
| `/portfolio` | `Portfolio.jsx` | Portfolio | Projects showcase with links |
| `/pricing` | `Pricing.jsx` | Pricing | 3 tiers: Basic $2,999, Pro $5,999, Enterprise |
| `/products` | `Products.jsx` | Marketplace | Search, filter, sort, pagination |
| `/products/:slug` | `ProductDetail.jsx` | Product detail | Images, pricing, features, reviews |
| `/stories` | `Stories.jsx` | Blog listing | Story cards, pagination |
| `/stories/:slug` | `StoryDetail.jsx` | Story detail | Article, author, breadcrumb |

### 3.2 Protected Routes (Authentication Required)

| Route | Component | Description | Key Features |
|-------|-----------|-------------|--------------|
| `/products/create` | `ProductForm.jsx` | Create product | Multi-step form |
| `/products/edit/:id` | `ProductForm.jsx` | Edit product | Pre-filled form |
| `/products/:slug/review` | `ReviewForm.jsx` | Write review | Star rating, submit |
| `/cart` | `Cart.jsx` | Shopping cart | Item list, summary (10% tax) |
| `/checkout` | `Checkout.jsx` | Checkout | 3-step: Shipping, Payment, Review |
| `/orders` | `Orders.jsx` | Order history | Filter by status, cancel |
| `/orders/:id` | `OrderDetail.jsx` | Order detail | Payment status |
| `/dashboard` | `Dashboard.jsx` | User dashboard | Stats: products, sales, earnings |
| `/profile` | `Profile.jsx` | Profile settings | Avatar, username, bio, links |
| `/notifications` | `Notifications.jsx` | Notifications | Read/unread, mark all read |

### 3.3 Navigation Structure

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER                                                     │
├─────────────────────────────────────────────────────────────┤
│  Logo │ Marketplace │ Stories │ Portfolio │ Services │ About│
│                                                │ Cart │ User │
└─────────────────────────────────────────────────────────────┘
```

**Header Features:**
- Mobile responsive hamburger menu
- Cart icon with item count badge
- Notifications (authenticated users)
- User dropdown menu
- "Let's Talk" CTA button

---

## 4. API Endpoints

### 4.1 Base Configuration

| Environment | Base URL |
|-------------|----------|
| Development | `http://localhost:7777/api` |
| Production | `/api` (proxied) |

### 4.2 API Client Features

**Axios Instance (`src/utils/api.js`):**
- Automatic JWT token injection from localStorage
- 401 response interceptor (clears auth, redirects to login)
- Request/Response interceptors for auth

### 4.3 Endpoints by Module

#### Authentication (`/auth`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | User login |
| POST | `/auth/register` | User registration |
| GET | `/auth/me` | Get current user |

#### Products (`/products`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | List all products |
| GET | `/products/:slug` | Get product by slug |
| GET | `/products/my-products` | Get user's products |
| POST | `/products` | Create new product |
| PUT | `/products/:id` | Update product |

#### Reviews (`/reviews`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/reviews/products/:productId` | Get product reviews |
| POST | `/reviews/products/:productId` | Create review |

#### Stories (`/stories`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/stories` | List all stories |
| GET | `/stories/:slug` | Get story by slug |

#### Orders (`/orders`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/orders` | Create order |
| GET | `/orders` | List user orders |
| GET | `/orders/:id` | Get order details |
| PUT | `/orders/:id/cancel` | Cancel order |

#### Payments (`/payments`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/payments` | Get order payments |

#### Notifications (`/notifications`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/notifications` | List notifications |
| GET | `/notifications/unread-count` | Get unread count |
| PUT | `/notifications/:id/read` | Mark as read |
| PUT | `/notifications/read-all` | Mark all as read |
| DELETE | `/notifications/:id` | Delete notification |

#### Users (`/users`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| PUT | `/users/profile/me` | Update profile |

#### Content (CMS)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/portfolio` | Portfolio items |
| GET | `/services` | Services list |
| GET | `/team` | Team members |
| GET | `/testimonials` | Testimonials |
| GET | `/clients` | Client logos |
| GET | `/analytics/stats` | Dashboard stats |

---

## 5. State Management

### 5.1 Zustand Stores

#### Auth Store (`authStore.js`)

```javascript
// State
{
  user: Object | null,
  token: String | null,
  isAuthenticated: Boolean
}

// Actions
login(credentials)     // POST /auth/login
register(data)        // POST /auth/register
logout()               // Clear state
checkAuth()            // GET /auth/me
updateUser(data)      // PUT /users/profile/me

// Persistence: localStorage "auth-storage"
```

#### Cart Store (`cartStore.js`)

```javascript
// State
{
  items: Array<{
    id: String,
    name: String,
    price: Number,
    quantity: Number,
    image: String
  }>
}

// Actions
addItem(product)       // Add to cart
removeItem(productId)   // Remove from cart
clearCart()            // Empty cart
getTotal()             // Calculate total
getItemCount()         // Get total items

// Persistence: localStorage "cart-storage"
```

#### Data Store (`dataStore.js`)

```javascript
// State (cached data)
{
  featuredProducts: Array,
  recentStories: Array,
  portfolio: Array,
  stats: Object,
  allProducts: Array,
  allStories: Array,
  services: Array,
  team: Array,
  testimonials: Array,
  clients: Array
}

// Actions
fetchFeaturedProducts()
fetchRecentStories()
fetchPortfolio()
fetchStats()
fetchAllProducts()
fetchAllStories()
fetchServices()
fetchTeam()
fetchTestimonials()
fetchClients()
invalidateCache()
clearAllCache()

// Cache TTL: 5 minutes
// Persistence: localStorage "data-cache-storage"
```

### 5.2 React Context

#### CTA Context (`CTAContext.jsx`)

```javascript
// State
{
  isCTAVisible: Boolean
}

// Actions
openCTA()    // Show CTA modal
closeCTA()   // Hide CTA modal
```

---

## 6. Features Overview

### 6.1 E-commerce Features

| Feature | Description | Implementation |
|---------|-------------|----------------|
| Product Marketplace | Browse/search/filter products | `Products.jsx` |
| Product Details | View product with images, features | `ProductDetail.jsx` |
| Shopping Cart | Add/remove items, quantity | `Cart.jsx`, `cartStore.js` |
| Checkout Flow | 3-step checkout process | `Checkout.jsx` |
| Order Management | View/cancel orders | `Orders.jsx`, `OrderDetail.jsx` |
| Product Reviews | Star rating + text review | `ReviewForm.jsx` |
| Payment Methods | MoMo, VNPay, ZaloPay, Bank | `Checkout.jsx` |

### 6.2 Content Management

| Feature | Description | Implementation |
|---------|-------------|----------------|
| Services | Dynamic services from API | `Services.jsx` |
| Portfolio | Project showcase | `Portfolio.jsx` |
| Stories/Blog | Blog listing and articles | `Stories.jsx`, `StoryDetail.jsx` |
| Team | Team members display | `About.jsx` |
| Testimonials | Client testimonials | `About.jsx` |
| Pricing | Pricing tiers and FAQ | `Pricing.jsx` |

### 6.3 User Features

| Feature | Description | Implementation |
|---------|-------------|----------------|
| Authentication | Login/Register with JWT | `AuthModal.jsx`, `authStore.js` |
| User Dashboard | Stats, recent products | `Dashboard.jsx` |
| Profile Management | Avatar, bio, links | `Profile.jsx` |
| Notifications | Read/unread notifications | `Notifications.jsx` |
| Protected Routes | Route guards | `ProtectedRoute.jsx` |

### 6.4 UI/UX Features

| Feature | Description | Implementation |
|---------|-------------|----------------|
| Glassmorphism | Frosted glass effect | `GlassCard.jsx`, CSS |
| Animations | Framer Motion, GSAP | Various components |
| 3D Backgrounds | Prism, Fluid effects | `AnimatedBackground.jsx`, `Prism.jsx` |
| Responsive Design | Mobile-first | Tailwind CSS |
| Lazy Loading | Code splitting routes | React.lazy + Suspense |
| Toast Notifications | User feedback | Via API responses |

---

## 7. SEO Implementation

### 7.1 Current SEO Features

| Feature | Status | Location |
|---------|--------|----------|
| Meta Tags (title, description) | Implemented | `SEO.jsx`, `index.html` |
| Open Graph Tags | Implemented | `SEO.jsx`, `index.html` |
| Twitter Cards | Implemented | `SEO.jsx`, `index.html` |
| Canonical URLs | Implemented | `SEO.jsx`, `index.html` |
| robots.txt | Implemented | `public/robots.txt` |
| Sitemap | Implemented (static) | `public/sitemap.xml` |
| JSON-LD Structured Data | Implemented | `seo.js`, `SEO.jsx` |
| Semantic HTML | Implemented | Components |

### 7.2 Structured Data Schemas

| Schema Type | Used On | Purpose |
|-------------|---------|---------|
| Organization | Homepage | Brand information |
| WebSite | Homepage | Site-level with SearchAction |
| Product | Product pages | Product details, ratings |
| Article | Story pages | Blog post metadata |
| BreadcrumbList | Detail pages | Navigation path |
| ItemList | Listing pages | Collection data |

### 7.3 SEO Utility Functions (`src/utils/seo.js`)

```javascript
generateOrganizationSchema()     // Brand schema
generateWebsiteSchema()          // Site schema with search
generateProductSchema(product)  // Product markup
generateArticleSchema(story)    // Article markup
generateBreadcrumbSchema(items)  // Breadcrumbs
generateCollectionPageSchema()   // ItemList markup
```

### 7.4 robots.txt Configuration

```
User-agent: *
Allow: /

# Protected routes blocked
Disallow: /dashboard
Disallow: /profile
Disallow: /cart
Disallow: /checkout
Disallow: /orders
Disallow: /notifications
Disallow: /products/create
Disallow: /products/edit/
Disallow: /products/*/review

Sitemap: https://zunaweb.com/sitemap.xml
```

### 7.5 SEO Gaps & Recommendations

See [Recommendations](#9-recommendations) section.

---

## 8. Technology Stack

### 8.1 Core Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^18.2.0 | UI Framework |
| react-dom | ^18.2.0 | React DOM |
| react-router-dom | ^6.20.0 | Client-side routing |
| zustand | ^4.4.7 | State management |
| axios | ^1.6.2 | HTTP client |

### 8.2 UI & Styling

| Package | Version | Purpose |
|---------|---------|---------|
| tailwindcss | ^3.3.6 | CSS framework |
| autoprefixer | ^10.4.16 | CSS vendor prefixes |
| postcss | ^8.4.32 | CSS processing |

### 8.3 Animations

| Package | Version | Purpose |
|---------|---------|---------|
| framer-motion | ^12.23.24 | React animations |
| gsap | ^3.13.0 | Animation library |
| ogl | ^1.0.11 | WebGL/3D graphics |
| @paper-design/shaders-react | ^0.0.67 | Shader effects |

### 8.4 Icons

| Package | Version | Purpose |
|---------|---------|---------|
| lucide-react | ^0.555.0 | Icon library |
| react-icons | ^4.12.0 | Icon library |

### 8.5 Build Tools

| Package | Version | Purpose |
|---------|---------|---------|
| vite | ^5.0.8 | Build tool |
| @vitejs/plugin-react | ^4.2.1 | React plugin for Vite |

---

## 9. Recommendations

### 9.1 SEO Improvements

| Issue | Recommendation | Priority |
|-------|----------------|----------|
| Static sitemap | Generate dynamic sitemap for products/stories | High |
| Missing image alt | Ensure all images have descriptive alt text | High |
| Hreflang | Add if supporting multiple languages | Medium |
| FAQ Schema | Add FAQPage schema to pricing page | Medium |
| Social Sharing | Add share buttons to products/stories | Low |

### 9.2 Performance Improvements

| Issue | Recommendation | Priority |
|-------|----------------|----------|
| Image optimization | Add width/height attributes, lazy loading | High |
| Bundle size | Monitor with Lighthouse | Medium |
| Caching | Review dataStore TTL settings | Medium |

### 9.3 Security Improvements

| Issue | Recommendation | Priority |
|-------|----------------|----------|
| Input validation | Add client-side validation | High |
| XSS prevention | Sanitize user-generated content | High |
| Rate limiting | Handle 429 responses gracefully | Medium |

### 9.4 Code Quality

| Issue | Recommendation | Priority |
|-------|----------------|----------|
| Error boundaries | Add React error boundaries | Medium |
| Testing | Add unit/integration tests | Medium |
| Documentation | Update README with setup instructions | Low |

---

## Appendix A: File Reference

| File Path | Description |
|-----------|-------------|
| `src/App.jsx` | Main router configuration |
| `src/utils/api.js` | Axios instance |
| `src/store/authStore.js` | Authentication state |
| `src/store/cartStore.js` | Cart state |
| `src/store/dataStore.js` | Data cache |
| `src/components/seo/SEO.jsx` | SEO component |
| `src/utils/seo.js` | SEO utilities |
| `vite.config.js` | Vite configuration |

---

## Appendix B: Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| (none explicitly defined) | API URL configured in api.js | localhost:7777 |

---

*Document generated by Claude Code Analysis*

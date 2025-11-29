<div align="center">

# ✨ Zuna Web Frontend

**A modern, high-performance e-commerce marketplace built with cutting-edge web technologies**

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.6-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](http://makeapullrequest.com)

</div>

---

## 🎯 Overview

Zuna Web Frontend is a premium digital marketplace platform featuring a stunning glassmorphism design, smooth animations, and exceptional user experience. Built with modern React patterns and optimized for performance.

### 🌟 Key Highlights

- ⚡ **Lightning Fast** - Vite-powered development with instant HMR
- 🎨 **Beautiful UI** - Glassmorphism design with Prism color gradients
- 📱 **Fully Responsive** - Mobile-first approach, works on all devices
- 🚀 **Production Ready** - Optimized builds with code splitting
- 🔒 **Secure** - Protected routes, authentication, and data validation
- 💾 **Smart Caching** - Zustand-powered data caching with 5-minute TTL
- 🎭 **Smooth Animations** - GSAP, Framer Motion, and WebGL effects

---

## 📸 Screenshots

> _Screenshots coming soon..._

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 (or **yarn** / **pnpm**)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/zuna-web.git
cd zuna-web/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:7070` 🎉

---

## 🛠️ Tech Stack

### Core Technologies

| Technology           | Version | Purpose                 |
| -------------------- | ------- | ----------------------- |
| **React**            | 18.2.0  | UI Library              |
| **Vite**             | 5.0.8   | Build Tool & Dev Server |
| **React Router DOM** | 6.20.0  | Client-side Routing     |
| **Zustand**          | 4.4.7   | State Management        |
| **Axios**            | 1.6.2   | HTTP Client             |

### Styling & UI

| Technology       | Version | Purpose                     |
| ---------------- | ------- | --------------------------- |
| **Tailwind CSS** | 3.3.6   | Utility-first CSS Framework |
| **PostCSS**      | 8.4.32  | CSS Processing              |
| **React Icons**  | 4.12.0  | Icon Library                |

### Animation & Effects

| Technology                      | Version  | Purpose                          |
| ------------------------------- | -------- | -------------------------------- |
| **GSAP**                        | 3.13.0   | High-performance Animations      |
| **Framer Motion**               | 12.23.24 | React Animation Library          |
| **OGL**                         | 1.0.11   | WebGL Library (Prism Background) |
| **@paper-design/shaders-react** | 0.0.67   | Shader Effects                   |

---

## 📁 Project Structure

```
frontend/
├── 📂 src/
│   ├── 📂 components/          # Reusable UI components
│   │   ├── 📂 auth/            # Authentication components
│   │   ├── 📂 backgrounds/     # Background effects (Prism, Animated)
│   │   ├── 📂 home/            # Home page sections
│   │   ├── 📂 layout/          # Layout components (Header, Footer)
│   │   ├── 📂 sections/        # Page sections (CTA, MagicBento)
│   │   └── 📂 ui/              # UI primitives (Cards, Buttons)
│   ├── 📂 pages/               # Page components
│   │   ├── 📂 ecomerce/        # E-commerce pages
│   │   ├── 📂 products/        # Product pages
│   │   ├── 📂 public/          # Public pages
│   │   ├── 📂 stories/         # Blog/Stories pages
│   │   └── 📂 user/            # User dashboard pages
│   ├── 📂 store/               # Zustand stores
│   │   ├── authStore.js        # Authentication state
│   │   ├── cartStore.js        # Shopping cart state
│   │   └── dataStore.js        # API data caching
│   ├── 📂 context/             # React Context providers
│   ├── 📂 utils/               # Utility functions
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── 📂 public/                  # Static assets
├── index.html                  # HTML template
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind configuration
├── vercel.json                 # Vercel deployment config
└── package.json                # Dependencies
```

---

## 🎨 Design System

### Color Palette

Our design uses a **Prism-inspired gradient** color scheme:

```css
/* Primary Gradient */
from-cyan-400 via-purple-400 to-pink-400

/* Color Values */
Cyan:    #06b6d4 → #22d3ee
Purple:  #8b5cf6 → #a855f7
Pink:    #ec4899 → #f472b6
```

### Components

#### Glassmorphism Cards

```jsx
<GlassCard className="p-8">{/* Your content */}</GlassCard>
```

#### Gradient Buttons

```jsx
<GradientButton to="/products" variant="primary">
  Explore Marketplace
</GradientButton>
```

#### Section Headers

```jsx
<SectionHeader
  title="Featured Products"
  subtitle="Handpicked premium templates"
/>
```

---

## 🔥 Features

### 🛍️ E-commerce

- ✅ Product browsing with filters & search
- ✅ Shopping cart with persistent storage
- ✅ Checkout process
- ✅ Order management
- ✅ Product reviews & ratings
- ✅ User dashboard

### 📝 Content Management

- ✅ Blog/Stories system
- ✅ Portfolio showcase
- ✅ Services listing
- ✅ Team & testimonials

### 🎭 Advanced UI

- ✅ **Prism Background** - WebGL-powered 3D prism effect
- ✅ **MagicBento** - Interactive Bento grid with particles
- ✅ **FluidCTA** - Animated call-to-action with GodRays
- ✅ **Glassmorphism** - Frosted glass effect throughout
- ✅ **Smooth Scroll** - Auto-scroll to top on navigation
- ✅ **Lazy Loading** - Components load on-demand

### ⚡ Performance

- ✅ **Code Splitting** - Automatic vendor chunking
- ✅ **Data Caching** - 5-minute TTL with Zustand
- ✅ **Lazy Loading** - React.lazy for heavy components
- ✅ **Intersection Observer** - Disable animations off-screen
- ✅ **Memoization** - React.memo for expensive components
- ✅ **Image Optimization** - Lazy loading with aspect ratios

### 🔒 Security

- ✅ Protected routes with authentication
- ✅ JWT token management
- ✅ Secure API calls
- ✅ Input validation

---

## 🎯 Pages & Routes

### Public Routes

- `/` - Home page with hero, stats, features, products, stories
- `/products` - Product marketplace with filters
- `/products/:slug` - Product detail page
- `/stories` - Blog/Stories listing
- `/stories/:slug` - Story detail page
- `/portfolio` - Portfolio showcase
- `/services` - Services listing
- `/about` - About page with team & testimonials

### Protected Routes (User)

- `/dashboard` - User dashboard
- `/profile` - User profile management
- `/cart` - Shopping cart
- `/checkout` - Checkout process
- `/orders` - Order history
- `/orders/:id` - Order details
- `/notifications` - User notifications
- `/products/create` - Create product
- `/products/edit/:id` - Edit product
- `/products/:slug/review` - Create review

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_URL=http://localhost:7777/api

# Optional: Analytics, etc.
# VITE_GA_ID=your-google-analytics-id
```

### Vite Configuration

The project uses Vite with the following optimizations:

- **Port**: `7070` (development)
- **Proxy**: `/api` → `http://localhost:7777` (development)
- **Code Splitting**: Automatic vendor chunking
- **Build**: Optimized production builds

### Tailwind Configuration

Custom theme extensions:

- Prism gradient colors
- Custom animations (blob, float)
- Glassmorphism utilities
- Responsive breakpoints

---

## 📦 Scripts

```bash
# Development
npm run dev          # Start dev server (port 7070)

# Build
npm run build        # Build for production
npm run preview      # Preview production build

# Deployment
npm run vercel-build # Build for Vercel
```

---

## 🚀 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**:

```bash
npm i -g vercel
```

2. **Deploy**:

```bash
vercel
```

3. **Configure Environment Variables**:

   - Go to Vercel Dashboard → Project Settings → Environment Variables
   - Add `VITE_API_URL` (optional, uses proxy if not set)

4. **Update `vercel.json`**:
   - Replace `your-backend-domain.com` with your actual backend URL

### Other Platforms

The build output in `dist/` can be deployed to:

- **Netlify** - Drag & drop `dist/` folder
- **AWS S3** - Upload `dist/` to S3 bucket
- **GitHub Pages** - Use GitHub Actions
- **Any static host** - Serve `dist/` folder

---

## 🎨 Customization

### Changing Colors

Edit `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      // Your custom colors
    }
  }
}
```

### Adding New Components

1. Create component in `src/components/`
2. Follow existing patterns (GlassCard, GradientButton)
3. Export from component file
4. Import where needed

### Modifying Routes

Edit `src/App.jsx`:

```jsx
<Route path="/your-route" element={<YourComponent />} />
```

---

## 🧪 Performance Optimizations

### Implemented Optimizations

1. **Code Splitting**

   - Vendor chunks (React, GSAP, OGL)
   - Route-based splitting
   - Component lazy loading

2. **Data Caching**

   - Zustand store with 5-minute TTL
   - localStorage persistence
   - Automatic cache invalidation

3. **Animation Performance**

   - Intersection Observer for off-screen detection
   - Conditional rendering (Prism → Static gradient)
   - GPU-accelerated transforms

4. **Image Optimization**
   - Lazy loading
   - Aspect ratio preservation
   - Responsive images

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Style

- Use **ESLint** for linting
- Follow **React** best practices
- Write **descriptive** commit messages
- Add **comments** for complex logic

---

## 📚 Documentation

- [API Documentation](../backend/docs/)
- [Component Storybook](./docs/components.md) _(Coming soon)_
- [Design System](./docs/design-system.md) _(Coming soon)_

---

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**

```bash
# Change port in vite.config.js
server: { port: 8080 }
```

**API connection errors:**

- Check backend is running on `http://localhost:7777`
- Verify `VITE_API_URL` in `.env`
- Check CORS settings in backend

**Build errors:**

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

Built with ❤️ by the Zuna Web Team

---

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Zustand](https://github.com/pmndrs/zustand) - Small, fast and scalable state management
- [GSAP](https://greensock.com/gsap/) - Professional-grade animation library
- [OGL](https://github.com/oframe/ogl) - Minimal WebGL library

---

<div align="center">

**Made with ⚡ by [Zuna Web](https://zunaweb.com)**

[⬆ Back to Top](#-zuna-web-frontend)

</div>

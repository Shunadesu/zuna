import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CTAProvider } from './context/CTAContext'
import Layout from './components/layout/Layout'
import ScrollToTop from './components/layout/ScrollToTop'
import ProtectedRoute from './components/auth/ProtectedRoute'

// Public pages
import Home from './pages/public/Home'
import About from './pages/public/About'
import Services from './pages/public/Services'
import Portfolio from './pages/public/Portfolio'
import Pricing from './pages/pricing/Pricing'

// Products pages
import Products from './pages/products/Products'
import ProductDetail from './pages/products/ProductDetail'
import ProductForm from './pages/products/ProductForm'
import ReviewForm from './pages/products/ReviewForm'

// Stories pages
import Stories from './pages/stories/Stories'
import StoryDetail from './pages/stories/StoryDetail'

// E-commerce pages
import Cart from './pages/ecomerce/Cart'
import Checkout from './pages/ecomerce/Checkout'
import Orders from './pages/ecomerce/Orders'
import OrderDetail from './pages/ecomerce/OrderDetail'

// User pages
import Dashboard from './pages/user/Dashboard'
import Profile from './pages/user/Profile'
import Notifications from './pages/user/Notifications'

function App() {
  return (
    <Router>
      <CTAProvider>
        <ScrollToTop />
        <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/pricing" element={<Pricing />} />
          
          {/* Products Routes */}
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route 
            path="/products/create" 
            element={
              <ProtectedRoute>
                <ProductForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/products/edit/:id" 
            element={
              <ProtectedRoute>
                <ProductForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/products/:slug/review" 
            element={
              <ProtectedRoute>
                <ReviewForm />
              </ProtectedRoute>
            } 
          />
          
          {/* Stories Routes */}
          <Route path="/stories" element={<Stories />} />
          <Route path="/stories/:slug" element={<StoryDetail />} />
          
          {/* E-commerce Routes */}
          <Route path="/cart" element={<Cart />} />
          <Route 
            path="/checkout" 
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/orders" 
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/orders/:id" 
            element={
              <ProtectedRoute>
                <OrderDetail />
              </ProtectedRoute>
            } 
          />
          
          {/* User Routes (Protected) */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/notifications" 
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Layout>
      </CTAProvider>
    </Router>
  )
}

export default App


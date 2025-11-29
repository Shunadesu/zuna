import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  FiMenu, 
  FiX, 
  FiShoppingBag, 
  FiUser,
  FiLogOut,
  FiSettings,
  FiBell
} from 'react-icons/fi'
import useAuthStore from '../../store/authStore'
import useCartStore from '../../store/cartStore'
import { useCTA } from '../../context/CTAContext'
import api from '../../utils/api'
import AuthModal from '../auth/AuthModal'
import Logo from './Logo'

const Layout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authModalMode, setAuthModalMode] = useState('login') // 'login' or 'register'
  const location = useLocation()
  const { isAuthenticated, user, logout } = useAuthStore()
  const { getItemCount } = useCartStore()
  const { openCTA } = useCTA()
  const cartCount = getItemCount()

  useEffect(() => {
    if (isAuthenticated) {
      fetchUnreadCount()
      const interval = setInterval(fetchUnreadCount, 30000) // Poll every 30 seconds
      return () => clearInterval(interval)
    }
  }, [isAuthenticated])

  const fetchUnreadCount = async () => {
    try {
      const response = await api.get('/notifications/unread-count')
      setUnreadCount(response.data.data?.count || 0)
    } catch (error) {
      // Ignore errors
    }
  }

  const isActive = (path) => location.pathname === path

  const navLinks = [
    { path: '/products', label: 'Marketplace' },
    { path: '/stories', label: 'Stories' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/services', label: 'Services' },
    { path: '/about', label: 'About' },
  ]

  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 ${isScrolled ? 'py-4' : 'py-6'}`}>
        <div className={`max-w-7xl mx-auto rounded-full transition-all duration-300 flex items-center justify-between px-6 py-3 glass bg-black/40`}>
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400'
                    : 'text-white/70 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-cyan-400 hover:via-purple-400 hover:to-pink-400'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2 text-white/70 transition-all duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-cyan-400 hover:via-purple-400 hover:to-pink-400"
            >
              <FiShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <Link
                  to="/notifications"
                  className="relative hidden md:block p-2 text-white/70 hover:text-white transition-colors"
                >
                  <FiBell className="w-6 h-6" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Link>

                <Link
                  to="/dashboard"
                  className="hidden md:flex items-center space-x-2 px-4 py-2 text-white/70 hover:text-white transition-colors"
                >
                  <FiUser className="w-5 h-5" />
                  <span>{user?.username}</span>
                </Link>
                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="hidden md:flex items-center space-x-2 px-4 py-2 text-white/70 hover:text-white transition-colors"
                  >
                    <FiSettings className="w-5 h-5" />
                    <span>Admin</span>
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="hidden md:flex items-center space-x-2 px-4 py-2 text-white/70 hover:text-red-400 transition-colors"
                >
                  <FiLogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setAuthModalMode('login')
                    setAuthModalOpen(true)
                  }}
                  className="hidden md:block px-4 py-2 text-white/70 hover:text-white transition-colors text-sm font-medium"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    // Mở CTA modal trực tiếp, không cần scroll
                    if (location.pathname !== '/') {
                      // Nếu không ở trang home, navigate về home trước
                      window.location.href = '/'
                      setTimeout(() => {
                        openCTA()
                      }, 300)
                    } else {
                      // Ở trang home, mở modal ngay lập tức
                      openCTA()
                    }
                  }}
                  className="hidden md:block px-5 py-2 rounded-full text-sm font-semibold text-white transition-all hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)',
                    boxShadow: '0 0 20px -5px rgba(139, 92, 246, 0.4)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #22d3ee 0%, #a855f7 50%, #f472b6 100%)';
                    e.currentTarget.style.boxShadow = '0 0 30px -5px rgba(139, 92, 246, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)';
                    e.currentTarget.style.boxShadow = '0 0 20px -5px rgba(139, 92, 246, 0.4)';
                  }}
                >
                  Let's Talk
                </button>
              </>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden relative z-50 text-white"
            >
              {mobileMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xl z-40 flex items-center justify-center md:hidden">
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-3xl font-light transition-colors ${
                    isActive(link.path)
                      ? 'text-white'
                      : 'text-white/70 hover:text-blue-400'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {isAuthenticated ? (
                <>
                  <Link
                    to="/cart"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-3xl font-light text-white/70 hover:text-blue-400 transition-colors"
                  >
                    Cart {cartCount > 0 && `(${cartCount})`}
                  </Link>
                  <Link
                    to="/notifications"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-3xl font-light text-white/70 hover:text-blue-400 transition-colors"
                  >
                    Notifications {unreadCount > 0 && `(${unreadCount})`}
                  </Link>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-3xl font-light text-white/70 hover:text-blue-400 transition-colors"
                  >
                    Dashboard
                  </Link>
                  {user?.role === 'admin' && (
                    <Link
                      to="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-3xl font-light text-white/70 hover:text-blue-400 transition-colors"
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout()
                      setMobileMenuOpen(false)
                    }}
                    className="text-3xl font-light text-white/70 hover:text-red-400 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setAuthModalMode('login')
                      setAuthModalOpen(true)
                      setMobileMenuOpen(false)
                    }}
                    className="text-3xl font-light text-white/70 hover:text-blue-400 transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setAuthModalMode('register')
                      setAuthModalOpen(true)
                      setMobileMenuOpen(false)
                    }}
                    className="mt-4 bg-white text-black px-8 py-3 rounded-full text-lg font-semibold"
                  >
                    Let's Talk
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div>
              <Logo size="text-2xl" className="mb-6 block" />
              <p className="text-white/50 leading-relaxed">
                Crafting digital experiences that merge art, technology, and human connection.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6">Sitemap</h4>
              <ul className="space-y-4 text-white/60">
                <li><Link to="/products" className="hover:text-white transition-colors">Marketplace</Link></li>
                <li><Link to="/stories" className="hover:text-white transition-colors">Stories</Link></li>
                <li><Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6">Socials</h4>
              <ul className="space-y-4 text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Dribbble</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6">Let's Chat</h4>
              <p className="text-white/60 mb-4">Have a project in mind?</p>
              <a 
                href="mailto:hello@zunaweb.com" 
                className="text-xl font-medium hover:text-blue-400 transition-colors"
              >
                hello@zunaweb.com
              </a>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-sm text-white/40">
            <p>&copy; 2024 Zuna Web. All rights reserved.</p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
      />
    </div>
  )
}

export default Layout


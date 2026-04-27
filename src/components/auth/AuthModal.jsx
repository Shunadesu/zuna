import { useState, useEffect } from 'react'
import { FiMail, FiLock, FiUser, FiUserPlus, FiLogIn, FiX } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import useAuthStore from '../../store/authStore'
import Logo from '../layout/Logo'

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode) // 'login' or 'register'
  const [isExpanded, setIsExpanded] = useState(false)
  const { login, register, isAuthenticated } = useAuthStore()
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Sync with external isOpen prop
  useEffect(() => {
    if (isOpen && !isExpanded) {
      setIsExpanded(true)
    } else if (!isOpen && isExpanded) {
      setIsExpanded(false)
    }
  }, [isOpen])

  // Close modal when user is authenticated
  useEffect(() => {
    if (isAuthenticated && isExpanded) {
      handleClose()
    }
  }, [isAuthenticated])

  // Reset form when modal opens/closes or mode changes
  useEffect(() => {
    if (isExpanded) {
      setError('')
      setLoginData({ email: '', password: '' })
      setRegisterData({ username: '', email: '', password: '', confirmPassword: '' })
    }
  }, [isExpanded, mode])

  // Prevent body scroll when expanded
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isExpanded])

  const handleClose = () => {
    setIsExpanded(false)
    onClose()
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await login(loginData.email, loginData.password)
    
    if (result.success) {
      handleClose()
    } else {
      setError(result.error)
    }
    
    setLoading(false)
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')

    if (registerData.password !== registerData.confirmPassword) {
      setError('Mật khẩu không khớp')
      return
    }

    if (registerData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự')
      return
    }

    setLoading(true)

    const result = await register(
      registerData.username, 
      registerData.email, 
      registerData.password
    )
    
    if (result.success) {
      handleClose()
    } else {
      setError(result.error)
    }
    
    setLoading(false)
  }

  const handleToggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login')
    setError('')
  }

  return (
    <>
      {/* Expanded Auth Modal */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black">
            <motion.div
              layoutId="auth-card"
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="relative w-full max-w-lg overflow-hidden"
              style={{
                borderRadius: '24px'
              }}
            >
              {/* Gradient Background */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ borderRadius: '24px' }}
              >
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-600"></div>
                  <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-cyan-400/30 rounded-full blur-[80px] animate-pulse"></div>
                  <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-pink-400/30 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="relative z-10 p-8 md:p-10"
              >
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center mb-4">
                    <Logo size="text-4xl" />
                  </div>
                  
                  <p className="text-white/70">
                    {mode === 'login' ? 'Đăng nhập vào tài khoản của bạn' : 'Tham gia và bắt đầu xây dựng'}
                  </p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-4 p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-red-400/30 text-red-200">
                    {error}
                  </div>
                )}

                {/* Login Form */}
                {mode === 'login' && (
                  <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                      <label className="block text-xs font-mono text-white/80 mb-2 tracking-wide uppercase">
                        Email
                      </label>
                      <div className="relative">
                        <FiMail className="z-10 absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                        <input
                          type="email"
                          required
                          value={loginData.email}
                          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border-0 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all font-sans"
                          placeholder="email@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-white/80 mb-2 tracking-wide uppercase">
                        Mật Khẩu
                      </label>
                      <div className="relative">
                        <FiLock className="z-10 absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                        <input
                          type="password"
                          required
                          value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border-0 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all font-sans"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded border-white/20 text-white focus:ring-white/20 bg-white/10" />
                        <span className="text-white/60">Ghi nhớ đăng nhập</span>
                      </label>
                      <a href="#" className="text-white/60 hover:text-white transition-colors">
                        Quên mật khẩu?
                      </a>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 rounded-full bg-white text-purple-600 font-semibold hover:bg-white/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
                          <span>Đang đăng nhập...</span>
                        </>
                      ) : (
                        <>
                          <FiLogIn className="w-5 h-5" />
                          <span>Đăng Nhập</span>
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* Register Form */}
                {mode === 'register' && (
                  <form onSubmit={handleRegister} className="space-y-5">
                    <div>
                      <label className="block text-xs text-white/80 mb-2 tracking-wide uppercase">
                        Tên Người Dùng
                      </label>
                      <div className="relative">
                        <FiUser className="z-10 absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                        <input
                          type="text"
                          required
                          minLength={3}
                          value={registerData.username}
                          onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border-0 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all font-sans"
                          placeholder="Người dùng"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-white/80 mb-2 tracking-wide uppercase">
                        Email
                      </label>
                      <div className="relative">
                        <FiMail className="z-10 absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                        <input
                          type="email"
                          required
                          value={registerData.email}
                          onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border-0 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all font-sans"
                          placeholder="email@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-white/80 mb-2 tracking-wide uppercase">
                        Mật Khẩu
                      </label>
                      <div className="relative">
                        <FiLock className="z-10 absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                        <input
                          type="password"
                          required
                          minLength={6}
                          value={registerData.password}
                          onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border-0 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all font-sans"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-white/80 mb-2 tracking-wide uppercase">
                        Xác Nhận Mật Khẩu
                      </label>
                      <div className="relative">
                        <FiLock className="z-10 absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                        <input
                          type="password"
                          required
                          value={registerData.confirmPassword}
                          onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border-0 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all font-sans"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 rounded-full bg-white text-purple-600 font-semibold hover:bg-white/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
                          <span>Đang tạo tài khoản...</span>
                        </>
                      ) : (
                        <>
                          <FiUserPlus className="w-5 h-5" />
                          <span>Tạo Tài Khoản</span>
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* Toggle Mode */}
                <div className="mt-6 text-center">
                  <p className="text-white/60">
                    {mode === 'login' ? 'Chưa có tài khoản? ' : 'Đã có tài khoản? '}
                    <button
                      onClick={handleToggleMode}
                      className="text-white font-semibold hover:text-cyan-200 transition-colors"
                    >
                      {mode === 'login' ? 'Đăng Ký' : 'Đăng Nhập'}
                    </button>
                  </p>
                </div>
              </motion.div>

              {/* Close Button */}
              <motion.button
                onClick={handleClose}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center text-white bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-all"
                aria-label="Close"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <FiX className="h-5 w-5" />
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AuthModal

import { Link } from 'react-router-dom'
import { FiTrash2, FiShoppingBag, FiArrowRight, FiX, FiMinus, FiPlus } from 'react-icons/fi'
import { AnimatePresence, motion } from 'framer-motion'
import useCartStore from '../../store/cartStore'
import useAuthStore from '../../store/authStore'

const CartSidebar = ({ isOpen, onClose }) => {
  const { items, removeItem, getTotal, clearCart } = useCartStore()
  const { isAuthenticated } = useAuthStore()
  const total = getTotal()
  const tax = total * 0.1
  const finalTotal = total + tax

  const handleCheckout = () => {
    if (isAuthenticated) {
      onClose()
      window.location.href = '/checkout'
    } else {
      onClose()
      window.location.href = '/login'
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-black/90 backdrop-blur-xl border-l border-white/10 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <FiShoppingBag className="w-6 h-6 text-white" />
                  {items.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-cyan-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                      {items.length}
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-bold text-white">Giỏ Hàng</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-20"></div>
                    <FiShoppingBag className="w-24 h-24 text-white/20 relative" />
                  </div>
                  <h3 className="text-xl font-semibold text-white/80 mb-2">Giỏ hàng trống</h3>
                  <p className="text-white/50 text-sm mb-6 max-w-[200px]">
                    Khám phá các sản phẩm tuyệt vời của chúng tôi
                  </p>
                  <Link
                    to="/products"
                    onClick={onClose}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-white text-sm transition-all hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)',
                    }}
                  >
                    Duyệt Sản Phẩm <FiArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item._id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="group flex gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all duration-300"
                    >
                      <Link
                        to={`/products/${item.slug}`}
                        onClick={onClose}
                        className="flex-shrink-0"
                      >
                        <div className="relative overflow-hidden rounded-xl">
                          <img
                            src={item.coverImage || '/placeholder.png'}
                            alt={item.title}
                            className="w-20 h-20 sm:w-24 sm:h-24 object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </Link>
                      
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <Link
                            to={`/products/${item.slug}`}
                            onClick={onClose}
                            className="block"
                          >
                            <h4 className="text-sm font-medium text-white/90 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-pink-400 transition-all duration-300 line-clamp-2 mb-1">
                              {item.title}
                            </h4>
                          </Link>
                          <p className="text-xs text-white/40">
                            {item.seller?.username || 'Không xác định'}
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <p className="text-lg font-bold text-gradient">
                            ${item.price.toFixed(2)}
                          </p>
                          <button
                            onClick={() => removeItem(item._id)}
                            className="p-2 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-all duration-300"
                            aria-label="Remove item"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-white/10 p-6 space-y-4 bg-black/50">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Tổng phụ</span>
                    <span className="text-white font-medium">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Thuế (10%)</span>
                    <span className="text-white font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base pt-2 border-t border-white/10">
                    <span className="text-white font-semibold">Tổng cộng</span>
                    <span className="text-gradient font-bold">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-4 rounded-full font-semibold text-white text-center transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)',
                    boxShadow: '0 0 40px -10px rgba(139, 92, 246, 0.5)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #22d3ee 0%, #a855f7 50%, #f472b6 100%)';
                    e.currentTarget.style.boxShadow = '0 0 60px -10px rgba(139, 92, 246, 0.8)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)';
                    e.currentTarget.style.boxShadow = '0 0 40px -10px rgba(139, 92, 246, 0.5)';
                  }}
                >
                  {isAuthenticated ? 'Tiến Hành Thanh Toán' : 'Đăng Nhập Để Thanh Toán'}
                </button>

                <Link
                  to="/products"
                  onClick={onClose}
                  className="block w-full py-3 text-center text-white/60 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-cyan-400 hover:via-purple-400 hover:to-pink-400 transition-all duration-300 text-sm font-medium"
                >
                  Tiếp Tục Mua Sắm
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CartSidebar

import { Link } from 'react-router-dom'
import { FiTrash2, FiShoppingBag, FiArrowRight, FiX } from 'react-icons/fi'
import { useState } from 'react'
import useCartStore from '../../store/cartStore'
import useAuthStore from '../../store/authStore'
import GlassCard from '../../components/ui/GlassCard'
import AnimatedBackground from '../../components/backgrounds/AnimatedBackground'

const Cart = () => {
  const { items, removeItem, getTotal, clearCart } = useCartStore()
  const { isAuthenticated } = useAuthStore()
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const total = getTotal()
  const tax = total * 0.1 // 10% tax
  const finalTotal = total + tax

  const handleClearCart = () => {
    clearCart()
    setShowClearConfirm(false)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white relative py-32">
        <AnimatedBackground variant="purple" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl mx-auto">
            <GlassCard className="text-center p-12 md:p-16">
              <div className="mb-8 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                  <FiShoppingBag className="w-32 h-32 text-white/20 mx-auto relative" />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Giỏ hàng của bạn trống</h2>
              <p className="text-white/60 text-lg mb-8 max-w-md mx-auto">
                Thêm vài sản phẩm để bắt đầu!
              </p>
              <Link 
                to="/products" 
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-lg text-white transition-all hover:scale-105"
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
                <span>Duyệt Sản Phẩm</span>
                <FiArrowRight className="w-5 h-5" />
              </Link>
            </GlassCard>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white relative py-32">
      <AnimatedBackground variant="cyan" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Giỏ Hàng</h1>
          <p className="text-white/60 text-lg">
            {items.length} {items.length === 1 ? 'sản phẩm' : 'sản phẩm'} trong giỏ hàng
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <GlassCard key={item._id} className="p-6 hover:scale-[1.02] transition-transform duration-300">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Link 
                    to={`/products/${item.slug}`} 
                    className="flex-shrink-0 group"
                  >
                    <div className="relative overflow-hidden rounded-2xl">
                      <img
                        src={item.coverImage || '/placeholder.png'}
                        alt={item.title}
                        loading="lazy"
                        className="w-24 h-24 sm:w-32 sm:h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  </Link>
                  
                  <div className="flex-grow min-w-0">
                    <Link to={`/products/${item.slug}`} className="block group">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:via-purple-400 group-hover:to-pink-400 transition-all duration-300">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="text-white/50 text-sm">
                      Người bán: <span className="text-white/70">{item.seller?.username || 'Không xác định'}</span>
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gradient">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item._id)}
                      className="p-2 text-white/60 hover:text-red-400 hover:bg-white/10 rounded-lg transition-all duration-300"
                      aria-label="Remove item"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </GlassCard>
            ))}
            
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6">
              {showClearConfirm ? (
                <div className="flex items-center gap-3 glass px-4 py-2 rounded-full">
                  <span className="text-sm text-white/80">Xóa tất cả sản phẩm?</span>
                  <button
                    onClick={handleClearCart}
                    className="px-4 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-full text-sm font-medium transition-all"
                  >
                    Xác Nhận
                  </button>
                  <button
                    onClick={() => setShowClearConfirm(false)}
                    className="p-1.5 hover:bg-white/10 rounded-full transition-all"
                  >
                    <FiX className="w-4 h-4 text-white/60" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="px-6 py-2.5 glass rounded-full text-white/70 hover:text-red-400 hover:bg-red-500/10 font-medium transition-all duration-300"
                  style={{ border: '1px solid rgba(239, 68, 68, 0.3)' }}
                >
                  Xóa Giỏ
                </button>
              )}
              <Link 
                to="/products" 
                className="inline-flex items-center gap-2 text-white/70 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-cyan-400 hover:via-purple-400 hover:to-pink-400 transition-all duration-300 font-medium"
              >
                Tiếp Tục Mua Sắm <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <GlassCard className="p-6 sticky top-4">
              <h2 className="text-2xl font-bold mb-6">Tóm Tắt Đơn Hàng</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-white/80">
                  <span>Tổng Phụ</span>
                  <span className="font-semibold text-white">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span>Thuế (10%)</span>
                  <span className="font-semibold text-white">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-white/10 pt-4 flex justify-between">
                  <span className="text-xl font-bold text-white">Tổng Cộng</span>
                  <span className="text-xl font-bold text-gradient">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {isAuthenticated ? (
                <Link
                  to="/checkout"
                  className="block w-full px-6 py-4 rounded-full font-semibold text-center text-white transition-all hover:scale-105"
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
                  Tiến Hành Thanh Toán
                </Link>
              ) : (
                <div>
                  <p className="text-sm text-white/60 mb-4 text-center">
                    Vui lòng đăng nhập để thanh toán
                  </p>
                  <Link
                    to="/login"
                    className="block w-full px-6 py-4 rounded-full font-semibold text-center text-white transition-all hover:scale-105"
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
                    Đăng Nhập Để Thanh Toán
                  </Link>
                </div>
              )}
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart


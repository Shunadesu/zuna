import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiPackage, FiClock, FiCheckCircle, FiXCircle, FiEye } from 'react-icons/fi'
import useAuthStore from '../../store/authStore'
import api from '../../utils/api'
import ProtectedRoute from '../../components/auth/ProtectedRoute'

const Orders = () => {
  const { isAuthenticated } = useAuthStore()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders()
    }
  }, [isAuthenticated, filter])

  const fetchOrders = async () => {
    try {
      const params = filter !== 'all' ? { status: filter } : {}
      const response = await api.get('/client/orders', { params })
      setOrders(response.data.data || [])
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100'
      case 'paid':
        return 'text-blue-600 bg-blue-100'
      case 'processing':
        return 'text-yellow-600 bg-yellow-100'
      case 'pending':
        return 'text-gray-600 bg-gray-100'
      case 'cancelled':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FiCheckCircle className="w-5 h-5" />
      case 'cancelled':
        return <FiXCircle className="w-5 h-5" />
      case 'processing':
      case 'paid':
        return <FiClock className="w-5 h-5" />
      default:
        return <FiPackage className="w-5 h-5" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Đang tải đơn hàng...</p>
        </div>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Đơn Hàng Của Tôi</h1>
            
            {/* Filter */}
            <div className="flex space-x-2">
              {['all', 'pending', 'paid', 'processing', 'completed', 'cancelled'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    filter === status
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {status === 'all' ? 'Tất Cả' : status === 'pending' ? 'Đang Chờ' : status === 'paid' ? 'Đã Thanh Toán' : status === 'processing' ? 'Đang Xử Lý' : status === 'completed' ? 'Hoàn Thành' : 'Đã Hủy'}
                </button>
              ))}
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <FiPackage className="w-24 h-24 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Không tìm thấy đơn hàng nào</h2>
              <p className="text-gray-600 mb-6">Bạn chưa đặt đơn hàng nào.</p>
              <Link to="/products" className="btn-primary">
                Duyệt Sản Phẩm
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order._id} className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">
                        Đơn Hàng #{order.orderNumber}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Đặt vào ngày {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1 ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span>{order.status}</span>
                      </span>
                      <Link
                        to={`/orders/${order._id}`}
                        className="btn-secondary text-sm flex items-center space-x-2"
                      >
                        <FiEye className="w-4 h-4" />
                        <span>Xem</span>
                      </Link>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      {order.items?.slice(0, 3).map((item, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          {item.product?.coverImage && (
                            <img
                              src={item.product.coverImage}
                              alt={item.product.title}
                              className="w-16 h-16 object-cover rounded"
                            />
                          )}
                          <div className="flex-1">
                            <p className="font-semibold text-sm">{item.title || item.product?.title}</p>
                            <p className="text-gray-600 text-xs">${item.price?.toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {order.items?.length > 3 && (
                      <p className="text-sm text-gray-600">
                        +{order.items.length - 3} sản phẩm khác
                      </p>
                    )}
                  </div>

                  <div className="border-t pt-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">Tổng Số Tiền</p>
                      <p className="text-xl font-bold gradient-text">
                        ${order.totalAmount?.toFixed(2)}
                      </p>
                    </div>
                    {order.status === 'pending' && (
                      <button
                        onClick={async () => {
                          if (confirm('Bạn có chắc muốn hủy đơn hàng này không?')) {
                            try {
                              await api.put(`/client/orders/${order._id}/cancel`)
                              fetchOrders()
                            } catch (error) {
                              alert('Không thể hủy đơn hàng')
                            }
                          }
                        }}
                        className="btn-secondary text-red-600 border-red-600 hover:bg-red-50"
                      >
                        Hủy Đơn Hàng
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Orders


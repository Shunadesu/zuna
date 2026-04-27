import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiPackage, FiCheckCircle, FiDownload, FiArrowLeft } from 'react-icons/fi'
import useAuthStore from '../../store/authStore'
import api from '../../utils/api'
import ProtectedRoute from '../../components/auth/ProtectedRoute'

const OrderDetail = () => {
  const { id } = useParams()
  const { user } = useAuthStore()
  const [order, setOrder] = useState(null)
  const [payment, setPayment] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrder()
  }, [id])

  const fetchOrder = async () => {
    try {
      const orderRes = await api.get(`/client/orders/${id}`)
      const orderData = orderRes.data.data
      setOrder(orderData)
      
      // Try to get payment info if available in order response
      if (orderData.payment) {
        setPayment(orderData.payment)
      } else {
        // Try to fetch payment separately
        try {
          const paymentRes = await api.get(`/client/payments`, {
            params: { orderId: id }
          })
          if (paymentRes.data.data && paymentRes.data.data.length > 0) {
            setPayment(paymentRes.data.data[0])
          }
        } catch (e) {
          // Payment not found, ignore
        }
      }
    } catch (error) {
      console.error('Error fetching order:', error)
    } finally {
      setLoading(false)
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

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Không tìm thấy đơn hàng</h2>
          <Link to="/orders" className="btn-primary">
            Quay lại Đơn Hàng
          </Link>
        </div>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/orders"
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 mb-6"
          >
            <FiArrowLeft className="w-5 h-5" />
            <span>Quay lại Đơn Hàng</span>
          </Link>

          <div className="bg-white rounded-xl shadow-md p-8 mb-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Đơn Hàng #{order.orderNumber}</h1>
                <p className="text-gray-600">
                  Đặt vào ngày {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              <span className={`px-4 py-2 rounded-full font-semibold ${
                order.status === 'completed' ? 'bg-green-100 text-green-700' :
                order.status === 'paid' ? 'bg-blue-100 text-blue-700' :
                order.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {order.status}
              </span>
            </div>

            {/* Order Items */}
            <div className="border-t pt-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Sản Phẩm Đã Đặt</h2>
              <div className="space-y-4">
                {order.items?.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    {item.product?.coverImage && (
                      <img
                        src={item.product.coverImage}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded"
                      />
                    )}
                    <div className="flex-1">
                      <Link to={`/products/${item.product?.slug}`}>
                        <h3 className="font-semibold hover:text-primary-600 transition-colors">
                          {item.title || item.product?.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-600">
                        Người bán: {item.seller?.username || 'Không xác định'}
                      </p>
                      {order.status === 'completed' && item.product?.downloadUrl && (
                        <a
                          href={item.product.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 mt-2"
                        >
                          <FiDownload className="w-4 h-4" />
                          <span className="text-sm">Tải Về</span>
                        </a>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${item.price?.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="border-t pt-6">
              <h2 className="text-xl font-bold mb-4">Tóm Tắt Đơn Hàng</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tổng Phụ</span>
                  <span className="font-semibold">${order.subtotal?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Thuế (10%)</span>
                  <span className="font-semibold">${order.tax?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-lg font-bold">Tổng Cộng</span>
                  <span className="text-lg font-bold gradient-text">
                    ${order.totalAmount?.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          {order.shippingAddress && (
            <div className="bg-white rounded-xl shadow-md p-8 mb-6">
              <h2 className="text-xl font-bold mb-4">Địa Chỉ Giao Hàng</h2>
              <div className="text-gray-700">
                <p className="font-semibold">{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.address}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.country} {order.shippingAddress.zipCode}
                </p>
                <p className="mt-2">Phone: {order.shippingAddress.phone}</p>
                <p>Email: {order.shippingAddress.email}</p>
              </div>
            </div>
          )}

          {/* Payment Info */}
          {payment && (
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-xl font-bold mb-4">Thông Tin Thanh Toán</h2>
              <div className="space-y-2 text-gray-700">
                <p><span className="font-semibold">Phương thức:</span> {payment.method}</p>
                <p><span className="font-semibold">Trạng thái:</span> {payment.status}</p>
                {payment.transactionId && (
                  <p><span className="font-semibold">Mã Giao Dịch:</span> {payment.transactionId}</p>
                )}
                {payment.paidAt && (
                  <p><span className="font-semibold">Thanh Toán Lúc:</span> {new Date(payment.paidAt).toLocaleString()}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default OrderDetail


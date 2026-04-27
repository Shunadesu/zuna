import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiBell, FiCheck, FiTrash2, FiCircle } from 'react-icons/fi'
import useAuthStore from '../../store/authStore'
import api from '../../utils/api'
import ProtectedRoute from '../../components/auth/ProtectedRoute'

const Notifications = () => {
  const { isAuthenticated } = useAuthStore()
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, unread

  useEffect(() => {
    if (isAuthenticated) {
      fetchNotifications()
      fetchUnreadCount()
    }
  }, [isAuthenticated, filter])

  const fetchNotifications = async () => {
    try {
      const params = filter !== 'all' ? { read: false } : {}
      const response = await api.get('/client/notifications', { params })
      setNotifications(response.data.data?.notifications || [])
    } catch (error) {
      console.error('Error fetching notifications:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchUnreadCount = async () => {
    try {
      const response = await api.get('/client/notifications/unread-count')
      setUnreadCount(response.data.data?.count || 0)
    } catch (error) {
      console.error('Error fetching unread count:', error)
    }
  }

  const markAsRead = async (id) => {
    try {
      await api.put(`/client/notifications/${id}/read`)
      fetchNotifications()
      fetchUnreadCount()
    } catch (error) {
      console.error('Error marking as read:', error)
    }
  }

  const markAllAsRead = async () => {
    try {
      await api.put('/client/notifications/read-all')
      fetchNotifications()
      fetchUnreadCount()
    } catch (error) {
      console.error('Error marking all as read:', error)
    }
  }

  const deleteNotification = async (id) => {
    try {
      await api.delete(`/client/notifications/${id}`)
      fetchNotifications()
      fetchUnreadCount()
    } catch (error) {
      console.error('Error deleting notification:', error)
    }
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'order_placed':
      case 'order_paid':
      case 'order_completed':
        return '📦'
      case 'product_approved':
      case 'product_sold':
        return '✅'
      case 'review_received':
        return '⭐'
      case 'vip_upgraded':
        return '👑'
      case 'payment_received':
        return '💰'
      default:
        return '🔔'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Đang tải thông báo...</p>
        </div>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-3">
              <FiBell className="w-8 h-8 text-primary-600" />
              <h1 className="text-3xl font-bold">Thông Báo</h1>
              {unreadCount > 0 && (
                <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm font-semibold">
                  {unreadCount}
                </span>
              )}
            </div>
            
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="btn-secondary text-sm"
              >
                Đánh Dấu Tất Cả Đã Đọc
              </button>
            )}
          </div>

          {/* Filter */}
          <div className="flex space-x-2 mb-6">
            {['all', 'unread'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  filter === f
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {f === 'all' ? 'Tất Cả' : 'Chưa Đọc'}
              </button>
            ))}
          </div>

          {notifications.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <FiBell className="w-24 h-24 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Không có thông báo nào</h2>
              <p className="text-gray-600">Bạn đã cập nhật hết rồi!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification._id}
                  className={`bg-white rounded-xl shadow-md p-6 ${
                    !notification.read ? 'border-l-4 border-primary-600' : ''
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold mb-1">{notification.title}</h3>
                          <p className="text-gray-700">{notification.message}</p>
                          <p className="text-sm text-gray-500 mt-2">
                            {new Date(notification.createdAt).toLocaleString()}
                          </p>
                        </div>
                        
                        {!notification.read && (
                          <FiCircle className="w-5 h-5 text-primary-600 flex-shrink-0" />
                        )}
                      </div>
                      
                      {notification.link && (
                        <Link
                          to={notification.link}
                          className="inline-block mt-4 text-primary-600 hover:text-primary-700 font-semibold text-sm"
                        >
                          Xem Chi Tiết →
                        </Link>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification._id)}
                          className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
                          title="Đánh dấu đã đọc"
                        >
                          <FiCheck className="w-5 h-5" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification._id)}
                        className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                        title="Xóa"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
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

export default Notifications


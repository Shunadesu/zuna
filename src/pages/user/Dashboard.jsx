import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiPackage, FiDollarSign, FiStar, FiSettings } from 'react-icons/fi'
import useAuthStore from '../../store/authStore'
import api from '../../utils/api'

const Dashboard = () => {
  const { user } = useAuthStore()
  const [stats, setStats] = useState({
    products: 0,
    sales: 0,
    earnings: 0,
    reviews: 0
  })
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [productsRes] = await Promise.all([
        api.get('/products/my-products?limit=5')
      ])
      setProducts(productsRes.data.data || [])
      // Calculate stats from products
      const totalSales = productsRes.data.data?.reduce((sum, p) => sum + (p.salesCount || 0), 0) || 0
      setStats({
        products: productsRes.data.pagination?.total || 0,
        sales: totalSales,
        earnings: 0, // TODO: Calculate from orders
        reviews: 0 // TODO: Calculate from reviews
      })
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.username}!</p>
            </div>
            <div className="flex space-x-2">
              <Link to="/profile" className="btn-secondary flex items-center space-x-2">
                <FiUser className="w-5 h-5" />
                <span>Profile</span>
              </Link>
              <Link to="/orders" className="btn-secondary flex items-center space-x-2">
                <FiShoppingBag className="w-5 h-5" />
                <span>Orders</span>
              </Link>
            </div>
          </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Products</p>
                <p className="text-3xl font-bold gradient-text">{stats.products}</p>
              </div>
              <FiPackage className="w-12 h-12 text-primary-400" />
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Sales</p>
                <p className="text-3xl font-bold gradient-text">{stats.sales}</p>
              </div>
              <FiDollarSign className="w-12 h-12 text-green-400" />
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Earnings</p>
                <p className="text-3xl font-bold gradient-text">${stats.earnings}</p>
              </div>
              <FiDollarSign className="w-12 h-12 text-yellow-400" />
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Reviews</p>
                <p className="text-3xl font-bold gradient-text">{stats.reviews}</p>
              </div>
              <FiStar className="w-12 h-12 text-purple-400" />
            </div>
          </div>
        </div>

        {/* My Products */}
        <div className="card p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">My Products</h2>
            <Link to="/products/create" className="btn-primary">
              Create Product
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">You haven't created any products yet.</p>
              <Link to="/products/create" className="btn-primary">
                Create Your First Product
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {products.map((product) => (
                <div key={product._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    {product.coverImage && (
                      <img src={product.coverImage} alt={product.title} className="w-16 h-16 object-cover rounded" />
                    )}
                    <div>
                      <h3 className="font-semibold">{product.title}</h3>
                      <p className="text-sm text-gray-600">
                        Status: <span className={`font-semibold ${
                          product.status === 'approved' ? 'text-green-600' :
                          product.status === 'pending' ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {product.status}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-bold gradient-text">${product.price}</span>
                    <Link to={`/products/${product.slug}`} className="btn-secondary text-sm">
                      View
                    </Link>
                  </div>
                </div>
              ))}
              <div className="text-center pt-4">
                <Link to="/products/my-products" className="text-primary-600 hover:text-primary-700 font-semibold">
                  View All Products →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard


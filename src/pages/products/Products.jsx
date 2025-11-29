import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiStar, FiSearch, FiFilter, FiTrendingUp, FiArrowRight } from 'react-icons/fi'
import useDataStore from '../../store/dataStore'
import GlassCard from '../../components/ui/GlassCard'
import AnimatedBackground from '../../components/backgrounds/AnimatedBackground'

const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    sort: 'featured'
  })
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0
  })

  const { fetchAllProducts } = useDataStore()

  useEffect(() => {
    fetchProducts()
  }, [filters, pagination.page])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const data = await fetchAllProducts(filters, pagination)
      setProducts(data.products || [])
      setPagination(prev => ({
        ...prev,
        ...data.pagination
      }))
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  const categories = [
    'Website Template',
    'WordPress Theme',
    'HTML Template',
    'Component',
    'Plugin',
    'Script',
    'Other'
  ]

  return (
    <div className="min-h-screen bg-black text-white relative py-32">
      <AnimatedBackground variant="blue" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="section-title">Marketplace</h1>
          <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-24 mx-auto mb-6" />
          <p className="section-subtitle">
            Discover premium templates, themes, and digital resources
          </p>
        </div>

        {/* Filters */}
        <GlassCard className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="input-field pl-10"
              />
            </div>

            {/* Category */}
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="input-field"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {/* Price Range */}
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min Price"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                className="input-field"
              />
              <input
                type="number"
                placeholder="Max Price"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                className="input-field"
              />
            </div>

            {/* Sort */}
            <select
              value={filters.sort}
              onChange={(e) => handleFilterChange('sort', e.target.value)}
              className="input-field"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="sales">Most Sold</option>
            </select>
          </div>
        </GlassCard>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            <p className="mt-4 text-white/60">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/60 text-lg">No products found</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link
                  key={product._id}
                  to={`/products/${product.slug}`}
                  className="group"
                >
                  <GlassCard>
                    <div className="relative h-48 mb-6 overflow-hidden rounded-2xl">
                      {product.coverImage ? (
                        <img
                          src={product.coverImage}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                          <FiTrendingUp className="w-16 h-16 text-white/50" />
                        </div>
                      )}
                      {product.featured && (
                        <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-xs font-semibold text-white">
                          Featured
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold mb-4 group-hover:translate-x-2 transition-transform duration-500 line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-white/60 text-sm mb-6 line-clamp-2 leading-relaxed">
                      {product.shortDescription || product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          <FiStar className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="ml-1 text-sm font-semibold text-white">
                            {product.rating?.average?.toFixed(1) || '0.0'}
                          </span>
                        </div>
                        <span className="text-white/40 text-sm">
                          ({product.rating?.count || 0})
                        </span>
                      </div>
                      <div className="text-lg font-bold text-gradient">
                        ${product.salePrice || product.price}
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="mt-12 flex justify-center space-x-2">
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                  disabled={pagination.page === 1}
                  className="px-4 py-2 glass rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 text-white"
                >
                  Previous
                </button>
                {[...Array(pagination.pages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setPagination(prev => ({ ...prev, page: i + 1 }))}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      pagination.page === i + 1
                        ? 'bg-white text-black'
                        : 'glass text-white hover:bg-white/10'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                  disabled={pagination.page === pagination.pages}
                  className="px-4 py-2 glass rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 text-white"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Products


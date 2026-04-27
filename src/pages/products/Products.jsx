import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiStar, FiSearch, FiTrendingUp, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import useDataStore from '../../store/dataStore'
import SEO from '../../components/seo/SEO'
import ProductSkeleton from '../../components/ui/ProductSkeleton'
import FilterSkeleton from '../../components/ui/FilterSkeleton'

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
    'Template Website',
    'Giao Diện WordPress',
    'Template HTML',
    'Component',
    'Plugin',
    'Script',
    'Khác'
  ]

  return (
    <>
      <SEO
        title="Cửa Hàng - Sản Phẩm Số Cao Cấp"
        description="Duyệt bộ sưu tập các mẫu web cao cấp, giao diện WordPress, template HTML và tài nguyên số. Tìm giải pháp hoàn hảo cho dự án tiếp theo của bạn."
        keywords="web templates, WordPress themes, HTML templates, digital products, marketplace, premium templates, website themes"
        url="https://zuna.media/products"
      />
      
      <div className="min-h-screen bg-black text-white relative">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px]" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 pt-32 pb-12 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Cửa Hàng</h1>
            <p className="text-white/50 text-sm md:text-base max-w-xl mx-auto">
              Khám phá bộ sưu tập template và tài nguyên số cao cấp
            </p>
          </div>

          {/* Filters */}
          {loading ? (
            <FilterSkeleton />
          ) : (
            <div className="glass rounded-2xl p-3 md:p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 md:gap-3">
                {/* Search */}
                <div className="relative lg:col-span-2">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-white/5 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all"
                  />
                </div>

                {/* Category */}
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="px-3 py-2.5 bg-white/5 rounded-xl text-sm text-white/70 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all appearance-none cursor-pointer"
                >
                  <option value="">Danh Mục</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>

                {/* Price Range */}
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Từ"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    className="w-full px-3 py-2.5 bg-white/5 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all"
                  />
                  <input
                    type="number"
                    placeholder="Đến"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    className="w-full px-3 py-2.5 bg-white/5 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all"
                  />
                </div>

                {/* Sort */}
                <select
                  value={filters.sort}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                  className="px-3 py-2.5 bg-white/5 rounded-xl text-sm text-white/70 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all appearance-none cursor-pointer"
                >
                  <option value="featured">Nổi Bật</option>
                  <option value="price-asc">Giá: Thấp → Cao</option>
                  <option value="price-desc">Giá: Cao → Thấp</option>
                  <option value="rating">Đánh Giá</option>
                  <option value="sales">Bán Chạy</option>
                </select>
              </div>
            </div>
          )}

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
              <ProductSkeleton count={12} />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/40 text-lg">Không tìm thấy sản phẩm nào</p>
            </div>
          ) : (
            <>
              {/* Results count */}
              <div className="flex items-center justify-between mb-4 text-sm text-white/50">
                <span>Hiển thị {products.length} sản phẩm</span>
                {pagination.total > 0 && (
                  <span>{pagination.total} tổng cộng</span>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
                {products.map((product) => (
                  <Link
                    key={product._id}
                    to={`/products/${product.slug}`}
                    className="group glass rounded-2xl p-2.5 hover:bg-white/[0.08] transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden rounded-xl mb-2.5" style={{ aspectRatio: '16/9' }}>
                      {product.coverImage ? (
                        <img
                          src={product.coverImage}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                          <FiTrendingUp className="w-8 h-8 text-white/30" />
                        </div>
                      )}
                      {product.featured && (
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-medium bg-gradient-to-r from-cyan-500 to-pink-500 text-white">
                          Nổi Bật
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-sm font-medium mb-1.5 line-clamp-2 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-pink-400 transition-all">
                        {product.title}
                      </h3>
                      
                      {/* Rating & Price */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <FiStar className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                          <span className="text-xs text-white/70">
                            {product.rating?.average?.toFixed(1) || '0.0'}
                          </span>
                          <span className="text-xs text-white/30">
                            ({product.rating?.count || 0})
                          </span>
                        </div>
                        <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-400">
                          ${product.salePrice || product.price}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                    disabled={pagination.page === 1}
                    className="p-2 glass rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 text-white/70 transition-all"
                  >
                    <FiChevronLeft className="w-5 h-5" />
                  </button>
                  
                  {Array.from({ length: pagination.pages }).map((_, i) => {
                    const pageNum = i + 1
                    const isActive = pagination.page === pageNum
                    const showPage = pageNum === 1 || pageNum === pagination.pages || (pageNum >= pagination.page - 1 && pageNum <= pagination.page + 1)
                    
                    if (!showPage && (pageNum === pagination.page - 2 || pageNum === pagination.page + 2)) {
                      return <span key={pageNum} className="text-white/30">...</span>
                    }
                    if (!showPage) return null
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPagination(prev => ({ ...prev, page: pageNum }))}
                        className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-cyan-500 to-pink-500 text-white'
                            : 'glass text-white/70 hover:bg-white/10'
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  })}
                  
                  <button
                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                    disabled={pagination.page === pagination.pages}
                    className="p-2 glass rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 text-white/70 transition-all"
                  >
                    <FiChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Products

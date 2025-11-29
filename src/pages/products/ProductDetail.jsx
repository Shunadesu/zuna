import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiStar, FiShoppingCart, FiUser, FiCheck, FiHeart } from 'react-icons/fi'
import api from '../../utils/api'
import useAuthStore from '../../store/authStore'
import useCartStore from '../../store/cartStore'
import SEO from '../../components/seo/SEO'
import { generateProductSchema, generateBreadcrumbSchema } from '../../utils/seo'

const ProductDetail = () => {
  const { slug } = useParams()
  const { isAuthenticated } = useAuthStore()
  const { addItem } = useCartStore()
  const [product, setProduct] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    fetchProduct()
  }, [slug])

  useEffect(() => {
    if (product?._id) {
      fetchReviews()
    }
  }, [product?._id])

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${slug}`)
      setProduct(response.data.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching product:', error)
      setLoading(false)
    }
  }

  const fetchReviews = async () => {
    if (!product?._id) return
    try {
      const response = await api.get(`/reviews/products/${product._id}`)
      setReviews(response.data.data?.reviews || [])
    } catch (error) {
      console.error('Error fetching reviews:', error)
    }
  }

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      window.location.href = '/login'
      return
    }
    // TODO: Implement cart functionality
    alert('Added to cart!')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Link to="/products" className="btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  const breadcrumbItems = [
    { name: 'Home', url: 'https://zunaweb.com/' },
    { name: 'Products', url: 'https://zunaweb.com/products' },
    { name: product.title, url: `https://zunaweb.com/products/${product.slug}` }
  ]

  const structuredData = [
    generateProductSchema(product),
    generateBreadcrumbSchema(breadcrumbItems)
  ]

  return (
    <>
      <SEO
        title={product.title}
        description={product.shortDescription || product.description || `Premium ${product.category} - ${product.title}`}
        keywords={`${product.title}, ${product.category}, web template, digital product, ${product.tags?.join(', ') || ''}`}
        image={product.coverImage}
        url={`https://zunaweb.com/products/${product.slug}`}
        type="product"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li><Link to="/" className="text-gray-500 hover:text-primary-600">Home</Link></li>
              <li><span className="mx-2 text-gray-400">/</span></li>
              <li><Link to="/products" className="text-gray-500 hover:text-primary-600">Products</Link></li>
              <li><span className="mx-2 text-gray-400">/</span></li>
              <li><span className="text-gray-900" aria-current="page">{product.title}</span></li>
            </ol>
          </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Images */}
          <div>
            <div className="bg-white rounded-xl overflow-hidden mb-4">
              <img
                src={product.images?.[selectedImage] || product.coverImage}
                alt={product.title}
                className="w-full h-96 object-cover"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-primary-600' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="bg-white rounded-xl p-8">
              <div className="mb-4">
                <span className="text-sm text-primary-600 font-semibold">{product.category}</span>
                {product.featured && (
                  <span className="ml-2 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-semibold">
                    Featured
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl font-bold mb-4" itemProp="name">{product.title}</h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  <FiStar className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="ml-2 text-lg font-semibold">
                    {product.rating?.average?.toFixed(1) || '0.0'}
                  </span>
                  <span className="ml-2 text-gray-600">
                    ({product.rating?.count || 0} reviews)
                  </span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">{product.salesCount || 0} sales</span>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline space-x-4">
                  {product.salePrice ? (
                    <>
                      <span className="text-4xl font-bold gradient-text">
                        ${product.salePrice}
                      </span>
                      <span className="text-2xl text-gray-400 line-through">
                        ${product.price}
                      </span>
                    </>
                  ) : (
                    <span className="text-4xl font-bold gradient-text">
                      ${product.price}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-gray-700 mb-8 leading-relaxed">
                {product.description}
              </p>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-semibold mb-4">Features</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <FiCheck className="w-5 h-5 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies */}
              {product.technologies && product.technologies.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-semibold mb-4">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Seller Info */}
              <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-tech rounded-full flex items-center justify-center text-white font-bold">
                    {product.seller?.username?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold">{product.seller?.username}</p>
                    <p className="text-sm text-gray-600">
                      {product.seller?.vipLevel !== 'none' && (
                        <span className="text-primary-600">VIP {product.seller.vipLevel}</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 btn-primary flex items-center justify-center space-x-2"
                >
                  <FiShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
                <button className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <FiHeart className="w-5 h-5" />
                </button>
              </div>

              {product.demoUrl && (
                <a
                  href={product.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-4 text-center btn-secondary"
                >
                  View Demo
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Reviews</h2>
            {isAuthenticated && (
              <Link
                to={`/products/${product.slug}/review`}
                className="btn-secondary text-sm"
              >
                Write Review
              </Link>
            )}
          </div>
          {reviews.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">No reviews yet. Be the first to review!</p>
              {isAuthenticated && (
                <Link
                  to={`/products/${product.slug}/review`}
                  className="btn-primary"
                >
                  Write First Review
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review._id} className="border-b border-gray-200 pb-6 last:border-0">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-tech rounded-full flex items-center justify-center text-white font-bold">
                      {review.user?.username?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold">{review.user?.username}</span>
                        {review.verified && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      {review.title && (
                        <h4 className="font-semibold mb-2">{review.title}</h4>
                      )}
                      <p className="text-gray-700">{review.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  )
}

export default ProductDetail


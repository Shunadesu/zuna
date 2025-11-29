import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FiStar, FiSend } from 'react-icons/fi'
import useAuthStore from '../../store/authStore'
import api from '../../utils/api'
import ProtectedRoute from '../../components/auth/ProtectedRoute'

const ReviewForm = () => {
  const { productId, slug } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState(null)
  const [formData, setFormData] = useState({
    rating: 5,
    title: '',
    content: ''
  })

  useEffect(() => {
    fetchProduct()
  }, [productId, slug])

  const fetchProduct = async () => {
    try {
      // Try to get product by slug first, then by ID
      const productParam = slug || productId
      const response = await api.get(`/products/${productParam}`)
      setProduct(response.data.data)
    } catch (error) {
      console.error('Error fetching product:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const productIdToUse = product?._id || productId
      await api.post(`/reviews/products/${productIdToUse}`, formData)
      navigate(`/products/${product?.slug || slug}`)
    } catch (error) {
      console.error('Error submitting review:', error)
      alert(error.response?.data?.error?.message || 'Failed to submit review')
    } finally {
      setLoading(false)
    }
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-8">Write a Review</h1>

          {/* Product Info */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="flex items-center space-x-4">
              {product.coverImage && (
                <img
                  src={product.coverImage}
                  alt={product.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
              )}
              <div>
                <h2 className="text-xl font-bold">{product.title}</h2>
                <p className="text-gray-600">${product.salePrice || product.price}</p>
              </div>
            </div>
          </div>

          {/* Review Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8 space-y-6">
            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating *
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className="focus:outline-none"
                  >
                    <FiStar
                      className={`w-8 h-8 ${
                        star <= formData.rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {formData.rating === 5 && 'Excellent'}
                {formData.rating === 4 && 'Good'}
                {formData.rating === 3 && 'Average'}
                {formData.rating === 2 && 'Poor'}
                {formData.rating === 1 && 'Very Poor'}
              </p>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Review Title (Optional)
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="input-field"
                placeholder="Summarize your experience"
                maxLength={100}
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Review Content *
              </label>
              <textarea
                required
                rows={8}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="input-field"
                placeholder="Share your thoughts about this product..."
                maxLength={1000}
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.content.length}/1000 characters
              </p>
            </div>

            {/* Submit */}
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => navigate(`/products/${product.slug}`)}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !formData.content.trim()}
                className="flex-1 btn-primary disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <FiSend className="w-5 h-5" />
                    <span>Submit Review</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default ReviewForm


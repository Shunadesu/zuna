import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FiUpload, FiX, FiSave } from 'react-icons/fi'
import useAuthStore from '../../store/authStore'
import api from '../../utils/api'
import ProtectedRoute from '../../components/auth/ProtectedRoute'
// Images are handled via FormData, no need for upload middleware import

const ProductForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = !!id
  const { isAuthenticated } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    price: '',
    salePrice: '',
    category: 'Website Template',
    demoUrl: '',
    downloadUrl: '',
    features: [],
    technologies: [],
    tags: [],
    fileSize: '',
    version: '1.0.0'
  })
  const [coverImage, setCoverImage] = useState(null)
  const [coverImagePreview, setCoverImagePreview] = useState(null)
  const [images, setImages] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])
  const [featureInput, setFeatureInput] = useState('')
  const [techInput, setTechInput] = useState('')
  const [tagInput, setTagInput] = useState('')

  const categories = [
    'Website Template',
    'WordPress Theme',
    'HTML Template',
    'Component',
    'Plugin',
    'Script',
    'Other'
  ]

  useEffect(() => {
    if (isEdit && id) {
      fetchProduct()
    }
  }, [id, isEdit])

  const fetchProduct = async () => {
    if (!id) return
    try {
      // First try to get from my-products to ensure user owns it
      const myProductsRes = await api.get('/client/products/my-products')
      const myProduct = myProductsRes.data.data?.find(p => p._id === id)
      
      if (myProduct) {
        const product = myProduct
      setFormData({
        title: product.title || '',
        description: product.description || '',
        shortDescription: product.shortDescription || '',
        price: product.price || '',
        salePrice: product.salePrice || '',
        category: product.category || 'Website Template',
        demoUrl: product.demoUrl || '',
        downloadUrl: product.downloadUrl || '',
        features: product.features || [],
        technologies: product.technologies || [],
        tags: product.tags || [],
        fileSize: product.fileSize || '',
        version: product.version || '1.0.0'
      })
        setCoverImagePreview(product.coverImage)
        setImagePreviews(product.images || [])
      } else {
        // Fallback: try direct API call
        const response = await api.get(`/public/products/${id}`)
        const product = response.data.data?.product || response.data.data
        setFormData({
          title: product.title || '',
          description: product.description || '',
          shortDescription: product.shortDescription || '',
          price: product.price || '',
          salePrice: product.salePrice || '',
          category: product.category || 'Website Template',
          demoUrl: product.demoUrl || '',
          downloadUrl: product.downloadUrl || '',
          features: product.features || [],
          technologies: product.technologies || [],
          tags: product.tags || [],
          fileSize: product.fileSize || '',
          version: product.version || '1.0.0'
        })
        setCoverImagePreview(product.coverImage)
        setImagePreviews(product.images || [])
      }
    } catch (error) {
      console.error('Error fetching product:', error)
      alert('Product not found or you do not have permission to edit it')
      navigate('/dashboard')
    }
  }

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setCoverImage(file)
      setCoverImagePreview(URL.createObjectURL(file))
    }
  }

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files)
    setImages(files)
    setImagePreviews(files.map(file => URL.createObjectURL(file)))
  }

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, featureInput.trim()]
      })
      setFeatureInput('')
    }
  }

  const removeFeature = (index) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index)
    })
  }

  const addTechnology = () => {
    if (techInput.trim()) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, techInput.trim()]
      })
      setTechInput('')
    }
  }

  const removeTechnology = (index) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((_, i) => i !== index)
    })
  }

  const addTag = () => {
    if (tagInput.trim()) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      })
      setTagInput('')
    }
  }

  const removeTag = (index) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, i) => i !== index)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const submitData = new FormData()
      
      // Add form fields
      Object.keys(formData).forEach(key => {
        if (key === 'features' || key === 'technologies' || key === 'tags') {
          submitData.append(key, JSON.stringify(formData[key]))
        } else {
          submitData.append(key, formData[key])
        }
      })

      // Add images
      if (coverImage) {
        submitData.append('coverImage', coverImage)
      }
      images.forEach(image => {
        submitData.append('images', image)
      })

      if (isEdit) {
        await api.put(`/client/products/${product.slug}`, submitData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      } else {
        await api.post('/client/products', submitData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      }

      navigate('/dashboard')
    } catch (error) {
      console.error('Error saving product:', error)
      alert(error.response?.data?.error?.message || 'Failed to save product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-8">
            {isEdit ? 'Edit Product' : 'Create New Product'}
          </h1>

          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8 space-y-6">
            {/* Basic Info */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="input-field"
                placeholder="Product title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short Description *
              </label>
              <input
                type="text"
                required
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                className="input-field"
                placeholder="Brief description (shown in listings)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Description *
              </label>
              <textarea
                required
                rows={6}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="input-field"
                placeholder="Detailed product description"
              />
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price ($) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sale Price ($) (Optional)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.salePrice}
                  onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
                  className="input-field"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="input-field"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Image *
              </label>
              <div className="flex items-center space-x-4">
                {coverImagePreview && (
                  <img
                    src={coverImagePreview}
                    alt="Cover preview"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                )}
                <label className="btn-secondary cursor-pointer">
                  <FiUpload className="w-5 h-5 mr-2" />
                  Upload Cover Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Images
              </label>
              <div className="grid grid-cols-4 gap-4 mb-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreviews(imagePreviews.filter((_, i) => i !== index))
                        setImages(images.filter((_, i) => i !== index))
                      }}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <label className="btn-secondary cursor-pointer inline-flex items-center">
                <FiUpload className="w-5 h-5 mr-2" />
                Add Images
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImagesChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* URLs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Demo URL
                </label>
                <input
                  type="url"
                  value={formData.demoUrl}
                  onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                  className="input-field"
                  placeholder="https://demo.example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Download URL
                </label>
                <input
                  type="url"
                  value={formData.downloadUrl}
                  onChange={(e) => setFormData({ ...formData, downloadUrl: e.target.value })}
                  className="input-field"
                  placeholder="https://download.example.com"
                />
              </div>
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Features
              </label>
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                  className="input-field flex-1"
                  placeholder="Add a feature"
                />
                <button
                  type="button"
                  onClick={addFeature}
                  className="btn-secondary"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.features.map((feature, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm flex items-center space-x-2"
                  >
                    <span>{feature}</span>
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="text-primary-700 hover:text-primary-900"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Technologies
              </label>
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                  className="input-field flex-1"
                  placeholder="Add a technology"
                />
                <button
                  type="button"
                  onClick={addTechnology}
                  className="btn-secondary"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm flex items-center space-x-2"
                  >
                    <span>{tech}</span>
                    <button
                      type="button"
                      onClick={() => removeTechnology(index)}
                      className="text-secondary-700 hover:text-secondary-900"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="input-field flex-1"
                  placeholder="Add a tag"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="btn-secondary"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center space-x-2"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(index)}
                      className="text-gray-700 hover:text-gray-900"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* File Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  File Size
                </label>
                <input
                  type="text"
                  value={formData.fileSize}
                  onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
                  className="input-field"
                  placeholder="e.g., 2.5MB"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Version
                </label>
                <input
                  type="text"
                  value={formData.version}
                  onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                  className="input-field"
                  placeholder="e.g., 1.0.0"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 btn-primary disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <FiSave className="w-5 h-5" />
                    <span>{isEdit ? 'Update Product' : 'Create Product'}</span>
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

export default ProductForm


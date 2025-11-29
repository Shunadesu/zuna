import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiClock, FiTag, FiUser } from 'react-icons/fi'
import api from '../../utils/api'

const StoryDetail = () => {
  const { slug } = useParams()
  const [story, setStory] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStory()
  }, [slug])

  const fetchStory = async () => {
    try {
      const response = await api.get(`/stories/${slug}`)
      setStory(response.data.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching story:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading story...</p>
        </div>
      </div>
    )
  }

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Story not found</h2>
          <Link to="/stories" className="btn-primary">
            Back to Stories
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <Link to="/" className="text-gray-500 hover:text-primary-600">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link to="/stories" className="text-gray-500 hover:text-primary-600">Stories</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">{story.title}</span>
        </nav>

        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Cover Image */}
          {story.coverImage && (
            <div className="h-96 overflow-hidden">
              <img
                src={story.coverImage}
                alt={story.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Meta */}
            <div className="flex items-center space-x-6 text-sm text-gray-600 mb-6">
              <div className="flex items-center">
                <FiTag className="w-4 h-4 mr-2" />
                {story.category}
              </div>
              <div className="flex items-center">
                <FiClock className="w-4 h-4 mr-2" />
                {story.readTime} min read
              </div>
              <div className="flex items-center">
                <FiUser className="w-4 h-4 mr-2" />
                {story.author?.username || 'Admin'}
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{story.title}</h1>

            {/* Excerpt */}
            {story.excerpt && (
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">{story.excerpt}</p>
            )}

            {/* Content */}
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: story.content }}
            />
          </div>
        </article>

        {/* Back to Stories */}
        <div className="mt-8 text-center">
          <Link to="/stories" className="btn-secondary">
            ← Back to Stories
          </Link>
        </div>
      </div>
    </div>
  )
}

export default StoryDetail


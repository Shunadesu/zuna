import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiClock, FiTag, FiArrowRight } from 'react-icons/fi'
import useDataStore from '../../store/dataStore'
import GlassCard from '../../components/ui/GlassCard'
import AnimatedBackground from '../../components/backgrounds/AnimatedBackground'

const Stories = () => {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    total: 0,
    pages: 0
  })

  const { fetchAllStories } = useDataStore()

  useEffect(() => {
    fetchStories()
  }, [pagination.page])

  const fetchStories = async () => {
    setLoading(true)
    try {
      const data = await fetchAllStories(pagination)
      setStories(data.stories || [])
      setPagination(prev => ({
        ...prev,
        ...data.pagination
      }))
    } catch (error) {
      console.error('Error fetching stories:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative py-32">
      <AnimatedBackground variant="gradient" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="section-title">Stories & Blog</h1>
          <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-24 mx-auto mb-6" />
          <p className="section-subtitle">
            Insights, updates, and stories from our team
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            <p className="mt-4 text-white/60">Loading stories...</p>
          </div>
        ) : stories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/60 text-lg">No stories found</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {stories.map((story) => (
                <Link
                  key={story._id}
                  to={`/stories/${story.slug}`}
                  className="group"
                >
                  <GlassCard>
                    {story.coverImage && (
                      <div className="h-64 mb-6 overflow-hidden rounded-2xl">
                        <img
                          src={story.coverImage}
                          alt={story.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                    )}
                    <div className="flex items-center space-x-4 text-sm text-white/50 mb-4">
                      <div className="flex items-center">
                        <FiTag className="w-4 h-4 mr-1" />
                        {story.category}
                      </div>
                      <div className="flex items-center">
                        <FiClock className="w-4 h-4 mr-1" />
                        {story.readTime} min read
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 group-hover:translate-x-2 transition-transform duration-500">
                      {story.title}
                    </h3>
                    <p className="text-white/60 line-clamp-3 leading-relaxed mb-6">
                      {story.excerpt || story.content}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-medium text-white/40 group-hover:text-white transition-colors">
                      Read more <div className="w-4 h-[1px] bg-current transition-all group-hover:w-8" />
                    </div>
                  </GlassCard>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex justify-center space-x-2">
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

export default Stories


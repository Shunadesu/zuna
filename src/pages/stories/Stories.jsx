import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiClock, FiTag, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { motion } from 'framer-motion'
import useDataStore from '../../store/dataStore'
import SEO from '../../components/seo/SEO'
import GlassCard from '../../components/ui/GlassCard'

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
    <>
      <SEO
        title="Tin Tức & Blog - Cập Nhật Mới Nhất"
        description="Tin tức và bài viết mới nhất về phát triển web, xu hướng thiết kế và giải pháp số."
        keywords="blog, tin tức, phát triển web, thiết kế web, bài viết công nghệ"
        url="https://zuna.media/stories"
      />
      
      <div className="min-h-screen bg-black text-white relative">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-pink-600/20 rounded-full blur-[150px]" />
        </div>

        <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10 pt-32 pb-12">
          {/* Header */}
          <div className="text-center mb-8 md:mb-10">
            {loading && stories.length === 0 ? (
              <div className="space-y-4">
                <div className="h-10 bg-white/10 rounded animate-pulse w-64 mx-auto" />
                <div className="h-4 bg-white/5 rounded animate-pulse w-96 max-w-full mx-auto" />
              </div>
            ) : (
              <>
                <h1 className="text-3xl md:text-4xl font-bold mb-3">Tin Tức & Blog</h1>
                <p className="text-white/50 text-sm md:text-base max-w-xl mx-auto">
                  Thông tin chi tiết và cập nhật mới nhất
                </p>
              </>
            )}
          </div>

          {/* Stories Grid */}
          {loading && stories.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass rounded-2xl p-4"
                >
                  <div className="w-full bg-white/5 rounded-xl animate-pulse mb-4" style={{ aspectRatio: '16/9' }} />
                  <div className="flex gap-3 mb-3">
                    <div className="h-3 bg-white/5 rounded animate-pulse w-16" />
                    <div className="h-3 bg-white/5 rounded animate-pulse w-20" />
                  </div>
                  <div className="h-5 bg-white/10 rounded animate-pulse mb-2 w-3/4" />
                  <div className="space-y-1.5 mb-4">
                    <div className="h-3 bg-white/5 rounded animate-pulse w-full" />
                    <div className="h-3 bg-white/5 rounded animate-pulse w-5/6" />
                  </div>
                  <div className="h-3 bg-white/5 rounded animate-pulse w-24" />
                </motion.div>
              ))}
            </div>
          ) : stories.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/40">Không tìm thấy bài viết nào</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {stories.map((story, index) => (
                  <motion.div
                    key={story._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link to={`/stories/${story.slug}`} className="group block">
                      <GlassCard className="p-4 h-full">
                        {story.coverImage && (
                          <div className="overflow-hidden rounded-xl mb-4" style={{ aspectRatio: '16/9' }}>
                            <img
                              src={story.coverImage}
                              alt={story.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                        )}
                        <div className="flex items-center gap-4 text-xs text-white/40 mb-3">
                          {story.category && (
                            <div className="flex items-center gap-1">
                              <FiTag className="w-3 h-3" />
                              {story.category}
                            </div>
                          )}
                          {story.readTime && (
                            <div className="flex items-center gap-1">
                              <FiClock className="w-3 h-3" />
                              {story.readTime} phút
                            </div>
                          )}
                        </div>
                        <h3 className="text-base font-semibold mb-2 line-clamp-2 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-pink-400 transition-all">
                          {story.title}
                        </h3>
                        <p className="text-white/50 text-sm line-clamp-2 leading-relaxed mb-3">
                          {story.excerpt || story.content}
                        </p>
                        <div className="text-xs text-white/30 group-hover:text-cyan-400 transition-colors">
                          Đọc thêm →
                        </div>
                      </GlassCard>
                    </Link>
                  </motion.div>
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

export default Stories

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiClock, FiTag, FiUser } from 'react-icons/fi'
import api from '../../utils/api'
import SEO from '../../components/seo/SEO'
import { generateArticleSchema, generateBreadcrumbSchema } from '../../utils/seo'

const StoryDetail = () => {
  const { slug } = useParams()
  const [story, setStory] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStory()
  }, [slug])

  const fetchStory = async () => {
    try {
      const response = await api.get(`/public/stories/${slug}`)
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
          <p className="mt-4 text-gray-600">Đang tải bài viết...</p>
        </div>
      </div>
    )
  }

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Không tìm thấy bài viết</h2>
          <Link to="/stories" className="btn-primary">
            Quay lại Tin Tức
          </Link>
        </div>
      </div>
    )
  }

  const breadcrumbItems = [
    { name: 'Trang Chủ', url: 'https://zunaweb.com/' },
    { name: 'Tin Tức', url: 'https://zunaweb.com/stories' },
    { name: story.title, url: `https://zunaweb.com/stories/${story.slug}` }
  ]

  const structuredData = [
    generateArticleSchema(story),
    generateBreadcrumbSchema(breadcrumbItems)
  ]

  return (
    <>
      <SEO
        title={story.title}
        description={story.excerpt || story.content?.substring(0, 160) || `Read ${story.title} on Zuna Web`}
        keywords={`${story.title}, ${story.category}, blog, article, web development, ${story.tags?.join(', ') || ''}`}
        image={story.coverImage}
        url={`https://zunaweb.com/stories/${story.slug}`}
        type="article"
        author={story.author?.username || 'Zuna Web Team'}
        publishedTime={story.createdAt}
        modifiedTime={story.updatedAt || story.createdAt}
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-8 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li><Link to="/" className="text-gray-500 hover:text-primary-600">Trang Chủ</Link></li>
              <li><span className="mx-2 text-gray-400">/</span></li>
              <li><Link to="/stories" className="text-gray-500 hover:text-primary-600">Tin Tức</Link></li>
              <li><span className="mx-2 text-gray-400">/</span></li>
              <li><span className="text-gray-900" aria-current="page">{story.title}</span></li>
            </ol>
          </nav>

          <article className="bg-white rounded-xl shadow-lg overflow-hidden" itemScope itemType="https://schema.org/Article">
            {story.coverImage && (
              <div className="h-96 overflow-hidden">
                <img
                  src={story.coverImage}
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-8 md:p-12">
              <div className="flex items-center space-x-6 text-sm text-gray-600 mb-6">
                <div className="flex items-center">
                  <FiTag className="w-4 h-4 mr-2" />
                  {story.category}
                </div>
                <div className="flex items-center">
                  <FiClock className="w-4 h-4 mr-2" />
                  {story.readTime} phút đọc
                </div>
                <div className="flex items-center">
                  <FiUser className="w-4 h-4 mr-2" />
                  {story.author?.username || 'Admin'}
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6" itemProp="headline">{story.title}</h1>

              {story.excerpt && (
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">{story.excerpt}</p>
              )}

              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: story.content }}
              />
            </div>
          </article>

          <div className="mt-8 text-center">
            <Link to="/stories" className="btn-secondary">
              ← Quay lại Tin Tức
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default StoryDetail

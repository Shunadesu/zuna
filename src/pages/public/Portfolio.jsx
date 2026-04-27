import { useState, useEffect } from 'react'
import { FiExternalLink, FiGithub } from 'react-icons/fi'
import useDataStore from '../../store/dataStore'
import SEO from '../../components/seo/SEO'
import GlassCard from '../../components/ui/GlassCard'
import AnimatedBackground from '../../components/backgrounds/AnimatedBackground'

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([])
  const [loading, setLoading] = useState(true)

  const { fetchPortfolio: fetchPortfolioCached } = useDataStore()

  useEffect(() => {
    fetchPortfolio()
  }, [])

  const fetchPortfolio = async () => {
    try {
      const data = await fetchPortfolioCached()
      // API returns { data: { portfolios: [...] } }, extract portfolios array
      if (Array.isArray(data)) {
        setPortfolio(data)
      } else if (data?.portfolios) {
        setPortfolio(data.portfolios)
      } else if (data?.data?.portfolios) {
        setPortfolio(data.data.portfolios)
      } else if (Array.isArray(data?.data)) {
        setPortfolio(data.data)
      } else {
        setPortfolio([])
      }
    } catch (error) {
      console.error('Error fetching portfolio:', error)
      setPortfolio([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO
        title="Hồ Sơ - Công Việc Của Chúng Tôi"
        description="Khám phá hồ sơ các dự án thành công. Xem cách chúng tôi đã giúp các doanh nghiệp chuyển đổi sự hiện diện số của họ với các giải pháp web hiện đại."
        keywords="hồ sơ, hồ sơ thiết kế web, dự án phát triển web, nghiên cứu điển hình, công việc của chúng tôi"
        url="https://zunaweb.com/portfolio"
      />
      <div className="min-h-screen bg-black text-white relative py-32">
        <AnimatedBackground variant="purple" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="section-title">Hồ Sơ Của Chúng Tôi</h1>
          <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-24 mx-auto mb-6" />
          <p className="section-subtitle">
            Giới thiệu những công việc và dự án tốt nhất của chúng tôi
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            <p className="mt-4 text-white/60">Đang tải hồ sơ...</p>
          </div>
        ) : portfolio.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/60 text-lg">Không tìm thấy mục hồ sơ nào</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio.map((item) => (
              <GlassCard key={item._id} className="group">
                {item.coverImage && (
                  <div className="h-64 mb-6 overflow-hidden rounded-2xl">
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                )}
                <div className="mb-4">
                  <span className="text-sm text-blue-400 font-semibold uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:translate-x-2 transition-transform duration-500">
                  {item.title}
                </h3>
                <p className="text-white/60 mb-6 line-clamp-3 leading-relaxed">
                  {item.shortDescription || item.description}
                </p>
                
                {/* Technologies */}
                {item.technologies && item.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.technologies.slice(0, 3).map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 glass rounded-full text-xs text-white/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* Links */}
                <div className="flex space-x-4">
                  {item.projectUrl && (
                    <a
                      href={item.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <FiExternalLink className="w-4 h-4" />
                      <span className="text-sm">Xem Trực Tiếp</span>
                    </a>
                  )}
                  {item.githubUrl && (
                    <a
                      href={item.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors"
                    >
                      <FiGithub className="w-4 h-4" />
                      <span className="text-sm">GitHub</span>
                    </a>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  )
}

export default Portfolio


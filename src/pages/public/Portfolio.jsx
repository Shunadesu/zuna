import { useState, useEffect } from 'react'
import { FiExternalLink, FiGithub, FiFolder } from 'react-icons/fi'
import { motion } from 'framer-motion'
import useDataStore from '../../store/dataStore'
import SEO from '../../components/seo/SEO'
import GlassCard from '../../components/ui/GlassCard'

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([])
  const [loading, setLoading] = useState(true)

  const { fetchPortfolio: fetchPortfolioCached } = useDataStore()

  useEffect(() => {
    fetchPortfolio()
  }, [])

  const fetchPortfolio = async () => {
    setLoading(true)
    try {
      const data = await fetchPortfolioCached()
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
        title="Hồ Sơ Dự Án - Portfolio Zuna Media"
        description="Khám phá các dự án thành công của Zuna Media. Thiết kế web, thương mại điện tử, và giải pháp số."
        keywords="portfolio, dự án web, thiết kế web, thương mại điện tử"
        url="https://zuna.media/portfolio"
      />
      
      <div className="min-h-screen bg-black text-white relative">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan-600/20 rounded-full blur-[150px]" />
        </div>

        <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10 pt-32 pb-12">
          {/* Header */}
          <div className="text-center mb-8 md:mb-10">
            {loading && portfolio.length === 0 ? (
              <div className="space-y-4">
                <div className="h-10 bg-white/10 rounded animate-pulse w-64 mx-auto" />
                <div className="h-4 bg-white/5 rounded animate-pulse w-96 max-w-full mx-auto" />
              </div>
            ) : (
              <>
                <h1 className="text-3xl md:text-4xl font-bold mb-3">Hồ Sơ Dự Án</h1>
                <p className="text-white/50 text-sm md:text-base max-w-xl mx-auto">
                  Những dự án thành công và giải pháp số của chúng tôi
                </p>
              </>
            )}
          </div>

          {/* Portfolio Grid */}
          {loading && portfolio.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass rounded-2xl p-4"
                >
                  <div className="w-full bg-white/5 rounded-xl animate-pulse mb-4" style={{ aspectRatio: '16/10' }} />
                  <div className="h-3 bg-white/10 rounded animate-pulse w-20 mb-3" />
                  <div className="h-5 bg-white/10 rounded animate-pulse w-3/4 mb-3" />
                  <div className="h-3 bg-white/5 rounded animate-pulse w-full mb-2" />
                  <div className="h-3 bg-white/5 rounded animate-pulse w-5/6 mb-4" />
                  <div className="flex gap-2">
                    <div className="h-6 bg-white/5 rounded-full animate-pulse w-16" />
                    <div className="h-6 bg-white/5 rounded-full animate-pulse w-20" />
                  </div>
                </motion.div>
              ))}
            </div>
          ) : portfolio.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                <FiFolder className="w-8 h-8 text-white/30" />
              </div>
              <p className="text-white/40">Không tìm thấy dự án nào</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {portfolio.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <GlassCard className="p-4 h-full group hover:-translate-y-1 transition-all duration-300">
                    {/* Image */}
                    {item.coverImage ? (
                      <div className="overflow-hidden rounded-xl mb-4" style={{ aspectRatio: '16/10' }}>
                        <img
                          src={item.coverImage}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="overflow-hidden rounded-xl mb-4 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center" style={{ aspectRatio: '16/10' }}>
                        <FiFolder className="w-12 h-12 text-white/30" />
                      </div>
                    )}

                    {/* Category */}
                    <span className="text-xs font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 uppercase tracking-wide">
                      {item.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-base font-semibold mt-2 mb-2 line-clamp-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-pink-400 transition-all">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-white/50 text-sm line-clamp-2 leading-relaxed mb-3">
                      {item.shortDescription || item.description}
                    </p>

                    {/* Technologies */}
                    {item.technologies && item.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {item.technologies.slice(0, 3).map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/5 text-white/60"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Links */}
                    <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                      {item.projectUrl && (
                        <a
                          href={item.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          <FiExternalLink className="w-3.5 h-3.5" />
                          Xem
                        </a>
                      )}
                      {item.githubUrl && (
                        <a
                          href={item.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-white/40 hover:text-white/70 transition-colors"
                        >
                          <FiGithub className="w-3.5 h-3.5" />
                          GitHub
                        </a>
                      )}
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Portfolio

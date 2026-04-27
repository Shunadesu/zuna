import { useState, useEffect } from 'react'
import { FiCheck, FiArrowRight } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useCTA } from '../../context/CTAContext'
import useDataStore from '../../store/dataStore'
import SEO from '../../components/seo/SEO'
import GlassCard from '../../components/ui/GlassCard'

const Services = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const { openCTA } = useCTA()

  const { fetchServices: fetchServicesCached } = useDataStore()

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    setLoading(true)
    try {
      const data = await fetchServicesCached()
      setServices(data)
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoading(false)
    }
  }

  const normalizedServices = Array.isArray(services) ? services : []

  return (
    <>
      <SEO
        title="Dịch Vụ Của Chúng Tôi - Giải Pháp Số"
        description="Giải pháp số toàn diện: phát triển web, thiết kế web, thương mại điện tử. Hãy để chúng tôi giúp chuyển đổi sự hiện diện số của bạn."
        keywords="dịch vụ phát triển web, thiết kế web, thương mại điện tử, giải pháp số"
        url="https://zuna.media/services"
      />
      
      <div className="min-h-screen bg-black text-white relative">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px]" />
        </div>

        <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10 pt-32 pb-12">
          {/* Header */}
          <div className="text-center mb-8 md:mb-10">
            {loading ? (
              <div className="space-y-4">
                <div className="h-10 bg-white/10 rounded animate-pulse w-64 mx-auto" />
                <div className="h-4 bg-white/5 rounded animate-pulse w-96 max-w-full mx-auto" />
              </div>
            ) : (
              <>
                <h1 className="text-3xl md:text-4xl font-bold mb-3">Dịch Vụ Của Chúng Tôi</h1>
                <p className="text-white/50 text-sm md:text-base max-w-xl mx-auto">
                  Giải pháp số toàn diện cho doanh nghiệp của bạn
                </p>
              </>
            )}
          </div>

          {/* Services Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
              {Array.from({ length: 6 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass rounded-2xl p-6 text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-white/10 animate-pulse" />
                  <div className="h-5 bg-white/10 rounded animate-pulse w-24 mx-auto mb-3" />
                  <div className="h-6 bg-white/10 rounded animate-pulse w-3/4 mx-auto mb-3" />
                  <div className="h-3 bg-white/5 rounded animate-pulse w-full mb-2" />
                  <div className="h-3 bg-white/5 rounded animate-pulse w-5/6 mx-auto" />
                </motion.div>
              ))}
            </div>
          ) : normalizedServices.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/40">Không tìm thấy dịch vụ nào</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
              {normalizedServices.map((service, index) => (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <GlassCard className="p-6 text-center group hover:-translate-y-1 transition-all duration-300">
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <div className="text-xs text-blue-400 font-medium mb-2">{service.number}</div>
                    <h3 className="text-lg font-semibold mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-pink-400 transition-all">
                      {service.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed">{service.description}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <GlassCard className="p-6 md:p-8 inline-block">
              <h2 className="text-xl md:text-2xl font-bold mb-2">Sẵn Sàng Bắt Đầu?</h2>
              <p className="text-white/50 text-sm mb-4 max-w-md mx-auto">
                Thảo luận về dự án của bạn và tìm giải pháp hoàn hảo
              </p>
              <button 
                onClick={openCTA}
                className="btn-primary inline-flex items-center gap-2"
              >
                Liên Hệ <FiArrowRight className="w-4 h-4" />
              </button>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default Services

import { useState, useEffect } from 'react'
import { FiCheck, FiArrowRight } from 'react-icons/fi'
import { useCTA } from '../../context/CTAContext'
import useDataStore from '../../store/dataStore'
import GlassCard from '../../components/ui/GlassCard'
import AnimatedBackground from '../../components/backgrounds/AnimatedBackground'

const Services = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const { openCTA } = useCTA()

  const { fetchServices: fetchServicesCached } = useDataStore()

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const data = await fetchServicesCached()
      setServices(data)
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative py-32">
      <AnimatedBackground variant="blue" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="section-title">Our Services</h1>
          <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-24 mx-auto mb-6" />
          <p className="section-subtitle">
            Comprehensive digital solutions for your business
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            <p className="mt-4 text-white/60">Loading services...</p>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/60 text-lg">No services found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {services.map((service) => (
              <GlassCard key={service._id} className="text-center group">
                <div className="text-5xl mb-6">{service.icon}</div>
                <div className="text-sm text-blue-400 font-semibold mb-2">
                  {service.number}
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:translate-y-1 transition-transform duration-500">{service.title}</h3>
                <p className="text-white/60 leading-relaxed">{service.description}</p>
              </GlassCard>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="text-center">
          <GlassCard className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 text-white/60 max-w-2xl mx-auto">
              Let's discuss your project and find the perfect solution
            </p>
            <button 
              onClick={openCTA}
              className="btn-primary inline-flex items-center gap-2"
            >
              Let's Talk <FiArrowRight className="w-5 h-5" />
            </button>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}

export default Services


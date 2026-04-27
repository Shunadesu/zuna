import { useState, useEffect } from 'react'
import { FiLinkedin, FiGithub, FiMail, FiUsers, FiMessageSquare, FiAward } from 'react-icons/fi'
import { motion } from 'framer-motion'
import useDataStore from '../../store/dataStore'
import SEO from '../../components/seo/SEO'
import GlassCard from '../../components/ui/GlassCard'
import TechCarousel from '../../components/ui/TechCarousel'

const About = () => {
  const [team, setTeam] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)

  const { fetchAboutData } = useDataStore()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const data = await fetchAboutData()
      setTeam(data.team || [])
      setTestimonials(data.testimonials || [])
      setClients(data.clients || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO
        title="Về Chúng Tôi - Đội Ngũ Zuna Media"
        description="Tìm hiểu về Zuna Media - đội ngũ phát triển và thiết kế web chuyên nghiệp. Gặp gỡ đội ngũ và xem các công việc của chúng tôi."
        keywords="về zuna web, đội ngũ phát triển web, nhà thiết kế web, công ty thiết kế web"
        url="https://zuna.media/about"
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
            {loading ? (
              <div className="space-y-4">
                <div className="h-10 bg-white/10 rounded animate-pulse w-64 mx-auto" />
                <div className="h-4 bg-white/5 rounded animate-pulse w-96 max-w-full mx-auto" />
              </div>
            ) : (
              <>
                <h1 className="text-3xl md:text-4xl font-bold mb-3">Về Zuna Media</h1>
                <p className="text-white/50 text-sm md:text-base max-w-xl mx-auto">
                  Đội ngũ phát triển và thiết kế web chuyên nghiệp
                </p>
              </>
            )}
          </div>

          {/* Team */}
          <section className="mb-10 md:mb-12">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-bold mb-2">Đội Ngũ Của Chúng Tôi</h2>
              <p className="text-white/40 text-sm">Những người tạo nên thành công</p>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass rounded-2xl p-4 text-center"
                  >
                    <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-white/10 animate-pulse" />
                    <div className="h-4 bg-white/10 rounded animate-pulse w-3/4 mx-auto mb-2" />
                    <div className="h-3 bg-white/5 rounded animate-pulse w-1/2 mx-auto mb-2" />
                    <div className="h-2 bg-white/5 rounded animate-pulse w-full" />
                  </motion.div>
                ))}
              </div>
            ) : team.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {team.map((member, index) => (
                  <motion.div
                    key={member._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <GlassCard className="p-4 text-center h-full hover:-translate-y-1 transition-all duration-300">
                      <div className="w-14 h-14 mx-auto mb-3 rounded-full overflow-hidden ring-2 ring-white/10">
                        {member.avatar ? (
                          <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-pink-500 flex items-center justify-center text-white text-xl font-bold">
                            {member.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <h3 className="text-sm font-semibold mb-0.5">{member.name}</h3>
                      <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 text-xs mb-2">{member.position}</p>
                      <p className="text-white/40 text-xs leading-relaxed line-clamp-2 hidden sm:block">{member.bio}</p>
                      <div className="flex justify-center gap-3 mt-3">
                        {member.social?.linkedin && (
                          <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
                            <FiLinkedin className="w-4 h-4" />
                          </a>
                        )}
                        {member.social?.github && (
                          <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
                            <FiGithub className="w-4 h-4" />
                          </a>
                        )}
                        {member.social?.email && (
                          <a href={`mailto:${member.social.email}`} className="text-white/40 hover:text-white transition-colors">
                            <FiMail className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-white/40">
                <FiUsers className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>Chưa có thông tin đội ngũ</p>
              </div>
            )}
          </section>

          {/* Technologies */}
          <section className="mb-10 md:mb-12">
            <TechCarousel />
          </section>

          {/* Testimonials */}
          <section className="mb-10 md:mb-12 relative">
            {testimonials.length > 0 && !loading && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-purple-900/10 rounded-full blur-[150px] pointer-events-none" />
            )}
            
            <div className="text-center mb-6 md:mb-8 relative z-10">
              <h2 className="text-xl md:text-2xl font-bold mb-2">Khách Hàng Nói Gì</h2>
              <p className="text-white/40 text-sm">Đánh giá từ khách hàng</p>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass rounded-2xl p-4"
                  >
                    <div className="flex gap-0.5 mb-3">
                      {[...Array(5)].map((_, i) => <div key={i} className="w-4 h-4 bg-white/10 rounded animate-pulse" />)}
                    </div>
                    <div className="h-3 bg-white/5 rounded animate-pulse w-full mb-2" />
                    <div className="h-3 bg-white/5 rounded animate-pulse w-5/6 mb-4" />
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-white/10 rounded-full animate-pulse" />
                      <div>
                        <div className="h-3 bg-white/10 rounded animate-pulse w-20 mb-1" />
                        <div className="h-2 bg-white/5 rounded animate-pulse w-24" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : testimonials.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 relative z-10">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <GlassCard className="p-4 h-full">
                      <div className="flex gap-0.5 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-yellow-400 text-sm">★</span>
                        ))}
                      </div>
                      <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-4">"{testimonial.content}"</p>
                      <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                        {testimonial.avatar && (
                          <img src={testimonial.avatar} alt={testimonial.name} className="w-8 h-8 rounded-full" />
                        )}
                        <div>
                          <p className="text-sm font-medium">{testimonial.name}</p>
                          <p className="text-xs text-white/40">{testimonial.position}, {testimonial.company}</p>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-white/40 relative z-10">
                <FiMessageSquare className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>Chưa có đánh giá</p>
              </div>
            )}
          </section>

          {/* Clients */}
          <section>
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-bold mb-2">Khách Hàng Của Chúng Tôi</h2>
              <p className="text-white/40 text-sm">Những doanh nghiệp đã tin tưởng</p>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="glass rounded-xl p-4 flex items-center justify-center h-16">
                    <div className="w-16 h-8 bg-white/10 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            ) : clients.length > 0 ? (
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
                {clients.map((client) => (
                  <GlassCard key={client._id} className="flex items-center justify-center p-3 h-16 grayscale hover:grayscale-0 transition-all cursor-pointer">
                    {client.logo ? (
                      <img src={client.logo} alt={client.name} className="max-h-8 object-contain" />
                    ) : (
                      <span className="text-white/40 text-xs">{client.name}</span>
                    )}
                  </GlassCard>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-white/40">
                <FiAward className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>Chưa có thông tin khách hàng</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  )
}

export default About

import { useState, useEffect } from 'react'
import { FiLinkedin, FiGithub, FiMail } from 'react-icons/fi'
import useDataStore from '../../store/dataStore'
import SEO from '../../components/seo/SEO'
import GlassCard from '../../components/ui/GlassCard'
import AnimatedBackground from '../../components/backgrounds/AnimatedBackground'

const About = () => {
  const [team, setTeam] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [clients, setClients] = useState([])

  const { fetchAboutData } = useDataStore()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const data = await fetchAboutData()
      setTeam(data.team || [])
      setTestimonials(data.testimonials || [])
      setClients(data.clients || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <>
      <SEO
        title="About Us - Zuna Web Team"
        description="Learn about Zuna Web - a team of passionate developers and designers creating digital solutions for modern businesses. Meet our team and see our work."
        keywords="about zuna web, web development team, digital agency, web designers, developers, company"
        url="https://zunaweb.com/about"
      />
      <div className="min-h-screen bg-black text-white relative">
        <AnimatedBackground variant="purple" />
      
      {/* Hero */}
      <section className="relative py-32">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="section-title">About Zuna Web</h1>
          <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-24 mx-auto mb-6" />
          <p className="section-subtitle">
            We are a team of passionate developers and designers creating 
            digital solutions for modern businesses.
          </p>
        </div>
      </section>

      {/* Team */}
      {team.length > 0 && (
        <section className="py-32 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
              <h2 className="section-title">Our Team</h2>
              <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-24 mx-auto mb-6" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member) => (
                <GlassCard key={member._id} className="text-center">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden glass">
                    {member.avatar ? (
                      <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white text-3xl font-bold">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-blue-400 mb-4">{member.position}</p>
                  <p className="text-white/60 text-sm mb-6 leading-relaxed">{member.bio}</p>
                  <div className="flex justify-center space-x-4">
                    {member.social?.linkedin && (
                      <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
                        <FiLinkedin className="w-5 h-5" />
                      </a>
                    )}
                    {member.social?.github && (
                      <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
                        <FiGithub className="w-5 h-5" />
                      </a>
                    )}
                    {member.social?.email && (
                      <a href={`mailto:${member.social.email}`} className="text-white/60 hover:text-white transition-colors">
                        <FiMail className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-32 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-purple-900/10 rounded-full blur-[150px] pointer-events-none" />
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
              <h2 className="section-title">What Our Clients Say</h2>
              <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-24 mx-auto mb-6" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <GlassCard key={testimonial._id}>
                  <div className="flex items-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  <p className="text-white/80 mb-6 italic leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    {testimonial.avatar && (
                      <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                    )}
                    <div>
                      <p className="font-semibold text-white">{testimonial.name}</p>
                      <p className="text-sm text-white/60">{testimonial.position}, {testimonial.company}</p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Clients */}
      {clients.length > 0 && (
        <section className="py-32 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
              <h2 className="section-title">Our Clients</h2>
              <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-24 mx-auto mb-6" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {clients.map((client) => (
                <GlassCard key={client._id} className="flex items-center justify-center p-6 grayscale hover:grayscale-0 transition-all">
                  {client.logo ? (
                    <img src={client.logo} alt={client.name} className="max-h-16 object-contain" />
                  ) : (
                    <span className="text-white/60">{client.name}</span>
                  )}
                </GlassCard>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
    </>
  )
}

export default About


import { FiCode, FiLayers, FiZap, FiUsers } from 'react-icons/fi'
import GlassCard from '../ui/GlassCard'
import SectionHeader from '../ui/SectionHeader'

const features = [
  {
    icon: FiCode,
    title: 'Premium Quality',
    description: 'Handpicked templates and resources crafted by expert designers and developers',
    color: '#06b6d4'
  },
  {
    icon: FiZap,
    title: 'Fast Delivery',
    description: 'Instant access to all digital products. Download and start using immediately',
    color: '#a855f7'
  },
  {
    icon: FiLayers,
    title: 'Regular Updates',
    description: 'All products receive regular updates and improvements to stay current',
    color: '#8b5cf6'
  },
  {
    icon: FiUsers,
    title: 'Community Support',
    description: 'Join a vibrant community of creators and get support when you need it',
    color: '#ec4899'
  }
]

const FeaturesSection = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader
          title="Why Choose Zuna Web"
          subtitle="Everything you need to build exceptional digital experiences"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <GlassCard key={index} className="text-center group">
                <div className="mb-6 p-4 rounded-2xl bg-white/5 w-fit mx-auto group-hover:bg-gradient-to-br group-hover:from-cyan-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 transition-all duration-300">
                  <Icon 
                    className="w-8 h-8 mx-auto transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:via-purple-400 group-hover:to-pink-400" 
                    style={{ color: feature.color }} 
                  />
                </div>
                <h3 className="text-xl font-semibold mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:via-purple-400 group-hover:to-pink-400 transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </GlassCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection


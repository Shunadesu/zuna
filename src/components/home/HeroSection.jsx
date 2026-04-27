import { useCTA } from '../../context/CTAContext'
import GradientButton from '../ui/GradientButton'
import ScrollIndicator from '../ui/ScrollIndicator'

const HeroSection = () => {
  const { openCTA } = useCTA()

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20">
      {/* Static Gradient Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-pink-900/20"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[80%] bg-gradient-to-t from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-[120px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[60%] bg-gradient-to-br from-cyan-400/5 via-purple-400/5 to-pink-400/5 rounded-full blur-[100px]"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-2" style={{ border: '1px solid rgba(139, 92, 246, 0.3)' }}>
          <span className="text-xs font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 uppercase tracking-wider">
            Dịch Vụ Web Chuyên Nghiệp
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 text-white">
          Zuna<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">.</span>
        </h1>

        <p className="text-base md:text-lg text-white/60 max-w-xl mx-auto mb-8 leading-relaxed">
          Chúng tôi chuyên cung cấp dịch vụ thiết kế và lập trình web theo yêu cầu, cùng với bộ sưu tập mẫu website chất lượng cao dành cho cá nhân và doanh nghiệp.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <GradientButton to="/products" variant="primary">
            Marketplace
          </GradientButton>
          <button
            onClick={openCTA}
            className="px-6 py-3 glass rounded-full font-semibold text-base text-white transition-all hover:scale-105 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:via-purple-500/20 hover:to-pink-500/20 hover:border-purple-500/50 hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.4)]"
            style={{
              border: '1px solid rgba(139, 92, 246, 0.3)'
            }}
          >
            Liên Hệ
          </button>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  )
}

export default HeroSection

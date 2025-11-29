import { useEffect, useState, useRef, lazy, Suspense } from 'react'
import { useCTA } from '../../context/CTAContext'
import GradientButton from '../ui/GradientButton'
import ScrollIndicator from '../ui/ScrollIndicator'
const Prism = lazy(() => import('../backgrounds/Prism'))

const HeroSection = () => {
  const [shouldLoadPrism, setShouldLoadPrism] = useState(false)
  const [useStaticGradient, setUseStaticGradient] = useState(false)
  const [hasScrolledDown, setHasScrolledDown] = useState(false)
  const [isPrismVisible, setIsPrismVisible] = useState(true)
  const heroSectionRef = useRef(null)
  const { openCTA } = useCTA()

  // Load Prism sau khi component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldLoadPrism(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // Intersection Observer để detect khi hero section ra khỏi viewport
  useEffect(() => {
    if (!heroSectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isIntersecting = entry.isIntersecting
          
          // Khi scroll xuống lần đầu tiên
          if (!isIntersecting && !hasScrolledDown) {
            setHasScrolledDown(true)
            setUseStaticGradient(true)
            setIsPrismVisible(false)
          }
          
          // Một khi đã scroll xuống, luôn dùng gradient tĩnh
          if (hasScrolledDown) {
            setUseStaticGradient(true)
            setIsPrismVisible(false)
          } else {
            // Chỉ khi chưa scroll xuống thì mới hiển thị Prism
            setIsPrismVisible(isIntersecting)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '-50px'
      }
    )

    observer.observe(heroSectionRef.current)

    return () => {
      if (heroSectionRef.current) {
        observer.unobserve(heroSectionRef.current)
      }
    }
  }, [hasScrolledDown])

  return (
    <section ref={heroSectionRef} className="relative min-h-screen flex items-center justify-center pt-20">
      {/* Background: Prism hoặc Gradient tĩnh */}
      {hasScrolledDown || useStaticGradient ? (
        // Gradient tĩnh khi đã scroll xuống
        <div className="absolute inset-0 w-full h-full z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-pink-900/20"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[80%] bg-gradient-to-t from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-[120px]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[60%] bg-gradient-to-br from-cyan-400/5 via-purple-400/5 to-pink-400/5 rounded-full blur-[100px]"></div>
          </div>
        </div>
      ) : (
        // Prism chỉ hiển thị một lần khi load trang
        shouldLoadPrism && isPrismVisible && (
          <div className="absolute inset-0 w-full h-full z-0">
            <Suspense fallback={null}>
              <Prism
                animationType="rotate"
                timeScale={isPrismVisible ? 0.5 : 0}
                height={3.5}
                baseWidth={5.5}
                scale={2.8}
                hueShift={0}
                colorFrequency={1}
                noise={0}
                glow={1.5}
                transparent={true}
                suspendWhenOffscreen={true}
              />
            </Suspense>
          </div>
        )
      )}
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-2" style={{ border: '1px solid rgba(139, 92, 246, 0.3)' }}>
          <span className="text-xs font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 uppercase tracking-wider">
            Premium Digital Marketplace
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 text-white">
          Zuna<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">.</span>
        </h1>

        <p className="text-base md:text-lg text-white/60 max-w-xl mx-auto mb-8 leading-relaxed">
          Discover premium web templates, digital resources, and creative assets. 
          Build your next project with our curated marketplace of high-quality products.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <GradientButton to="/products" variant="primary">
            Explore Marketplace
          </GradientButton>
          <button
            onClick={openCTA}
            className="px-6 py-3 glass rounded-full font-semibold text-base text-white transition-all hover:scale-105 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:via-purple-500/20 hover:to-pink-500/20 hover:border-purple-500/50 hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.4)]"
            style={{
              border: '1px solid rgba(139, 92, 246, 0.3)'
            }}
          >
            Let's Talk
          </button>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  )
}

export default HeroSection


import { useEffect, useState, useRef, lazy, Suspense } from 'react'
import { useCTA } from '../../context/CTAContext'
const FluidCTA = lazy(() => import('../sections/FluidCTA'))

const CTASection = () => {
  const [shouldLoadCTA, setShouldLoadCTA] = useState(false)
  const ctaSectionRef = useRef(null)
  const { isCTAVisible } = useCTA()

  // Lazy load CTA section khi scroll gần đến hoặc khi mở từ header
  useEffect(() => {
    // Force load CTA nếu được mở từ header
    if (isCTAVisible) {
      setShouldLoadCTA(true)
      return
    }

    if (!ctaSectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoadCTA(true)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: '200px'
      }
    )

    observer.observe(ctaSectionRef.current)

    return () => {
      if (ctaSectionRef.current) {
        observer.unobserve(ctaSectionRef.current)
      }
    }
  }, [isCTAVisible])

  return (
    <section id="cta" ref={ctaSectionRef} className="relative overflow-hidden bg-black" style={{ minHeight: '60vh' }}>
      {shouldLoadCTA ? (
        <Suspense fallback={
          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-white/60">Đang tải...</p>
            </div>
          </div>
        }>
          <FluidCTA
            title="Sẵn Sàng Xây Dựng Điều Gì Đó Tuyệt Vời?"
            description="Tham gia cùng hàng nghìn nhà sáng tạo và lập trình viên tin tưởng Zuna Web cho nhu cầu số của họ. Bắt đầu hành trình của bạn ngay hôm nay."
            buttonText="Liên Hệ"
            expandedTitle="Liên Hệ"
            features={[
              {
                icon: "check",
                text: "Tìm hiểu cách Zuna có thể chuyển đổi doanh nghiệp của bạn với các giải pháp tùy chỉnh và tùy chọn giá linh hoạt."
              },
              {
                icon: "zap",
                text: "Trải nghiệm trực tiếp cách Zuna Platform tăng tốc triển khai và thúc đẩy kết quả."
              }
            ]}
            testimonial={{
              quote: "Zuna trao quyền cho đội ngũ của chúng tôi di chuyển nhanh hơn và tung ra sản phẩm một cách tự tin.",
              name: "Sarah Chen",
              role: "Quản Lý Sản Phẩm"
            }}
          />
        </Suspense>
      ) : (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center relative">
          {/* Background gradient effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white tracking-tight">
              Sẵn Sàng Xây Dựng
              <span className="block mt-2 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent">
                Điều Gì Đó Tuyệt Vời?
              </span>
            </h2>
            <p className="text-white/60 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
              Tham gia cùng hàng nghìn nhà sáng tạo và lập trình viên tin tưởng Zuna Web cho nhu cầu số của họ
            </p>
            <button 
              className="group relative px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white font-medium transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:scale-105"
              onClick={() => {
                const ctaElement = document.getElementById('cta')
                if (ctaElement) {
                  const yOffset = -100
                  const y = ctaElement.getBoundingClientRect().top + window.pageYOffset + yOffset
                  window.scrollTo({ top: y, behavior: 'smooth' })
                }
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Khám Phá Ngay
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-1/4 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl"></div>
        </div>
      )}
    </section>
  )
}

export default CTASection


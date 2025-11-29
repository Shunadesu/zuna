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
              <p className="text-white/60">Loading...</p>
            </div>
          </div>
        }>
          <FluidCTA
            title="Ready to Build Something Amazing?"
            description="Join thousands of creators and developers who trust Zuna Web for their digital needs. Start your journey today."
            buttonText="Let's Talk"
            expandedTitle="Let's Talk"
            features={[
              {
                icon: "check",
                text: "Learn how Zuna can transform your business with tailored solutions and flexible pricing options."
              },
              {
                icon: "zap",
                text: "Experience firsthand how Zuna Platform accelerates delivery & drives results."
              }
            ]}
            testimonial={{
              quote: "Zuna empowers our team to move faster and ship products with confidence.",
              name: "Sarah Chen",
              role: "Product Manager"
            }}
          />
        </Suspense>
      ) : (
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">Ready to Build Something Amazing?</h2>
            <p className="text-white/60 mb-8 max-w-2xl mx-auto">Join thousands of creators and developers who trust Zuna Web</p>
          </div>
        </div>
      )}
    </section>
  )
}

export default CTASection


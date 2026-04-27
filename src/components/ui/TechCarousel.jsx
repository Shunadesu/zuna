import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import GlassCard from './GlassCard'

const TechCarousel = ({ title = 'Công Nghệ Chúng Tôi Sử Dụng' }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [techs, setTechs] = useState([])
  const [isPaused, setIsPaused] = useState(false)

  // Default tech stack if no data
  const defaultTechs = [
    { name: 'React', icon: '⚛️', category: 'Frontend' },
    { name: 'Next.js', icon: '▲', category: 'Frontend' },
    { name: 'Node.js', icon: '🟢', category: 'Backend' },
    { name: 'TypeScript', icon: '📘', category: 'Language' },
    { name: 'Tailwind CSS', icon: '🎨', category: 'Styling' },
    { name: 'MongoDB', icon: '🍃', category: 'Database' },
    { name: 'PostgreSQL', icon: '🐘', category: 'Database' },
    { name: 'AWS', icon: '☁️', category: 'Cloud' },
    { name: 'Docker', icon: '🐳', category: 'DevOps' },
    { name: 'GraphQL', icon: '🔷', category: 'API' },
    { name: 'Figma', icon: '✏️', category: 'Design' },
    { name: 'Git', icon: '📂', category: 'Tools' }
  ]

  useEffect(() => {
    // Simulate fetching tech data
    setTechs(defaultTechs)
  }, [])

  const itemsPerPage = {
    mobile: 2,
    tablet: 3,
    desktop: 4
  }

  const [perPage, setPerPage] = useState(4)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setPerPage(itemsPerPage.mobile)
      else if (window.innerWidth < 1024) setPerPage(itemsPerPage.tablet)
      else setPerPage(itemsPerPage.desktop)
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const totalSlides = Math.ceil(techs.length / perPage)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const goTo = (index) => {
    setCurrentIndex(index)
  }

  useEffect(() => {
    if (isPaused) return
    
    const interval = setInterval(next, 3000)
    return () => clearInterval(interval)
  }, [isPaused, currentIndex, totalSlides])

  return (
    <div className="relative z-10">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl font-bold mb-2">{title}</h2>
        <p className="text-white/40 text-sm">Những công nghệ hiện đại mà chúng tôi sử dụng</p>
      </div>

      <div 
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="flex items-center gap-2 md:gap-4">
          {/* Prev Button */}
          <button
            onClick={prev}
            className="hidden md:flex flex-shrink-0 p-2 glass rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-all"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>

          {/* Carousel Track */}
          <div className="flex-1 overflow-hidden">
            <motion.div
              className="flex gap-3 md:gap-4"
              animate={{ x: `-${currentIndex * (100 / totalSlides)}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div
                  key={slideIndex}
                  className="flex gap-3 md:gap-4 flex-shrink-0"
                  style={{ width: '100%' }}
                >
                  {techs
                    .slice(slideIndex * perPage, slideIndex * perPage + perPage)
                    .map((tech, index) => (
                      <motion.div
                        key={`${tech.name}-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex-1 min-w-0"
                      >
                        <GlassCard className="p-3 md:p-4 h-full text-center group hover:-translate-y-1 transition-all duration-300">
                          <div className="text-2xl md:text-3xl mb-2">{tech.icon}</div>
                          <h3 className="text-xs md:text-sm font-medium mb-1 truncate">{tech.name}</h3>
                          <p className="text-[10px] md:text-xs text-white/40">{tech.category}</p>
                        </GlassCard>
                      </motion.div>
                    ))}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Next Button */}
          <button
            onClick={next}
            className="hidden md:flex flex-shrink-0 p-2 glass rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-all"
          >
            <FiChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center justify-center gap-2 mt-4">
          <button
            onClick={prev}
            className="p-2 glass rounded-full hover:bg-white/10 text-white/60 transition-all"
          >
            <FiChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-1">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentIndex === index
                    ? 'w-6 bg-gradient-to-r from-cyan-500 to-pink-500'
                    : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="p-2 glass rounded-full hover:bg-white/10 text-white/60 transition-all"
          >
            <FiChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Desktop Dots */}
        <div className="hidden md:flex items-center justify-center gap-2 mt-4">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentIndex === index
                  ? 'w-6 bg-gradient-to-r from-cyan-500 to-pink-500'
                  : 'bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TechCarousel

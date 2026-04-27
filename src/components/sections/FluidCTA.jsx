import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useCTA } from "../../context/CTAContext"

const FluidCTA = ({ 
  title = "Sẵn Sàng Xây Dựng Điều Gì Đó Tuyệt Vời?",
  description = "Trao quyền cho đội ngũ của bạn tập trung vào sáng tạo, không phải cấu hình. Xây dựng, ra mắt và phát triển các sản phẩm số xuất sắc một cách tự tin và nhanh chóng.",
  buttonText = "Liên Hệ",
  expandedTitle = "Liên Hệ",
  features = [
    {
      icon: "check",
      text: "Tìm hiểu cách Zuna có thể chuyển đổi doanh nghiệp của bạn với các giải pháp tùy chỉnh và tùy chọn giá linh hoạt."
    },
    {
      icon: "zap",
      text: "Trải nghiệm trực tiếp cách Zuna Platform tăng tốc triển khai và thúc đẩy kết quả."
    }
  ],
  testimonial = {
    quote: "Zuna trao quyền cho đội ngũ của chúng tôi di chuyển nhanh hơn và tung ra sản phẩm một cách tự tin.",
    name: "Sarah Chen",
    role: "Quản Lý Sản Phẩm",
    avatar: null
  }
}) => {
  const { isCTAVisible, openCTA, closeCTA } = useCTA()
  const [isExpanded, setIsExpanded] = useState(false)

  const handleExpand = () => {
    setIsExpanded(true)
    openCTA()
  }

  const handleClose = () => {
    setIsExpanded(false)
    closeCTA()
  }

  // Listen to external CTA trigger
  useEffect(() => {
    if (isCTAVisible && !isExpanded) {
      setIsExpanded(true)
    } else if (!isCTAVisible && isExpanded) {
      setIsExpanded(false)
    }
  }, [isCTAVisible, isExpanded])

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isExpanded])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted")
  }

  return (
    <>
      <div className="relative flex min-h-[60vh] flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-20">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-black to-cyan-900/30"></div>
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s' }}></div>
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-pink-600/20 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-600/20 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 flex flex-col items-center gap-4 sm:gap-6 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[90%] tracking-[-0.03em] text-white mix-blend-exclusion max-w-4xl">
            {title}
          </h1>

          <p className="text-base sm:text-lg md:text-xl leading-[160%] text-white/80 max-w-2xl px-4">
            {description}
          </p>

          <AnimatePresence initial={false}>
            {!isExpanded && (
              <motion.div className="inline-block relative">
                <motion.div
                  style={{
                    borderRadius: "100px",
                  }}
                  layout
                  layoutId="cta-card"
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 items-center justify-center transform-gpu will-change-transform"
                ></motion.div>
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  layout={false}
                  onClick={handleExpand}
                  className="h-15 px-6 sm:px-8 py-3 text-lg sm:text-xl font-regular text-white tracking-[-0.01em] relative"
                >
                  {buttonText}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-2">
            <motion.div
              layoutId="cta-card"
              transition={{ duration: 0.3 }}
              style={{
                borderRadius: "24px",
              }}
              layout
              className="relative flex h-full w-full overflow-y-auto bg-gradient-to-br from-cyan-600 via-purple-600 to-pink-600 transform-gpu will-change-transform"
            >
              <motion.div
                initial={{ opacity: 0, scale: 2 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                layout={false}
                transition={{ duration: 0.15, delay: 0.05 }}
                className="absolute h-full inset-0 overflow-hidden pointer-events-none"
                style={{
                  borderRadius: "24px",
                }}
              >
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-purple-600 to-pink-600 animate-gradient-shift"></div>
                  <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-cyan-400/40 rounded-full blur-[80px] animate-blob animation-delay-2000"></div>
                  <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-pink-400/40 rounded-full blur-[80px] animate-blob animation-delay-4000"></div>
                  <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-purple-400/40 rounded-full blur-[80px] animate-blob animation-delay-3000"></div>
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="relative z-10 flex flex-col lg:flex-row h-full w-full max-w-[1100px] mx-auto items-center p-6 sm:p-10 lg:p-16 gap-8 lg:gap-16"
              >
                <div className="flex-1 flex flex-col justify-center space-y-3 w-full">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-white leading-none tracking-[-0.03em]">
                    {expandedTitle}
                  </h2>

                  <div className="space-y-4 sm:space-y-6 pt-4">
                    {features.map((feature, index) => (
                      <div key={index} className="flex gap-3 sm:gap-4">
                        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/10 flex items-center justify-center">
                          {feature.icon === "check" ? (
                            <svg
                              className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg
                              className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                              />
                            </svg>
                          )}
                        </div>
                        <div>
                          <p className="text-sm sm:text-base text-white leading-[150%]">
                            {feature.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {testimonial && (
                    <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-white/20">
                      <p className="text-lg sm:text-xl lg:text-2xl text-white leading-[150%] mb-4">
                        {testimonial.quote}
                      </p>
                      <div className="flex items-center gap-3 sm:gap-4">
                        {testimonial.avatar ? (
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 flex items-center justify-center">
                            <span className="text-white font-semibold text-lg">
                              {testimonial.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div>
                          <p className="text-base sm:text-lg lg:text-xl text-white">{testimonial.name}</p>
                          <p className="text-sm sm:text-base text-white/70">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex-1 w-full">
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    {/* Name Field */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-[10px] font-mono font-normal text-white mb-2 tracking-[0.5px] uppercase"
                      >
                        FULL NAME *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-2.5 rounded-lg bg-white/10 border-0 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-sm h-10 backdrop-blur-sm"
                        placeholder="Nguyen Van A"
                      />
                    </div>

                    {/* Work Email Field */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-[10px] font-mono font-normal text-white mb-2 tracking-[0.5px] uppercase"
                      >
                        EMAIL CÔNG VIỆC *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-2.5 rounded-lg bg-white/10 border-0 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-sm h-10 backdrop-blur-sm"
                        placeholder="email@congty.com"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <label
                          htmlFor="website"
                          className="block text-[10px] font-mono font-normal text-white mb-2 tracking-[0.5px] uppercase"
                        >
                          WEBSITE CÔNG TY
                        </label>
                        <input
                          type="url"
                          id="website"
                          name="website"
                          className="w-full px-4 py-2.5 rounded-lg bg-white/10 border-0 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-sm h-10 backdrop-blur-sm"
                          placeholder="https://congty.com"
                        />
                      </div>
                      <div className="sm:w-32 w-full">
                        <label
                          htmlFor="company-size"
                          className="block text-[10px] font-mono font-normal text-white mb-2 tracking-[0.5px] uppercase"
                        >
                          QUY MÔ CÔNG TY
                        </label>
                        <select
                          id="company-size"
                          name="company-size"
                          className="w-full px-4 py-2.5 rounded-lg bg-white/10 border-0 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all appearance-none cursor-pointer text-sm h-10 backdrop-blur-sm"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='white' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 0.75rem center",
                            backgroundSize: "1rem",
                          }}
                        >
                          <option value="1-10">1-10</option>
                          <option value="11-50">11-50</option>
                          <option value="51-200">51-200</option>
                          <option value="201-500">201-500</option>
                          <option value="501+">501+</option>
                        </select>
                      </div>
                    </div>

                    {/* Message Field */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-[10px] font-mono font-normal text-white mb-2 tracking-[0.5px] uppercase"
                      >
                        CÒN GÌ KHÔNG?
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border-0 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all resize-none text-sm backdrop-blur-sm"
                        placeholder="Chia sẻ về dự án của bạn..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full px-8 py-2.5 rounded-full bg-white text-purple-600 font-medium hover:bg-white/90 transition-colors tracking-[-0.03em] h-10"
                    >
                      Gửi
                    </button>
                  </form>
                </div>
              </motion.div>

              {/* Close Button */}
              <motion.button
                onClick={handleClose}
                className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center text-white bg-white/10 transition-colors hover:bg-white/20 rounded-full backdrop-blur-sm"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export default FluidCTA


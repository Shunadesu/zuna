import { Link } from 'react-router-dom'

const AboutSection = () => {
  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Experienced <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">Full-Stack</span> Developers
          </h2>
          <p className="text-white/50 text-sm md:text-base max-w-xl mx-auto">
            Với hơn 200+ dự án đã hoàn thành, chúng tôi cung cấp dịch vụ phát triển web và ứng dụng nhanh chóng, đáng tin cậy.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
          {/* Project Card - Same height as right side (3 cards + 2 gaps) */}
          <div className="relative rounded-2xl overflow-hidden group lg:min-h-[300px]">
            <div className="aspect-square lg:aspect-auto lg:h-full relative">
              {/* Background Gradient */}
              <div 
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(139, 92, 246, 0.15) 50%, rgba(236, 72, 153, 0.15) 100%)',
                }}
              />
              
              {/* Grid Pattern Overlay */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-20"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M0 0h40v1H0zM0 20h40v1H0zM20 0v40h1V0z'/%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="mb-3">
                  <span className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                    200+
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  Dự Án Đã Triển Khai
                </h3>
                <p className="text-white/60 text-sm mb-5 max-w-sm">
                  Với hơn 200 dự án đã bàn giao, chúng tôi xây dựng các ứng dụng web và di động nhanh chóng, đáng tin cậy.
                </p>
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-all duration-300 w-fit group/btn"
                >
                  <span>Xem Portfolio</span>
                  <svg 
                    className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Animated Border */}
              <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-cyan-400/50 transition-colors duration-500" />
            </div>
          </div>

          {/* Features Grid - 3 cards with gap-5 */}
          <div className="grid grid-cols-1 gap-5">
            {/* Feature 1 */}
            <div className="group p-5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-400/30 transition-all duration-500 hover:bg-white/10">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 shrink-0">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-white mb-1.5 group-hover:text-cyan-400 transition-colors">
                    Phát Triển Full-Stack
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    Xây dựng giải pháp hoàn chỉnh từ thiết kế đến phát triển và AI/ML với hiệu suất cao.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group p-5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-400/30 transition-all duration-500 hover:bg-white/10">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-500/5 shrink-0">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-white mb-1.5 group-hover:text-purple-400 transition-colors">
                    Giao Hàng Nhanh Chóng
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    Thiết kế sáng tạo, có thể mở rộng, cân bằng giữa chất lượng và tốc độ.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group p-5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-pink-400/30 transition-all duration-500 hover:bg-white/10">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-gradient-to-br from-pink-500/20 to-pink-500/5 shrink-0">
                  <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-white mb-1.5 group-hover:text-pink-400 transition-colors">
                    Chỉnh Sửa Không Giới Hạn
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    Số lần chỉnh sửa không giới hạn và hỗ trợ chuyên dụng đến từng chi tiết.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection

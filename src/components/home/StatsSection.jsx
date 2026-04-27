import GlassCard from '../ui/GlassCard'

const StatsSection = ({ stats }) => {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Tác Động Của Chúng Tôi</h2>
          <p className="text-white/60 max-w-xl mx-auto">
            Những con số nói lên cam kết của chúng tôi về chất lượng và đổi mới
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6" style={{ minHeight: '120px' }}>
          <GlassCard className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">{stats.products}+</div>
            <div className="text-white/60 text-sm md:text-base">Sản Phẩm Cao Cấp</div>
          </GlassCard>
          <GlassCard className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">{stats.stories}+</div>
            <div className="text-white/60 text-sm md:text-base">Bài Viết Blog</div>
          </GlassCard>
          <GlassCard className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">{stats.portfolio}+</div>
            <div className="text-white/60 text-sm md:text-base">Dự Án Portfolio</div>
          </GlassCard>
          <GlassCard className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">{stats.users}+</div>
            <div className="text-white/60 text-sm md:text-base">Người Dùng Hoạt Động</div>
          </GlassCard>
        </div>
      </div>
    </section>
  )
}

export default StatsSection


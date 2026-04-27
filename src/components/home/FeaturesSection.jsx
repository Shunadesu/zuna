import { FiCode, FiLayers, FiZap, FiUsers } from 'react-icons/fi'
import GlassCard from '../ui/GlassCard'
import SectionHeader from '../ui/SectionHeader'

const features = [
  {
    icon: FiCode,
    title: 'Chất Lượng Cao',
    description: 'Các mẫu và tài nguyên được tuyển chọn bởi các nhà thiết kế và phát triển viên chuyên nghiệp',
    color: '#06b6d4'
  },
  {
    icon: FiZap,
    title: 'Giao Hàng Nhanh',
    description: 'Truy cập ngay lập tức vào tất cả sản phẩm số. Tải về và bắt đầu sử dụng ngay',
    color: '#a855f7'
  },
  {
    icon: FiLayers,
    title: 'Cập Nhật Thường Xuyên',
    description: 'Tất cả sản phẩm được cập nhật và cải tiến thường xuyên để luôn mới nhất',
    color: '#8b5cf6'
  },
  {
    icon: FiUsers,
    title: 'Hỗ Trợ Cộng Đồng',
    description: 'Tham gia cộng đồng sáng tạo năng động và nhận hỗ trợ khi bạn cần',
    color: '#ec4899'
  }
]

const FeaturesSection = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader
          title="Tại Sao Chọn Zuna Web"
          subtitle="Mọi thứ bạn cần để tạo ra những trải nghiệm số xuất sắc"
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


import { FiCode, FiLayers, FiZap, FiCheck, FiArrowRight } from 'react-icons/fi'
import { useCTA } from '../../context/CTAContext'
import SEO from '../../components/seo/SEO'
import AnimatedBackground from '../../components/backgrounds/AnimatedBackground'
import SectionHeader from '../../components/ui/SectionHeader'
import PricingCard from '../../components/ui/PricingCard'
import GlassCard from '../../components/ui/GlassCard'

const Pricing = () => {
  const { openCTA } = useCTA()

  const pricingPlans = [
    {
      plan: 'Basic',
      name: 'Gói Khởi Đầu',
      price: '$2,999',
      period: 'dự án',
      description: 'Hoàn hảo cho doanh nghiệp nhỏ và startup muốn thiết lập sự hiện diện trực tuyến',
      icon: FiCode,
      iconColor: '#06b6d4',
      features: [
        'Website lên đến 5 trang',
        'Thiết kế responsive (Điện thoại, Máy tính bảng, Desktop)',
        'Tối ưu SEO cơ bản',
        'Tích hợp biểu mẫu liên hệ',
        'Tích hợp mạng xã hội',
        'Thiết lập phân tích cơ bản',
        '1 tháng hỗ trợ miễn phí',
        'Giao mã nguồn',
        'Tài liệu cơ bản'
      ]
    },
    {
      plan: 'Professional',
      name: 'Gói Doanh Nghiệp',
      price: '$5,999',
      period: 'dự án',
      description: 'Lý tưởng cho doanh nghiệp đang phát triển cần các tính năng và chức năng nâng cao',
      icon: FiLayers,
      iconColor: '#8b5cf6',
      popular: true,
      features: [
        'Website lên đến 15 trang',
        'Thiết kế & thương hiệu tùy chỉnh',
        'Tối ưu SEO nâng cao',
        'Hệ thống quản lý nội dung (CMS)',
        'Tích hợp thương mại điện tử (lên đến 50 sản phẩm)',
        'Tích hợp cổng thanh toán',
        'Hệ thống xác thực người dùng',
        'Phân tích & báo cáo nâng cao',
        '3 tháng hỗ trợ miễn phí',
        'Giao mã nguồn',
        'Tài liệu toàn diện',
        'Tối ưu hiệu suất',
        'Tính năng bảo mật'
      ]
    },
    {
      plan: 'Enterprise',
      name: 'Gói Cao Cấp',
      price: 'Tùy chỉnh',
      period: null,
      description: 'Giải pháp tùy chỉnh cho doanh nghiệp lớn với yêu cầu phức tạp',
      icon: FiZap,
      iconColor: '#ec4899',
      features: [
        'Không giới hạn trang',
        'Thiết kế & phát triển tùy chỉnh hoàn toàn',
        'SEO cấp doanh nghiệp',
        'CMS nâng cao với tính năng tùy chỉnh',
        'Giải pháp thương mại điện tử đầy đủ',
        'Nhiều cổng thanh toán',
        'Quản lý người dùng nâng cao',
        'Tích hợp API',
        'Tích hợp bên thứ ba',
        'Tính năng & chức năng tùy chỉnh',
        '6 tháng hỗ trợ miễn phí',
        'Hỗ trợ & bảo trì ưu tiên',
        'Giao mã nguồn',
        'Tài liệu & đào tạo đầy đủ',
        'Tối ưu hiệu suất & bảo mật',
        'Kiến trúc có thể mở rộng',
        'Quản lý dự án chuyên dụng'
      ]
    }
  ]

  const additionalServices = [
    {
      title: 'Domain & Hosting',
      description: 'Chúng tôi có thể giúp bạn thiết lập và quản lý domain và hosting',
      price: 'Bắt đầu từ $99/năm'
    },
    {
      title: 'Bảo Trì & Cập Nhật',
      description: 'Bảo trì, cập nhật và hỗ trợ kỹ thuật liên tục',
      price: 'Bắt đầu từ $199/tháng'
    },
    {
      title: 'Dịch Vụ SEO',
      description: 'Tối ưu SEO nâng cao và chiến lược nội dung',
      price: 'Bắt đầu từ $299/tháng'
    },
    {
      title: 'Tính Năng Tùy Chỉnh',
      description: 'Các tính năng và chức năng tùy chỉnh bổ sung',
      price: 'Giá tùy chỉnh'
    }
  ]

  return (
    <>
      <SEO
        title="Báo Giá Phát Triển Web - Nhận Báo Giá"
        description="Chọn gói phát triển web hoàn hảo cho doanh nghiệp của bạn. Báo giá minh bạch cho các giải pháp Basic, Professional và Enterprise. Nhận báo giá miễn phí hôm nay."
        keywords="báo giá phát triển web, chi phí website, báo giá thiết kế web, giá website tùy chỉnh, gói phát triển web, nhận báo giá"
        url="https://zunaweb.com/pricing"
      />
      <div className="min-h-screen bg-black text-white relative py-32">
        <AnimatedBackground variant="purple" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Hero Section */}
        <SectionHeader
          title="Báo Giá Phát Triển Web"
          subtitle="Chọn gói hoàn hảo cho nhu cầu doanh nghiệp của bạn. Tất cả các gói bao gồm thiết kế hiện đại, bố cục responsive và phát triển chuyên nghiệp."
        />

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>

        {/* Additional Services */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="section-title">Dịch Vụ Bổ Sung</h2>
            <div className="h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full w-24 mx-auto mb-6" />
            <p className="section-subtitle">
              Nâng cao website của bạn với các dịch vụ bổ sung của chúng tôi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {additionalServices.map((service, index) => (
              <GlassCard key={index} className="group">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:via-purple-400 group-hover:to-pink-400 transition-all duration-300">
                      {service.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <span className="text-lg font-bold text-gradient">{service.price}</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="section-title">Câu Hỏi Thường Gặp</h2>
            <div className="h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full w-24 mx-auto mb-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                q: 'Giá bao gồm những gì?',
                a: 'Tất cả các gói bao gồm thiết kế, phát triển, bố cục responsive, SEO cơ bản và giao mã nguồn. Các gói cao hơn bao gồm các tính năng bổ sung như CMS, thương mại điện tử và hỗ trợ mở rộng.'
              },
              {
                q: 'Phát triển mất bao lâu?',
                a: 'Gói Basic: 2-3 tuần, Professional: 4-6 tuần, Enterprise: 8-12 tuần. Thời gian phụ thuộc vào độ phức tạp và yêu cầu của dự án.'
              },
              {
                q: 'Bạn có cung cấp hosting không?',
                a: 'Chúng tôi có thể giúp bạn thiết lập hosting và domain. Hosting có sẵn như một dịch vụ bổ sung bắt đầu từ $99/năm.'
              },
              {
                q: 'Tôi có thể nâng cấp gói sau này không?',
                a: 'Có, bạn có thể nâng cấp lên gói cao hơn bất kỳ lúc nào. Chúng tôi sẽ điều chỉnh giá tương ứng.'
              },
              {
                q: 'Bạn chấp nhận phương thức thanh toán nào?',
                a: 'Chúng tôi chấp nhận chuyển khoản ngân hàng, thẻ tín dụng và PayPal. Điều khoản thanh toán thường là 50% trả trước và 50% khi hoàn thành.'
              },
              {
                q: 'Bạn có cung cấp bảo trì sau khi ra mắt không?',
                a: 'Có, chúng tôi cung cấp các gói bảo trì và hỗ trợ bắt đầu từ $199/tháng. Tất cả các gói bao gồm hỗ trợ miễn phí trong thời gian quy định.'
              }
            ].map((faq, index) => (
              <GlassCard key={index}>
                <h3 className="text-lg font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                  {faq.q}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {faq.a}
                </p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section>
          <GlassCard className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Sẵn Sàng Bắt Đầu?</h2>
            <p className="text-xl mb-8 text-white/60 max-w-2xl mx-auto">
              Hãy thảo luận về dự án của bạn và tìm giải pháp hoàn hảo cho doanh nghiệp của bạn
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={openCTA}
                className="btn-primary inline-flex items-center gap-2"
              >
                Nhận Báo Giá Miễn Phí <FiArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={openCTA}
                className="btn-secondary inline-flex items-center gap-2"
              >
                Đặt Lịch Tư Vấn <FiCheck className="w-5 h-5" />
              </button>
            </div>
          </GlassCard>
        </section>
      </div>
    </div>
    </>
  )
}

export default Pricing


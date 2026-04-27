import { FiCode, FiLayers, FiZap, FiCheck, FiArrowRight } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useCTA } from '../../context/CTAContext'
import SEO from '../../components/seo/SEO'
import AnimatedBackground from '../../components/backgrounds/AnimatedBackground'
import GlassCard from '../../components/ui/GlassCard'
import PricingCard from '../../components/ui/PricingCard'

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
        'Thiết kế responsive',
        'Tối ưu SEO cơ bản',
        'Tích hợp biểu mẫu liên hệ',
        '1 tháng hỗ trợ miễn phí',
        'Giao mã nguồn'
      ]
    },
    {
      plan: 'Professional',
      name: 'Gói Doanh Nghiệp',
      price: '$5,999',
      period: 'dự án',
      description: 'Lý tưởng cho doanh nghiệp đang phát triển cần các tính năng nâng cao',
      icon: FiLayers,
      iconColor: '#8b5cf6',
      popular: true,
      features: [
        'Website lên đến 15 trang',
        'Thiết kế & thương hiệu tùy chỉnh',
        'Tối ưu SEO nâng cao',
        'Hệ thống quản lý nội dung (CMS)',
        'Tích hợp thương mại điện tử',
        '3 tháng hỗ trợ miễn phí',
        'Giao mã nguồn',
        'Tài liệu toàn diện'
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
        'Thiết kế & phát triển tùy chỉnh',
        'SEO cấp doanh nghiệp',
        'Giải pháp thương mại điện tử đầy đủ',
        'Tích hợp API',
        '6 tháng hỗ trợ ưu tiên',
        'Quản lý dự án chuyên dụng'
      ]
    }
  ]

  const additionalServices = [
    {
      title: 'Domain & Hosting',
      description: 'Thiết lập và quản lý domain và hosting',
      price: 'Từ $99/năm'
    },
    {
      title: 'Bảo Trì & Cập Nhật',
      description: 'Bảo trì và hỗ trợ kỹ thuật liên tục',
      price: 'Từ $199/tháng'
    },
    {
      title: 'Dịch Vụ SEO',
      description: 'Tối ưu SEO nâng cao và chiến lược nội dung',
      price: 'Từ $299/tháng'
    },
    {
      title: 'Tính Năng Tùy Chỉnh',
      description: 'Các tính năng bổ sung theo yêu cầu',
      price: 'Giá tùy chỉnh'
    }
  ]

  const faqs = [
    {
      q: 'Giá bao gồm những gì?',
      a: 'Tất cả các gói bao gồm thiết kế, phát triển, responsive và giao mã nguồn.'
    },
    {
      q: 'Phát triển mất bao lâu?',
      a: 'Basic: 2-3 tuần, Professional: 4-6 tuần, Enterprise: 8-12 tuần.'
    },
    {
      q: 'Có cung cấp hosting không?',
      a: 'Có, hosting bắt đầu từ $99/năm như một dịch vụ bổ sung.'
    },
    {
      q: 'Có thể nâng cấp gói sau này không?',
      a: 'Có, bạn có thể nâng cấp lên gói cao hơn bất kỳ lúc nào.'
    },
    {
      q: 'Chấp nhận thanh toán nào?',
      a: 'Chuyển khoản ngân hàng, thẻ tín dụng và PayPal.'
    },
    {
      q: 'Có bảo trì sau khi ra mắt không?',
      a: 'Có, các gói bảo trì bắt đầu từ $199/tháng.'
    }
  ]

  return (
    <>
      <SEO
        title="Báo Giá Phát Triển Web - Nhận Báo Giá"
        description="Chọn gói phát triển web hoàn hảo. Báo giá minh bạch cho Basic, Professional và Enterprise."
        keywords="báo giá phát triển web, chi phí website, giá thiết kế web"
        url="https://zuna.media/pricing"
      />
      
      <div className="min-h-screen bg-black text-white relative">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan-600/20 rounded-full blur-[150px]" />
        </div>

        <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10 pt-32 pb-12">
          {/* Header */}
          <div className="text-center mb-8 md:mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Báo Giá Phát Triển Web</h1>
            <p className="text-white/50 text-sm md:text-base max-w-xl mx-auto">
              Chọn gói hoàn hảo cho nhu cầu doanh nghiệp của bạn
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-12">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.plan}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <PricingCard {...plan} />
              </motion.div>
            ))}
          </div>

          {/* Additional Services */}
          <section className="mb-10 md:mb-12">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-bold mb-2">Dịch Vụ Bổ Sung</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {additionalServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  <GlassCard className="p-4 group">
                    <h3 className="text-base font-semibold mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-pink-400 transition-all">
                      {service.title}
                    </h3>
                    <p className="text-white/50 text-sm mb-2">{service.description}</p>
                    <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-400">
                      {service.price}
                    </span>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-10 md:mb-12">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-bold mb-2">Câu Hỏi Thường Gặp</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <GlassCard className="p-4">
                    <h3 className="text-sm font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400">
                      {faq.q}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">{faq.a}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <GlassCard className="p-6 md:p-8 inline-block">
              <h2 className="text-xl md:text-2xl font-bold mb-2">Sẵn Sàng Bắt Đầu?</h2>
              <p className="text-white/50 text-sm mb-4 max-w-md mx-auto">
                Thảo luận về dự án và tìm giải pháp hoàn hảo cho doanh nghiệp
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button 
                  onClick={openCTA}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  Nhận Báo Giá <FiArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={openCTA}
                  className="btn-secondary inline-flex items-center gap-2"
                >
                  <FiCheck className="w-4 h-4" /> Đặt Lịch Tư Vấn
                </button>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default Pricing

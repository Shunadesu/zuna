import { FiCheck, FiStar } from 'react-icons/fi'
import { useCTA } from '../../context/CTAContext'
import GlassCard from './GlassCard'
import GradientButton from './GradientButton'

const PricingCard = ({ 
  plan, 
  name, 
  price, 
  period = 'month',
  description, 
  features, 
  popular = false,
  icon: Icon,
  iconColor 
}) => {
  const { openCTA } = useCTA()

  return (
    <GlassCard className={`relative ${popular ? 'border-2 border-purple-500/50' : ''}`}>
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="px-4 py-1 rounded-full glass text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 flex items-center gap-1">
            <FiStar className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            Phổ Biến Nhất
          </div>
        </div>
      )}

      <div className="text-center mb-8">
        {Icon && (
          <div 
            className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${iconColor || '#06b6d4'}20, ${iconColor || '#8b5cf6'}20)`
            }}
          >
            <Icon 
              className="w-8 h-8" 
              style={{ color: iconColor || '#06b6d4' }}
            />
          </div>
        )}
        <div className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 uppercase tracking-wider mb-2">
          {plan}
        </div>
        <h3 className="text-3xl font-bold mb-2">{name}</h3>
        <p className="text-white/60 text-sm mb-6">{description}</p>
        <div className="flex items-baseline justify-center gap-2">
          <span className="text-5xl font-bold text-gradient">{price}</span>
          {period && (
            <span className="text-white/60 text-lg">/{period}</span>
          )}
        </div>
      </div>

      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="mt-1 flex-shrink-0">
              <FiCheck className="w-5 h-5 text-green-400" />
            </div>
            <span className="text-white/80 text-sm leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>

      <GradientButton
        onClick={openCTA}
        variant={popular ? 'primary' : 'secondary'}
        className="w-full"
        icon={false}
      >
        Bắt Đầu Ngay
      </GradientButton>
    </GlassCard>
  )
}

export default PricingCard


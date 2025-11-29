import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'

const GradientButton = ({ 
  children, 
  to, 
  onClick, 
  variant = 'primary',
  className = '',
  icon = true 
}) => {
  const baseStyles = {
    primary: {
      background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)',
      boxShadow: '0 0 40px -10px rgba(139, 92, 246, 0.5)'
    },
    secondary: {
      border: '1px solid rgba(139, 92, 246, 0.3)',
      background: 'transparent'
    }
  }

  const hoverStyles = {
    primary: {
      background: 'linear-gradient(135deg, #22d3ee 0%, #a855f7 50%, #f472b6 100%)',
      boxShadow: '0 0 60px -10px rgba(139, 92, 246, 0.8)'
    },
    secondary: {
      background: 'linear-gradient(to-r, rgba(6, 182, 212, 0.1), rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))',
      borderColor: 'rgba(139, 92, 246, 0.5)',
      boxShadow: '0 0 30px -5px rgba(139, 92, 246, 0.4)'
    }
  }

  const buttonClasses = `group relative px-6 py-3 rounded-full font-semibold text-base overflow-hidden transition-all hover:scale-105 text-white ${className}`

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && variant === 'primary' && (
          <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        )}
      </span>
      {variant === 'primary' && (
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
          style={hoverStyles.primary}
        />
      )}
    </>
  )

  if (to) {
    return (
      <Link
        to={to}
        className={buttonClasses}
        style={baseStyles[variant]}
        onMouseEnter={(e) => {
          Object.assign(e.currentTarget.style, hoverStyles[variant])
        }}
        onMouseLeave={(e) => {
          Object.assign(e.currentTarget.style, baseStyles[variant])
        }}
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      onClick={onClick}
      className={buttonClasses}
      style={baseStyles[variant]}
      onMouseEnter={(e) => {
        Object.assign(e.currentTarget.style, hoverStyles[variant])
      }}
      onMouseLeave={(e) => {
        Object.assign(e.currentTarget.style, baseStyles[variant])
      }}
    >
      {content}
    </button>
  )
}

export default GradientButton


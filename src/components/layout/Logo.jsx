import { Link } from 'react-router-dom'

const Logo = ({ 
  className = '', 
  size = 'text-2xl',
  showLink = true,
  onClick
}) => {
  const logoContent = (
    <span className={`font-bold tracking-tighter text-white transition-all duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-cyan-400 hover:via-purple-400 hover:to-pink-400 group ${size} ${className}`}>
      Zuna<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 transition-all duration-300 group-hover:from-cyan-300 group-hover:via-purple-300 group-hover:to-pink-300">.</span>
    </span>
  )

  if (!showLink) {
    return (
      <div onClick={onClick} className={onClick ? 'cursor-pointer' : ''}>
        {logoContent}
      </div>
    )
  }

  return (
    <Link 
      to="/" 
      className={`relative z-50 ${className}`}
      onClick={onClick}
    >
      {logoContent}
    </Link>
  )
}

export default Logo


const GlassCard = ({ children, className = '', hoverEffect = true }) => {
  return (
    <div
      className={`
        glass rounded-3xl p-8 relative overflow-hidden group
        ${hoverEffect ? 'glass-hover hover:-translate-y-1' : ''}
        ${className}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      {children}
    </div>
  )
}

export default GlassCard


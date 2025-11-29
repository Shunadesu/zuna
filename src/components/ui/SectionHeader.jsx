const SectionHeader = ({ title, subtitle, showDivider = true }) => {
  return (
    <div className="text-center mb-20">
      <h2 className="section-title">{title}</h2>
      {showDivider && (
        <div className="h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full w-24 mx-auto mb-6" />
      )}
      {subtitle && (
        <p className="section-subtitle">{subtitle}</p>
      )}
    </div>
  )
}

export default SectionHeader


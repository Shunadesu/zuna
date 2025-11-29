const AnimatedBackground = ({ variant = 'default' }) => {
  const variants = {
    default: {
      blobs: [
        { color: 'bg-blue-500/30', position: 'top-[-10%] left-[-10%]', size: 'w-[50vw] h-[50vw]', delay: '0s' },
        { color: 'bg-purple-500/30', position: 'top-[20%] right-[-10%]', size: 'w-[40vw] h-[40vw]', delay: '2s' },
        { color: 'bg-indigo-500/30', position: 'bottom-[-10%] left-[20%]', size: 'w-[45vw] h-[45vw]', delay: '4s' },
      ]
    },
    blue: {
      blobs: [
        { color: 'bg-blue-600/20', position: 'top-[-10%] left-[-10%]', size: 'w-[50vw] h-[50vw]', delay: '0s' },
        { color: 'bg-cyan-600/20', position: 'top-[20%] right-[-10%]', size: 'w-[40vw] h-[40vw]', delay: '2s' },
        { color: 'bg-blue-500/20', position: 'bottom-[-10%] left-[20%]', size: 'w-[45vw] h-[45vw]', delay: '4s' },
      ]
    },
    purple: {
      blobs: [
        { color: 'bg-purple-600/20', position: 'top-[-10%] left-[-10%]', size: 'w-[50vw] h-[50vw]', delay: '0s' },
        { color: 'bg-pink-600/20', position: 'top-[20%] right-[-10%]', size: 'w-[40vw] h-[40vw]', delay: '2s' },
        { color: 'bg-indigo-600/20', position: 'bottom-[-10%] left-[20%]', size: 'w-[45vw] h-[45vw]', delay: '4s' },
      ]
    },
    gradient: {
      blobs: [
        { color: 'bg-gradient-to-br from-blue-600/20 to-purple-600/20', position: 'top-[-10%] left-[-10%]', size: 'w-[50vw] h-[50vw]', delay: '0s' },
        { color: 'bg-gradient-to-br from-purple-600/20 to-pink-600/20', position: 'top-[20%] right-[-10%]', size: 'w-[40vw] h-[40vw]', delay: '2s' },
        { color: 'bg-gradient-to-br from-indigo-600/20 to-blue-600/20', position: 'bottom-[-10%] left-[20%]', size: 'w-[45vw] h-[45vw]', delay: '4s' },
      ]
    }
  }

  const config = variants[variant] || variants.default

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {config.blobs.map((blob, index) => (
        <div
          key={index}
          className={`absolute ${blob.position} ${blob.size} ${blob.color} rounded-full blur-[120px] animate-blob`}
          style={{ animationDelay: blob.delay }}
        />
      ))}
      {/* Subtle gradient overlay - không che mất hiệu ứng */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />
    </div>
  )
}

export default AnimatedBackground


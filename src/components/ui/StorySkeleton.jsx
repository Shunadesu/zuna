import { motion } from 'framer-motion'

const StorySkeleton = ({ count = 6 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.3 }}
          className="glass rounded-2xl p-4 overflow-hidden"
        >
          {/* Image */}
          <div className="w-full bg-white/5 rounded-xl animate-pulse mb-4" style={{ aspectRatio: '16/9' }} />
          
          {/* Meta */}
          <div className="flex gap-3 mb-3">
            <div className="h-3 bg-white/5 rounded animate-pulse w-16" />
            <div className="h-3 bg-white/5 rounded animate-pulse w-20" />
          </div>
          
          {/* Title */}
          <div className="h-5 bg-white/10 rounded animate-pulse mb-2 w-3/4" />
          
          {/* Excerpt */}
          <div className="space-y-1.5 mb-4">
            <div className="h-3 bg-white/5 rounded animate-pulse w-full" />
            <div className="h-3 bg-white/5 rounded animate-pulse w-5/6" />
          </div>
          
          {/* Link */}
          <div className="h-3 bg-white/5 rounded animate-pulse w-24" />
        </motion.div>
      ))}
    </>
  )
}

export default StorySkeleton

import { motion } from 'framer-motion'

const SectionSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header Skeleton */}
      <div className="text-center mb-8">
        <div className="h-8 bg-white/10 rounded animate-pulse w-64 mx-auto mb-4" />
        <div className="h-1 w-24 bg-white/5 rounded animate-pulse mx-auto mb-4" />
        <div className="h-4 bg-white/5 rounded animate-pulse w-96 max-w-full mx-auto" />
      </div>

      {/* Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="glass rounded-2xl p-4 md:p-6"
          >
            <div className="w-16 h-16 bg-white/10 rounded-full animate-pulse mx-auto mb-4" />
            <div className="h-5 bg-white/10 rounded animate-pulse w-3/4 mx-auto mb-3" />
            <div className="h-4 bg-white/5 rounded animate-pulse w-full mb-2" />
            <div className="h-4 bg-white/5 rounded animate-pulse w-5/6 mx-auto" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default SectionSkeleton

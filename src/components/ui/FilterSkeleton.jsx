import { motion } from 'framer-motion'

const FilterSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass rounded-2xl p-4 mb-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {/* Search Skeleton */}
        <div className="relative">
          <div className="h-11 bg-white/10 rounded-lg animate-pulse" />
        </div>

        {/* Category Skeleton */}
        <div className="h-11 bg-white/10 rounded-lg animate-pulse" />

        {/* Price Range Skeleton */}
        <div className="flex gap-2">
          <div className="flex-1 h-11 bg-white/10 rounded-lg animate-pulse" />
          <div className="flex-1 h-11 bg-white/10 rounded-lg animate-pulse" />
        </div>

        {/* Sort Skeleton */}
        <div className="h-11 bg-white/10 rounded-lg animate-pulse" />
      </div>
    </motion.div>
  )
}

export default FilterSkeleton

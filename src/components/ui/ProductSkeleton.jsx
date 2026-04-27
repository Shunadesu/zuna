import { motion } from 'framer-motion'

const ProductSkeleton = ({ count = 8 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.3 }}
          className="glass rounded-2xl p-3 overflow-hidden"
        >
          {/* Image Skeleton */}
          <div className="relative overflow-hidden rounded-xl mb-3" style={{ aspectRatio: '16/9' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 animate-pulse" />
          </div>
          
          {/* Title Skeleton */}
          <div className="h-4 bg-white/10 rounded animate-pulse mb-2 w-3/4" />
          
          {/* Description Skeleton */}
          <div className="space-y-1.5 mb-3">
            <div className="h-3 bg-white/5 rounded animate-pulse w-full" />
            <div className="h-3 bg-white/5 rounded animate-pulse w-2/3" />
          </div>
          
          {/* Footer Skeleton */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-white/10 rounded animate-pulse" />
              <div className="h-4 bg-white/10 rounded animate-pulse w-12" />
            </div>
            <div className="h-5 bg-white/10 rounded animate-pulse w-16" />
          </div>
        </motion.div>
      ))}
    </>
  )
}

export default ProductSkeleton

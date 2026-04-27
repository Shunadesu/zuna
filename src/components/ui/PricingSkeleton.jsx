import { motion } from 'framer-motion'

const PricingSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-10"
    >
      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="glass rounded-2xl p-6"
          >
            <div className="w-12 h-12 bg-white/10 rounded-xl animate-pulse mb-4" />
            <div className="h-6 bg-white/10 rounded animate-pulse w-24 mb-2" />
            <div className="h-8 bg-white/10 rounded animate-pulse w-32 mb-4" />
            <div className="h-3 bg-white/5 rounded animate-pulse w-full mb-2" />
            <div className="h-3 bg-white/5 rounded animate-pulse w-4/5 mb-6" />
            <div className="space-y-2 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-white/5 rounded-full animate-pulse" />
                  <div className="h-3 bg-white/5 rounded animate-pulse flex-1" />
                </div>
              ))}
            </div>
            <div className="h-12 bg-white/10 rounded-full animate-pulse" />
          </motion.div>
        ))}
      </div>

      {/* Additional Services */}
      <div>
        <div className="h-6 bg-white/10 rounded animate-pulse w-48 mx-auto mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05, duration: 0.3 }}
              className="glass rounded-2xl p-4"
            >
              <div className="h-5 bg-white/10 rounded animate-pulse w-1/2 mb-3" />
              <div className="h-3 bg-white/5 rounded animate-pulse w-full mb-2" />
              <div className="h-3 bg-white/5 rounded animate-pulse w-3/4 mb-4" />
              <div className="h-5 bg-white/10 rounded animate-pulse w-24" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default PricingSkeleton

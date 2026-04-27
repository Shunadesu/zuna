import { motion } from 'framer-motion'

const CardSkeleton = ({ count = 3 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.3 }}
          className="glass rounded-2xl p-4 md:p-6"
        >
          <div className="w-full h-48 bg-white/5 rounded-xl animate-pulse mb-4" />
          <div className="h-6 bg-white/10 rounded animate-pulse mb-3 w-3/4" />
          <div className="h-4 bg-white/5 rounded animate-pulse mb-2 w-full" />
          <div className="h-4 bg-white/5 rounded animate-pulse w-2/3" />
        </motion.div>
      ))}
    </>
  )
}

export default CardSkeleton

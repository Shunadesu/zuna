import { Link } from 'react-router-dom'
import { FiStar, FiTrendingUp } from 'react-icons/fi'
import { memo } from 'react'
import GlassCard from './GlassCard'

const ProductCard = memo(({ product }) => (
  <Link
    to={`/products/${product.slug}`}
    className="group"
  >
    <GlassCard>
      <div className="relative h-48 mb-6 overflow-hidden rounded-2xl">
        {product.coverImage ? (
          <img
            src={product.coverImage}
            alt={product.title}
            loading="lazy"
            width={400}
            height={192}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            style={{ aspectRatio: '16/9' }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20" style={{ aspectRatio: '16/9' }}>
            <FiTrendingUp className="w-16 h-16 text-white/50" />
          </div>
        )}
        {product.featured && (
          <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-xs font-semibold text-white">
            Nổi Bật
          </div>
        )}
      </div>
      <h3 className="text-2xl font-semibold mb-4 group-hover:translate-x-2 transition-transform duration-500">
        {product.title}
      </h3>
      <p className="text-white/60 text-sm mb-6 line-clamp-2 leading-relaxed">
        {product.shortDescription || product.description}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <FiStar className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="ml-1 text-sm font-semibold text-white">
              {product.rating?.average?.toFixed(1) || '0.0'}
            </span>
          </div>
          <span className="text-white/40 text-sm">
            ({product.rating?.count || 0})
          </span>
        </div>
        <div className="text-lg font-bold text-gradient">
          ${product.salePrice || product.price}
        </div>
      </div>
    </GlassCard>
  </Link>
))
ProductCard.displayName = 'ProductCard'

export default ProductCard


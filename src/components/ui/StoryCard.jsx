import { Link } from 'react-router-dom'
import { memo } from 'react'
import GlassCard from './GlassCard'

const StoryCard = memo(({ story }) => (
  <Link
    to={`/stories/${story.slug}`}
    className="group"
  >
    <GlassCard>
      {story.coverImage && (
        <div className="h-48 mb-6 overflow-hidden rounded-2xl">
          <img
            src={story.coverImage}
            alt={story.title}
            loading="lazy"
            width={400}
            height={192}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            style={{ aspectRatio: '16/9' }}
          />
        </div>
      )}
      <div className="text-sm text-white/50 mb-4 block uppercase tracking-wider">
        {story.category} • {story.readTime} min read
      </div>
      <h3 className="text-2xl font-semibold mb-4 group-hover:translate-x-2 transition-transform duration-500">
        {story.title}
      </h3>
      <p className="text-white/60 text-sm line-clamp-3 leading-relaxed">
        {story.excerpt || story.content}
      </p>
      <div className="mt-8 flex items-center gap-2 text-sm font-medium text-white/40 transition-all group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:via-purple-400 group-hover:to-pink-400">
        Read more <div className="w-4 h-[1px] bg-current transition-all group-hover:w-8 group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:via-purple-400 group-hover:to-pink-400" />
      </div>
    </GlassCard>
  </Link>
))
StoryCard.displayName = 'StoryCard'

export default StoryCard


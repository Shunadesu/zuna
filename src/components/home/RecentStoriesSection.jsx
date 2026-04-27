import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import StoryCard from '../ui/StoryCard'
import SectionHeader from '../ui/SectionHeader'

const RecentStoriesSection = ({ stories }) => {
  if (!stories || stories.length === 0) return null

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-indigo-900/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader
          title="Bài Viết Mới Nhất"
          subtitle="Thông tin chi tiết, cập nhật và câu chuyện từ đội ngũ của chúng tôi"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stories.map((story) => (
            <StoryCard key={story._id} story={story} />
          ))}
        </div>
        
        <div className="text-center">
          <Link 
            to="/stories" 
            className="px-8 py-4 glass rounded-full font-semibold text-lg text-white transition-all hover:scale-105 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:via-purple-500/20 hover:to-pink-500/20 hover:border-purple-500/50 hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.4)] inline-flex items-center gap-2"
            style={{
              border: '1px solid rgba(139, 92, 246, 0.3)'
            }}
          >
            Đọc Tất Cả Bài Viết <FiArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default RecentStoriesSection


import { useEffect, useState } from 'react'
import useDataStore from '../../store/dataStore'
import HeroSection from '../../components/home/HeroSection'
import StatsSection from '../../components/home/StatsSection'
import FeaturesSection from '../../components/home/FeaturesSection'
import FeaturedProductsSection from '../../components/home/FeaturedProductsSection'
import RecentStoriesSection from '../../components/home/RecentStoriesSection'
import CTASection from '../../components/home/CTASection'

const Home = () => {
  const [stats, setStats] = useState({
    products: 0,
    stories: 0,
    portfolio: 0,
    users: 0
  })
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [recentStories, setRecentStories] = useState([])
  
  // Use Zustand store for cached data
  const { 
    fetchFeaturedProducts, 
    fetchRecentStories, 
    fetchStats 
  } = useDataStore()

  useEffect(() => {
    // Fetch stats and featured content using cached store
    const fetchData = async () => {
      try {
        const [products, stories, statsData] = await Promise.all([
          fetchFeaturedProducts(),
          fetchRecentStories(),
          fetchStats()
        ])
        
        setFeaturedProducts(products || [])
        setRecentStories(stories || [])
        
        // Update stats
        if (statsData) {
          setStats({
            products: statsData.totalProducts || products?.length || 0,
            stories: statsData.totalStories || stories?.length || 0,
            portfolio: statsData.totalPortfolio || 0,
            users: statsData.totalUsers || 0
          })
        } else {
          setStats({
            products: products?.length || 0,
            stories: stories?.length || 0,
            portfolio: 0,
            users: 0
          })
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    
    fetchData()
  }, [fetchFeaturedProducts, fetchRecentStories, fetchStats])

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 relative overflow-hidden">
      <HeroSection />
      <StatsSection stats={stats} />
      <FeaturesSection />
      <FeaturedProductsSection products={featuredProducts} />
      <RecentStoriesSection stories={recentStories} />
      <CTASection />
    </div>
  )
}

export default Home

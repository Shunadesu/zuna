import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import api from '../utils/api'

// Cache TTL: 5 phút (300000ms)
const CACHE_TTL = 5 * 60 * 1000

const useDataStore = create(
  persist(
    (set, get) => ({
      // Featured Products Cache
      featuredProducts: null,
      featuredProductsTimestamp: null,
      
      // Recent Stories Cache
      recentStories: null,
      recentStoriesTimestamp: null,
      
      // Portfolio Cache
      portfolio: null,
      portfolioTimestamp: null,
      
      // Stats Cache
      stats: null,
      statsTimestamp: null,
      
      // All Products Cache (for Products page)
      allProducts: null,
      allProductsTimestamp: null,
      allProductsFilters: null,
      
      // All Stories Cache
      allStories: null,
      allStoriesTimestamp: null,
      allStoriesPagination: null,
      
      // Services Cache
      services: null,
      servicesTimestamp: null,
      
      // Team, Testimonials, Clients Cache
      team: null,
      teamTimestamp: null,
      testimonials: null,
      testimonialsTimestamp: null,
      clients: null,
      clientsTimestamp: null,
      
      // Helper function to check if cache is valid
      isCacheValid: (timestamp) => {
        if (!timestamp) return false
        return Date.now() - timestamp < CACHE_TTL
      },
      
      // Fetch Featured Products with cache
      fetchFeaturedProducts: async (forceRefresh = false) => {
        const { featuredProducts, featuredProductsTimestamp, isCacheValid } = get()
        
        if (!forceRefresh && featuredProducts && isCacheValid(featuredProductsTimestamp)) {
          return featuredProducts
        }
        
        try {
          const response = await api.get('/products?limit=6&featured=true')
          const data = response.data.data || []
          set({
            featuredProducts: data,
            featuredProductsTimestamp: Date.now()
          })
          return data
        } catch (error) {
          console.error('Error fetching featured products:', error)
          // Return cached data if available, even if expired
          return featuredProducts || []
        }
      },
      
      // Fetch Recent Stories with cache
      fetchRecentStories: async (forceRefresh = false) => {
        const { recentStories, recentStoriesTimestamp, isCacheValid } = get()
        
        if (!forceRefresh && recentStories && isCacheValid(recentStoriesTimestamp)) {
          return recentStories
        }
        
        try {
          const response = await api.get('/stories?limit=3')
          const data = response.data.data || []
          set({
            recentStories: data,
            recentStoriesTimestamp: Date.now()
          })
          return data
        } catch (error) {
          console.error('Error fetching recent stories:', error)
          return recentStories || []
        }
      },
      
      // Fetch Portfolio with cache
      fetchPortfolio: async (forceRefresh = false) => {
        const { portfolio, portfolioTimestamp, isCacheValid } = get()
        
        if (!forceRefresh && portfolio && isCacheValid(portfolioTimestamp)) {
          return portfolio
        }
        
        try {
          const response = await api.get('/portfolio')
          const data = response.data.data || []
          set({
            portfolio: data,
            portfolioTimestamp: Date.now()
          })
          return data
        } catch (error) {
          console.error('Error fetching portfolio:', error)
          return portfolio || []
        }
      },
      
      // Fetch Stats with cache
      fetchStats: async (forceRefresh = false) => {
        const { stats, statsTimestamp, isCacheValid } = get()
        
        if (!forceRefresh && stats && isCacheValid(statsTimestamp)) {
          return stats
        }
        
        try {
          const response = await api.get('/analytics/stats').catch(() => null)
          const data = response?.data?.data || null
          set({
            stats: data,
            statsTimestamp: Date.now()
          })
          return data
        } catch (error) {
          console.error('Error fetching stats:', error)
          return stats || null
        }
      },
      
      // Fetch All Products with cache (for Products page)
      fetchAllProducts: async (filters = {}, pagination = { page: 1, limit: 12 }, forceRefresh = false) => {
        const { allProducts, allProductsTimestamp, allProductsFilters, isCacheValid } = get()
        
        // Check if filters changed
        const filtersChanged = JSON.stringify(filters) !== JSON.stringify(allProductsFilters)
        
        if (!forceRefresh && !filtersChanged && allProducts && isCacheValid(allProductsTimestamp)) {
          return allProducts
        }
        
        try {
          const params = new URLSearchParams({
            page: pagination.page,
            limit: pagination.limit,
            ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v))
          })
          
          const response = await api.get(`/products?${params}`)
          const data = {
            products: response.data.data || [],
            pagination: response.data.pagination || {}
          }
          
          set({
            allProducts: data,
            allProductsTimestamp: Date.now(),
            allProductsFilters: filters
          })
          return data
        } catch (error) {
          console.error('Error fetching all products:', error)
          return allProducts || { products: [], pagination: {} }
        }
      },
      
      // Fetch All Stories with cache
      fetchAllStories: async (pagination = { page: 1, limit: 12 }, forceRefresh = false) => {
        const { allStories, allStoriesTimestamp, allStoriesPagination, isCacheValid } = get()
        
        // Check if pagination changed
        const paginationChanged = JSON.stringify(pagination) !== JSON.stringify(allStoriesPagination)
        
        if (!forceRefresh && !paginationChanged && allStories && isCacheValid(allStoriesTimestamp)) {
          return allStories
        }
        
        try {
          const response = await api.get(`/stories?page=${pagination.page}&limit=${pagination.limit}`)
          const data = {
            stories: response.data.data || [],
            pagination: response.data.pagination || {}
          }
          
          set({
            allStories: data,
            allStoriesTimestamp: Date.now(),
            allStoriesPagination: pagination
          })
          return data
        } catch (error) {
          console.error('Error fetching all stories:', error)
          return allStories || { stories: [], pagination: {} }
        }
      },
      
      // Fetch Services with cache
      fetchServices: async (forceRefresh = false) => {
        const { services, servicesTimestamp, isCacheValid } = get()
        
        if (!forceRefresh && services && isCacheValid(servicesTimestamp)) {
          return services
        }
        
        try {
          const response = await api.get('/services')
          const data = response.data.data || []
          set({
            services: data,
            servicesTimestamp: Date.now()
          })
          return data
        } catch (error) {
          console.error('Error fetching services:', error)
          return services || []
        }
      },
      
      // Fetch About page data with cache
      fetchAboutData: async (forceRefresh = false) => {
        const { team, teamTimestamp, testimonials, testimonialsTimestamp, clients, clientsTimestamp, isCacheValid } = get()
        
        const needsRefresh = forceRefresh || 
          !team || !isCacheValid(teamTimestamp) ||
          !testimonials || !isCacheValid(testimonialsTimestamp) ||
          !clients || !isCacheValid(clientsTimestamp)
        
        if (!needsRefresh) {
          return { team, testimonials, clients }
        }
        
        try {
          const [teamRes, testimonialsRes, clientsRes] = await Promise.all([
            api.get('/team'),
            api.get('/testimonials'),
            api.get('/clients')
          ])
          
          const data = {
            team: teamRes.data.data || [],
            testimonials: testimonialsRes.data.data || [],
            clients: clientsRes.data.data || []
          }
          
          set({
            team: data.team,
            teamTimestamp: Date.now(),
            testimonials: data.testimonials,
            testimonialsTimestamp: Date.now(),
            clients: data.clients,
            clientsTimestamp: Date.now()
          })
          
          return data
        } catch (error) {
          console.error('Error fetching about data:', error)
          return {
            team: team || [],
            testimonials: testimonials || [],
            clients: clients || []
          }
        }
      },
      
      // Invalidate specific cache
      invalidateCache: (cacheKey) => {
        const keys = {
          featuredProducts: ['featuredProducts', 'featuredProductsTimestamp'],
          recentStories: ['recentStories', 'recentStoriesTimestamp'],
          portfolio: ['portfolio', 'portfolioTimestamp'],
          stats: ['stats', 'statsTimestamp'],
          allProducts: ['allProducts', 'allProductsTimestamp', 'allProductsFilters'],
          allStories: ['allStories', 'allStoriesTimestamp', 'allStoriesPagination'],
          services: ['services', 'servicesTimestamp'],
          about: ['team', 'teamTimestamp', 'testimonials', 'testimonialsTimestamp', 'clients', 'clientsTimestamp']
        }
        
        if (keys[cacheKey]) {
          const updates = {}
          keys[cacheKey].forEach(key => {
            updates[key] = null
          })
          set(updates)
        }
      },
      
      // Clear all cache
      clearAllCache: () => {
        set({
          featuredProducts: null,
          featuredProductsTimestamp: null,
          recentStories: null,
          recentStoriesTimestamp: null,
          portfolio: null,
          portfolioTimestamp: null,
          stats: null,
          statsTimestamp: null,
          allProducts: null,
          allProductsTimestamp: null,
          allProductsFilters: null,
          allStories: null,
          allStoriesTimestamp: null,
          allStoriesPagination: null,
          services: null,
          servicesTimestamp: null,
          team: null,
          teamTimestamp: null,
          testimonials: null,
          testimonialsTimestamp: null,
          clients: null,
          clientsTimestamp: null
        })
      }
    }),
    {
      name: 'data-cache-storage',
      storage: createJSONStorage(() => localStorage),
      // Only persist cache data, not functions
      partialize: (state) => ({
        featuredProducts: state.featuredProducts,
        featuredProductsTimestamp: state.featuredProductsTimestamp,
        recentStories: state.recentStories,
        recentStoriesTimestamp: state.recentStoriesTimestamp,
        portfolio: state.portfolio,
        portfolioTimestamp: state.portfolioTimestamp,
        stats: state.stats,
        statsTimestamp: state.statsTimestamp,
        allProducts: state.allProducts,
        allProductsTimestamp: state.allProductsTimestamp,
        allProductsFilters: state.allProductsFilters,
        allStories: state.allStories,
        allStoriesTimestamp: state.allStoriesTimestamp,
        allStoriesPagination: state.allStoriesPagination,
        services: state.services,
        servicesTimestamp: state.servicesTimestamp,
        team: state.team,
        teamTimestamp: state.teamTimestamp,
        testimonials: state.testimonials,
        testimonialsTimestamp: state.testimonialsTimestamp,
        clients: state.clients,
        clientsTimestamp: state.clientsTimestamp
      })
    }
  )
)

export default useDataStore


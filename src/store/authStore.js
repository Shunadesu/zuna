import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import api from '../utils/api'

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      login: async (email, password) => {
        try {
          const response = await api.post('/auth/login', { email, password })
          const { token, user } = response.data.data
          
          set({
            user,
            token,
            isAuthenticated: true
          })
          
          // Set token in axios default headers
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`
          
          return { success: true }
        } catch (error) {
          return {
            success: false,
            error: error.response?.data?.error?.message || 'Login failed'
          }
        }
      },
      
      register: async (username, email, password) => {
        try {
          const response = await api.post('/auth/register', {
            username,
            email,
            password
          })
          const { token, user } = response.data.data
          
          set({
            user,
            token,
            isAuthenticated: true
          })
          
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`
          
          return { success: true }
        } catch (error) {
          return {
            success: false,
            error: error.response?.data?.error?.message || 'Registration failed'
          }
        }
      },
      
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false
        })
        delete api.defaults.headers.common['Authorization']
      },
      
      checkAuth: async () => {
        const { token } = get()
        if (!token) return false
        
        try {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`
          const response = await api.get('/auth/me')
          set({
            user: response.data.data,
            isAuthenticated: true
          })
          return true
        } catch (error) {
          get().logout()
          return false
        }
      },
      
      updateUser: (userData) => {
        set({ user: { ...get().user, ...userData } })
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token, user: state.user })
    }
  )
)

export default useAuthStore


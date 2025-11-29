import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createJSONStorage } from 'zustand/middleware'

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product) => {
        const items = get().items
        const existingItem = items.find(item => item._id === product._id)
        
        if (existingItem) {
          // Item already in cart
          return
        }
        
        set({
          items: [...items, {
            _id: product._id,
            title: product.title,
            price: product.salePrice || product.price,
            coverImage: product.coverImage,
            slug: product.slug,
            seller: product.seller
          }]
        })
      },
      
      removeItem: (productId) => {
        set({
          items: get().items.filter(item => item._id !== productId)
        })
      },
      
      clearCart: () => {
        set({ items: [] })
      },
      
      getTotal: () => {
        return get().items.reduce((total, item) => total + item.price, 0)
      },
      
      getItemCount: () => {
        return get().items.length
      }
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)

export default useCartStore


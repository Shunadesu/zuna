import { createContext, useContext, useState } from 'react'

const CTAContext = createContext()

export const useCTA = () => {
  const context = useContext(CTAContext)
  if (!context) {
    throw new Error('useCTA must be used within CTAProvider')
  }
  return context
}

export const CTAProvider = ({ children }) => {
  const [isCTAVisible, setIsCTAVisible] = useState(false)

  const openCTA = () => {
    setIsCTAVisible(true)
  }

  const closeCTA = () => {
    setIsCTAVisible(false)
  }

  return (
    <CTAContext.Provider value={{ isCTAVisible, openCTA, closeCTA }}>
      {children}
    </CTAContext.Provider>
  )
}


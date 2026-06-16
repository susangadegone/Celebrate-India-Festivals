'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LandingPage from '@/components/LandingPage'
import HomeScreen from '@/components/HomeScreen'
import FestivalsListScreen from '@/components/FestivalsListScreen'
import SaiBabaScreen from '@/components/SaiBabaScreen'
import MoreScreen from '@/components/MoreScreen'
import { Home, Calendar, Heart, Info } from 'lucide-react'

export default function HomePage() {
  const [showLanding, setShowLanding] = useState(true)
  const [activeTab, setActiveTab] = useState('home')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
    setIsLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const handleEnterApp = () => {
    setShowLanding(false)
  }

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'festivals', label: 'Festivals', icon: Calendar },
    { id: 'sai-baba', label: 'Sai Baba', icon: Heart },
    { id: 'more', label: 'More', icon: Info },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />
      case 'festivals':
        return <FestivalsListScreen />
      case 'sai-baba':
        return <SaiBabaScreen />
      case 'more':
        return <MoreScreen />
      default:
        return <HomeScreen />
    }
  }

  // Show landing page on first visit
  if (showLanding && isLoaded) {
    return <LandingPage onEnter={handleEnterApp} />
  }

  return (
    <div className="min-h-screen app-container relative pb-20 md:pb-0 safe-area-inset overflow-hidden"
      style={{ background: 'var(--color-sand)' }}
    >
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 safe-top"
        style={{
          background: 'rgba(250,243,224,0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo/Brand - Mobile optimized */}
            <motion.button
              onClick={() => setActiveTab('home')}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 group touch-manipulation"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl group-active:scale-95 transition-transform"
                style={{ background: '#FFF0E0', border: '1.5px solid var(--color-border)' }}
              >
                🙏
              </div>
              <div className="text-left hidden sm:block">
                <h1
                  className="text-base font-semibold leading-tight"
                  style={{ fontFamily: 'var(--font-inknut), Georgia, serif', color: 'var(--color-text)' }}
                >
                  Festival Calendar
                </h1>
                <p
                  className="text-xs"
                  style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-manrope), system-ui, sans-serif' }}
                >
                  Cultural Heritage
                </p>
              </div>
            </motion.button>
            
            {/* Desktop Navigation Tabs */}
            <nav className="hidden lg:flex items-center gap-1">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="relative px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors"
                    style={{
                      fontFamily: 'var(--font-manrope), system-ui, sans-serif',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? 'var(--color-sand)' : 'var(--color-muted)',
                      background: isActive ? 'var(--color-saffron)' : 'transparent',
                    }}
                  >
                    <Icon className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">{tab.label}</span>
                  </motion.button>
                )
              })}
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Main Content - Mobile App Style */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6 md:py-12 lg:py-16 safe-area-inset-x">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="min-h-[calc(100vh-200px)] md:min-h-[calc(100vh-300px)] pb-4"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 safe-bottom"
        style={{
          background: 'rgba(250,243,224,0.98)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div className="container mx-auto px-2 max-w-7xl">
          <div className="flex justify-around items-center h-20">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileTap={{ scale: 0.92 }}
                  className="relative flex flex-col items-center justify-center py-2 px-3 flex-1 touch-manipulation min-h-[60px] rounded-xl mx-1 transition-colors"
                  style={{
                    background: isActive ? '#FFF0E0' : 'transparent',
                    border: isActive ? '1.5px solid var(--color-border)' : '1.5px solid transparent',
                  }}
                  aria-label={tab.label}
                >
                  <Icon
                    className="w-5 h-5 mb-1"
                    style={{ color: isActive ? 'var(--color-saffron)' : 'var(--color-muted)' }}
                  />
                  <span
                    className="text-[10px] font-semibold"
                    style={{
                      color: isActive ? 'var(--color-saffron)' : 'var(--color-muted)',
                      fontFamily: 'var(--font-manrope), system-ui, sans-serif',
                    }}
                  >
                    {tab.label}
                  </span>
                </motion.button>
              )
            })}
          </div>
        </div>
      </motion.nav>

    </div>
  )
}

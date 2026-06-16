'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import comprehensiveFestivalsData from '@/data/comprehensive-festivals.json'

interface LandingPageProps {
  onEnter: () => void
}

const ACCENT_STYLES: Record<string, { bar: string; iconBg: string; iconText: string }> = {
  harvest:  { bar: '#D4A017', iconBg: '#FFF8DC', iconText: '#8B5A0F' },
  national: { bar: '#2A7D6E', iconBg: '#E0F4F0', iconText: '#1A5C4E' },
  cultural: { bar: '#8B2252', iconBg: '#FCE4EC', iconText: '#6B1540' },
  religious:{ bar: '#B5621B', iconBg: '#FFF0E0', iconText: '#8B3A10' },
}

const REGION_BAR: Record<string, string> = {
  Marathi: '#D4A017',
  Hindi:   '#B5621B',
}

function getFestivalStyle(festival: any) {
  if (REGION_BAR[festival.region]) return { ...ACCENT_STYLES.religious, bar: REGION_BAR[festival.region] }
  return ACCENT_STYLES[festival.category] ?? ACCENT_STYLES.religious
}

function getFestivalIcon(category?: string, region?: string) {
  if (region === 'Marathi') return '🪔'
  if (region === 'Hindi') return '🕉️'
  if (category === 'national') return '🇮🇳'
  if (category === 'harvest') return '🌾'
  if (category === 'cultural') return '🎭'
  return '🙏'
}

export default function LandingPage({ onEnter }: LandingPageProps) {
  const [isExiting, setIsExiting] = useState(false)

  const handleEnter = () => {
    setIsExiting(true)
    setTimeout(onEnter, 600)
  }

  const featuredFestivals = (comprehensiveFestivalsData as any[]).slice(0, 6)

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.6 }}
          className="min-h-screen relative overflow-hidden"
          style={{ background: 'var(--color-sand)' }}
        >
          {/* Corner dot ornament */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 right-0 w-48 h-48"
            style={{
              backgroundImage: 'radial-gradient(circle, #D4A017 1.5px, transparent 1.5px)',
              backgroundSize: '16px 16px',
              opacity: 0.18,
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-0 w-40 h-40"
            style={{
              backgroundImage: 'radial-gradient(circle, #B5621B 1.5px, transparent 1.5px)',
              backgroundSize: '14px 14px',
              opacity: 0.13,
            }}
          />

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 flex items-center justify-between px-6 lg:px-10 pt-8"
          >
            <button onClick={handleEnter} className="flex items-center gap-3 group">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background: '#FFF0E0', border: '1.5px solid #E8D5B0' }}
              >
                🙏
              </div>
              <span
                className="text-base font-semibold hidden sm:block"
                style={{ fontFamily: 'var(--font-inknut), Georgia, serif', color: 'var(--color-text)' }}
              >
                Festival Calendar
              </span>
            </button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleEnter}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold"
              style={{
                background: 'var(--color-saffron)',
                color: 'var(--color-sand)',
                fontFamily: 'var(--font-manrope), system-ui, sans-serif',
              }}
            >
              Explore Now <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.header>

          {/* Hero */}
          <section className="relative z-10 px-6 lg:px-10 pt-16 pb-12 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8 tracking-widest uppercase"
              style={{
                background: '#FFF0E0',
                border: '1px solid #E8D5B0',
                color: 'var(--color-saffron)',
                fontFamily: 'var(--font-manrope), system-ui, sans-serif',
              }}
            >
              ✦ Indian Cultural Heritage ✦
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              style={{ fontFamily: 'var(--font-inknut), Georgia, serif', color: 'var(--color-text)' }}
              className="text-5xl lg:text-6xl xl:text-7xl font-semibold leading-tight mb-6"
            >
              Discover India's{' '}
              <span style={{ color: 'var(--color-saffron)' }}>Festival Traditions</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-lg lg:text-xl leading-relaxed mb-10 max-w-2xl"
              style={{
                color: 'var(--color-muted)',
                fontFamily: 'var(--font-manrope), system-ui, sans-serif',
              }}
            >
              47+ authentic festivals with celebration guides, rituals, and the stories behind each tradition.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleEnter}
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold"
                style={{
                  background: 'var(--color-saffron)',
                  color: 'var(--color-sand)',
                  fontFamily: 'var(--font-manrope), system-ui, sans-serif',
                }}
              >
                View Calendar <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleEnter}
                className="px-7 py-3.5 rounded-xl text-base font-semibold"
                style={{
                  background: 'transparent',
                  border: '1.5px solid var(--color-marigold)',
                  color: 'var(--color-saffron)',
                  fontFamily: 'var(--font-manrope), system-ui, sans-serif',
                }}
              >
                Browse Festivals
              </motion.button>
            </motion.div>
          </section>

          {/* Divider */}
          <div className="relative z-10 mx-6 lg:mx-10 mb-10" style={{ borderTop: '1px solid var(--color-border)' }} />

          {/* Festival cards */}
          <motion.section
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7 }}
            className="relative z-10 px-6 lg:px-10 pb-16"
          >
            <h2
              className="text-sm font-semibold mb-6 tracking-widest uppercase"
              style={{
                color: 'var(--color-muted)',
                fontFamily: 'var(--font-manrope), system-ui, sans-serif',
              }}
            >
              Featured Festivals
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredFestivals.map((festival: any, index: number) => {
                const style = getFestivalStyle(festival)
                const icon = getFestivalIcon(festival.category, festival.region)
                return (
                  <motion.div
                    key={festival.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.06 }}
                    whileHover={{ y: -3, boxShadow: '0 8px 28px rgba(44,24,16,0.1)' }}
                    onClick={handleEnter}
                    className="cursor-pointer dot-corner"
                    style={{
                      background: 'var(--color-card)',
                      border: '1.5px solid var(--color-border)',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      transition: 'box-shadow 0.2s, transform 0.2s',
                    }}
                  >
                    {/* Accent bar */}
                    <div style={{ height: '4px', background: style.bar }} />

                    <div className="p-5">
                      {/* Icon + date row */}
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                          style={{ background: style.iconBg, border: '1.5px solid var(--color-border)' }}
                        >
                          {icon}
                        </div>
                        <span
                          className="text-xs font-semibold px-3 py-1 rounded-full"
                          style={{
                            background: '#FFF0E0',
                            color: 'var(--color-saffron)',
                            border: '1px solid var(--color-border)',
                            fontFamily: 'var(--font-manrope), system-ui, sans-serif',
                          }}
                        >
                          {new Date(festival.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>

                      {/* Name */}
                      <h3
                        className="text-lg font-semibold mb-1 leading-snug"
                        style={{ fontFamily: 'var(--font-inknut), Georgia, serif', color: 'var(--color-text)' }}
                      >
                        {festival.name}
                      </h3>

                      {/* Devanagari */}
                      {festival.nameDevanagari && (
                        <p
                          className="text-sm mb-3"
                          style={{
                            fontFamily: 'var(--font-inknut), Georgia, serif',
                            color: style.bar,
                            opacity: 0.9,
                          }}
                        >
                          {festival.nameDevanagari}
                        </p>
                      )}

                      {/* Description */}
                      <p
                        className="text-sm leading-relaxed line-clamp-2 mb-4"
                        style={{
                          color: 'var(--color-muted)',
                          fontFamily: 'var(--font-manrope), system-ui, sans-serif',
                        }}
                      >
                        {festival.tagline || festival.overview?.shortDescription || ''}
                      </p>

                      {/* Region tag */}
                      {festival.region && (
                        <span className="pill">{festival.region}</span>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

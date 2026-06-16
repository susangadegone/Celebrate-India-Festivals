'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import comprehensiveFestivalsData from '@/data/comprehensive-festivals.json'
import FestivalDetail from './FestivalDetail'

interface Festival {
  id: string
  name: string
  date: string
  heroImage: string
  tagline?: string
  region?: string
  category?: string
  nameDevanagari?: string
  [key: string]: any
}

const CATEGORY_STYLE: Record<string, { bar: string; iconBg: string }> = {
  harvest:  { bar: '#D4A017', iconBg: '#FFF8DC' },
  national: { bar: '#2A7D6E', iconBg: '#E0F4F0' },
  cultural: { bar: '#8B2252', iconBg: '#FCE4EC' },
  religious:{ bar: '#B5621B', iconBg: '#FFF0E0' },
}

function getFestivalStyle(festival: Festival) {
  if (festival.region === 'Marathi') return { bar: '#D4A017', iconBg: '#FFF8DC' }
  return CATEGORY_STYLE[festival.category ?? ''] ?? CATEGORY_STYLE.religious
}

function getFestivalIcon(category?: string, region?: string) {
  if (region === 'Marathi') return '🪔'
  if (region === 'Hindi') return '🕉️'
  if (category === 'national') return '🇮🇳'
  if (category === 'religious') return '🙏'
  if (category === 'cultural') return '🎭'
  if (category === 'harvest') return '🌾'
  return '🎉'
}

export default function FestivalsListScreen() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null)

  const festivals = comprehensiveFestivalsData as Festival[]

  const filteredFestivals = useMemo(() => {
    return festivals
      .filter(f =>
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.nameDevanagari?.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [searchQuery])

  if (selectedFestival) {
    return <FestivalDetail festival={selectedFestival as any} onClose={() => setSelectedFestival(null)} />
  }

  return (
    <div className="space-y-4 pb-6">

      {/* Search */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
          style={{ color: 'var(--color-saffron)' }}
        />
        <input
          type="text"
          placeholder="Search festivals…"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-11 py-3.5 rounded-xl text-sm focus:outline-none transition-all touch-manipulation"
          style={{
            background: 'var(--color-card)',
            border: '1.5px solid var(--color-border)',
            color: 'var(--color-text)',
            fontFamily: 'var(--font-manrope), system-ui, sans-serif',
          }}
          onFocus={e => (e.target.style.borderColor = 'var(--color-saffron)')}
          onBlur={e => (e.target.style.borderColor = 'var(--color-border)')}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 touch-manipulation"
            style={{ color: 'var(--color-muted)' }}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </motion.div>

      {/* Count */}
      <p
        className="text-xs font-medium"
        style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-manrope), system-ui, sans-serif' }}
      >
        {filteredFestivals.length} festival{filteredFestivals.length !== 1 ? 's' : ''}
      </p>

      {/* List */}
      <div className="space-y-3">
        {filteredFestivals.map((festival, index) => {
          const style = getFestivalStyle(festival)
          const icon = getFestivalIcon(festival.category, festival.region)
          return (
            <motion.div
              key={festival.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.025 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setSelectedFestival(festival)}
              className="cursor-pointer dot-corner touch-manipulation"
              style={{
                background: 'var(--color-card)',
                border: '1.5px solid var(--color-border)',
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'box-shadow 0.15s',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(44,24,16,0.08)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.boxShadow = 'none')}
            >
              <div style={{ height: '3px', background: style.bar }} />
              <div className="flex items-center gap-4 p-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: style.iconBg, border: '1.5px solid var(--color-border)' }}
                >
                  {icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-base font-semibold leading-snug truncate"
                    style={{ fontFamily: 'var(--font-inknut), Georgia, serif', color: 'var(--color-text)' }}
                  >
                    {festival.name}
                  </h3>
                  {festival.nameDevanagari && (
                    <p className="text-xs" style={{ color: style.bar, fontFamily: 'var(--font-inknut), Georgia, serif' }}>
                      {festival.nameDevanagari}
                    </p>
                  )}
                  {festival.tagline && (
                    <p
                      className="text-xs mt-0.5 truncate"
                      style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-manrope), system-ui, sans-serif' }}
                    >
                      {festival.tagline}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      background: '#FFF0E0',
                      color: 'var(--color-saffron)',
                      border: '1px solid var(--color-border)',
                      fontFamily: 'var(--font-manrope), system-ui, sans-serif',
                    }}
                  >
                    {new Date(festival.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  {festival.region && (
                    <span className="pill">{festival.region}</span>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {filteredFestivals.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
          <p
            className="text-sm"
            style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-manrope), system-ui, sans-serif' }}
          >
            No festivals found for "{searchQuery}"
          </p>
        </motion.div>
      )}
    </div>
  )
}

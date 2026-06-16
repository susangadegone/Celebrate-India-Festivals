'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { CalendarIcon } from 'lucide-react'
import comprehensiveFestivalsData from '@/data/comprehensive-festivals.json'
import saiBabaQuotes from '@/data/sai-baba-quotes.json'
import thursdayBlessings from '@/data/thursday-blessings.json'
import FestivalDetail from './FestivalDetail'

interface Festival {
  id: string
  name: string
  date: string
  heroImage: string
  tagline?: string
  category?: string
  region?: string
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
  if (category === 'harvest') return '🌾'
  if (category === 'cultural') return '🎭'
  return '🙏'
}

export default function HomeScreen({ onFestivalClick }: { onFestivalClick?: (festival: Festival) => void }) {
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null)
  const [greeting, setGreeting] = useState('Good Morning')
  const today = new Date()
  const isThursday = today.getDay() === 4

  useEffect(() => {
    const hour = today.getHours()
    if (hour < 12) setGreeting('Good Morning')
    else if (hour < 17) setGreeting('Good Afternoon')
    else setGreeting('Good Evening')
  }, [])

  const quoteOfTheDay = useMemo(() => {
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000)
    return saiBabaQuotes[dayOfYear % saiBabaQuotes.length]
  }, [])

  const thursdayBlessing = useMemo(() => {
    if (!isThursday) return null
    const dayOfMonth = today.getDate()
    return thursdayBlessings[dayOfMonth % thursdayBlessings.length]
  }, [isThursday])

  const upcomingFestivals = useMemo(() => {
    return (comprehensiveFestivalsData as Festival[])
      .filter(f => new Date(f.date) >= today)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5)
  }, [])

  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })

  const daysUntil = (dateStr: string) => {
    const diff = Math.ceil((new Date(dateStr).getTime() - today.getTime()) / 86400000)
    return diff === 0 ? 'Today' : diff === 1 ? 'Tomorrow' : `${diff} days`
  }

  if (selectedFestival) {
    return <FestivalDetail festival={selectedFestival as any} onClose={() => setSelectedFestival(null)} />
  }

  return (
    <div className="space-y-6 pb-6">

      {/* Greeting */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
        <p
          className="text-sm font-medium mb-1 tracking-wide uppercase"
          style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-manrope), system-ui, sans-serif' }}
        >
          {greeting}
        </p>
        <h1
          className="text-3xl md:text-4xl font-semibold leading-snug"
          style={{ fontFamily: 'var(--font-inknut), Georgia, serif', color: 'var(--color-text)' }}
        >
          Festival Calendar
        </h1>
        <p
          className="text-sm mt-1"
          style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-manrope), system-ui, sans-serif' }}
        >
          {formatDate(today)}
        </p>
      </motion.div>

      {/* Thursday Blessing */}
      {isThursday && thursdayBlessing && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="rounded-xl overflow-hidden"
          style={{ background: '#FFF0E0', border: '1.5px solid var(--color-border)' }}
        >
          <div style={{ height: '3px', background: 'var(--color-saffron)' }} />
          <div className="p-5 flex items-start gap-4">
            <span className="text-3xl">🌞</span>
            <div>
              <h3
                className="text-base font-semibold mb-1"
                style={{ fontFamily: 'var(--font-inknut), Georgia, serif', color: 'var(--color-text)' }}
              >
                Thursday Blessing
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-manrope), system-ui, sans-serif' }}
              >
                {thursdayBlessing}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Quote of the Day */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="quote-block"
      >
        <p
          className="text-xs font-semibold tracking-widest uppercase mb-2"
          style={{ color: 'var(--color-marigold)', fontFamily: 'var(--font-manrope), system-ui, sans-serif' }}
        >
          Quote of the Day
        </p>
        <p
          className="text-sm leading-relaxed italic mb-2"
          style={{ color: 'var(--color-text)', fontFamily: 'var(--font-manrope), system-ui, sans-serif' }}
        >
          "{quoteOfTheDay}"
        </p>
        <p
          className="text-xs font-semibold"
          style={{ color: 'var(--color-saffron)', fontFamily: 'var(--font-manrope), system-ui, sans-serif' }}
        >
          — Sai Baba
        </p>
      </motion.div>

      {/* Upcoming Festivals */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-3"
      >
        <div className="flex items-center gap-2 mb-1">
          <CalendarIcon className="w-4 h-4" style={{ color: 'var(--color-saffron)' }} />
          <h2
            className="text-sm font-semibold tracking-widest uppercase"
            style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-manrope), system-ui, sans-serif' }}
          >
            Upcoming Festivals
          </h2>
        </div>

        {upcomingFestivals.map((festival, index) => {
          const style = getFestivalStyle(festival)
          const icon = getFestivalIcon(festival.category, festival.region)
          return (
            <motion.div
              key={festival.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + index * 0.08 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setSelectedFestival(festival)}
              className="cursor-pointer dot-corner"
              style={{
                background: 'var(--color-card)',
                border: '1.5px solid var(--color-border)',
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'box-shadow 0.2s',
              }}
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
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-manrope), system-ui, sans-serif' }}
                  >
                    {new Date(festival.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                <span
                  className="text-xs font-semibold px-3 py-1.5 rounded-full flex-shrink-0"
                  style={{
                    background: '#FFF0E0',
                    color: 'var(--color-saffron)',
                    border: '1px solid var(--color-border)',
                    fontFamily: 'var(--font-manrope), system-ui, sans-serif',
                  }}
                >
                  {daysUntil(festival.date)}
                </span>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}

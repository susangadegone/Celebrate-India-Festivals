'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react'
import { formatDate, getFestivalTypeColor, getFestivalIcon, isToday, isUpcoming } from '@/lib/utils'
import festivalsData from '@/data/festivals.json'

interface Festival {
  id: string
  name: string
  marathiName: string
  type: string
  date: string
  description: string
  foods: {
    traditional: string[]
    beginnerFriendly: string[]
  }
  homeDecor: {
    essential: string[]
    beginnerTips: string[]
  }
  chants: string[]
  how_to_celebrate: string
  image_url: string
  region: string
  significance: string
  rituals: string[]
  colors: string[]
  difficulty: string
  duration: string
}

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null)
  const [festivals, setFestivals] = useState<Festival[]>(festivalsData)

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }
    
    return days
  }

  const getFestivalsForMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    
    return festivals.filter(festival => {
      const festivalDate = new Date(festival.date)
      return festivalDate.getFullYear() === year && festivalDate.getMonth() === month
    })
  }

  const getFestivalsForDay = (day: number) => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const dayDate = new Date(year, month, day)
    
    return festivals.filter(festival => {
      const festivalDate = new Date(festival.date)
      return festivalDate.toDateString() === dayDate.toDateString()
    })
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const monthFestivals = getFestivalsForMonth(currentDate)

  return (
    <div className="space-y-6">
      {/* Calendar Header with Vibrant Indian Charm */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center spiritual-decoration mb-6"
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <motion.span 
            className="text-4xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            📅
          </motion.span>
          <h2 className="text-3xl font-bold text-white font-marathi drop-shadow-lg">
            Festival Calendar
          </h2>
          <motion.span 
            className="text-4xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            🪔
          </motion.span>
        </div>
        <p className="text-white/90 max-w-md mx-auto drop-shadow">
          Discover the rich tapestry of Hindu and Marathi festivals
        </p>
      </motion.div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigateMonth('prev')}
          className="border-saffron-200 hover:bg-saffron-50"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        
        <h3 className="text-xl font-semibold text-saffron-800">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigateMonth('next')}
          className="border-saffron-200 hover:bg-saffron-50"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Calendar Grid */}
      <Card className="overflow-hidden festival-card">
        <CardContent className="p-0">
          <div className="grid grid-cols-7 gap-px bg-gradient-to-br from-saffron-50 to-rose-50">
            {/* Day Headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <motion.div 
                key={day} 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-b from-saffron-100 to-saffron-200 p-3 text-center text-sm font-medium text-saffron-800"
              >
                {day}
              </motion.div>
            ))}
            
            {/* Calendar Days */}
            {getDaysInMonth(currentDate).map((day, index) => {
              if (!day) {
                return <div key={index} className="bg-white/50 p-3 min-h-[90px]" />
              }
              
              const dayFestivals = getFestivalsForDay(day)
              const isCurrentDay = isToday(new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString())
              
              return (
                <motion.div
                  key={day}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.01 }}
                  whileHover={{ scale: 1.02 }}
                  className={`bg-white/80 p-2 min-h-[90px] border-r border-b border-saffron-100 cursor-pointer transition-all duration-200 ${
                    isCurrentDay ? 'bg-gradient-to-br from-saffron-50 to-saffron-100 border-saffron-300 shadow-sm' : 'hover:bg-white/90'
                  }`}
                  onClick={() => dayFestivals.length > 0 && setSelectedFestival(dayFestivals[0])}
                >
                  <div className={`text-sm font-medium mb-2 ${
                    isCurrentDay ? 'text-saffron-800 font-semibold' : 'text-gray-700'
                  }`}>
                    {day}
                    {isCurrentDay && <span className="ml-1 text-xs">•</span>}
                  </div>
                  
                  <div className="space-y-1">
                    {dayFestivals.slice(0, 2).map(festival => (
                      <motion.div
                        key={festival.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`text-xs p-1.5 rounded-lg cursor-pointer transition-all duration-200 ${getFestivalTypeColor(festival.type)} hover:shadow-sm`}
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedFestival(festival)
                        }}
                      >
                        <div className="flex items-center gap-1">
                          <span className="text-sm">{getFestivalIcon(festival.type)}</span>
                          <span className="truncate font-medium">{festival.name}</span>
                        </div>
                      </motion.div>
                    ))}
                    {dayFestivals.length > 2 && (
                      <div className="text-xs text-gray-500 font-medium">
                        +{dayFestivals.length - 2} more
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Month's Festivals */}
      {monthFestivals.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold text-saffron-800 mb-4">
            This Month's Festivals
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {monthFestivals.map(festival => (
              <motion.div
                key={festival.id}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer"
                onClick={() => setSelectedFestival(festival)}
              >
                <Card className="festival-card card-hover">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <motion.div 
                        className="text-3xl festival-icon"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                      >
                        {getFestivalIcon(festival.type)}
                      </motion.div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-saffron-800 text-lg">{festival.name}</h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getFestivalTypeColor(festival.type)}`}>
                            {festival.type}
                          </span>
                        </div>
                        <p className="text-sm text-saffron-600 mb-2 font-medium">{formatDate(festival.date)}</p>
                        <p className="text-sm text-gray-700 line-clamp-2 leading-relaxed">{festival.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Festival Detail Modal */}
      {selectedFestival && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedFestival(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-saffron-800">{selectedFestival.name}</h3>
                  <p className="text-lg text-saffron-600 font-marathi">{selectedFestival.marathiName}</p>
                  <p className="text-sm text-gray-600">{formatDate(selectedFestival.date)}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedFestival(null)}
                >
                  ×
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-saffron-800 mb-2">Description</h4>
                  <p className="text-gray-700">{selectedFestival.description}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-saffron-800 mb-2">Traditional Foods</h4>
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-saffron-700 mb-2">Traditional:</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedFestival.foods.traditional.map((food, index) => (
                        <span key={index} className="px-3 py-1 bg-rose-100 text-rose-800 rounded-full text-sm">
                          {food}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-saffron-700 mb-2">Beginner Friendly:</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedFestival.foods.beginnerFriendly.map((food, index) => (
                        <span key={index} className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">
                          {food}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-saffron-800 mb-2">Home Decorations</h4>
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-saffron-700 mb-2">Essential Items:</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedFestival.homeDecor.essential.map((item, index) => (
                        <span key={index} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-saffron-700 mb-2">Beginner Tips:</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedFestival.homeDecor.beginnerTips.map((tip, index) => (
                        <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          {tip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-saffron-800 mb-2">Chants & Mantras</h4>
                  <div className="space-y-2">
                    {selectedFestival.chants.map((chant, index) => (
                      <p key={index} className="mantra-text text-saffron-700 bg-saffron-50 p-3 rounded-lg">
                        {chant}
                      </p>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-saffron-800 mb-2">How to Celebrate</h4>
                  <p className="text-gray-700">{selectedFestival.how_to_celebrate}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

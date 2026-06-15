'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Home, Calendar, MapPin, Star } from 'lucide-react'
import { formatDate, isUpcoming } from '@/lib/utils'
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

export default function HinduFestivals() {
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null)
  const hinduFestivals = festivalsData.filter(festival => festival.type === 'Hindu')

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Home className="w-8 h-8 text-teal-600" />
          <h2 className="text-3xl font-bold text-teal-800">
            Hindu Festivals
          </h2>
        </div>
        <p className="text-teal-600 max-w-2xl mx-auto">
          Discover the spiritual richness of Hindu festivals celebrated across India
        </p>
      </motion.div>

      {/* Festivals Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {hinduFestivals.map((festival, index) => (
          <motion.div
            key={festival.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="cursor-pointer"
            onClick={() => setSelectedFestival(festival)}
          >
            <Card className="card-hover hindu-gradient border-teal-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl text-teal-800 mb-1">
                      {festival.name}
                    </CardTitle>
                    <p className="text-lg text-teal-600 font-marathi">
                      {festival.marathiName}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-teal-500" />
                    <span className="text-xs text-teal-600">Hindu</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-teal-700">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(festival.date)}</span>
                  {isUpcoming(festival.date) && (
                    <span className="px-2 py-1 bg-teal-100 text-teal-800 rounded-full text-xs">
                      Upcoming
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-2 text-sm text-teal-700">
                  <MapPin className="w-4 h-4" />
                  <span>{festival.region}</span>
                </div>
                
                <p className="text-sm text-gray-700 line-clamp-3">
                  {festival.description}
                </p>
                
                <div className="flex flex-wrap gap-1">
                  {festival.foods.traditional.slice(0, 2).map((food, foodIndex) => (
                    <span key={foodIndex} className="px-2 py-1 bg-teal-100 text-teal-800 rounded-full text-xs">
                      {food}
                    </span>
                  ))}
                  {festival.foods.beginnerFriendly.slice(0, 1).map((food, foodIndex) => (
                    <span key={foodIndex} className="px-2 py-1 bg-rose-100 text-rose-800 rounded-full text-xs">
                      {food}
                    </span>
                  ))}
                  {(festival.foods.traditional.length + festival.foods.beginnerFriendly.length) > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                      +{(festival.foods.traditional.length + festival.foods.beginnerFriendly.length) - 3}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

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
                  <h3 className="text-2xl font-bold text-teal-800">{selectedFestival.name}</h3>
                  <p className="text-lg text-teal-600 font-marathi">{selectedFestival.marathiName}</p>
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
                  <h4 className="font-semibold text-teal-800 mb-2">Significance</h4>
                  <p className="text-gray-700">{selectedFestival.significance}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-teal-800 mb-2">Traditional Foods</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedFestival.foods.traditional.map((food, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-teal-50 rounded-lg">
                        <span className="text-teal-600">🍽️</span>
                        <span className="text-sm text-teal-800">{food}</span>
                      </div>
                    ))}
                  </div>
                  <h5 className="font-medium text-teal-700 mb-2 mt-4">Beginner Friendly</h5>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedFestival.foods.beginnerFriendly.map((food, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-rose-50 rounded-lg">
                        <span className="text-rose-600">🌱</span>
                        <span className="text-sm text-rose-800">{food}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-teal-800 mb-2">Home Decorations</h4>
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-teal-700 mb-2">Essential Items:</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedFestival.homeDecor.essential.map((item, index) => (
                        <span key={index} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-teal-700 mb-2">Beginner Tips:</h5>
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
                  <h4 className="font-semibold text-teal-800 mb-2">Rituals & Traditions</h4>
                  <div className="space-y-2">
                    {selectedFestival.rituals.map((ritual, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-teal-50 rounded-lg">
                        <span className="text-teal-600">🕉️</span>
                        <span className="text-sm text-teal-800">{ritual}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-teal-800 mb-2">Chants & Mantras</h4>
                  <div className="space-y-2">
                    {selectedFestival.chants.map((chant, index) => (
                      <p key={index} className="mantra-text text-teal-700 bg-teal-50 p-3 rounded-lg">
                        {chant}
                      </p>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-teal-800 mb-2">How to Celebrate</h4>
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

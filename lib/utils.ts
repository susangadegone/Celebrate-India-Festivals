import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function getFestivalTypeColor(type: string): string {
  switch (type) {
    case 'Marathi':
      return 'bg-rose-100 text-rose-800 border-rose-200'
    case 'Hindu':
      return 'bg-teal-100 text-teal-800 border-teal-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

export function getFestivalIcon(type: string): string {
  switch (type) {
    case 'Marathi':
      return '🪔'
    case 'Hindu':
      return '🕉️'
    default:
      return '🎉'
  }
}

export function isToday(date: string): boolean {
  const today = new Date()
  const festivalDate = new Date(date)
  return today.toDateString() === festivalDate.toDateString()
}

export function isUpcoming(date: string): boolean {
  const today = new Date()
  const festivalDate = new Date(date)
  return festivalDate > today
}

export function getRandomSaiBabaQuote(quotes: any[]) {
  return quotes[Math.floor(Math.random() * quotes.length)]
}

export function getFestivalsByMonth(year: number, month: string, festivals: any[]) {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const monthIndex = monthNames.indexOf(month)
  
  return festivals.filter(festival => {
    const festivalDate = new Date(festival.date)
    return festivalDate.getFullYear() === year && festivalDate.getMonth() === monthIndex
  })
}

export function getUpcomingFestivals(festivals: any[], limit: number = 5) {
  const today = new Date()
  return festivals
    .filter(festival => new Date(festival.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, limit)
}

export function getFestivalsByType(festivals: any[], type: string) {
  return festivals.filter(festival => festival.type === type)
}

export function getCurrentMonthFestivals(festivals: any[]) {
  const today = new Date()
  const currentYear = today.getFullYear()
  const currentMonth = today.getMonth()
  
  return festivals.filter(festival => {
    const festivalDate = new Date(festival.date)
    return festivalDate.getFullYear() === currentYear && festivalDate.getMonth() === currentMonth
  })
}

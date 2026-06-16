import type { Metadata } from 'next'
import { Inknut_Antiqua, Manrope } from 'next/font/google'
import './globals.css'

const inknut = Inknut_Antiqua({
  subsets: ['latin', 'devanagari'],
  weight: ['400', '600', '700'],
  variable: '--font-inknut',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '🪔 India Festival Calendar | Hindi & Marathi त्योहार | Complete Guide',
  description: 'Discover 47+ authentic Hindi and Marathi festivals with traditional recipes, celebration guides, Sai Baba quotes, Thursday blessings, and puja decorations. Experience India\'s rich cultural heritage.',
  keywords: 'India festivals, Hindi festivals, Marathi festivals, Hindu calendar, Drik Panchang, Indian culture, Diwali, Holi, Ganesh Chaturthi, festival recipes, puja guide, Indian traditions, त्योहार, भारतीय त्योहार',
  authors: [{ name: 'India Festival Calendar' }],
  creator: 'India Festival Calendar',
  manifest: '/Celebrate-India-Festivals/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Festival Calendar',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: '🪔 India Festival Calendar | Hindi & Marathi Festivals',
    description: 'Complete guide to 15+ Hindu festivals with recipes, decorations & celebration guides',
    type: 'website',
    locale: 'en_IN',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover' as const,
  themeColor: '#B5621B',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/Celebrate-India-Festivals/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Festival Calendar" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#B5621B" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className={`${inknut.variable} ${manrope.variable}`}>
        {children}
      </body>
    </html>
  )
}

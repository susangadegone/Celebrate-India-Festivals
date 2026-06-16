/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        sand: '#FAF3E0',
        'card-bg': '#FEFCF5',
        'sand-border': '#E8D5B0',
        saffron: {
          50: '#FFF0E0',
          100: '#FFE0C0',
          200: '#FFCB96',
          300: '#F5B06A',
          400: '#E08842',
          500: '#B5621B', // Primary saffron
          600: '#9A5016',
          700: '#7D3E10',
          800: '#5E2E0C',
          900: '#3E1E08',
        },
        marigold: {
          50: '#FFF8DC',
          100: '#FFF0B0',
          200: '#FFE280',
          300: '#F5CC50',
          400: '#E0B020',
          500: '#D4A017', // Primary marigold
          600: '#B08010',
          700: '#8A620C',
          800: '#644808',
          900: '#402E04',
        },
        crimson: {
          50: '#FCE4EC',
          100: '#F8C8D8',
          200: '#EF9AB4',
          300: '#E06A90',
          400: '#C8426E',
          500: '#8B2252', // Primary crimson
          600: '#721A42',
          700: '#581332',
          800: '#400D24',
          900: '#280818',
        },
        teal: {
          50: '#E0F4F0',
          100: '#C0E8E0',
          200: '#90D4C8',
          300: '#60BFB0',
          400: '#40A898',
          500: '#2A7D6E', // Primary teal
          600: '#226658',
          700: '#1A4E44',
          800: '#123830',
          900: '#0A221C',
        },
        cream: {
          50: '#FAF3E0',
          100: '#F5E8C8',
          200: '#EDD8A8',
          300: '#E2C888',
          400: '#D4B568',
          500: '#C8A050',
          600: '#A8803C',
          700: '#84622C',
          800: '#60461E',
          900: '#3E2C12',
        },
        gold: {
          50: '#FFF8DC',
          100: '#FFF0B0',
          200: '#FFE280',
          300: '#F5CC50',
          400: '#E0B020',
          500: '#D4A017',
          600: '#B08010',
          700: '#8A620C',
          800: '#644808',
          900: '#402E04',
        },
        ink: {
          50: '#F5EDE8',
          100: '#E8D8CC',
          200: '#D4B8A8',
          300: '#BC9080',
          400: '#A06A58',
          500: '#7a6653',
          600: '#5C4C3C',
          700: '#42362A',
          800: '#2C1810', // Primary dark text
          900: '#1A0E08',
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "fade-in": {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        inknut: ['var(--font-inknut)', 'Georgia', 'serif'],
        devanagari: ['var(--font-inknut)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

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
        // Soft Peacock & Rose - Chill Indian Color Palette
        saffron: {
          50: '#EAF1F1',
          100: '#D9E7E7',
          200: '#C2D8D8',
          300: '#A0C2C2',
          400: '#80ACAC',
          500: '#5B8A8C', // Peacock Teal - Primary
          600: '#4A7173',
          700: '#3A595B',
          800: '#2B4344',
          900: '#1C2D2E',
        },
        cream: {
          50: '#F7F1E8', // Warm Sand - Main background
          100: '#EFE5D5',
          200: '#E3D3B8',
          300: '#D4BD96',
          400: '#C8AB7D',
          500: '#BC9963',
          600: '#A07F4F',
          700: '#7D633E',
          800: '#5C492E',
          900: '#3D311F',
        },
        maroon: {
          50: '#FAEFF1',
          100: '#F5DEE1',
          200: '#EBC2C8',
          300: '#DDA0A8',
          400: '#D88E96',
          500: '#C97B84', // Dusty Rose - Primary
          600: '#B05F69',
          700: '#8E4A52',
          800: '#6B3740',
          900: '#47252B',
        },
        midnight: {
          50: '#F1EFF5',
          100: '#E3DFEC',
          200: '#CCC5DD',
          300: '#B2A8CB',
          400: '#A096BC',
          500: '#8E84A6',
          600: '#756C8C',
          700: '#5C5570',
          800: '#443F54', // Lilac - Primary
          900: '#2D2A38',
        },
        rose: {
          50: '#FBEEEF',
          100: '#F7DDDF',
          200: '#EFC0C3',
          300: '#E5A2A6',
          400: '#DC9498',
          500: '#CD868A',
          600: '#B26A6E',
          700: '#8E5256',
          800: '#6A3D40',
          900: '#47282A',
        },
        teal: {
          50: '#E7F0EF',
          100: '#CFE2E0',
          200: '#A6C8C5',
          300: '#7DAEAA',
          400: '#62A09B',
          500: '#47918D',
          600: '#397674',
          700: '#2D5C5A',
          800: '#224443',
          900: '#172E2D',
        },
        gold: {
          50: '#FAF1E2',
          100: '#F5E3C7',
          200: '#EBCC9C',
          300: '#E2BB7D',
          400: '#DEAF6A',
          500: '#D9A95C', // Turmeric - Primary
          600: '#BC8C44',
          700: '#946D35',
          800: '#6E5127',
          900: '#48351A',
        },
        // Mehendi-inspired green palette
        sage: {
          50: '#EFF3ED',
          100: '#DEE7D9',
          200: '#C3D4BD',
          300: '#A6C09E',
          400: '#92AE89',
          500: '#7E9B76', // Mehendi - Primary
          600: '#678061',
          700: '#50644C',
          800: '#3B4A38',
          900: '#272F24',
        },
        mint: {
          50: '#ECF4F5',
          100: '#D6E7E9',
          200: '#B3D2D6',
          300: '#8FBDC3',
          400: '#76AEB5',
          500: '#5A9AA6',
          600: '#487E89',
          700: '#38636C',
          800: '#2A4A50',
          900: '#1D3236',
        },
        emerald: {
          50: '#EEF5EA',
          100: '#D9EACE',
          200: '#B8D7A4',
          300: '#98C47C',
          400: '#82B768',
          500: '#6CA756',
          600: '#588745',
          700: '#446936',
          800: '#324D28',
          900: '#21331B',
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
        sans: ['Inter', 'system-ui', 'sans-serif'],
        marathi: ['Noto Sans Devanagari', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

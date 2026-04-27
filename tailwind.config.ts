import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#1e40af',
          accent: '#f97316',
          success: '#22c55e',
          warning: '#eab308',
          danger: '#ef4444',
        },
        surface: {
          primary: '#0a0a0a',
          card: '#171717',
          elevated: '#262626',
          border: '#404040',
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      animation: {
        'count-up': 'count-up 0.5s ease-out both',
        'slide-in': 'slide-in 0.3s ease-out both',
        'fade-in': 'fade-in 0.3s ease-out both',
      },
      keyframes: {
        'count-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          from: { opacity: '0', transform: 'translateX(-12px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config

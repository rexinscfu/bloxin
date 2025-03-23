/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'San Francisco', 'Helvetica Neue', 'sans-serif'],
        mono: ['SF Mono', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      colors: {
        ios: {
          blue: '#007AFF',
          indigo: '#5856D6',
          purple: '#AF52DE',
          pink: '#FF2D55',
          red: '#FF3B30',
          orange: '#FF9500',
          yellow: '#FFCC00',
          green: '#34C759',
          mint: '#00C7BE',
          teal: '#30B0C7',
          cyan: '#32ADE6',
          gray: {
            1: '#8E8E93',
            2: '#AEAEB2',
            3: '#C7C7CC',
            4: '#D1D1D6',
            5: '#E5E5EA',
            6: '#F2F2F7',
          },
          dark: {
            1: '#1C1C1E',
            2: '#2C2C2E',
            3: '#3A3A3C',
            4: '#48484A',
            5: '#636366',
            6: '#8E8E93',
          },
        },
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        'card-foreground': 'rgb(var(--card-foreground) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        input: 'rgb(var(--input) / <alpha-value>)',
      },
      borderRadius: {
        'ios': '10px',
        'ios-sm': '8px',
        'ios-lg': '12px',
        'ios-xl': '16px',
        'ios-full': '9999px',
      },
      boxShadow: {
        'ios-sm': '0 2px 6px rgba(0, 0, 0, 0.05)',
        'ios': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'ios-lg': '0 10px 20px rgba(0, 0, 0, 0.12)',
        'ios-xl': '0 16px 32px rgba(0, 0, 0, 0.16)',
        'ios-inner': 'inset 0 0 6px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'ios-spin': 'ios-spin 1s linear infinite',
        'ios-pulse': 'ios-pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ios-bounce': 'ios-bounce 0.5s ease-in-out',
      },
      keyframes: {
        'ios-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'ios-pulse': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        'ios-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
} 
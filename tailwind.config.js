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
        sans: ['Inter var', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Menlo', 'monospace'],
        display: ['Clash Display', 'SF Pro Display', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Modern color palette with vibrant options for glassmorphism
        glass: {
          primary: '#7000FF',
          secondary: '#00D0FF',
          accent: '#FF1966',
          warning: '#FFBC00',
          success: '#00E879',
          dark: '#0E0E12',
          deeper: '#090914',
          card: 'rgba(23, 23, 35, 0.6)',
          'card-hover': 'rgba(32, 32, 48, 0.7)',
          'card-light': 'rgba(255, 255, 255, 0.08)',
          border: 'rgba(255, 255, 255, 0.1)',
          'border-dark': 'rgba(255, 255, 255, 0.06)',
          overlay: 'rgba(0, 0, 0, 0.6)',
        },
        // Gradients as solid colors for background references
        gradient: {
          purple: '#7000FF',
          blue: '#00D0FF',
          pink: '#FF1966',
          amber: '#FFBC00',
          green: '#00E879',
          'purple-light': '#9E47FF',
          'blue-light': '#24E1FF',
          'pink-light': '#FF478A',
        },
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        'card-foreground': 'rgb(var(--card-foreground) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        input: 'rgb(var(--input) / <alpha-value>)',
      },
      // Expanded border radius for more design flexibility
      borderRadius: {
        'glass': '16px',
        'glass-sm': '12px',
        'glass-lg': '24px',
        'glass-xl': '32px',
        'glass-2xl': '40px',
        'glass-full': '9999px',
      },
      // Sophisticated shadow system for depth
      boxShadow: {
        'glass-sm': '0 2px 10px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        'glass': '0 8px 30px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        'glass-lg': '0 20px 40px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        'glass-xl': '0 25px 50px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        'glass-inner': 'inset 0 0 20px rgba(0, 0, 0, 0.1)',
        'glass-highlight': '0 0 0 1px rgba(255, 255, 255, 0.15)',
        'glass-glow': '0 0 20px rgba(112, 0, 255, 0.5)',
        'glass-glow-blue': '0 0 20px rgba(0, 208, 255, 0.5)',
        'glass-glow-pink': '0 0 20px rgba(255, 25, 102, 0.5)',
      },
      // Enhanced animation system
      animation: {
        'glass-float': 'glass-float 8s ease-in-out infinite',
        'glass-pulse': 'glass-pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glass-appear': 'glass-appear 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'glass-slide-up': 'glass-slide-up 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        'glass-blur-in': 'glass-blur-in 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        'glass-shimmer': 'glass-shimmer 2s linear infinite',
        'glass-gradient': 'glass-gradient 8s linear infinite',
      },
      keyframes: {
        'glass-float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glass-pulse': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
        'glass-appear': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'glass-slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'glass-blur-in': {
          '0%': { filter: 'blur(8px)', opacity: 0 },
          '100%': { filter: 'blur(0)', opacity: 1 },
        },
        'glass-shimmer': {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '-200% 0%' },
        },
        'glass-gradient': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      // Backdrop filters for glassmorphism
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, var(--tw-gradient-stops))',
        'glass-radial': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        'glass-conic': 'conic-gradient(from 0deg at 50% 50%, var(--tw-gradient-stops))',
        'glass-mesh': 'url("/images/glass-mesh.svg")',
        'glass-noise': 'url("/images/glass-noise.png")',
        'glass-grid': 'url("/images/glass-grid.svg")',
      },
      backgroundSize: {
        'auto-100': 'auto 100%',
        '200-auto': '200% auto',
      },
    },
  },
  plugins: [],
} 
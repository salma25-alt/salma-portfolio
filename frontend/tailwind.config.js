/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: '#0B0D12',
        surface: '#12151E',
        surfaceHover: '#181C28',
        borderSubtle: '#1F2433',
        accentPurple: '#8B5CF6',
        accentBlue: '#3B82F6',
        accentCyan: '#06B6D4',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 55%, #06B6D4 100%)',
        'subtle-glow': 'radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.14), transparent 65%)',
      },
    },
  },
  plugins: [],
};
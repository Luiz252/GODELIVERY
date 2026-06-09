/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        gd: {
          bg: 'var(--gd-bg)',
          surface: 'var(--gd-surface)',
          'surface-muted': 'var(--gd-surface-muted)',
          text: 'var(--gd-text)',
          'text-secondary': 'var(--gd-text-secondary)',
          border: 'var(--gd-border)',
          'border-soft': 'var(--gd-border-soft)',
          accent: 'var(--gd-accent)',
          'accent-dark': 'var(--gd-accent-dark)',
        },
      },
    },
  },
  plugins: [],
};
import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#fff',
            a: {
              color: '#3b82f6',
              '&:hover': {
                color: '#60a5fa',
              },
            },
            'h1, h2, h3, h4': {
              color: '#fff',
            },
            blockquote: {
              borderLeftColor: '#374151',
              color: '#9ca3af',
            },
            hr: { borderColor: '#374151' },
            strong: { color: '#fff' },
            code: { color: '#fff' },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            pre: {
              backgroundColor: '#111827',
              color: '#fff',
            },
          },
        },
      },
    },
  },
  plugins: [typography],
} satisfies Config;

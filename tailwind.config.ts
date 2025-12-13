import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'framer-blue-light': 'rgb(188, 208, 242)',
        'framer-blue-alt': 'rgb(189, 209, 245)',
        'framer-purple': 'rgb(156, 139, 238)',
        'framer-button': 'rgb(120, 131, 233)',
        'framer-text': 'rgb(47, 45, 61)',
        'framer-dark': '#0A0A0A',
      },
      backgroundImage: {
        'gradient-framer': 'linear-gradient(90deg, rgb(188, 208, 242) 0%, rgb(156, 139, 238) 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;

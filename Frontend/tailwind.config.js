/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6F0FF',
          100: '#CCE0FF',
          200: '#99C2FF',
          300: '#66A3FF',
          400: '#3385FF',
          500: '#0062B8', // primary
          600: '#004F94',
          700: '#003B6F',
          800: '#00284A',
          900: '#001425',
        },
        secondary: {
          50: '#E6FFFC',
          100: '#CCFEF9',
          200: '#99FDF4',
          300: '#66FCEE',
          400: '#33FBE9',
          500: '#00B8A6', // secondary
          600: '#009385',
          700: '#006E64',
          800: '#004A42',
          900: '#002521',
        },
        accent: {
          50: '#F7EFFF',
          100: '#EEDFFF',
          200: '#DDBFFF',
          300: '#CB9FFF',
          400: '#BA7FFF',
          500: '#9D4EDD', // accent
          600: '#7E3EB1',
          700: '#5E2E85',
          800: '#3F1F58',
          900: '#1F0F2C',
        },
        success: {
          50: '#E8F5ED',
          100: '#D1EBDC',
          200: '#A3D7B9',
          300: '#76C496',
          400: '#48B073',
          500: '#1D7832', // success
          600: '#166026',
          700: '#10481D',
          800: '#0B3013',
          900: '#05180A',
        },
        warning: {
          50: '#FEF8E6',
          100: '#FEF1CD',
          200: '#FCE39B',
          300: '#FBD569',
          400: '#F9C636',
          500: '#F5A623', // warning
          600: '#C4851C',
          700: '#936415',
          800: '#62420E',
          900: '#312107',
        },
        error: {
          50: '#FCEBEB',
          100: '#F9D6D6',
          200: '#F3AEAE',
          300: '#ED8585',
          400: '#E75D5D',
          500: '#EB5757', // error
          600: '#D42C2C',
          700: '#A02121',
          800: '#6B1616',
          900: '#350B0B',
        },
        neutral: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#060A15',
        },
      },
      fontFamily: {
        sans: [
          'SF Pro Display',
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
      },
      boxShadow: {
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
        'glass-hover': '0 8px 32px rgba(0, 0, 0, 0.15)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-card': 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
        'glass-card-dark': 'linear-gradient(135deg, rgba(20,20,40,0.3), rgba(10,10,20,0.5))',
      },
      backdropBlur: {
        'glass': 'blur(10px)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
    },
  },
  plugins: [],
};
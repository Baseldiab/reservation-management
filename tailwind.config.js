/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        theme: {
          background: {
            main: '#ffffffcc',
            dark: '#000',
            secondary: '#f8f9fa'
          },
          text: {
            primary: '#3394d0',
            main: '#000',
            dark: '#fff',
            second: "#6c757d",
            title: "#292929",
            secondTitle: "#333333",
            thirdTitle: "#666666",
            titleBrand: "#3394d0",
            headingPrimary: "#111827",
            subtitle: "#7c7c7c",
            body: "#4B5563",
            Body: "#464646",
            link: "#1f71aa",
            success: "#039754",
            warning: "#bd7611",
            danger: "#d3242f",
            white: "#ffffff",
          },
          inputField: {
            label: "#3d3d3d",
            darkLabel: "rgb(255 255 255 / 0.5)",
            placeholder: "#989898",
            placehold: "#6B7280",
            disable: "#e6e6e6",
            error: "#E54444",
            errorMsg: "#D32F2F",
            success: "#0ebb69",
            border: "#e6e6e6",
          },
          separating: {
  					border: '#efefef',
  					separator: '#e6e6e6',
  					'separator-2': '#DFE5F1',
  					select: '#3394d0',
  					'neutral-separator': '#F5F6F6'
  				},
          button: {
            primary: '#3394d0',
            dark: '#3394d0',
          }
          },	
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

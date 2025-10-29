import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
  ],
  prefix: "",
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#153f70",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "#FFFFFF",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "#FACC15",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        sans: ["Roboto Condensed", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        rotate: {
          "0%": { transform: "rotate(0deg) scale(10)" },
          "100%": { transform: "rotate(-360deg) scale(10)" },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "pulse-slow": {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0.8",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "background-wave": {
          "0%, 100%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
        },
        checkmark: {
          "0%": {
            transform: "scale(0)",
            opacity: "0",
          },
          "50%": {
            transform: "scale(1.2)",
            opacity: "1",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
        expand: {
          "0%": {
            width: "100%",
          },
          "50%": {
            width: "110%",
          },
          "100%": {
            width: "100%",
          },
        },
        gradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "text-slide-2": {
          "0%, 40%": {
            transform: "translateY(0%)",
          },
          "50%, 90%": {
            transform: "translateY(-33.33%)",
          },
          "100%": {
            transform: "translateY(-66.66%)",
          },
        },
        "text-slide-3": {
          "0%, 26.66%": {
            transform: "translateY(0%)",
          },
          "33.33%, 60%": {
            transform: "translateY(-25%)",
          },
          "66.66%, 93.33%": {
            transform: "translateY(-50%)",
          },
          "100%": {
            transform: "translateY(-75%)",
          },
        },
        "text-slide-4": {
          "0%, 20%": {
            transform: "translateY(0%)",
          },
          "25%, 45%": {
            transform: "translateY(-20%)",
          },
          "50%, 70%": {
            transform: "translateY(-40%)",
          },
          "75%, 95%": {
            transform: "translateY(-60%)",
          },
          "100%": {
            transform: "translateY(-80%)",
          },
        },
        "text-slide-5": {
          "0%, 16%": {
            transform: "translateY(0%)",
          },
          "20%, 36%": {
            transform: "translateY(-16.66%)",
          },
          "40%, 56%": {
            transform: "translateY(-33.33%)",
          },
          "60%, 76%": {
            transform: "translateY(-50%)",
          },
          "80%, 96%": {
            transform: "translateY(-66.66%)",
          },
          "100%": {
            transform: "translateY(-83.33%)",
          },
        },
        "text-slide-6": {
          "0%, 13.33%": {
            transform: "translateY(0%)",
          },
          "16.66%, 30%": {
            transform: "translateY(-14.28%)",
          },
          "33.33%, 46.66%": {
            transform: "translateY(-28.57%)",
          },
          "50%, 63.33%": {
            transform: "translateY(-42.85%)",
          },
          "66.66%, 80%": {
            transform: "translateY(-57.14%)",
          },
          "83.33%, 96.66%": {
            transform: "translateY(-71.42%)",
          },
          "100%": {
            transform: "translateY(-85.71%)",
          },
        },
        "text-slide-7": {
          "0%, 11.43%": {
            transform: "translateY(0%)",
          },
          "14.28%, 25.71%": {
            transform: "translateY(-12.5%)",
          },
          "28.57%, 40%": {
            transform: "translateY(-25%)",
          },
          "42.85%, 54.28%": {
            transform: "translateY(-37.5%)",
          },
          "57.14%, 68.57%": {
            transform: "translateY(-50%)",
          },
          "71.42%, 82.85%": {
            transform: "translateY(-62.5%)",
          },
          "85.71%, 97.14%": {
            transform: "translateY(-75%)",
          },
          "100%": {
            transform: "translateY(-87.5%)",
          },
        },
        "text-slide-8": {
          "0%, 10%": {
            transform: "translateY(0%)",
          },
          "12.5%, 22.5%": {
            transform: "translateY(-11.11%)",
          },
          "25%, 35%": {
            transform: "translateY(-22.22%)",
          },
          "37.5%, 47.5%": {
            transform: "translateY(-33.33%)",
          },
          "50%, 60%": {
            transform: "translateY(-44.44%)",
          },
          "62.5%, 72.5%": {
            transform: "translateY(-55.55%)",
          },
          "75%, 85%": {
            transform: "translateY(-66.66%)",
          },
          "87.5%, 97.5%": {
            transform: "translateY(-77.77%)",
          },
          "100%": {
            transform: "translateY(-88.88%)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-slow": "pulse-slow 3s infinite ease-in-out",
        "fade-in": "fade-in 0.5s ease-out",
        "background-wave": "background-wave 15s ease infinite",
        checkmark: "checkmark 0.5s cubic-bezier(0.65, 0, 0.35, 1)",
        expand: "expand 0.5s ease-out",
        rotate: "rotate 10s linear infinite",
        gradient: "gradient 8s linear infinite",
        "text-slide-2":
          "text-slide-2 5s cubic-bezier(0.83, 0, 0.17, 1) infinite",
        "text-slide-3":
          "text-slide-3 7.5s cubic-bezier(0.83, 0, 0.17, 1) infinite",
        "text-slide-4":
          "text-slide-4 10s cubic-bezier(0.83, 0, 0.17, 1) infinite",
        "text-slide-5":
          "text-slide-5 12.5s cubic-bezier(0.83, 0, 0.17, 1) infinite",
        "text-slide-6":
          "text-slide-6 15s cubic-bezier(0.83, 0, 0.17, 1) infinite",
        "text-slide-7":
          "text-slide-7 17.5s cubic-bezier(0.83, 0, 0.17, 1) infinite",
        "text-slide-8":
          "text-slide-8 20s cubic-bezier(0.83, 0, 0.17, 1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

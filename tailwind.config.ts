import type {Config} from "tailwindcss";
import clipPath from "@/plugin/clip-path";

export default {
    content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
    theme: {
        extend: {
            animation: {
                'pulse-ring': 'pulse-ring 2s ease-in-out infinite',
                'pulse-ring-delayed': 'pulse-ring 2s ease-in-out infinite 0.5s',
            },
            keyframes: {
                'pulse-ring': {
                    '0%': {
                        transform: 'scale(1)',
                        opacity: '0.3',
                    },
                    '50%': {
                        transform: 'scale(1.1)',
                        opacity: '0.1',
                    },
                    '100%': {
                        transform: 'scale(1.2)',
                        opacity: '0',
                    },
                },
            },
        },
    },
    plugins: [clipPath],
} satisfies Config;

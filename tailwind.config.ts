import type {Config} from "tailwindcss";
import clipPath from "@/plugin/clip-path";

export default {
    content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
    plugins: [clipPath],
} satisfies Config;

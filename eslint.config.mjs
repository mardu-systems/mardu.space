import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "**/node_modules/**",
      ".next/**",
      "out/**",
      "dist/**",
      "coverage/**",
      "public/**",
      "**/*.min.*",
    ],
  },
  {
    rules: {
      // Keep console for errors/warnings; flag others
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "warn",

      // General best practices (warnings to avoid breaking CI immediately)
      eqeqeq: ["warn", "smart"],
      // Enforce braces on multi-line only to reduce noise on one-liners
      curly: ["warn", "multi-line"],
      "prefer-const": "warn",
      "no-var": "warn",
      "object-shorthand": ["warn", "always"],
      "arrow-body-style": ["warn", "as-needed"],

      // Let TS rule handle unused vars
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
  // To fully integrate with Prettier, add 'eslint-config-prettier' and extend it here.
  // Example (after install):
  // ...compat.extends("prettier"),
];

export default eslintConfig;

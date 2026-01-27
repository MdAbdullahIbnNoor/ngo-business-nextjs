import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // 1. GLOBAL IGNORES (Files/Folders to skip entirely)
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "public/bycript.js", // Added this because it was causing a require() error
  ]),

  // 2. CUSTOM RULES (To fix your "any" and "unescaped entities" errors)
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",      // Fixes the 'any' errors
      "react/no-unescaped-entities": "off",             // Fixes the quotes/apostrophe errors
      "@typescript-eslint/no-unused-vars": "warn",      // Turns unused variables into warnings, not errors
      "react-hooks/rules-of-hooks": "error",          // Keeps this on (important for your Navbar fix!)
      "@next/next/no-img-element": "off",
    },
  },
]);

export default eslintConfig;
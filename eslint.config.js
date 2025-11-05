import js from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier"
import eslintPluginUnicorn from "eslint-plugin-unicorn"
import { defineConfig, globalIgnores } from "eslint/config"
import globals from "globals"
import tseslint from "typescript-eslint"

export default defineConfig([
   globalIgnores(["dist", "coverage"]),
   {
      files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
      languageOptions: { globals: globals.browser },
      extends: [
         js.configs.recommended,
         tseslint.configs.strict,
         eslintPluginUnicorn.configs.recommended,
         eslintConfigPrettier
      ],
      rules: {
         /* === Unicorn === */
         "unicorn/filename-case": [
            "error",
            { cases: { pascalCase: true, camelCase: true } }
         ],
         "unicorn/numeric-separators-style": "off",
         "unicorn/no-null": "off",
         "unicorn/prevent-abbreviations": "off",

         /* === TypeScript === */
         "@typescript-eslint/no-unused-vars": [
            "error",
            {
               argsIgnorePattern: "^_",
               caughtErrorsIgnorePattern: "^_",
               destructuredArrayIgnorePattern: "^_",
               varsIgnorePattern: "^_"
            }
         ],
         "@typescript-eslint/no-non-null-assertion": "off",
         "@typescript-eslint/no-explicit-any": "off"
      }
   }
])

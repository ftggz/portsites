import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import globals from "globals";

// Mesmos plugins do eslint-config-next, menos o @next/eslint-plugin-next, que puxa
// fast-glob → micromatch → braces, com alerta alto ainda sem correção (GHSA-vfj7-8cjw-p6xm).
export default defineConfig([
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", ".taste-skill/**"]),
  js.configs.recommended,
  tseslint.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  reactHooks.configs.flat["recommended-latest"],
  jsxA11y.flatConfigs.strict,
  {
    settings: { react: { version: "detect" } },
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      "react/prop-types": "off",
      // Uma faixa com rolagem lateral e sem nada focável dentro precisa receber foco para o teclado
      // conseguir rolá-la; ela leva role="region" e um nome.
      "jsx-a11y/no-noninteractive-tabindex": [
        "error",
        { tags: [], roles: ["tabpanel", "region"], allowExpressionValues: true },
      ],
    },
  },
]);

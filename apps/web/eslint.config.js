import pkgJSON from "./package.json" with { type: "json" }
import pluginJS from "@eslint/js"
import pluginQuery from "@tanstack/eslint-plugin-query"
import pluginReact from "eslint-plugin-react"
import pluginReactHooks from "eslint-plugin-react-hooks"
import { defineConfig } from "eslint/config"
import globals from "globals"
import pluginTSEslint from "typescript-eslint"

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js: pluginJS },
    extends: ["js/recommended"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  pluginTSEslint.configs.strict.map((config) => {
    config.files = ["**/*.{ts,tsx}"]

    return config
  }),
  {
    ...pluginReact.configs.flat.recommended,
    files: ["**/*.{ts,tsx}"],
    settings: {
      react: {
        version: pkgJSON.dependencies.react,
        formComponents: ["Form"],
        linkComponents: [
          { name: "Link", linkAttribute: "to" },
          { name: "NavLink", linkAttribute: "to" },
        ],
      },
    },
  },
  {
    ...pluginReact.configs.flat["jsx-runtime"],
    files: ["**/*.{ts,tsx}"],
  },
  {
    plugins: { "react-hooks": pluginReactHooks },
    rules: pluginReactHooks.configs.recommended.rules,
  },
  ...pluginQuery.configs["flat/recommended"],
  {
    rules: {
      "@typescript-eslint/no-non-null-assertion": "off",
      "react/no-children-prop": "off",
      "react/prop-types": "off",
    },
  },
])

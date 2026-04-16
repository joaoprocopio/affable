/** @type {import("prettier").Config} */
export default {
  semi: false,
  singleQuote: false,
  bracketSameLine: true,
  trailingComma: "all",
  printWidth: 100,
  quoteProps: "consistent",
  endOfLine: "lf",
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
};

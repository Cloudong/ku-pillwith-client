import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import { rules } from "@eslint/js/src/configs/eslint-all";

export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { languageOptions: { globals: globals.browser } },
  {
    rules: { "react/prop-types": 0 },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];

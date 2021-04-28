module.exports = {
    "env": {
        "es2021": true,
        "node": true,
        "browser": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "semi": [2, "always"],
        "no-console": ["error", { "allow": ["error"] }],
        "no-var": "error",
        "object-shorthand": "error",
        "prefer-const": "error",
        "prefer-template": "error",
        "prefer-destructuring": "warn",
        "prefer-rest-params": "warn",
        "prefer-spread": "warn",
        "yoda": "error",
        // "simple-import-sort/imports": "error",
        // "simple-import-sort/exports": "error",
        // "import/first": "error",
        // "import/newline-after-import": "error",
        // "import/no-duplicates": "error"
    }
};

# Configuration Files

Additional configuration files for professional development workflow.

## .gitignore

```gitignore
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# Logs
logs
*.log

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# IDE files
.vscode/
.idea/
*.swp
*.swo
*~

# Temporary files
*.tmp
*.temp

# Build outputs
dist/
build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Cache
.cache/
```

## .editorconfig

```editorconfig
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
indent_style = space
indent_size = 2

[*.md]
trim_trailing_whitespace = false

[*.{html,css,js}]
indent_size = 2

[*.json]
indent_size = 2
```

## .stylelintrc.json

```json
{
  "extends": ["stylelint-config-standard"],
  "rules": {
    "indentation": 2,
    "string-quotes": "single",
    "no-duplicate-selectors": true,
    "color-hex-case": "lower",
    "color-hex-length": "short",
    "declaration-block-trailing-semicolon": "always",
    "declaration-colon-space-after": "always",
    "declaration-colon-space-before": "never",
    "function-comma-space-after": "always",
    "function-url-quotes": "always",
    "media-feature-colon-space-after": "always",
    "media-feature-colon-space-before": "never",
    "media-feature-name-no-unknown": true,
    "property-no-unknown": true,
    "selector-combinator-space-after": "always",
    "selector-combinator-space-before": "always",
    "selector-pseudo-element-colon-notation": "double",
    "unit-no-unknown": true,
    "at-rule-no-unknown": [
      true,
      {
        "ignoreAtRules": ["import"]
      }
    ]
  }
}
```

## .eslintrc.json

```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": ["eslint:recommended"],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "single"],
    "semi": ["error", "always"],
    "no-unused-vars": "warn",
    "no-console": "warn",
    "no-debugger": "error",
    "prefer-const": "error",
    "no-var": "error",
    "arrow-spacing": "error",
    "comma-dangle": ["error", "never"],
    "comma-spacing": "error",
    "comma-style": "error",
    "func-call-spacing": "error",
    "key-spacing": "error",
    "keyword-spacing": "error",
    "object-curly-spacing": ["error", "always"],
    "space-before-blocks": "error",
    "space-infix-ops": "error"
  }
}
```

/* eslint-disable @typescript-eslint/no-require-imports */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'jsx-a11y',
    'import',
    'prettier',
    '@next/next',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'next/core-web-vitals',
    'plugin:prettier/recommended', // ← Prettier連携（推奨）
  ],
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
      typescript: {}, // ← '@/...' エイリアス使用時は有効化
    },
  },
  ignorePatterns: ['node_modules/', '.next/', 'dist/', '.turbo/', 'coverage/'],
  rules: {
    // 独自ルールと既存ルールを統合
    'react/react-in-jsx-scope': 'off',
    
    'import/order': [
      2,
      {
        alphabetize: { order: 'asc', caseInsensitive: true },
        'newlines-between': 'always',
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
          'object',
          'type',
        ],
      },
    ],
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'all',
        endOfLine: 'lf',
        semi: false,
        singleQuote: true,
        printWidth: 80,
        tabWidth: 2,
      },
    ],
    'react/prop-types': 'off',
  },
};

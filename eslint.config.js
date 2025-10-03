import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import eslintPluginImport from 'eslint-plugin-import'
import prettier from 'eslint-plugin-prettier'
import next from '@next/eslint-plugin-next'
import storybook from 'eslint-plugin-storybook'

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['node_modules/', '.next/', 'dist/', '.turbo/', 'coverage/'],

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json', './.storybook/tsconfig.json']
      }
    },

    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      import: eslintPluginImport,
      prettier,
      '@next/next': next,
      storybook
    },

    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
        typescript: {
          project: ['./tsconfig.json', './.storybook/tsconfig.json']
        }
      }
    },

    rules: {
      'react/react-in-jsx-scope': 'off',
      'import/order': 'off',

      // 以下の条件に沿って「許容された書き方と異なるよ！」って警告はするけど、細かい整形まではやらない。
      // 整形の手順としては、まず「.vscode/settings.json」でPrettierのデフォルトのFormatterを指定し、
      // 次に拡張機能でPrettierを入れ、最後に上記で定義したFormatterに従って、Prettierが修正を行う。
      // なお、細かい整形方法は.prettierrcに記述することになる。
      'prettier/prettier': [
        'error',
        {
          trailingComma: 'none',
          endOfLine: 'lf',
          semi: false,
          singleQuote: true,
          printWidth: 80,
          tabWidth: 2
        }
      ],

      'react/prop-types': 'off',

      // v9 では "withSingleExtends" が廃止されたので書き換え
      '@typescript-eslint/no-empty-object-type': [
        'error',
        {
          allowInterfaces: 'always', // ← before: "withSingleExtends"
          allowObjectTypes: 'never'
        }
      ]
    }
  }
]

import { theme } from '../src/themes'
import NextImage from 'next/image'
import type { Preview, Decorator } from '@storybook/react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

/**
 * ==========================
 * GlobalStyle
 * ==========================
 * Storybook 全体に適用される共通スタイル
 */
const GlobalStyle = createGlobalStyle`
  html, body, textarea {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    transition: 0.25s;
    color: #000;
  }
`

/**
 * ==========================
 * Storybook 共通パラメータ
 * ==========================
 * actions や controls の設定
 */
export const parameters: Preview['parameters'] = {
  actions: { argTypesRegex: '^on[a-z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
}

/**
 * ==========================
 * Decorators
 * ==========================
 * すべてのストーリーを ThemeProvider + GlobalStyle でラップ
 */
const withTheme: Decorator = (Story) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Story />
  </ThemeProvider>
)

export const decorators = [withTheme]

/**
 * ==========================
 * next/image の差し替え
 * ==========================
 * Storybook 環境では最適化処理が不要なので、
 * unoptimized を強制してシンプルに動かす
 */
const OriginalNextImage = NextImage
type NextImageProps = React.ComponentProps<typeof NextImage>

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props: NextImageProps) =>
    typeof props.src === 'string' ? (
      <OriginalNextImage {...props} unoptimized blurDataURL={props.src} />
    ) : (
      <OriginalNextImage {...props} unoptimized />
    )
})

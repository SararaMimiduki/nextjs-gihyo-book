// .storybook/preview.ts
import type { Preview } from '@storybook/react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { theme } from '../src/themes';
import NextImage from 'next/image';

// グローバルスタイル定義
const GlobalStyle = createGlobalStyle`
  html,
  body,
  textarea {
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
`;

// Storybook の共通設定
export const parameters: Preview['parameters'] = {
  actions: { argTypesRegex: '^on[a-z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

// デコレーターで ThemeProvider と GlobalStyle を適用
/*
export const decorators: Preview['decorators'] = [
  (story) => (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  ),
];
*/

// next/image の差し替え（Storybook 環境向け）
const OriginalNextImage = NextImage as unknown as React.FC<any>;

/*
Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props: any) =>
    typeof props.src === 'string' ? (
      <OriginalNextImage {...props} unoptimized blurDataURL={props.src} />
    ) : (
      <OriginalNextImage {...props} unoptimized />
    ),
});
*/

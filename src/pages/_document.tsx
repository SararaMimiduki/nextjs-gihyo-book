/********* 5.2.2 styled-componentsの設定 追加ファイル *********/
/* このファイルを追加することで、SSRでも「styled-components」が有効化される */

// pages/_document.tsx
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  type DocumentContext,
  type DocumentInitialProps,
} from 'next/document'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      // App 全体を StyleSheetManager で包み、サーバー側でスタイルを収集
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => (
            <StyleSheetManager sheet={sheet.instance}>
              <App {...props} />
            </StyleSheetManager>
          ),
        })

      const initialProps = await Document.getInitialProps(ctx)

      // 収集したスタイルを <Head> 内へ差し込む
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang="ja">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

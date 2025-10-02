import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  /********* 5.2.2 styled-componentsの設定 ここから *********/
  compiler: {
    // styledComponentsの有効化
    styledComponents: true
  }
  /********* 5.2.2 styled-componentsの設定 ここまで *********/
}

/********* 5.2.10 テスト環境構築(本番環境におけるdate-testidの削除) ここから *********/
// 本番環境用の設定追加
if (process.env.NODE_ENV === 'production') {
  nextConfig.compiler = {
    ...nextConfig.compiler,
    // React Testing Libraryで使用するdata-testid属性を削除
    reactRemoveProperties: {
      properties: ['^data-testid$']
    }
  }
}
/********* 5.2.10 テスト環境構築(本番環境におけるdate-testidの削除) ここまで *********/

export default nextConfig

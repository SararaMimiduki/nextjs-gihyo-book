import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  /********* 5.2.2 styled-componentsの設定 ここから *********/
  compiler: {
    // styledComponentsの有効化
    styledComponents: true
  }
  /********* 5.2.2 styled-componentsの設定 ここまで *********/
};

export default nextConfig;

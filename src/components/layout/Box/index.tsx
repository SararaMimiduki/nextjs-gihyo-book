/* eslint-disable prettier/prettier */
// eslint-disable-next-line import/no-named-as-default
import styled from 'styled-components'

import { toPropValue, Color, Space, AppTheme } from '@/utils/styles'

import type { Responsive } from '@/types/styles'

/**
 * styled-components の DefaultTheme を
 * プロジェクト固有の AppTheme で拡張する宣言
 * → これにより props.theme に AppTheme の型が入る
 */
declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}

/**
 * Box コンポーネントに渡せる Props の型定義
 *
 * - 各プロパティは Responsive<T> 型になっているので、
 *   単一値だけでなく { base: xxx, md: yyy } のように
 *   ブレークポイントごとの値指定も可能
 * - Color や Space は theme に登録された値を参照する型
 */
export type BoxProps = {
  // カラー系
  color?: Responsive<Color>
  backgroundColor?: Responsive<Color>

  // サイズ系
  width?: Responsive<string>
  height?: Responsive<string>
  minWidth?: Responsive<string>
  minHeight?: Responsive<string>

  // レイアウト系
  display?: Responsive<string>
  border?: Responsive<string>
  overflow?: Responsive<string>

  // マージン系
  margin?: Responsive<Space>
  marginTop?: Responsive<Space>
  marginRight?: Responsive<Space>
  marginBottom?: Responsive<Space>
  marginLeft?: Responsive<Space>

  // パディング系
  padding?: Responsive<Space>
  paddingTop?: Responsive<Space>
  paddingRight?: Responsive<Space>
  paddingBottom?: Responsive<Space>
  paddingLeft?: Responsive<Space>
}

/**
 * Box コンポーネント
 *
 * - styled.div をベースに拡張
 * - 各 props を CSS プロパティに変換するため toPropValue を利用
 * - theme と組み合わせることで、レスポンシブかつテーマベースのスタイルを適用可能
 *
 * 例:
 * <Box color="primary" padding={{ base: "4px", md: "8px" }} />
 * → 小画面では padding: 4px、大画面では padding: 8px
 */
const Box = styled.div<BoxProps>`
  /* 色指定 */
  ${(props) => toPropValue('color', props.color, props.theme)}
  ${(props) => toPropValue('background-color', props.backgroundColor, props.theme)}

  /* サイズ指定 */
  ${(props) => toPropValue('width', props.width, props.theme)}
  ${(props) => toPropValue('height', props.height, props.theme)}
  ${(props) => toPropValue('min-width', props.minWidth, props.theme)}
  ${(props) => toPropValue('min-height', props.minHeight, props.theme)}

  /* レイアウト制御 */
  ${(props) => toPropValue('display', props.display, props.theme)}
  ${(props) => toPropValue('border', props.border, props.theme)}
  ${(props) => toPropValue('overflow', props.overflow, props.theme)}

  /* マージン */
  ${(props) => toPropValue('margin', props.margin, props.theme)}
  ${(props) => toPropValue('margin-top', props.marginTop, props.theme)}
  ${(props) => toPropValue('margin-right', props.marginRight, props.theme)}
  ${(props) => toPropValue('margin-bottom', props.marginBottom, props.theme)}
  ${(props) => toPropValue('margin-left', props.marginLeft, props.theme)}

  /* パディング */
  ${(props) => toPropValue('padding', props.padding, props.theme)}
  ${(props) => toPropValue('padding-top', props.paddingTop, props.theme)}
  ${(props) => toPropValue('padding-right', props.paddingRight, props.theme)}
  ${(props) => toPropValue('padding-bottom', props.paddingBottom, props.theme)}
  ${(props) => toPropValue('padding-left', props.paddingLeft, props.theme)}
`

export default Box

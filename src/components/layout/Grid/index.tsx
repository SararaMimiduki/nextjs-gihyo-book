/* eslint-disable prettier/prettier */
import styled from 'styled-components'

// Box はベースとなるレイアウト用コンポーネント
// BoxProps は color / margin / padding など共通スタイルの型定義
import Box, { BoxProps } from 'components/layout/Box'

// Grid 専用で扱いたい CSS プロパティの型を import
import type {
  CSSPropertyGridArea,
  CSSPropertyGridAutoFlow,
  CSSPropertyGridColumn,
  CSSPropertyGridRow,
  Responsive,
} from 'types/styles'

import { toPropValue } from 'utils/styles'

/**
 * ==========================
 * GridProps
 * ==========================
 * BoxProps を継承しつつ、
 * Grid レイアウト関連の CSS プロパティを追加
 * すべて Responsive<T> を使うことで
 * { base: value, md: value } のようなレスポンシブ指定も可能
 */
type GridProps = BoxProps & {
  gridGap?: Responsive<string>                          // grid-gap: グリッド全体の隙間
  gridColumnGap?: Responsive<string>                    // grid-column-gap: 列間の隙間
  gridRowGap?: Responsive<string>                       // grid-row-gap: 行間の隙間
  gridColumn?: Responsive<CSSPropertyGridColumn>        // grid-column: セルの列位置
  gridRow?: Responsive<CSSPropertyGridRow>              // grid-row: セルの行位置
  gridAutoFlow?: Responsive<CSSPropertyGridAutoFlow>    // grid-auto-flow: アイテムの自動配置ルール
  gridAutoColumns?: Responsive<string>                  // grid-auto-columns: 暗黙的に生成される列のサイズ
  gridAutoRows?: Responsive<string>                     // grid-auto-rows: 暗黙的に生成される行のサイズ
  gridTemplateColumns?: Responsive<string>              // grid-template-columns: 列の定義
  gridTemplateRows?: Responsive<string>                 // grid-template-rows: 行の定義
  gridTemplateAreas?: Responsive<CSSPropertyGridArea>   // grid-template-areas: 名前付きエリアレイアウト
  gridArea?: Responsive<string>                         // grid-area: アイテムをエリアに配置
}

/**
 * ==========================
 * Grid コンポーネント
 * ==========================
 * Box をベースに display: grid を付与したコンポーネント。
 * 各種 grid プロパティを toPropValue() 経由で theme にバインドし、
 * CSS を動的に生成する。
 */
const Grid = styled(Box)<GridProps>`
  ${(props) => toPropValue('grid-gap', props.gridGap, props.theme)}
  ${(props) => toPropValue('grid-column-gap', props.gridColumnGap, props.theme)}
  ${(props) => toPropValue('grid-row-gap', props.gridRowGap, props.theme)}
  ${(props) => toPropValue('grid-row', props.gridRow, props.theme)}
  ${(props) => toPropValue('grid-column', props.gridColumn, props.theme)}
  ${(props) => toPropValue('grid-auto-flow', props.gridAutoFlow, props.theme)}
  ${(props) => toPropValue('grid-auto-columns', props.gridAutoColumns, props.theme)}
  ${(props) => toPropValue('grid-auto-rows', props.gridAutoRows, props.theme)}
  ${(props) => toPropValue('grid-template-columns', props.gridTemplateColumns, props.theme)}
  ${(props) => toPropValue('grid-template-rows', props.gridTemplateRows, props.theme)}
  ${(props) => toPropValue('grid-template-areas', props.gridTemplateAreas, props.theme)}
  ${(props) => toPropValue('grid-area', props.gridArea, props.theme)}
`

// デフォルトで display: grid に設定
Grid.defaultProps = {
  display: 'grid',
}

export default Grid

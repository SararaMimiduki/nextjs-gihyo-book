import { theme } from '@/themes' // プロジェクトのテーマ定義をインポート

// ================== Theme 型の定義 ==================
// `theme` オブジェクトの型を取得
export type AppTheme = typeof theme

// 各テーマプロパティのキー型を抽出
type SpaceThemeKeys = keyof AppTheme['space']
type ColorThemeKeys = keyof AppTheme['colors']
type FontSizeThemeKeys = keyof AppTheme['fontSizes']
type LetterSpacingThemeKeys = keyof AppTheme['letterSpacings']
type LineHeightThemeKeys = keyof AppTheme['lineHeights']

// CSSプロパティに渡すときに利用できる型（テーマのキー or 自由文字列）
export type Space = SpaceThemeKeys | (string & {})
export type Color = ColorThemeKeys | (string & {})
export type FontSize = FontSizeThemeKeys | (string & {})
export type LetterSpacing = LetterSpacingThemeKeys | (string & {})
export type LineHeight = LineHeightThemeKeys | (string & {})

// ================== Responsive 型定義 ==================
/**
 * 各ブレークポイントごとに CSS プロパティを指定するための型
 * 例:
 * { base: "red", md: "blue" }
 */
type ResponsiveProp<T> = {
  base?: T // デフォルト値
  sm?: T // 640px以上
  md?: T // 768px以上
  lg?: T // 1024px以上
  xl?: T // 1280px以上
}

/**
 * 単一の値 or 各ブレークポイント指定の両方を許可する型
 */
type Responsive<T> = T | ResponsiveProp<T>

// ブレークポイントの定義
const BREAKPOINTS: Record<'sm' | 'md' | 'lg' | 'xl', string> = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px'
}

// ================== Responsive値をCSS文字列に変換 ==================
/**
 * Responsive型をCSSプロパティ文字列に変換する関数
 * - 単一値: "color: red;"
 * - レスポンシブ値: "@media screen and (min-width: 768px) { color: blue; }"
 */
export function toPropValue<T>(
  propKey: string, // CSSプロパティ名 (例: "color")
  prop?: Responsive<T>, // 値 (例: "red" or { base: "red", md: "blue" })
  theme?: AppTheme // テーマオブジェクト
) {
  if (prop === undefined) return undefined

  // レスポンシブ指定のオブジェクトだった場合
  if (isResponsivePropType(prop)) {
    const result: string[] = []

    for (const responsiveKey in prop) {
      const value = prop[responsiveKey as keyof Responsive<T>]
      if (!value) continue

      if (responsiveKey === 'base') {
        // デフォルトのスタイル
        result.push(
          `${propKey}: ${toThemeValueIfNeeded(propKey, value, theme)};`
        )
      } else if (responsiveKey in BREAKPOINTS) {
        // ブレークポイントに応じたメディアクエリの生成
        const breakpoint =
          BREAKPOINTS[responsiveKey as keyof typeof BREAKPOINTS]
        const style = `${propKey}: ${toThemeValueIfNeeded(propKey, value, theme)};`
        result.push(`@media screen and (min-width: ${breakpoint}) { ${style} }`)
      }
    }
    return result.join('\n')
  }

  // 単一値だった場合
  return `${propKey}: ${toThemeValueIfNeeded(propKey, prop, theme)};`
}

// ================== Themeマッピング ==================
// CSSプロパティごとにテーマから値を解決する対象を定義
const SPACE_KEYS = new Set([
  'margin',
  'margin-top',
  'margin-left',
  'margin-bottom',
  'margin-right',
  'padding',
  'padding-top',
  'padding-left',
  'padding-bottom',
  'padding-right'
])
const COLOR_KEYS = new Set(['color', 'background-color'])
const FONT_SIZE_KEYS = new Set(['font-size'])
const LETTER_SPACING_KEYS = new Set(['letter-spacing'])
const LINE_HEIGHT_KEYS = new Set(['line-height'])

/**
 * 値がテーマに定義されていれば対応する値に変換
 * （例: "sm" → "640px"、 "primary" → "#ff0000"）
 */
function toThemeValueIfNeeded<T>(propKey: string, value: T, theme?: AppTheme) {
  if (!theme) return value

  if (SPACE_KEYS.has(propKey) && isSpaceThemeKeys(value, theme)) {
    return theme.space[value]
  }
  if (COLOR_KEYS.has(propKey) && isColorThemeKeys(value, theme)) {
    return theme.colors[value]
  }
  if (FONT_SIZE_KEYS.has(propKey) && isFontSizeThemeKeys(value, theme)) {
    return theme.fontSizes[value]
  }
  if (
    LETTER_SPACING_KEYS.has(propKey) &&
    isLetterSpacingThemeKeys(value, theme)
  ) {
    return theme.letterSpacings[value]
  }
  if (LINE_HEIGHT_KEYS.has(propKey) && isLineHeightThemeKeys(value, theme)) {
    return theme.lineHeights[value]
  }

  return value
}

// ================== 型ガード群 ==================
function isResponsivePropType<T>(prop: any): prop is ResponsiveProp<T> {
  return (
    prop &&
    (prop.base !== undefined ||
      prop.sm !== undefined ||
      prop.md !== undefined ||
      prop.lg !== undefined ||
      prop.xl !== undefined)
  )
}

function isSpaceThemeKeys(prop: any, theme: AppTheme): prop is SpaceThemeKeys {
  return (prop as string) in theme.space
}

function isColorThemeKeys(prop: any, theme: AppTheme): prop is ColorThemeKeys {
  return (prop as string) in theme.colors
}

function isFontSizeThemeKeys(
  prop: any,
  theme: AppTheme
): prop is FontSizeThemeKeys {
  return (prop as string) in theme.fontSizes
}

function isLetterSpacingThemeKeys(
  prop: any,
  theme: AppTheme
): prop is LetterSpacingThemeKeys {
  return (prop as string) in theme.letterSpacings
}

function isLineHeightThemeKeys(
  prop: any,
  theme: AppTheme
): prop is LineHeightThemeKeys {
  return (prop as string) in theme.lineHeights
}

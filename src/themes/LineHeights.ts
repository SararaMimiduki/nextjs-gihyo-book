// 型定義
export type LineHeights =
  | '17px'
  | '19px'
  | '22px'
  | '26px'
  | '28px'
  | '37px'
  | '43px'

// 実体（型に合致する配列であることを保証済）
export const lineHeights = [
  '17px',
  '19px',
  '22px',
  '26px',
  '28px',
  '37px',
  '43px'
] as const satisfies readonly LineHeights[]

type TestStyle =
  | 'あいうえお'
  | 'かきくけこ'
  | 'さしすせそ'
  | 'たちつてと'
  | 'は皮膚へほ'

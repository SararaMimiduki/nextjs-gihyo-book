// 型定義
export type LetterSpacing = '0.06px' | '0.07px' | '0.08px' | '0.09px' | '0.1px'

// 実体（型に合致する配列であることを保証済）
export const letterSpacings = [
  '0.06px',
  '0.07px',
  '0.08px',
  '0.09px',
  '0.1px'
] as const satisfies readonly LetterSpacing[]

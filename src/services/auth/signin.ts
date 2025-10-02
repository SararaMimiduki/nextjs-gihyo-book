// typesは後ほど定義
import { fetcher } from 'utils'

import type { ApiContext, User } from '@/types/data'

//先ほど定義したsrc/utils/index.tsから読み込み

export type SigninParams = {
  /**
   * ユーザー名
   * サンプルユーザーのユーザー名は "user"
   */
  username: string

  /**
   * パスワード
   * サンプルユーザーのパスワードは "password"
   */
  password: string
}

/**
 * 認証API（サインイン）
 * @param context APIコンテキスト
 * @param params パラメータ
 * @returns ログインユーザー
 */
const signin = async (
  context: ApiContext,
  params: SigninParams
): Promise<User> => {
  return await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, '')}/auth/signin`,
    {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(params)
    }
  )
}

export default signin

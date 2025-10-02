import { fetcher } from 'utils'

import type { ApiContext, User } from 'types'

export type GetUserParams = {
  /**
   * ユーザID
   */
  id: number
}

/**
 * ユーザAPI（個別取得）
 * @param context APIコンテキスト
 * @param params パラメータ
 * @returns ユーザー
 */
const getUser = async (
  context: ApiContext,
  { id }: GetUserParams
): Promise<User> => {
  /**
  // ユーザーAPI
  // サンプルレスポンス
  {
    "id": "1",
    "username": "taketo",
    "displayName": "Taketo Toshida",
    "email": "taketo@example.com",
    "profileImageUrl": "/users/1.png",
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
  }
   */
  return await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, '')}/users/${id}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      }
    }
  )
}

export default getUser

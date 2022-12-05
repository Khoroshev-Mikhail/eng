import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Progress, Word } from '../types/types'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { exitThunk } from '../clientAPI/userAPI';
import { JWT_EXPIRE, REFRESH_TOKEN, TOKEN } from '../variables/localStorageVariables';

const baseQuery = fetchBaseQuery({ 
    //const token = (getState() as RootState).userToken;
    baseUrl: 'http://localhost:3002/vocabulary',
    prepareHeaders: (headers: Headers) => {
      headers.set('Authorization', `Bearer ${localStorage.getItem(TOKEN) || 'unknown' } ${localStorage.getItem(REFRESH_TOKEN) || 'unknown'}`)
      return headers
    }
   })
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if(result.error?.originalStatus === 401 || result.error?.status === 401){
        const refresh = await fetch('http://localhost:3002/user/refreshToken', {         
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }, 
            body: JSON.stringify({
                refreshToken: localStorage.getItem(REFRESH_TOKEN)
            })
        })
        if(refresh.status === 200){
            const data = await refresh.json()   
            console.log('Токены получены. Перезапускаю функцию', data)
            localStorage.setItem(TOKEN, data.token)
            localStorage.setItem(REFRESH_TOKEN, data.refresh_token)
            localStorage.setItem(JWT_EXPIRE, data.jwt_expire)
            return await baseQuery(args, api, extraOptions)
        } else{
            console.log('Ошибка токена. Диспатчу exitThunk()')
            api.dispatch(exitThunk())
        }
    }
    return result
}
type QueryBody = {
    groupId: number | string, 
    userId: number | string
}
export const vocabularyAPI = createApi({
    reducerPath: 'vocabularyApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['vocabulary'],
    endpoints: (builder) => ({
        getVocabulary: builder.query<any, any>({
            query: (id: number) =>  `/${id}`,
            providesTags: (result, error, id) => [{ type: 'vocabulary', id }],
        }),
        getUnlerned: builder.query<any, any>({ //может надо разбить на отдельные методы лучше
            query: (req) =>  `/${req.userId}/unlerned/${req.method}/group/${req.groupId}`,
            providesTags: (result, error, id) => [{ type: 'vocabulary', id }],
        }),
        getUnlernedSpell: builder.query<any, any>({ //может надо разбить на отдельные методы лучше
            query: (req) =>  `/${req.userId}/unlerned/spelling/group/${req.groupId}`,
            providesTags: (result, error, id) => [{ type: 'vocabulary', id }],
            transformResponse: (resp: Word) => ({...resp, trueVariant: resp.eng, eng: resp.eng.toUpperCase().split('').sort(() => Math.random() - 0.5).join('')})
        }),
        setVocabulary: builder.mutation<any, {method: string, word_id: number, userId: number}>({
            query: (body) => ({
                url: `/${body.userId}/${body.method}`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['vocabulary']
        }),
        getGroupProgess: builder.query<Progress, QueryBody>({
            query: (body) =>  `groups/${body.groupId || 0}/progress/${body.userId || 0}`, //костыль, есть кейсы когда в группу кладется undefined, а userId 0, Надо обработать ошибку нормально
            providesTags: ['vocabulary'], 
        }),
    })
})

export const { useGetVocabularyQuery, useSetVocabularyMutation, useGetUnlernedQuery, useGetUnlernedSpellQuery, useGetGroupProgessQuery } = vocabularyAPI
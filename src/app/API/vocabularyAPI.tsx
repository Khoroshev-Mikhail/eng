import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Word } from '../types/types'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { exitThunk } from './userAPI';

const baseQuery = fetchBaseQuery({ 
    //const token = (getState() as RootState).userToken;
    baseUrl: 'http://localhost:3002/vocabulary',
    prepareHeaders: (headers: Headers) => {
      headers.set('Authorization', `Bearer ${localStorage.getItem('token') || 'unknown' } ${localStorage.getItem('refreshToken') || 'unknown'}`)
      return headers
    }
   })
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if(result.error?.originalStatus === 401 || result.error?.status === 401){
        const refresh = await fetch('http://localhost:3002/refreshToken', {         
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }, 
            body: JSON.stringify({
                refreshToken: localStorage.getItem('refreshToken')
            })
        })
        if(refresh.status === 200){
            const data = await refresh.json()   
            localStorage.setItem('token', data.newToken)
            localStorage.setItem('refreshToken', data.newRefresh)
            localStorage.setItem('jwtExpire', data.jwtExpire)
            console.log('Токены получены. Перезапускаю функцию')
            result = await baseQuery(args, api, extraOptions)
        } else{
            console.log('Ошибка токена. Диспатчу exitThunk()')
            api.dispatch(exitThunk())
        }
    }
    return result
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
        getGroupProgess: builder.query<{english: number, russian: number, spelling: number, auding: number}, {groupId: number, userId: number}>({
            query: (body) =>  `groups/${body.groupId}/progress/${body.userId}`,
            providesTags: ['vocabulary'], 
        }),
    })
})

export const { useGetVocabularyQuery, useSetVocabularyMutation, useGetUnlernedQuery, useGetUnlernedSpellQuery, useGetGroupProgessQuery } = vocabularyAPI
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { REFRESH_TOKEN, TOKEN } from '../variables/localStorageVariables';
import { exitThunk } from '../clientAPI/userSliceAPI';
import { Group } from '../types/types'
import { setUserToLocalStorage } from '../fns/localStorageFns';

const baseQuery = fetchBaseQuery({ 
    baseUrl: 'http://localhost:3002/groups',
    prepareHeaders: (headers: Headers) => {
      headers.set('Authorization', `Bearer ${localStorage.getItem(TOKEN) || 'unknown' }`)
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
            console.log('Токены получены. Перезапускаю функцию')
            const data = await refresh.json()   
            setUserToLocalStorage(data)
            return await baseQuery(args, api, extraOptions)
        } else{
            console.log('Ошибка токена. Диспатчу exitThunk()')
            api.dispatch(exitThunk())
        }
    }
    return result
}

export const wordsFromGroupAPI = createApi({
    reducerPath: 'wordsFromGroupAPI',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['wordsFromGroup'],
    endpoints: (builder) => ({
        getWordsFromGroup: builder.query<Group[], string | number>({
            query: (id) =>  `/${id}/words`,
            providesTags: (result) =>
                result
                ? [
                    ...result.map(({ id }: any) => ({ type: 'wordsFromGroup' as const, id })),
                    { type: 'wordsFromGroup', id: 'LIST' },
                    ]
                : [{ type: 'wordsFromGroup', id: 'LIST' }], 
            transformResponse: (resp: Group[]) => resp.sort((a: Group, b: Group) => a.id - b.id)
        }),
        setWordToGroup: builder.mutation<void, { id: string | number, word_id: string | number }>({
            query: (body) => ({
                url: `/${body.id}/words`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['wordsFromGroup']
        }),
        deleteWordFromGroup: builder.mutation<void, { id: string | number, word_id: string | number }>({
            query: (body) => ({
                url: `/${body.id}/words`,
                method: 'DELETE',
                body
            }),
            invalidatesTags: ['wordsFromGroup']
        })
    })
})

export const { useGetWordsFromGroupQuery, useSetWordToGroupMutation, useDeleteWordFromGroupMutation } = wordsFromGroupAPI
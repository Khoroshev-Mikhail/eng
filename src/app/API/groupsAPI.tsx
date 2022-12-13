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

export const groupsAPI = createApi({
    reducerPath: 'groupsApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['groups'],
    endpoints: (builder) => ({
        getGroups: builder.query<Group[], void>({
            query: () =>  `/`,
            providesTags: (result) =>
                result
                ? [
                    ...result.map(({ id }: any) => ({ type: 'groups' as const, id })),
                    { type: 'groups', id: 'LIST' },
                    ]
                : [{ type: 'groups', id: 'LIST' }], 
            transformResponse: (resp: Group[]) => resp.sort((a: Group, b: Group) => a.id - b.id)
        }),
        getOneGroup: builder.query<Group, number>({
            query: (id: number) =>  `/${id}`,
            providesTags: (result, error, id) =>[{ type: 'groups', id}]
        }),
        setGroup: builder.mutation<void, {title: string, title_rus: string}>({
            query: (body) => ({
                url: `/`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['groups']
        }),
        deleteGroup: builder.mutation<void, number>({
            query: (id) => ({
                url: `/`,
                method: 'DELETE',
                body: {id}
            }),
            invalidatesTags: ['groups']
        }),
        putGroup: builder.mutation<void, { id: number, title: string, title_rus: string }>({
            query: (body) => ({
                url: `/`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['groups']
        }),
        addWordToGroup: builder.mutation<void, { id: number, word_id: number } >({
            query: (body) => ({
                url: `add-word`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['groups']
        }),
        deleteWordFromGroup: builder.mutation<void, { id: number, word_id: number }>({
            query: (body) => ({
                url: `delete-word`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['groups']
        })
    })
})

export const { useGetGroupsQuery, useGetOneGroupQuery, useSetGroupMutation, useDeleteGroupMutation, usePutGroupMutation, useAddWordToGroupMutation, useDeleteWordFromGroupMutation } = groupsAPI
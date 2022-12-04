import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Group } from '../types/types'
export const groupsAPI = createApi({
    reducerPath: 'groupsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3002/groups',
        prepareHeaders: (headers: Headers) => {
            headers.set('Authorization', `Bearer Ara`)
            return headers
        }
    }),
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
        putGroup: builder.mutation<void, {id: number, title: string, title_rus: string}>({
            query: (body) => ({
                url: `/`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['groups']
        }),
        addWordToGroup: builder.mutation<void, {id: number, word_id: number}>({
            query: (body) => ({
                url: `add-word`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['groups']
        }),
        deleteWordFromGroup: builder.mutation<void, {id: number, word_id: number}>({
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
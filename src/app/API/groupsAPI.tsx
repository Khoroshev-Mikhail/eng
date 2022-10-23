import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Group } from '../types/types'
export const groupsAPI = createApi({
    reducerPath: 'groupsApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3002/'}),
    tagTypes: ['groups'],
    endpoints: (builder) => ({
        getGroups: builder.query<Group[], void>({
            query: () =>  `groups`,
            providesTags: (result) =>
                result
                ? [
                    ...result.map(({ id }: any) => ({ type: 'groups' as const, id })),
                    { type: 'groups', id: 'LIST' },
                    ]
                : [{ type: 'groups', id: 'LIST' }], 
            transformResponse: (resp: Group[]) => resp.sort((a: Group, b: Group) => a.id - b.id)
        }),
        setGroup: builder.mutation<void, {title: string, title_rus: string}>({
            query: (body) => ({
                url: `groups`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['groups']
        }),
        deleteGroup: builder.mutation<void, number>({
            query: (id) => ({
                url: `groups`,
                method: 'DELETE',
                body: {id}
            }),
            invalidatesTags: ['groups']
        }),
        putGroup: builder.mutation<void, {id: number, title: string, title_rus: string}>({
            query: (body) => ({
                url: `groups`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['groups']
        }),
        addWordToGroup: builder.mutation<void, {id: number, word_id: number}>({
            query: (body) => ({
                url: `addWordToGroup`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['groups']
        }),
        deleteWordFromGroup: builder.mutation<void, {id: number, word_id: number}>({
            query: (body) => ({
                url: `deleteWordFromGroup`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['groups']
        })
    })
})

export const { useGetGroupsQuery, useSetGroupMutation, useDeleteGroupMutation, usePutGroupMutation, useAddWordToGroupMutation, useDeleteWordFromGroupMutation } = groupsAPI
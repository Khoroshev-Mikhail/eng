import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const groupsAPI = createApi({
    reducerPath: 'groupsApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3002/'}),
    tagTypes: ['groups'],
    endpoints: (builder) => ({
        getGroups: builder.query<any, void>({
            query: () =>  `groups`,
            providesTags: (result) =>
                result
                ? [
                    ...result.map(({ id }: any) => ({ type: 'words', id })),
                    { type: 'groups', id: 'LIST' },
                    ]
                : [{ type: 'groups', id: 'LIST' }], 
        }),
        setGroup: builder.mutation<any, any>({
            query: (body) => ({
                url: `groups`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['groups']
        }),
        deleteGroup: builder.mutation<any, any>({
            query: (id) => ({
                url: `groups`,
                method: 'DELETE',
                body: {id}
            }),
            invalidatesTags: ['groups']
        }),
        putGroup: builder.mutation<any, any>({
            query: (body) => ({
                url: `groups`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['groups']
        }),
        addWordToGroup: builder.mutation<any, any>({
            query: (body) => ({
                url: `addWordToGroup`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['groups']
        }),
        deleteWordFromGroup: builder.mutation<any, any>({
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
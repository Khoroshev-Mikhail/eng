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
    })
})

export const { useGetGroupsQuery, useSetGroupMutation } = groupsAPI
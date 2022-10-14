import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const wordsAPI = createApi({
    reducerPath: 'wordsApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3002/'}),
    tagTypes: ['words'],
    endpoints: (builder) => ({
        getAllWords: builder.query<any, void>({
            query: () =>  `words`,
            providesTags: (result) =>
                result
                ? [
                    ...result.map(({ id }: any) => ({ type: 'words', id })),
                    { type: 'words', id: 'LIST' },
                    ]
                : [{ type: 'words', id: 'LIST' }], 
        }),
        getWordsByGroup: builder.query<any, any>({
            query: (group) =>  `words/group/${group}`,
            providesTags: (result) =>
                result
                ? [
                    ...result.map(({ id }: any) => ({ type: 'words', id })),
                    { type: 'words', id: 'LIST' },
                    ]
                : [{ type: 'words', id: 'LIST' }], 
        }),
        setWord: builder.mutation<any, any>({
            query: (body) => ({
                url: `words`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['words']
        }),
    })
})

export const { useGetAllWordsQuery, useSetWordMutation, useGetWordsByGroupQuery } = wordsAPI
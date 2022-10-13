import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { UserVocabular, Word } from '../types/types'

export const userWordsAPI = createApi({
    reducerPath: 'userWordsApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3002/'}),
    tagTypes: ['words'],
    endpoints: (builder) => ({
        getUserWords: builder.query<any, void>({
            query: () =>  `words`,
            //transformResponse: (response: { userVocabular: UserVocabular }) => response.userVocabular,
            providesTags: (result) =>
                result
                ? [
                    ...result.map(({ id }: any) => ({ type: 'words', id })),
                    { type: 'words', id: 'LIST' },
                    ]
                : [{ type: 'words', id: 'LIST' }], 
        }),
        setUserWords: builder.mutation<any, any>({
            query: (body) => ({
                url: `words`,
                method: 'POST',
                body
            }),
            //transformResponse: (response: { userVocabular: UserVocabular }) => response.userVocabular,
            invalidatesTags: ['words']
        }),
    })
})

export const { useGetUserWordsQuery, useSetUserWordsMutation } = userWordsAPI
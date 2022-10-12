import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { UserVocabular } from '../types/types'

export const userWordsAPI = createApi({
    reducerPath: 'userWordsApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001/'}),
    tagTypes: ['userVocabular'],
    endpoints: (builder) => ({
        getUserWords: builder.query<any, string | number>({
            query: (id) =>  `userWords/${id}`,
            transformResponse: (response: { userVocabular: UserVocabular }) => response.userVocabular,
            providesTags: (result, error, id) => [{ type: 'userVocabular', id }],
        }),
        setUserWords: builder.mutation<any, any>({
            query: ({userId, method, wordId}) => ({
                url: `userWords/${userId}`,
                method: 'POST',
                body: {method, wordId}
            }),
            transformResponse: (response: { userVocabular: UserVocabular }) => response.userVocabular,
            invalidatesTags: ['userVocabular']
        }),
    })
})

export const { useGetUserWordsQuery } = userWordsAPI
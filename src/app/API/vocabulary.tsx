import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const vocabularyAPI = createApi({
    reducerPath: 'vocabularyApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3002/'}),
    tagTypes: ['vocabulary'],
    endpoints: (builder) => ({
        getVocabulary: builder.query<any, any>({
            query: (id: any) =>  `vocabulary/${id}`,
            providesTags: (result, error, id) => [{ type: 'vocabulary', id }],
        }),
        getUnlerned: builder.query<any, any>({
            query: (req) =>  `/vocabulary/${req.userId}/unlerned/${req.method}/group/${req.groupId}`,
            providesTags: (result, error, id) => [{ type: 'vocabulary', id }],
        }),
        setVocabulary: builder.mutation<any, any>({
            query: (body) => ({
                url: `vocabulary/${body.userId}/${body.method}`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['vocabulary']
        }),
        wrongAnswer: builder.mutation<any, any>({
            query: () => ({
                url: `vocabulary/wrong`,
                method: 'PUT'
            }),
            invalidatesTags: ['vocabulary']
        })
    })
})

export const { useGetVocabularyQuery, useSetVocabularyMutation, useGetUnlernedQuery, useWrongAnswerMutation } = vocabularyAPI
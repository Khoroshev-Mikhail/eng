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
        setVocabulary: builder.mutation<any, any>({
            query: (body) => ({
                url: `vocabulary/${body.user_id}/${body.method}`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['vocabulary']
        }),
    })
})

export const { useGetVocabularyQuery, useSetVocabularyMutation } = vocabularyAPI
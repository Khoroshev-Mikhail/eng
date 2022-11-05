import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Word } from '../types/types'

export const vocabularyAPI = createApi({
    reducerPath: 'vocabularyApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3002/vocabulary',
        prepareHeaders: (headers: Headers) => {
            headers.set('Authorization', `Bearer Ara`)
            return headers
        }
    }),
    tagTypes: ['vocabulary'],
    endpoints: (builder) => ({
        getVocabulary: builder.query<any, any>({
            query: (id: number) =>  `/${id}`,
            providesTags: (result, error, id) => [{ type: 'vocabulary', id }],
        }),
        getUnlerned: builder.query<any, any>({ //может надо разбить на отдельные методы лучше
            query: (req) =>  `/${req.userId}/unlerned/${req.method}/group/${req.groupId}`,
            providesTags: (result, error, id) => [{ type: 'vocabulary', id }],
        }),
        getUnlernedSpell: builder.query<any, any>({ //может надо разбить на отдельные методы лучше
            query: (req) =>  `/${req.userId}/unlerned/spelling/group/${req.groupId}`,
            providesTags: (result, error, id) => [{ type: 'vocabulary', id }],
            transformResponse: (resp: Word) => ({...resp, trueVariant: resp.eng, eng: resp.eng.toUpperCase().split('').sort(() => Math.random() - 0.5).join('')})
        }),
        setVocabulary: builder.mutation<any, {method: string, word_id: number, userId: number}>({
            query: (body) => ({
                url: `/${body.userId}/${body.method}`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['vocabulary']
        }),
        getGroupProgess: builder.query<{english: number, russian: number, spelling: number, auding: number}, {groupId: number, userId: number}>({
            query: (body) =>  `groups/${body.groupId}/progress/${body.userId}`,
            providesTags: ['vocabulary'], 
        }),
    })
})

export const { useGetVocabularyQuery, useSetVocabularyMutation, useGetUnlernedQuery, useGetUnlernedSpellQuery, useGetGroupProgessQuery } = vocabularyAPI
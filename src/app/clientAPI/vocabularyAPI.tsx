import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { User, Vocabulary } from '../types/types'
import { USER_VOCABULARY_COLUMN } from '../variables/dbVariables'
import { REFRESH_TOKEN, TOKEN } from '../variables/localStorageVariables'

const initialState: Vocabulary = {
    english: [],
    russian: [],
    spelling: [],
    auding: [],
    texts: [],
    audios: [],
    videos: [],
}
export const getVocabularyThunk = createAsyncThunk<Vocabulary, void, { state: RootState }>(
    'Thunk: getVocabulary',
    async function(_, thunkAPI) {
        const { user } = thunkAPI.getState() as { user: User}
        if(user.id === null){
            return initialState
        }
        const response = await fetch(`http://localhost:3002/vocabulary/${user.id}`)
        return await response.json()
    }
)
export const setVocabularyAndGetUpdatedVocabularyThunk = createAsyncThunk<Vocabulary, { method: string, word_id: number }, { state: RootState }>(
    'Thunk: setVocabularyAndGetUpdatedVocabulary',
    async function(payload: { method: string, word_id: number }, thunkAPI) {
        const { user } = thunkAPI.getState() as { user: User}
        if(user.id === null){
            return initialState //пересмотри это
        }
        if(! USER_VOCABULARY_COLUMN.includes(payload.method)){
            console.error('Не правильный url.')
            const { vocabulary } = thunkAPI.getState() as { vocabulary: Vocabulary}
            return vocabulary //пересмотри это
        }
        const response = await fetch(`http://localhost:3002/vocabulary/${user.id}/${payload.method}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.getItem(TOKEN) || 'unknown' } ${localStorage.getItem(REFRESH_TOKEN) || 'unknown'}`
            }, 
            body: JSON.stringify(payload)
        })
        return await response.json()
    }
)
export const vocabularySlice = createSlice<Vocabulary, any>({ //Укажи тип редусеров
    name: 'Slice: Vocabulary',
    initialState,
    reducers: {
        pushEnglish: (state: Vocabulary, action: PayloadAction<number>) => {
            state.english.push(action.payload);
        },
        pushRussian: (state: Vocabulary, action: PayloadAction<number>) => {
            state.russian.push(action.payload);
        },
        pushSpelling: (state: Vocabulary, action: PayloadAction<number>) => {
            state.spelling.push(action.payload);
        },
        pushAuding: (state: Vocabulary, action: PayloadAction<number>) => {
            state.auding.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getVocabularyThunk.fulfilled, (_, action) => action.payload)
        builder.addCase(getVocabularyThunk.rejected, (_, __) => initialState)
        builder.addCase(setVocabularyAndGetUpdatedVocabularyThunk.fulfilled, (_, action) => action.payload)
        builder.addCase(setVocabularyAndGetUpdatedVocabularyThunk.rejected, (_, __) => initialState)
    }
})
export const { pushEnglish, pushRussian, pushSpelling, pushAuding} = vocabularySlice.actions
export const getVocabulary = (state: RootState) => state.vocabulary;
export const getVocabularyEnglish = (state: RootState) => state.vocabulary.english;
export const getVocabularyRussian = (state: RootState) => state.vocabulary.russian;
export const getVocabularySpelling = (state: RootState) => state.vocabulary.spelling;
export const getVocabularyAuding = (state: RootState) => state.vocabulary.auding;
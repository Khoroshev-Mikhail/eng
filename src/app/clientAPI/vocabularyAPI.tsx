import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { User, Vocabulary } from '../types/types'

const initialState: Vocabulary = {
    english: [],
    russian: [],
    spelling: [],
    auding: []
}
export const getVocabularyThunk = createAsyncThunk<Vocabulary, void, { state: RootState }>(
    'Thunk: getVocabulary',
    async function(_, thunkAPI) {
        const { user } = thunkAPI.getState() as { user: User}
        if(user.id === null){
            return initialState
        }
        const response = await fetch(`http://localhost:3002/vocabulary/${user.id}`)
        const data = await response.json()
        return data
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
    }
})
export const { pushEnglish, pushRussian, pushSpelling, pushAuding} = vocabularySlice.actions
export const getVocabulary = (state: RootState) => state.vocabulary;
export const getVocabularyEnglish = (state: RootState) => state.vocabulary.english;
export const getVocabularyRussian = (state: RootState) => state.vocabulary.russian;
export const getVocabularySpelling = (state: RootState) => state.vocabulary.spelling;
export const getVocabularyAuding = (state: RootState) => state.vocabulary.auding;
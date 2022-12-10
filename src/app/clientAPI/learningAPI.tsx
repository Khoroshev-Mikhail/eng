import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Learning, Method, User, Word } from '../types/types'
import { RootState } from '../store'

const initialWord: Word = {
    id: 0,
    eng: '',
    rus: '',
    img: '',
    audio: '',
}
const errorWord: Word = {
    id: 0,
    eng: 'Error on the server.',
    rus: 'Ошибка на сервере.',
    img: '404.jpg', //Или другие
    audio: '404.mp3', //Или другие
}
const initialState: Learning = {
    trueVariant: initialWord,
    falseVariant: [ initialWord, initialWord, initialWord ]
}
const errorState: Learning = {
    trueVariant: errorWord,
    falseVariant: [ initialWord, initialWord, initialWord ]
}
export const getLearningThunk = createAsyncThunk<Learning, { method: Method, id: number | string }, { state: RootState }>(
    'Thunk: getLearning',
    async function(payload: { method: Method, id: number | string }, thunkAPI) {
        const { user } = thunkAPI.getState() as { user: User}
        if(payload.id <= 0){
            return errorState
        }
        if(! user.id){
            console.error('Не правильный url.', user)
        }
        const response = await fetch(`http://localhost:3002/vocabulary/${user.id}/unlerned/${payload.method}/group/${payload.id}`)
        const data = await response.json()
        return data
    }
)
export const learningSlice = createSlice<Learning, {}>({
    name: 'Slice: Learning',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getLearningThunk.fulfilled, (_, action) => action.payload)
        builder.addCase(getLearningThunk.rejected, (_, __) => errorState)
    }
})

export const getTrueVariant = (state: RootState) => state.learning.trueVariant;
export const getFalseVariants = (state: RootState) => state.learning.falseVariant;
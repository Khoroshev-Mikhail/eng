import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { User } from '../types/types'

const user: User = {
    id: 1, //Если юзера нет базе тогда сервер возвращает ошибку, а на фронте показывает молодец ты выучил все слова
    login: 'ara',
    email: 'ara@ara.ru',
    user_name: 'Ara Ararovich'
}
export const userThunk = createAsyncThunk(
    'userThunk',
    async function() {
        const response = await fetch('http://localhost:3002/user', {
            method: 'POST'
        })
        //Записать во время фуллфиелд в локалстораде через мидлвейр
        const data: User = await response.json()
        return data
    }
)
export const userSlice = createSlice({
    name: 'userSlice',
    initialState: user,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(userThunk.fulfilled, (_, action) => action.payload)
    }
})
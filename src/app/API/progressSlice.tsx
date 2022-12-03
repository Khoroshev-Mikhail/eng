// ОТМЕНА! ЭТОТ СЛАЙС ТОЛЬКО ДЛЯ ОДНОГО ПРОГРЕССА? А НУЖЕН ДЛЯ КАЖДОЙ ГРУППЫ СВОЙ
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Progress } from '../types/types'

export const getProgress = createAsyncThunk<Progress>(
    'Thunk: getProgress',
    async function(body: any) {
        const response = await fetch(`http://localhost:3002/groups/${body.groupId}/progress/${body.userId}`)
        const data = await response.json()
        return data
    }
)
const initialState: Progress = {
    english: 0, 
    russian: 0, 
    spelling: 0, 
    auding: 0, 
    total: 0
}
export const progressSlice = createSlice<Progress, {}>({
    name: 'progressSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // builder.addCase(getAllGlobalTextsTitlesThunk.fulfilled, (_, action) => action.payload)
        // builder.addCase(getAllGlobalTextsTitlesThunk.rejected, (_, __) => [])
    }
})
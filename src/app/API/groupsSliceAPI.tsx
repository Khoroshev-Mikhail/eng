import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GroupTitle } from '../types/types'

export const getAllGlobalGroupsTitlesThunk = createAsyncThunk<GroupTitle[]>(
    'Thunk: getAllGlobalGroupsTitles',
    async function() {
        const response = await fetch(`http://localhost:3002/groups/global/onlyTitles`)
        const data = await response.json()
        return data
    }
)

const initialState: GroupTitle[] = []
export const groupsSlice = createSlice<GroupTitle[], {}>({
    name: 'groupsSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllGlobalGroupsTitlesThunk.fulfilled, (_, action) => action.payload)
    }
})
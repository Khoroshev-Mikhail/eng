import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Title } from '../types/types'

export const getAllGroupsThunk = createAsyncThunk<Title[]>(
    'Thunk: getAllGroups',
    async function() {
        const response = await fetch(`http://localhost:3002/groups/titles`) //Потом здесб добавить пагинацию
        return await response.json()
    }
)

const initialState: Title[] = []

export const groupsSlice = createSlice<Title[], {}>({
    name: 'Slice: groups',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllGroupsThunk.fulfilled, (_, action) => action.payload)
    }
})
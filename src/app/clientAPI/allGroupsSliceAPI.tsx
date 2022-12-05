import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Group, GroupTitle } from '../types/types'

export const getAllGroupsThunk = createAsyncThunk<GroupTitle[]>(
    'Thunk: getAllGroups',
    async function() {
        const response = await fetch(`http://localhost:3002/groups/`) //Потом здесб добавить пагинацию
        return await response.json()
    }
)

const initialState: Group[] = []

export const groupsSlice = createSlice<GroupTitle[], {}>({
    name: 'Slice: groups',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllGroupsThunk.fulfilled, (_, action) => action.payload)
    }
})
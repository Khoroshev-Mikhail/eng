import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { Group } from '../types/types'

type GroupState = {
    status: 'loading' | 'pending' | 'fulfilled' | 'rejected',
    group: Group
}

const initialState: GroupState = {
    status: 'loading',
    group: {
        id: 0,
        title: '',
        title_rus: '',
        word_ids: [],
        content_references: null
    },
}
export const getGroupThunk = createAsyncThunk<GroupState, number>(
    'Thunk: getGroup',
    async function(id) {
        if(id <= 0){
            return { status: 'rejected', group: initialState.group}
        }
        const response = await fetch(`http://localhost:3002/groups/${id}`) //Потом здесб добавить пагинацию
        const data = await response.json()
        return { group: data, status: 'fulfilled' }
    }
)
export const groupSlice = createSlice<GroupState, {}>({
    name: 'Slice: group',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getGroupThunk.fulfilled, (_, action) => action.payload)
        builder.addCase(getGroupThunk.rejected, (_, __) => ({ status: 'rejected', group: initialState.group}))
    }
})
export const getGroup = (state: RootState) => state.group
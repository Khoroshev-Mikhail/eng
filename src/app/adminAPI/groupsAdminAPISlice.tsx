import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Group, Title, User, Word } from '../types/types'
import { SERVER_URL } from '../variables/dbVariables'
import { REFRESH_TOKEN, TOKEN } from '../variables/localStorageVariables'
import { setUserToLocalStorage } from '../fns/localStorageFns'
import { RootState } from '../store'

const instance = axios.create({ 
    baseURL: `${SERVER_URL}/groups`,  
})
instance.interceptors.response.use(null, async (error) => {
    const response = await fetch('http://localhost:3002/user/auth/refresh', {
            method: 'POST',            
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }, 
            body: JSON.stringify({
                refreshToken: localStorage.getItem(REFRESH_TOKEN)
            })
        })
    const user = await response.json()
    if(response.ok){
        setUserToLocalStorage(user)
    }
    error.config.headers['Authorization'] = `Bearer ${localStorage.getItem(TOKEN) || 'unknown'}`
    return axios.request(error.config)
})

export const getAllGroupsAdminThunk = createAsyncThunk<Group[]>(
    'Thunk(admin): getAllGroups',
    async function() {
        const { data } = await instance(``) //Потом здесб добавить пагинацию
        return data
    }
)

export const getGroupAdminThunk = createAsyncThunk<Group, number | string>(
    'Thunk(admin): getOneGroup',
    async function(id) {
        const { data } = await instance(`/${id}`)
        return data
    }
)

export const setGroupAdminThunk = createAsyncThunk<Group, { title: string, title_rus: string }>(
    'Thunk(admin): setOneGroup',
    async function( payload: { title: string, title_rus: string }, thunkAPI ) {
        const { user } = thunkAPI.getState() as { user: User }
        if(user.id !== 1){
            throw new Error('Не авторизирован.')
        }
        const { data } = await instance({
            url: `/`,
            method: 'post',
            data: { ...payload },
            headers: {'Authorization': `Bearer ${localStorage.getItem(TOKEN) || 'unknown' }`}
        })
        return data
    }
)
export const putGroupAdminThunk = createAsyncThunk<Group, { id: number, title: string, title_rus: string }>(
    'Thunk(admin): putOneGroup',
    async function( payload: { id: number, title: string, title_rus: string }, thunkAPI ) {
        const { user } = thunkAPI.getState() as { user: User }
        if(user.id !== 1){
            throw new Error('Не авторизирован.')
        }
        const { data } = await instance({
            url: `/`,
            method: 'put',
            data: { ...payload },
            headers: {'Authorization': `Bearer ${localStorage.getItem(TOKEN) || 'unknown' }`}
        })
        return data
    }
)
export const deleteGroupAdminThunk = createAsyncThunk<Group, { id: number | string }>(
    'Thunk(admin): deleteOneGroup',
    async function( payload: { id: number | string }, thunkAPI ) {
        const { user } = thunkAPI.getState() as { user: User }
        if(user.id !== 1){
            throw new Error('Не авторизирован.')
        }
        const { data } = await instance({
            url: `/`,
            method: 'delete',
            data: { ...payload },
            headers: {'Authorization': `Bearer ${localStorage.getItem(TOKEN) || 'unknown' }`}
        })
        return data
    }
)

export const groupsAdminSlice = createSlice<Group[], {}>({
    name: 'Slice(admin): groups',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllGroupsAdminThunk.fulfilled, (_, action) => action.payload)
    }
})
const initialStateGroup: Group = { id: 0, title: '', title_rus: '', words: [] }
export const groupAdminSlice = createSlice<Group, {}>({
    name: 'Slice(admin): group',
    initialState: initialStateGroup,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getGroupAdminThunk.fulfilled, (_, action) => action.payload)
        builder.addCase(setGroupAdminThunk.fulfilled, (_, action) => action.payload)
        builder.addCase(putGroupAdminThunk.fulfilled, (_, action) => action.payload)
        builder.addCase(deleteGroupAdminThunk.fulfilled, (_, __) => initialStateGroup)
    }
})
export const getGroupsAdmin = (state: RootState) => state.groupsAdmin
export const getGroupAdmin = (state: RootState) => state.groupAdmin

export const getAllWordsFromGroupAdminThunk = createAsyncThunk<Word[], number | string>(
    'Thunk(admin): getAllWordsFromGroup',
    async function(id) {
        const { data } = await instance(`/${id}/words`)
        return data
    }
)
export const putWordToGroupAdminThunk = createAsyncThunk<Word[], { id: number | string, word_id: number | string }>(
    'Thunk(admin): putWordToGroup',
    async function( {id, word_id} ) {
        const { data } = await instance({
            url: `/${id}/words`,
            method: 'put',
            data: { word_id },
            headers: {'Authorization': `Bearer ${localStorage.getItem(TOKEN) || 'unknown' }`}
        })
        return data
    }
)
export const deleteWordFromGroupAdminThunk = createAsyncThunk<Word[], { id: number | string, word_id: number | string }>(
    'Thunk(admin): deleteWordToGroup',
    async function( {id, word_id} ) {
        const { data } = await instance({
            url: `/${id}/words`,
            method: 'delete',
            data: { word_id },
            headers: {'Authorization': `Bearer ${localStorage.getItem(TOKEN) || 'unknown' }`}
        })
        return data
    }
)
export const wordsFromGroupAdminSlice = createSlice<Word[], {}>({
    name: 'Slice(admin): wordsFromGroup',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllWordsFromGroupAdminThunk.fulfilled, (_, { payload }) => payload)
        builder.addCase(putWordToGroupAdminThunk.fulfilled, (_, { payload }) => payload)
        builder.addCase(deleteWordFromGroupAdminThunk.fulfilled, (_, { payload }) => payload)
    }
})

export const getAllWordsFromGroupAdmin = (state: RootState) => state.wordsFromGroupAdmin
import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { User, Word } from '../types/types'
import { SERVER_URL } from '../variables/dbVariables'
import { REFRESH_TOKEN, TOKEN } from '../variables/localStorageVariables'
import { setUserToLocalStorage } from '../fns/localStorageFns'
import { RootState } from '../store'

const instance = axios.create({ 
    baseURL: `${SERVER_URL}/words`,  
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


export const getAllWordsAdminThunk = createAsyncThunk<Word[]>(
    'Thunk(admin): getAllWords',
    async function() {
        const { data } = await instance(``) //Потом здесб добавить пагинацию
        return data
    }
)
export const wordsAdminSlice = createSlice<Word[], {}>({
    name: 'Slice(admin): words',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllWordsAdminThunk.fulfilled, (_, action) => action.payload)
    }
})
export const getAllWordsAdmin = (state: RootState) => state.allWords

export const getWordAdminThunk = createAsyncThunk<Word, number | string>(
    'Thunk(admin): getOneWord',
    async function(id) {
        const { data } = await instance(`/${id}`)
        return data
    }
)

export const setWordAdminThunk = createAsyncThunk<Word, { eng: string, rus: string }>(
    'Thunk(admin): setOneWord',
    async function( payload: { eng: string, rus: string }, thunkAPI ) {
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
export const putWordAdminThunk = createAsyncThunk<Word, { id: number, title: string, title_rus: string }>(
    'Thunk(admin): putOneWord',
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
export const deleteWordAdminThunk = createAsyncThunk<Word, { id: number | string }>(
    'Thunk(admin): deleteOneWord',
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

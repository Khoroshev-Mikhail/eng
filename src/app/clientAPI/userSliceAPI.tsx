import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ID, REFRESH_TOKEN } from '../variables/localStorageVariables'
import { removeUserFromLocalStorage, setUserToLocalStorage } from '../fns/localStorageFns'
import { User } from '../types/types'
import { RootState } from '../store'

const initialState: User = { id: null, user_login: null, user_name: null, email: null, token: null, refresh_token: null, jwtExpire: null }

export const loginThunk = createAsyncThunk(
    'Thunk: login',
    async function(request: { login: string, password: string}) {
        const response = await fetch('http://localhost:3002/user/auth', {
            method: 'POST',            
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }, 
            body: JSON.stringify(request)
        })
        const user = await response.json()
        if(response.ok){ //вынести в МД
            setUserToLocalStorage(user)
        }
        const { id, user_login, email, user_name, token } = user
        return { id, user_login, email, user_name, token }
    }
)
export const loginByRefreshThunk = createAsyncThunk(
    'Thunk: loginByRefresh',
    async function() {
        const response = await fetch('http://localhost:3002/user/authByRefreshToken', {
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
        //Наверно здесь if как-то криво
        const { id, user_login, email, user_name, token } = user
        return { id, user_login, email, user_name, token }
    }
)
export const registrationThunk = createAsyncThunk(
    'Thunk: registration',
    async function(request: { login: string, password: string }, thunkApi) {
        const response = await fetch('http://localhost:3002/user/registration', {
            method: 'POST',            
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }, 
            body: JSON.stringify({password: request.password, login: request.login})
        })
        if(response.ok){
            if(request.login && request.password){
                thunkApi.dispatch(loginThunk(request))
            }
        }
    }
)
export const exitThunk = createAsyncThunk(
    'Thunk: exit',
    async function() {
        const response = await fetch(`http://localhost:3002/user/logout/${localStorage.getItem(ID)}`)//Обратиться с стейт напрямую, и взять оттуда id
        const data = await response.json()
        if(response.ok){
            removeUserFromLocalStorage()
        }
        return data
    }
)
export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginThunk.fulfilled, (_, action) => action.payload)
        builder.addCase(loginByRefreshThunk.fulfilled, (_, action) => action.payload) //Нужен ли здесь addCase с rejeted
        builder.addCase(loginThunk.rejected, (_, __) => {
            removeUserFromLocalStorage()
            return initialState 
          })
        builder.addCase(exitThunk.fulfilled, (_, __) => initialState)
    }
})
export const getUserId = (state: RootState) => state.user.id
export const getUser = (state: RootState) => state.user
export const isAdmin = (state: RootState) => state.user.id === 1
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ID, REFRESH_TOKEN } from '../variables/localStorageVariables'
import { removeUserFromLocalStorage, setUserToLocalStorage } from '../fns/localStorageFns'
import { User } from '../types/types'

const user: User = { id: 0, user_login: null, user_name: null, email: null, token: null, refresh_token: null, jwtExpire: null }

export const loginThunk = createAsyncThunk(
    'loginThunk',
    async function(obj: any) {
        const response = await fetch('http://localhost:3002/auth', {
            method: 'POST',            
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }, 
            body: JSON.stringify({password: obj.password, login: obj.login})
        })
        const user = await response.json()
        if(response.ok){
            setUserToLocalStorage(user)
        }
        const { id, user_login, email, user_name, jwtExpire } = user
        return { id, user_login, email, user_name, jwtExpire }
    }
)
export const loginByRefreshThunk = createAsyncThunk(
    'loginByRefreshThunk',
    async function() {
        const response = await fetch('http://localhost:3002/authByRefreshToken', {
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
        const { id, user_login, email, user_name, jwtExpire } = user
        return { id, user_login, email, user_name, jwtExpire }
    }
)
export const exitThunk = createAsyncThunk(
    'exitThunk',
    async function() {
        const response = await fetch(`http://localhost:3002/logout/${localStorage.getItem(ID)}`)//Обратиться с стейт напрямую, и взять оттуда id
        const data = await response.json()
        if(response.ok){
            removeUserFromLocalStorage()
        }
        return data
    }
)

export const userSlice = createSlice({
    name: 'userSlice',
    initialState: user,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginThunk.fulfilled, (_, action) => action.payload)
        builder.addCase(loginByRefreshThunk.fulfilled, (_, action) => action.payload) //Нужен ли здесь addCase с rejeted
        builder.addCase(loginThunk.rejected, (_, __) => {
            removeUserFromLocalStorage()
            return user //попробуй this.initialState или чтото вроде того
          })
        builder.addCase(exitThunk.fulfilled, (_, action) => user)//попробуй this.initialState
    }
})
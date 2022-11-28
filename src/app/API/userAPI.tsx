import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { User } from '../types/types'

const user: User = { id: 0, user_login: null, user_name: null, email: null, token: null, refresh_token: null, jwtExpire: null }
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
        const data = await response.json()
        if(response.ok){
            localStorage.setItem('id', data.id);
            localStorage.setItem('login', data.login);
            localStorage.setItem('token', data.token);
            localStorage.setItem('refreshToken', data.refreshToken);
            localStorage.setItem('jwtExpire', data.jwtExpire); //Изменить на нижнее подчеркивание
        }
        const { id, user_login, email, user_name, jwtExpire } = data
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
                refreshToken: localStorage.getItem('refreshToken')
            })
        })
        const data = await response.json()
        if(response.ok){
            localStorage.setItem('id', data.id);
            localStorage.setItem('login', data.login);
            localStorage.setItem('token', data.token);
            localStorage.setItem('refreshToken', data.refreshToken);
            localStorage.setItem('jwtExpire', data.jwtExpire); //Изменить на нижнее подчеркивание
        }
        //Наверно здесь if как-то криво
        const { id, user_login, email, user_name, jwtExpire } = data
        return { id, user_login, email, user_name, jwtExpire }
    }
)
export const exitThunk = createAsyncThunk(
    'exitThunk',
    async function() {
        const response = await fetch(`http://localhost:3002/logout/${localStorage.getItem('id')}`)//Обратиться с стейт напрямую, и взять оттуда id
        const data = await response.json()
        if(response.ok){
            localStorage.removeItem('id')
            localStorage.removeItem('login')
            localStorage.removeItem('token')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('jwtExpire')
        }
        return data
    }
)

export const userSlice = createSlice({
    name: 'userSlice',
    initialState: user,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(userThunk.fulfilled, (_, action) => action.payload)
        builder.addCase(loginThunk.fulfilled, (_, action) => action.payload)
        builder.addCase(loginByRefreshThunk.fulfilled, (_, action) => action.payload) //Нужен ли здесь addCase с rejeted
        builder.addCase(loginThunk.rejected, (_, __) => {
            localStorage.removeItem('id')
            localStorage.removeItem('login')
            localStorage.removeItem('token')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('jwtExpire')
            return user //попробуй this.initialState или чтото вроде того
          })
        builder.addCase(exitThunk.fulfilled, (_, action) => user)//попробуй this.initialState
    }
})
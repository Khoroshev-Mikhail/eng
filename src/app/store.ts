import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { groupsAPI } from './API/groupsAPI';
import { vocabularyAPI } from './API/vocabulary';
import { wordsAPI } from './API/wordAPI';
export const store = configureStore({
  reducer: {
    [wordsAPI.reducerPath]: wordsAPI.reducer,
    [groupsAPI.reducerPath]: groupsAPI.reducer,
    [vocabularyAPI.reducerPath]: vocabularyAPI.reducer 
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(wordsAPI.middleware, groupsAPI.middleware, vocabularyAPI.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

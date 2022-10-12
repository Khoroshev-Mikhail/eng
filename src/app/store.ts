import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { userWordsAPI } from './API/wordAPI';
export const store = configureStore({
  reducer: {
    [userWordsAPI.reducerPath]: userWordsAPI.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userWordsAPI.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { goodsApi } from './goodsApi';
export const store = configureStore({
  reducer: {
    [ goodsApi.reducerPath ]: goodsApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(goodsApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

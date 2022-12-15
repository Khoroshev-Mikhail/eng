import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { groupsAPI } from './API/groupsRTKAPI';
import { groupsSlice } from './clientAPI/allGroupsSliceAPI';
import { referencesSlice } from './clientAPI/referencesSliceAPI';
import { textsAPI } from './API/textsRTKAPI';
import { oneTextSlice, textsSlice } from './clientAPI/textSliceAPI';
import { userSlice } from './clientAPI/userSliceAPI';
import { vocabularyAPI } from './API/vocabularyRTKAPI';
import { wordsAPI } from './API/wordRTKAPI';
import { vocabularySlice } from './clientAPI/vocabularySliceAPI';
import { learningSlice } from './clientAPI/learningSliceAPI';
import { groupSlice } from './clientAPI/groupSliceAPI';
import { groupAdminSlice, groupsAdminSlice, wordsFromGroupAdminSlice } from './adminAPI/groupsAdminAPISlice';
import { wordsAdminSlice } from './adminAPI/wordsAdminAPISlice';
import { wordsFromGroupAPI } from './API/wordsFromGroupRTKAPI';

export const store = configureStore({
  reducer: {
    [wordsAPI.reducerPath]: wordsAPI.reducer, //Какнибудь представить разделение стора на админку и пользователя
    [groupsAPI.reducerPath]: groupsAPI.reducer,
    [vocabularyAPI.reducerPath]: vocabularyAPI.reducer,
    [textsAPI.reducerPath]: textsAPI.reducer,
    [wordsFromGroupAPI.reducerPath]: wordsFromGroupAPI.reducer,
    user: userSlice.reducer,
    texts: textsSlice.reducer,
    oneText: oneTextSlice.reducer,
    references: referencesSlice.reducer,
    vocabulary: vocabularySlice.reducer,
    learning: learningSlice.reducer,
    allGroups: groupsSlice.reducer,
    group: groupSlice.reducer,
    // adminNew
    groupAdmin: groupAdminSlice.reducer,
    groupsAdmin: groupsAdminSlice.reducer,
    wordsFromGroupAdmin: wordsFromGroupAdminSlice.reducer,
    allWords: wordsAdminSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
      wordsAPI.middleware, 
      groupsAPI.middleware, 
      vocabularyAPI.middleware, 
      textsAPI.middleware,
      wordsFromGroupAPI.middleware,
    )
});
export const { dispatch } = store
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

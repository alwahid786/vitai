// store.js
import { configureStore } from '@reduxjs/toolkit';
// import sidebarReducer from './sidebarSlice';
import sidebarReducer from '../slice/sidebarSlice';
import { apiSlice } from '../apis/apiSlice';
import authReducer from '../slice/authSlice';
import chatSlice from '../slice/chatSlice';
import folderColorReducer  from '../slice/folderColorSlice';
// import folderColorReducer from "./redux/slice/folderColorSlice"; // adjust the path as needed

// import chatReducer from '../slice/chatSlice';

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    auth: authReducer,
    // chat:chatReducer,
    chat: chatSlice.reducer,
    folderColor: folderColorReducer,
    // aiLearningSearch:aiLearningSearchReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;

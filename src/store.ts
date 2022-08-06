import { configureStore } from "@reduxjs/toolkit";
import wsReducer from "./redux/websocket/slice";

export const store = configureStore({
  reducer: {
    ws: wsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

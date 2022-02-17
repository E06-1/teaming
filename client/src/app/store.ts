import { configureStore, Middleware } from '@reduxjs/toolkit'
import boardSlice from '../features/board/boardSlice'
import cardSlice from '../features/card/cardSlice'
import listSlice from '../features/list/listSlice'


//Middleware should forward the action via Websocket Connection to the Backend, needs to be implemented
const forwardAction: Middleware = () => {
  return next => action => {
    console.warn("IMPLEMENT ME! This middleware should forward the received Action to the Backend via Websocket.");
    console.log('will dispatch', action)

  // Call the next dispatch method in the middleware chain.
  return next(action)
  }
}



export const store = configureStore({
  reducer: {
    list: listSlice,
    card: cardSlice,
    board: boardSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(forwardAction)
})

const saveToLocalStorage = async () => {
  localStorage.setItem("state", JSON.stringify(store.getState())) 
}

store.subscribe(saveToLocalStorage)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
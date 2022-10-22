import { configureStore } from "@reduxjs/toolkit";
import storageReducer from './slices/storageSlice'


const store = configureStore({
	reducer: {
		storage: storageReducer
	},
})

export type RootState = ReturnType<typeof store.getState>

export default store;

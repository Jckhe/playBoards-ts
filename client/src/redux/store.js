import { configureStore } from "@reduxjs/toolkit";
import storageReducer from './slices/storageSlice'

export const store = configureStore({
	reducer: {
		storage: storageReducer
	},
})
import { configureStore } from '@reduxjs/toolkit'
import notesReducer from './slicer';

export default configureStore({
  reducer: {
    notesState: notesReducer
  }
})
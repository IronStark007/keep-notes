import { createSlice } from '@reduxjs/toolkit'

export const notesSlice = createSlice({
  name: 'notesState',
  initialState: {
    notes: [],
    fields: { title: '', tagline: '', body: '' },
    errors: { title: '', tagline: '', body: '' },
    currentNotes: [],
    currentPage: 1,
    totalPages: 0,
    pageNumbers: [],
    editMode: false,
    alterMode: false,
    activeId: ''
  },
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setFields: (state, action) => {
      state.fields = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    setCurrentNotes: (state, action) => {
      state.currentNotes = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setPageNumbers: (state, action) => {
      state.pageNumbers = action.payload;
    },
    setEditMode: (state, action) => {
      state.editMode = action.payload;
    },
    setAlterMode: (state, action) => {
      state.alterMode = action.payload;
    },
    setActiveId: (state, action) => {
      state.activeId = action.payload
    }
  },
})

export const { setNotes, setFields, setErrors, setCurrentNotes, setCurrentPage, setTotalPages, setPageNumbers, setEditMode, setAlterMode, setActiveId } = notesSlice.actions

export default notesSlice.reducer
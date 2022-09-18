import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Header from './components/Header';
import NotesList from './components/NotesList';
import LoadMore from './components/LoadMore';
import AddNotes from './components/AddNotes';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNotes } from './slicer';

function App() {
  const notes = useSelector(state => state.notesState.notes);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem('notes')) {
      localStorage.setItem('notes', JSON.stringify([]))
    } else {
      let data = localStorage.getItem('notes');
      dispatch(setNotes(JSON.parse(data)));
    }
  }, [dispatch])

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  return (
    <div className="App">
      <Header />
      <AddNotes />
      <NotesList />
      <LoadMore />
    </div>
  );
}

export default App;

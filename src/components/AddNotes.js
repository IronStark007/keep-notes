import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setEditMode } from '../slicer';
import AddNoteForm from './AddNoteForm';

function AddNotes() {
  const editMode = useSelector(state => state.notesState.editMode);

  const dispatch = useDispatch();

  const toggleHandler = () => {
    dispatch(setEditMode(true));
  }
  return (
    !editMode ? <Form onClick={toggleHandler} className='w-50 m-auto mt-4 px-4'>
      <Form.Group className="mb-3" controlId="title">
        <Form.Control
          type="text"
          placeholder="Add Todo.."
        />
      </Form.Group>
    </Form> : <AddNoteForm />
  );
}

export default AddNotes;
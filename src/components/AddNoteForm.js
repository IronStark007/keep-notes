import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid4 } from 'uuid';
import { setFields, setEditMode, setNotes, setErrors } from '../slicer';

function AddNoteForm() {
  const notes = useSelector(state => state.notesState.notes);
  const editMode = useSelector(state => state.notesState.editMode);
  const fields = useSelector(state => state.notesState.fields);
  const errors = useSelector(state => state.notesState.errors);
  const dispatch = useDispatch();

  const fieldsHandler = (field, value) => {
    dispatch(setFields({
      ...fields,
      [field]: value
    }))
    if (!!errors[field]) {
      dispatch(setErrors({
        ...errors,
        [field]: null
      }))
    }
  }
  const validateFields = () => {
    const { title, tagline, body } = fields
    const newErrors = {}
    if (!title || title === '') {
      newErrors.title = "Title shouldn't be blank"
    }
    if (!tagline || tagline === '') {
      newErrors.tagline = "Tagline shouldn't be blank"
    }
    if (!body || body === '') {
      newErrors.body = "Body shouldn't be blank"
    }
    return newErrors;
  }
  const addNotes = () => {
    let pinnedNotes = notes.filter(item => {
      return item.isPinned;
    });
    let unPinnedNotes = notes.filter(item => {
      return !item.isPinned;
    });
    const data = [...pinnedNotes, {
      id: uuid4(),
      title: fields.title,
      tagline: fields.tagline,
      body: fields.body,
      isPinned: false,
      createTime: Date.now(),
      updateTime: Date.now()
    }, ...unPinnedNotes]
    dispatch(setNotes(data));
  }

  const saveNoteHandler = (e) => {
    e.preventDefault();
    const fieldsErrors = validateFields();
    if (Object.keys(fieldsErrors).length > 0) {
      dispatch(setErrors(fieldsErrors))
    } else {
      addNotes();
      handleClose();
    }
  }

  const handleClose = () => {
    dispatch(setEditMode(false));
    dispatch(setFields({ title: '', tagline: '', body: '' }))
    dispatch(setErrors({ title: '', tagline: '', body: '' }))
  }
  return (
    <>
      <Modal show={editMode}>
        <Modal.Body className="p-4">
          <Form onSubmit={saveNoteHandler}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Control
                type="text"
                placeholder="Title"
                value={fields.title}
                onChange={(e) => fieldsHandler('title', e.target.value)}
                isInvalid={!!errors.title}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="tagline">
              <Form.Control
                type="text"
                placeholder="Tagline"
                value={fields.tagline}
                onChange={(e) => fieldsHandler('tagline', e.target.value)}
                isInvalid={errors.tagline}
              />
              <Form.Control.Feedback type="invalid">
                {errors.tagline}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="body"
            >
              <Form.Control
                as="textarea"
                className='textarea'
                placeholder="Body"
                rows={3}
                value={fields.body}
                onChange={(e) => fieldsHandler('body', e.target.value)}
                isInvalid={!!errors.body}
              />
              <Form.Control.Feedback type="invalid">
                {errors.body}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="button-icon close  text-warning border-warning" onClick={handleClose}>
            <i className=" bi bi-x-circle"></i>
          </Button>
          <Button className="button-icon save text-success border-success" onClick={saveNoteHandler}>
            <i className="bi bi-plus-lg"></i>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddNoteForm;
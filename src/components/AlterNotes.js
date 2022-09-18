import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { setNotes, setAlterMode, setFields, setErrors } from '../slicer';

function AlterNotes() {
    const notes = useSelector(state => state.notesState.notes);
    const alterMode = useSelector(state => state.notesState.alterMode);
    const fields = useSelector(state => state.notesState.fields);
    const errors = useSelector(state => state.notesState.errors);
    const activeId = useSelector(state => state.notesState.activeId);
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

    const updateNote = () => {
        let data = notes.map(item => {
            if (item.id === activeId) {
                return {
                    ...item,
                    title: fields.title,
                    updateTime: Date.now(),
                    tagline: fields.tagline,
                    body: fields.body
                }
            }
            return item;
        })
        dispatch(setNotes(data));
    }

    const saveNoteHandler = e => {
        e.preventDefault();
        const fieldsErrors = validateFields();
        if (Object.keys(fieldsErrors).length > 0) {
            dispatch(setErrors(fieldsErrors))
        } else {
            handleClose();
            updateNote();
        }
    }

    const deleteNoteHandler = e => {
        e.preventDefault();
        let data = notes.filter(ele => {
            return ele.id !== activeId;
        })
        dispatch(setNotes(data));
        handleClose();
    }

    const handleClose = () => {
        dispatch(setAlterMode(false));
        dispatch(setFields({ title: '', tagline: '', body: '' }))
        dispatch(setErrors({ title: '', tagline: '', body: '' }))
    }

    return (
        <>
            <Modal show={alterMode}>
                <Modal.Body className="p-4">
                    <Form>
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
                                isInvalid={!!errors.tagline}
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
                    <Button className='button-icon close  text-warning border-warning' onClick={handleClose}>
                        <i className="bi bi-x-circle"></i>
                    </Button>
                    <Button className='button-icon  save text-success border-success ' onClick={saveNoteHandler}>
                        <i className="bi bi-save2"></i>
                    </Button>
                    <Button className='button-icon delete text-danger border-danger' onClick={deleteNoteHandler}>
                        <i className=" bi bi-trash"></i>
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AlterNotes;
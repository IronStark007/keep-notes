import { Button, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveId, setNotes, setAlterMode, setFields } from '../slicer';
import AlterNotes from './AlterNotes';

function NotesCard({ ele }) {
  const notes = useSelector(state => state.notesState.notes);
  const dispatch = useDispatch();
  const handleShow = () => {
    dispatch(setActiveId(ele.id));
    dispatch(setAlterMode(true));
    dispatch(setFields({ title: ele.title, tagline: ele.tagline, body: ele.body }))
  }

  const pinnedHandler = e => {
    e.stopPropagation();
    let data = notes.map(item => {
      if (item.id === ele.id) {
        return { ...item, isPinned: !item.isPinned }
      }
      return item;
    });
    let topNote = data.filter(item => {
      return item.id === ele.id && item.isPinned;
    })
    let pinnedNotes = data.filter(item => {
      return item.id !== ele.id && item.isPinned;
    })
    let unPinnedNotes = data.filter(item => {
      return (item.id === ele.id && !item.isPinned) || (item.id !== ele.id && !item.isPinned);
    })
    dispatch(setNotes([...topNote, ...pinnedNotes, ...unPinnedNotes]));
  }

  return (
    <Col className='mb-3' lg={'auto'}>
      <Card onClick={handleShow} className="notes" pinned={ele.isPinned.toString()} style={{ width: '400px', height: '200px' }}>
        <Card.Header className="title">{ele.title} <Button onClick={pinnedHandler} className='text-info border-info button-icon pinned float-end' variant="primary">
          {ele.isPinned ? <i className=" bi bi-pin-angle-fill"></i> : <i className="bi bi-pin-angle"></i>}
        </Button></Card.Header>
        <Card.Body className='overflow-hidden px-4'>
          <Card.Title className="fs-5">{ele.tagline}</Card.Title>
          <Card.Text>
            {ele.body}
          </Card.Text>
        </Card.Body>
      </Card>
      <AlterNotes />
    </Col>
  );
}

export default NotesCard;
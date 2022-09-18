import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useSelector } from 'react-redux';
import NotesCard from './NotesCard';

function NotesList() {
  const currentNotes = useSelector(state => state.notesState.currentNotes);
  return (
    <Container fluid className="mt-4">
      <Row style={{ justifyContent: "center" }}>
        {currentNotes.map((ele) => {
          return <NotesCard key={ele.id} ele={ele} />
        })}
      </Row>
    </Container>
  );
}

export default NotesList;
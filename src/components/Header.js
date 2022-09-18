import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
  return (
    <Navbar className='header'>
      <Container fluid>
        <Navbar.Brand className='m-auto' href="#">Keep Notes</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;
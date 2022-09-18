import { useEffect } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentNotes, setCurrentPage, setPageNumbers, setTotalPages } from '../slicer';

function LoadMore() {
  const postPerPage = 6;
  const notes = useSelector(state => state.notesState.notes);
  const currentPage = useSelector(state => state.notesState.currentPage);
  const totalPages = useSelector(state => state.notesState.totalPages);
  const pageNumbers = useSelector(state => state.notesState.pageNumbers);
  const dispatch = useDispatch();
  useEffect(() => {
    const pages = [];
    const lastIndex = currentPage * postPerPage;
    const firstIndex = lastIndex - postPerPage;
    let data = notes.slice(firstIndex, lastIndex);
    dispatch(setCurrentNotes(data));
    dispatch(setTotalPages(Math.ceil(notes.length / postPerPage)))

    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    dispatch(setPageNumbers(pages));
  }, [currentPage, dispatch, notes, totalPages])

  return (
    <Pagination className="fixed-bottom" style={{ justifyContent: "center", margin: 0, padding: '10px 0' }}>
      <Pagination.Prev
        onClick={() => dispatch(setCurrentPage(currentPage - 1))}
        disabled={currentPage === 1}
      />
      {pageNumbers.map(num => {
        return (<Pagination.Item className="button-icon" key={num} active={num === currentPage}
          onClick={() => dispatch(setCurrentPage(num))}
        >{num}</Pagination.Item>)
      })}
      <Pagination.Next
        onClick={() => dispatch(setCurrentPage(currentPage + 1))}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
};

export default LoadMore;

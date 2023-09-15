import React,{useState,useEffect} from 'react';
import './Dashboard.css'
import { useSelector } from 'react-redux';
import { styled } from '@mui/system';
import {
    TablePagination,
    tablePaginationClasses as classes,
  } from '@mui/base/TablePagination';
import { selectEditedPosts } from '../EditPost/PostSlice';

import { getComment } from '../Comments/CommentSlice';
import { selectAllUsers } from '../user/UserSlice';

function Dashboard(props) {
    const post = useSelector(selectEditedPosts);
    
    const comment = useSelector(getComment);
    const [page, setPage] = useState(0);
    const users= useSelector(selectAllUsers);
    const [sortingField, setSortingField] = useState('default');
    const [sortingOrder, setSortingOrder] = useState('asc');
    const [sortedData, setSortedData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const combinedData = post.map((p) => {
    const author = users.find((user) => user.id === p.userId);
    const total = comment.filter((val)=>val.postId === p.id).length;
    return {
      ...p,
      comments: total ? total : '0',
      authorName: author ? author.name : 'Unknown',
    };
  });

  const sortData = () => {
    if (sortingField === 'default') {
        // No sorting, use original post data
        setSortedData(combinedData);
      } else {
        const dataToSort = [...combinedData];
        dataToSort.sort((a, b) => {
          if (sortingField === 'author') {
            // Sort by author name
            const authorA = users.find((user) => user.id === a.userId)?.name || '';
            const authorB = users.find((user) => user.id === b.userId)?.name || '';
            return sortingOrder === 'asc'
              ? authorA.localeCompare(authorB)
              : authorB.localeCompare(authorA);
          } else if (sortingField === 'comments') {
            // Sort by the number of comments
            const commentsA = comment.filter((com) => com.postId === a.id).length;
            const commentsB = comment.filter((com) => com.postId === b.id).length;
            return sortingOrder === 'asc'
              ? commentsA - commentsB
              : commentsB - commentsA;
          }
          return 0;
        });
        
        setSortedData(dataToSort);
      }
    

  };

  // Avoid a layout jump when reaching the last page with empty rows.
 
  useEffect(() => {
    // Fetch user data here if needed
    // Call sortData to initially sort the data based on default sorting
    sortData();
  }, [sortingField, sortingOrder]);
  const handleChangePage = (
    event,
    newPage
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

    return (
        <div className='main-table'>
        <div className='sort'>
        <label>Sort by: </label>
        <select   value={sortingField}
          onChange={(e) => setSortingField(e.target.value)}>
            <option value='default'>default</option>
            <option value='author'>Author name</option>
            <option value='comments'>Comments</option>
        </select>
        <select
          value={sortingOrder}
          onChange={(e) => setSortingOrder(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        </div>
            <table className="table table-striped">
            <thead className="thead-dark">
    <tr>
      <th scope="col">Id</th>
      <th scope="col">User Name</th>
      <th scope="col">Post Title</th>
      <th scope="col">Post</th>
      <th scope='col'>Total Comments</th>
    </tr>
  </thead>
  <tbody>
  {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((val)=> ( <tr>
      <th scope="row">{val.id}</th>
      <td>{val.authorName}</td>
      <td>{val.title}</td>
      <td>{val.body}</td>
      <td>{val.comments}</td>
    </tr>))}

   
  
  </tbody>
  <tfoot>
          <tr>
            <CustomTablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={post.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  'aria-label': 'rows per page',
                },
                actions: {
                  showFirstButton: true,
                  showLastButton: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </tr>
        </tfoot>
</table>

        </div>
    );
}  
  const CustomTablePagination = styled(TablePagination)`
    & .${classes.toolbar} {
      display: flex;
      flex-direction: column;
      
      align-items: flex-start;
      gap: 10px;
  
      @media (min-width: 768px) {
        flex-direction: row;
        align-items: center;
      }
    }
  
    & .${classes.selectLabel} {
      margin: 0;
    }
  
    & .${classes.displayedRows} {
      margin: 0;
  
      @media (min-width: 768px) {
        margin-left: auto;
      }
    }
  
    & .${classes.spacer} {
      display: none;
    }
  
    & .${classes.actions} {
      display: flex;
      gap: 0.25rem;
    }
  `;
export default Dashboard;
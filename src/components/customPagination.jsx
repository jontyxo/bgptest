import React, { useState, useEffect } from 'react';
import "../index.css"
import axios from 'axios';

const CustomPagination = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); 

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('https://jsonplaceholder.typicode.com/todos/');
      console.log(result)
      setData(result.data);
    };

    fetchData();
  }, []);

   const totalPages = Math.ceil(data.length / itemsPerPage);

  
  const indexOfLastItem = currentPage * itemsPerPage;

  
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      <h1>Custom Pagination</h1>
      <ul>
        {currentItems.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
      <div>
    
        <button onClick={() => paginate(1)} disabled={currentPage === 1}>First</button>
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
        <button onClick={() => paginate(totalPages)} disabled={currentPage === totalPages}>Last</button>
      </div>
    </div>
  );
};

export default CustomPagination;

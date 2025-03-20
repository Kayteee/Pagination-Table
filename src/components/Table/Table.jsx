import React, { useEffect, useState } from "react";
import { recordsPerPage, headers, dataError,dataLoading ,tableHeading,dataUrl} from '../../constants';
import Pagination from "../Pagination/Pagination";

function Table() {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);  // Add loading state
  const [error, setError] = useState(null);  // Add error state
  
  useEffect(() => {
    fetch(dataUrl)
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);  // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);  // Set error state
        setLoading(false);  // Set loading to false in case of error
      });
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedProjects = projects.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  if (loading) {
    return <div>{dataLoading}</div>;  // Display loading text while fetching data
  }

  if (error) {
    return <div>{dataError} {error.message}</div>;  // Handle error
  }

  const renderTableHeaders = () => {
    return headers.map((header) => (
      <th key={header.key}>{header.label}</th>
    ));
  };

  return (
    <div>
       <h1>{tableHeading}</h1> 
      <table>
        <thead>
          <tr>
            {renderTableHeaders()}
          </tr>
        </thead>
        <tbody>
          {paginatedProjects.map((project, index) => (
            <tr key={index}>
              <td>{index + 1 + (currentPage - 1) * recordsPerPage}</td>
              <td>{project["percentage.funded"]}</td>
              <td>{project["amt.pledged"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalRecords={projects.length}
        recordsPerPage={recordsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Table;

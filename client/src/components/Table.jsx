import React, { useState, useEffect } from "react";
import axios from "axios";

const Table = ({selectedMonth, setSelectedMonth}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0); // Track total pages count





  const fetchDataBySearch = async(search) => {
    const data = await axios.get(`http://localhost:3000/search?s=${search}&offset=${currentPage}&limit=${itemsPerPage}}`);
    setData(data.data.data);
    setCurrentPage(data.data.currentPage);
    setTotalPages(data.data.totalPages);
  }


  useEffect(() => {
    if(searchQuery.length){
      fetchDataBySearch(searchQuery);
    }
    else{
      const fetchData = async() =>{
        const data = await axios.get(`http://localhost:3000/?offset=${currentPage}&limit=${itemsPerPage}}`)
        setTotalPages(data.data.totalPages)
        setData(data.data.data);
      }
      fetchData();
    }
  }, [searchQuery, currentPage])

  useEffect(() => {
    if(selectedMonth > 0){
      const fetchData = async() =>{
        const data = await axios.get(`http://localhost:3000/getDataByMonth?month=${selectedMonth}&offset=${currentPage}&limit=${itemsPerPage}}`)
        setData(data.data);
        setTotalPages(Math.ceil(data.data.length / 10));

      }
      fetchData();
    }
  }, [selectedMonth])
  



  const months = [
    "Select Month",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const rows = ["id", "title", "description", "price", "category", "sold", "image"];

  // Pagination logic
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Search and Month Selection Row */}
      <div className="flex justify-between mb-4">
        <div className="flex space-x-4">
          <input
            type="text"
            className="px-4 py-2 border rounded-md"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="px-4 py-2 border rounded-md"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {months.map((month, i) => (
              <option value={i} key={i}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <table className="min-w-full table-auto border-collapse mb-4">
        <thead>
          <tr>
            {data?.length > 0 && rows.map((item, i) => (
              <th key={i} className="px-4 py-2 border-b">{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-2 border-b">{item.id}</td>
                <td className="px-4 py-2 border-b">{item.title}</td>
                <td className="px-4 py-2 border-b">{item.description}</td>
                <td className="px-4 py-2 border-b">{item.price}</td>
                <td className="px-4 py-2 border-b">{item.category}</td>
                <td className="px-4 py-2 border-b">{item.sold ? "Yes" : "No"}</td>
                <td className="px-4 py-2 border-b">{item.image}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 font-bold border rounded-md disabled:opacity-50 cursor-pointer"
          disabled={currentPage === 1}
        >
          -
        </button>
        <span className="text-xl">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 font-bold border rounded-md cursor-pointer disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Table;

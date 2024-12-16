import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Table from '../components/Table'
import Stats from '../components/Stats';
import axios from 'axios';
import CategoryStats from '../components/CategoryStats';
import PriceStats from '../components/PriceStats';

const Home = () => {

    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [statsData, setStatsData] = useState([]);
    const [priceRange, setPriceRange] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const months = [
      "Selected Month",
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

    useEffect(() => {
      const fetchData = async() =>{

        const data = await axios.get(`http://localhost:3000/combineServices?month=${selectedMonth}`)
        console.log(data)
        setStatsData(data.data.stats);
        setCategoryData(data.data.categoryStats);
        setPriceRange(data.data.priceStats);
      }

      fetchData();
    }, [selectedMonth])
    

  return (
    <>
        <div className="container">
        <Navbar />    
        <Table selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
        <Stats data={statsData} month={months[selectedMonth-1]} />
        <CategoryStats data={categoryData} selectedMonth={selectedMonth} />
        <PriceStats data={priceRange.data} selectedMonth={selectedMonth} />
        </div>
        
    </>
  )
}

export default Home
const getData = require("../db/db");

const currentMonth = new Date().getMonth() + 1;

const getAllData = async (offset = 1, limit = 10) => {
  let data = await getData();

  let length = data.length;
  let totalPages = Math.ceil(length / limit);
  let startIndex = (offset - 1) * limit;
  let endIndex = offset * limit;

  const filteredData = data.slice(startIndex, endIndex);
  return {
    data: filteredData,
    currentPage: offset,
    length,
    totalPages,
  };
};

const getDataByMonth = async (month = currentMonth) => {
  const data = await getData();
  return data.filter((item) => {
    const date = new Date(item.dateOfSale);
    return date.getMonth() + 1 == month;
  });
};

const getDataBySearch = async (search, offset = 1, limit = 10) => {
  const data = await getData();
  let filteredData = data.filter((item) => {
    if (
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.price == search
    )
      return item;
  });

  let length = filteredData.length;
  let totalPages = Math.ceil(length / limit);
  let startIndex = (offset - 1) * limit;
  let endIndex = offset * limit;
  let newData = length > 10 ? filteredData.slice(startIndex, endIndex) : filteredData;
  

  return {
    data: newData,
    currentPage: offset,
    length,
    totalPages,
  };
};

const getStats = async (month = currentMonth) => {
  const data = await getData();
  const filteredData = await getDataByMonth(month);
  const totalSales = filteredData.reduce((sum, item) => sum + item.price, 0);
  const soldItems = filteredData.filter((item) => item.sold).length;
  const notSoldItems = filteredData.filter((item) => !item.sold).length;

  return {
    totalSales,
    soldItems,
    notSoldItems,
  };
};

const getPriceRangeStats = async (month = currentMonth) => {
  const data = await getData();
  const filteredData = await getDataByMonth(month);
  const ranges = {
    '0-100': 0,
    '101-200': 0,
    '201-300': 0,
    '301-400': 0,
    '401-500': 0,
    '501-600': 0,
    '601-700': 0,
    '701-800': 0,
    '801-900': 0,
    '901+': 0
  };

  filteredData.forEach((item) => {
    const price = item.price;
    if (price <= 100) ranges['0-100']++;
      else if (price <= 200) ranges['101-200']++;
      else if (price <= 300) ranges['201-300']++;
      else if (price <= 400) ranges['301-400']++;
      else if (price <= 500) ranges['401-500']++;
      else if (price <= 600) ranges['501-600']++;
      else if (price <= 700) ranges['601-700']++;
      else if (price <= 800) ranges['701-800']++;
      else if (price <= 900) ranges['801-900']++;
      else ranges['901+']++;
  });

  return {
    data:ranges,
    totalItems: filteredData.length,
  };


};

const getCategoryData = async(month = currentMonth) =>{

    const data = await getDataByMonth(month);
    const categoryCount = {};

    data.forEach(item => {
      const category = item.category;
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });

    return {
        data: categoryCount,
        totalItems: data.length,
    }
}


const combineServices = async(month = currentMonth)=>{
    const [stats, priceStats, categoryStats] = await Promise.all([getStats(month), getPriceRangeStats(month), getCategoryData(month)]);
    return{
        stats,
        priceStats,
        categoryStats,
    }
}


module.exports = { getAllData, getDataByMonth, getDataBySearch, getStats, getPriceRangeStats, getCategoryData, combineServices};

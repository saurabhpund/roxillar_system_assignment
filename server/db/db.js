const axios = require('axios');
require('dotenv').config();


const getData =  async() =>{
    try {
        const { data } = await axios.get(process.env.API);
        return data;  
      } catch (err) {
        console.log(err);
        throw err; 
      }
}



module.exports = getData;
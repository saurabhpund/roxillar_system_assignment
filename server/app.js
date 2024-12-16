const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const router = require('./router');
const app = express();

app.use(bodyParser.json())
app.use(cors({origin: 'http://localhost:5173'}))
// console.log(typeof router)

app.use(router);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});




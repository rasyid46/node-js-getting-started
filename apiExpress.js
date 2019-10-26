require('dotenv').config()
const express = require('express') 
const app = express()
const PORT = process.env.PORT || 5000
app.get('/', (req, res) => res.send('Hello World!'))
const router = express.Router();
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

 
app.get('/mongo/list', (req, res) =>

res.json({
    statusCode : 200,
    error : "",
    message : "List mongo", 
  })

)

 


app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
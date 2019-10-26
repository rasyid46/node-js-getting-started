require('dotenv').config()
const express = require('express') 
const app = express()
const PORT = process.env.PORT || 5000
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'))

// URL apa lalu ditangani oleh aksi apa. Aksi yang kita lewatkan ke dalam routes harus menerima variabel request, response

var profileRoute = require('./routes/profileRoute');
app.use('/profile', profileRoute);
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
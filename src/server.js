require('dotenv').config();
const express = require('express'); // common js
const configViewEngine = require('./config/viewEngine');
const apiRoutes = require('./routes/api');
const fileUpload = require('express-fileupload');

const connection = require('./config/database');
const { MongoClient } = require('mongodb');

const app = express(); // app express
const port = process.env.PORT || 8888; // port
const hostname = process.env.HOST_NAME;

//config file upload
//default options
app.use(fileUpload());

//config req.body
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


//config templet engine
configViewEngine(app);

// khai bao route
app.use('/v1/api/', apiRoutes);

app.use((req, res, next) => {
  res.status(404).send('404 Not Found');
});

// Middleware xử lý lỗi toàn cục
app.use((err, req, res, next) => {
  console.error('App Error:', err);
  res.status(500).send('Something went wrong!');
});


(async () => {
  try {
    //using mongoose
    await connection();
    //using mongodb driver
    //Connection URL
    const url = process.env.DV_HOST_WITH_DRIVER;
    const client = new MongoClient(url);

    await client.connect();
    console.log('Connected successfully to server');

    app.listen(port, hostname, () => {
      console.log(`Backend zero app listening on port ${port}`)
    })
  } catch (error) {
    console.log(">>> Error connect to DB: ", error)
  }
})();



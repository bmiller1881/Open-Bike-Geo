require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

// local port for dev
const PORT = 3000;

// create express app
const app = express();

// connect to Mongo DB
const MONGO_URI = `mongodb+srv://admin:${process.env.CLIENT_SECRET_MONGODB}@cluster0.zr7uyxf.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'openBikeGeo',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log('Mongo DB connection error', err));

// route handling
const apiRouter = require('./routes/api');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

// if in production mode, the server must serve static files and index.html
if (process.env.NODE_ENV === 'production') {
  console.log(path.join(__dirname, '../dist'));
  app.use('/dist', express.static(path.join(__dirname, '../dist')));
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

app.use('*', (req, res) => {
  res.status(404).send('page not found');
});

// global error handler
app.use((err, req, res, next) => {
  const defaultError = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { error: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultError, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// start server
app.listen(process.env.PORT || PORT, () => console.log(`Server started...`));

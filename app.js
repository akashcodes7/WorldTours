const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const morgan = require('morgan');

dotenv.config({ path: './config.env' });
//importing middleware or api's
const tourRouter = require('./routes/api/tours');
const userRouter = require('./routes/api/user');
const tourDB = require('./models/tours');

const testTour = new tourDB({
  name: 'The forest',
  rating: 4.0,
  price: 496,
});
testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log(err);
  });

//App configuration or middleware

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  console.log(process.env.NODE_ENV);
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

//Importing routes and using as a parent route for the app
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/user', userRouter);

module.exports = app;

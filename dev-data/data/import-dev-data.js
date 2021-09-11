const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tours');
const fs = require('fs');

dotenv.config({ path: './config/config.env' });

//DB config
const db = require('../../config/keys').mongoURI;
//Connection to MongoDB
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('Database server Connected'))
  .catch((error) => console.log(error.message));

// READ json file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('data successfully loaded');
  } catch (err) {
    console.log(err);
  }
};

//Delete ALL DATA FROM DATABASE
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('data successfully deleted!');
  } catch (error) {
    console.log(error);
  }
};

console.log(process.argv);

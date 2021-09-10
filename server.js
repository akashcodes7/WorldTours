const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config/config.env' });

//DB config
const db = require('./config/keys').mongoURI;
//Connection to MongoDB
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('Database server Connected'))
  .catch((error) => console.log(error.message));

//server connection for production and developement
if (process.env.NODE_ENV === 'development') {
  //development
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on PORT http://localhost:${PORT}`);
  });
} else {
  //production
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`Server is running on PORT http://localhost:${PORT}`);
  });
}

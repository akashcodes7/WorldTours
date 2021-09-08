const app = require("./app");
//server connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT http://localhost:${PORT}`);
});

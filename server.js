const express = require("express");
const app = express();
const fs = require("fs");
const morgan = require("morgan");

//App configuration
app.use(express.json());
app.use(morgan("dev"));
//importing data
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//testing api's
const getAllTours = (req, res) => {
  res.status(200).json({
    status: "Success",
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};
const getTour = (req, res) => {
  console.log(req.params);

  //convert the returned paramete into the integer which is in character forms
  const id = req.params.id * 1;

  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: "faild",
      msg: "not a valid parameter ",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};
const updateTour = (req, res) => {
  //convert the returned paramete into the integer which is in character forms
  const id = req.params.id * 1;

  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: "faild",
      msg: "not a valid parameter ",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated tour here...>",
    },
  });
};
const deleteTour = (req, res) => {
  //convert the returned paramete into the integer which is in character forms
  const id = req.params.id * 1;

  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: "faild",
      msg: "not a valid parameter ",
    });
  }

  res.status(204).json({
    status: "success",
  });
};
const createTour = (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
};

//Importing routes
// app.get("/api/v1/tours/:id", getTour);
// app.patch("/api/v1/tours/:id", updateTour);
// app.delete("/api/v1/tours/:id", deleteTour);

app.route("/api/v1/tours").get(getAllTours).post(createTour);
app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);
//server connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT http://localhost:${PORT}`);
});

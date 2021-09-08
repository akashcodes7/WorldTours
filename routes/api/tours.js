const express = require("express");
const router = express.Router();
const fs = require("fs");
require("../../");
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../../dev-data/data/tours-simple.json`)
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
router.route("/").get(getAllTours).post(createTour);
router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;

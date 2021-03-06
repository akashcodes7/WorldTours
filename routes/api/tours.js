const express = require('express');

const router = express.Router();
const tourController = require('../../controller/tourControllers');

//router.param('id', tourController.checkID);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(/*tourController.checkTourPostReq*/ tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;

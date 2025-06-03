const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');

router.get('/booking', controller.getAllBookingsList);
router.get('/booking/:id', controller.getBookingById);
router.post('/booking', controller.createBooking);
router.put('/booking/:id', controller.updateBooking);
router.delete('/booking/:id', controller.deleteBooking);

module.exports = router;

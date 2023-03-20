// imports express router
const router = require('express').Router();
// imports CRUD operations from thoughtController.js
const { getAllThoughts,postThought,removeThought } = require('../../controllers/thoughtController');



router.route('/').get(getAllThoughts).post(postThought);

router.route('/:id').delete(removeThought);




// exports router
module.exports = router;
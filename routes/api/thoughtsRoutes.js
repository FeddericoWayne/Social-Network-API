// imports express router
const router = require('express').Router();
// imports CRUD operations from thoughtController.js
const { getAllThoughts,
        getThought,
        postThought,
        updateThought,
        removeThought 
} = require('../../controllers/thoughtController');


// route: /api/thoughts/
router.route('/').get(getAllThoughts).post(postThought);
// route: /api/thoughts/:id
router.route('/:id').get(getThought).put(updateThought).delete(removeThought);




// exports router
module.exports = router;
// imports express router
const router = require('express').Router();
// imports CRUD operations from thoughtController.js
const { getAllThoughts,
        getThought,
        postThought,
        updateThought,
        removeThought,
        postReaction,
        removeReaction
} = require('../../controllers/thoughtController');


// route: /api/thoughts/
router.route('/').get(getAllThoughts).post(postThought);
// route: /api/thoughts/:id
router.route('/:thoughtId').get(getThought).put(updateThought).delete(removeThought);
// route: /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(postReaction);
// route: /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);



// exports router
module.exports = router;
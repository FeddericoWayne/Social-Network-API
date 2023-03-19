// imports express router
const router = require('express').Router();
// imports CRUD functions from userController.js
const { createUser,getAllUsers,getUser,updateUser,deleteUser } = require('../../controllers/userController');


// route: /api/users/
router.route('/').get(getAllUsers).post(createUser);

// route: /api/users/:userId
router.route('/:userId').get(getUser).put(updateUser).delete(deleteUser);



 



// exports router
module.exports = router;
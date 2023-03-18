// imports express router
const router = require('express').Router();
// assigns routes to variants
const thoughtsRoutes = require('./thoughtsRoutes');
const usersRoutes = require('./usersRoutes');
// make router use routes
router.use('/thoughts',thoughtsRoutes);
router.use('/users',usersRoutes);

// exports router settings
module.exports = router;
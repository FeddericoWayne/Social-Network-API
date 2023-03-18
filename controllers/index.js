// imports express router
const router = require('express').Router();
// assigns api route to variant
const apiRoutes = require("./api");
// sets up router middleware
router.use('/api',apiRoutes);

// exports router setting
module.exports = router;
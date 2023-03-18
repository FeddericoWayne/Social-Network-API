// imports express router
const router = require('express').Router();


router.get('/',(req,res)=>{
    res.status(200).json({message:"router setup success!"});
});





// exports router
module.exports = router;
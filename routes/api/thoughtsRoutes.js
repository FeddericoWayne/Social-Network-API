// imports express router
const router = require('express').Router();
// imports mongoose models
const { Thought,User } = require('../../models');


router.get('/',(req,res)=>{
    res.status(200).json({message:"router setup success!"});
});




// exports router
module.exports = router;
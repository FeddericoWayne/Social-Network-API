// imports mongoose User model
const User = require('../models/User');

// exports user CRUD operations
module.exports = {
    // POST request for creating new user
    createUser(req,res) {
        User.create(req.body)
        .then((newUserData) => res.status(200).json(newUserData))
        .catch((err)=> res.status(400).json(err));
    },
    // GET request for retrieving all users data
    getAllUsers(req,res) {
        // find all data
        User.find({})
        .then((results)=>{
            if (results) {
                res.status(200).json(results)
            } else {
                res.status(404).json({ message: 'No data found!' })
            }
        })
        .catch(err => res.status(400).json(err));
    },
    // GET request to retrieve data of a single user
    getUser(req,res) {
        User.findOne({
            _id: req.params.userId
        })
        // excludes the '__v' field in the result data
        .select('-__v')
        // TODO: add function to populate user's thoughts and friends data
        .then((result)=> {
            if (result) {
                res.status(200).json(result)
            } else {
                res.status(404).json({ message:'User not found!' })
            }})
        .catch((err)=> res.status(400).json(err));
    },
    // PUT request to update user data by userId
    updateUser(req,res) {
        const updateBody = req.body;
        User.findOneAndUpdate({ _id: req.params.userId },
            updateBody ,
            { new: true })
        .then((result)=> {
            res.status(200).json(result)
        })
        .catch(err => res.status(400).json(err)); 
    },
    // DELETE request to remove a single user by userId
    deleteUser(req,res) {

        // TODO: remove the user's associated thoughts when user's deleted
        User.findOneAndDelete({ _id:req.params.userId })
        .then((result)=>{
            if (result) {
                res.status(200).json(result)
            } else {
                res.status(404).json({ message: 'User not found!' })
            }
        })
        .catch(err => res.status(400).json(err));
    }
};



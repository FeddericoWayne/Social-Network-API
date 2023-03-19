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
                res.status(200).json(results);
            } else {
                res.status(404).json({ message: 'No data found!' });
                return;
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
                res.status(200).json(result);
            } else {
                res.status(404).json({ message:'User not found!' });
                return;
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
            res.status(200).json(result);
        })
        .catch(err => res.status(400).json(err)); 
    },
    // DELETE request to remove a single user by userId
    deleteUser(req,res) {

        // TODO: remove the user's associated thoughts when user's deleted
        User.findOneAndDelete({ _id:req.params.userId })
        .then((result)=>{
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ message: 'User not found!' });
                return;
            }
        })
        .catch(err => res.status(400).json(err));
    },
    // add a friend to a user
    addFriend(req,res) {
        // assigns POST request params to variables
        const userId = req.params.userId;
        const friendId = req.params.friendId;

        if (userId === friendId) {
            res.status(400).json({ message:'Cannot add self as friend!'});
            return;
        };

        User.findOne({ _id:userId })
        .then((data)=>{

            // if user is not found
            if (!data) {
                res.status(404).json({ message:'User not found!'});
                return;
            }

            // if friend has already been added before
            if (data.friends.includes(friendId)) {
                res.status(409).json({ message:'Cannot add same friend twice!'});
                return;
            };

            // if able to locate user
            if (data) {

                // checks to see if friend's userId is valid
                User.findOne({ _id:friendId })
                .then((result)=>{
                    const currentArray = data.friends;
                    if (result) {
                        // pushes new friend's userId to current friend array
                        currentArray.push(friendId);
                        // saves updated data to database
                        data.save();
                        res.status(200).json(data);
                    } else if (!result) {
                        res.status(404).json({ message: 'Friend not found!'});
                        return;
                    };

                })

            } else {
                res.status(404).json({ message:'User not found!'});
                return;
            }
        })
        .catch(err => res.status(400).json(err));

    },
};



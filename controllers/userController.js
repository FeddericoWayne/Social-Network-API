// imports mongoose User and Thought models
const User = require('../models/User');
const Thought = require('../models/Thought');

// exports user CRUD operations
module.exports = {
    // POST request for creating new user
    createUser(req,res) {
        User.create(req.body)
        .then((newUserData) => res.status(200).json({ message:'New user created!'}))
        .catch((err)=> res.status(400).json(err));
    },
    // GET request for retrieving all users data
    getAllUsers(req,res) {
        // find all data
        User.find({})
        .select('-__v')
        .then((results)=>{
            if (results.length) {
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
        // populates thoughts schema and excludes the '__v' field
        .populate({ path:'thoughts',select:'-__v'})
        // populates friends schema and excludes the '__v' field
        .populate({ path:'friends',select:'-__v'})
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
            if (!result) {
                res.status(404).json({ message:'User not found!' });
                return;
            }
            res.status(200).json({ message:'User info updated!'});
        })
        .catch(err => res.status(400).json(err)); 
    },
    // DELETE request to remove a single user by userId
    deleteUser(req,res) {

        const userId = req.params.userId;
        // finds all the users that has the deleted user as a friend
        User.find({ friends:userId })
        .then((data)=>{
            // loops through all the users who has the deleted user as a friend and removes the deleted user's ID from their friends array
            for (item of data) {
                item.friends.remove(userId);
                // saves updated friend list with the deleted user's ID removed
                item.save();
            };

        })
        .catch(err => { if (err) throw err });

        // finds the deleted user and delete him along with all his posted thoughts
        User.findOneAndDelete({ _id:req.params.userId })
        .then((result)=>{
            // if user cannot be found
            if (!result) {
                res.status(404).json({ message: 'User not found!' });
                return;
            };

            const username = result.username;
            // deletes all the thoughts from the deleted user as well
            Thought.deleteMany({ username:username })
            .then((response)=> 
                res.status(200).json({ message:'User and user thoughts deleted!'}))
            .catch(err => res.status(400).json(err));
            
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
            // checks to see if friend's userId is valid
            User.findOne({ _id:friendId })
            .then((result)=>{

                const currentArray = data.friends;
                
                if (!result) {
                    res.status(404).json({ message: 'Friend not found!'});
                    return;
                };

                // pushes new friend's userId to current friend array
                currentArray.push(friendId);
                // saves updated data to database
                data.save();
                res.status(200).json({ message:'New friend added!'});

            })
            .catch(err => res.status(400).json(err));

        })
        .catch(err => res.status(400).json(err));

    },
    // DELETE request to remove a friend from user's friend list
    removeFriend(req,res) {
        // assigns POST request params to variables
        const userId = req.params.userId;
        const friendId = req.params.friendId;

        User.findOne({ _id:userId })
        .then((data)=>{

            // if user not found
            if (!data) {
                res.status(404).json({ message:'User not found!'});
                return;
            };

            // if friend list does not include friend to be removed
            if (!data.friends.includes(friendId)) {
                res.status(404).json({ message:'User is not on your friend list!'});
                return;
            };

            User.findOne({ _id:friendId })
            .then((result)=>{
                // if cannot find friend as a user
                if (!result) {
                    res.status(404).json({ message:'Friend not found!'});
                    return;
                };
                // assigns current array of user's friends to variable
                const currentArray = data.friends;
                // removes friend's userId from current array
                currentArray.remove(friendId);
                // save changes to database
                data.save();

                res.status(200).json({ message:'Friend removed!'});

            })
            .catch(err => res.status(400).json(err));
            
        })
        .catch(err => res.status(404).json(err));
    }
};



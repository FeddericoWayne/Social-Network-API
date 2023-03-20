// imports Thought model 
const { findOneAndDelete } = require('../models/Thought');
const Thought = require('../models/Thought');
const User = require('../models/User');

// exports Thought CRUD operations
module.exports = {
    // GET request to retrieve all thoughts
    getAllThoughts(req,res) {
        // finds all thoughts in database
        Thought.find({})
        .then((result)=>{
            res.status(200).json(result);
        })
        .catch(err => res.status(400).json(err));

    },
    // POST request to add new thought
    postThought(req,res) {

        const userId = req.body.userId;

        Thought.create(req.body)
        .then((result)=>{

            res.status(200).json(result);
            // locate thought author and pushes thought id to user's thoughts array
            User.findOne({ _id: userId })
            .then((data)=>{

                const thoughtArray = data.thoughts;
                thoughtArray.push(result._id);
                data.save();
            })
            .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(400).json(err));
    },
    // DELETE request to remove a thought by id
    removeThought(req,res) {
        // locates thought by thought id and deletes it
        Thought.findOneAndDelete({ _id:req.params.id})
        .then((result)=>{
            if(!result) {
                res.status(404).json({ message:'Thought not found!'});
                return;
            };
            // locates thought author and removes thought id from thoughts array
            User.findOne({ username:result.username})
            .then((data)=>{
                data.thoughts.remove(req.params.id);
                data.save();
            })
            .catch(err=> res.status(400).json(err));

            res.status(200).json(result)

        })
        .catch(err=> res.status(400).json(err));
    },

};


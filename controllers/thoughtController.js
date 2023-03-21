// imports mongoose Thought and User models
const Thought = require('../models/Thought');
const User = require('../models/User');

// exports Thought CRUD operations
module.exports = {
    // GET request to retrieve all thoughts
    getAllThoughts(req,res) {
        // finds all thoughts in database
        Thought.find({})
        .select('-__v')
        .then((result)=>{
            if (!result.length) {
                res.status(404).json({ message:'No data found!'});
                return;
            };
            res.status(200).json(result);
        })
        .catch(err => res.status(400).json(err));

    },
    // GET request to retrieve a single thought
    getThought(req,res) {
        // finds single thought by id
        Thought.findOne({ _id:req.params.thoughtId})
        .select('-__v')
        .then((result)=>{
            if (!result) {
                res.status(404).json({ message:'Thought not found!'});
                return;
            };
            res.status(200).json(result);
        })
        .catch(err => res.status(400).json(err));

    },
    // POST request to add new thought
    postThought(req,res) {

        // checks to see if user can be found in database
        User.findOne({ _id:req.body.userId,username:req.body.username})
        .then((data) =>{
            // if user is not found
            if(!data) {
                res.status(404).json({ message:'User not found!'});
                return;
            };

            const userId = req.body.userId;

            Thought.create(req.body)
            .then((result)=>{
    
                res.status(200).json({ message:'Thought posted!' });
                // locate thought author and pushes thought id to user's thoughts array
                User.findOne({ _id: userId })
                .then((response)=>{
                    // pushes thought id to user's thoughts array and saves to database
                    const thoughtArray = response.thoughts;
                    thoughtArray.push(result._id);
                    response.save();
                })
                .catch(err => res.status(400).json(err));
            })
            .catch(err => res.status(400).json(err));

        })
        .catch(err => res.status(400).json(err));

    },
    // PUT request to update a thought by id
    updateThought(req,res) {

        Thought.findOneAndUpdate({ _id:req.params.thoughtId},req.body,{ new:true })
        .then((result)=>{
            // if unable to locate thought by id
            if (!result) {
                res.status(404).json({ message:'Thought not found!'});
                return;
            };
            res.status(200).json({ message:'Thought updated!' });
        })
        .catch(err => res.status(400).json(err));

    },
    // DELETE request to remove a thought by id
    removeThought(req,res) {
        // locates thought by thought id and deletes it
        Thought.findOneAndDelete({ _id:req.params.thoughtId})
        .then((result)=>{
            if(!result) {
                res.status(404).json({ message:'Thought not found!'});
                return;
            };
            // locates thought author and removes thought id from thoughts array
            User.findOne({ username:result.username})
            .then((data)=>{
                
                // removes thought id from user's thoughts array
                data.thoughts.remove(req.params.thoughtId);
                // saves updated user thought array into database
                data.save();
            })
            .catch(err=> res.status(400).json(err));

            res.status(200).json({ message:'Thought deleted!' })

        })
        .catch(err=> res.status(400).json(err));
    },
    // POST request to post a new reaction to a thought by thought ID
    postReaction(req,res) {

        // checks if username exists
        User.findOne({ username:req.body.username })
        .then((response) =>{
            // if username is not found 
            if (!response) {
                res.status(404).json({ message:'User not found!'});
                return;
            };

            // locates thought by thoughtId
            Thought.findOne({ _id:req.params.thoughtId })
            .then((result)=>{
                // if thought isn't found
                if (!result) {
                    res.status(404).json({ message:'Thought not found!'});
                    return;
                };

                // pushes new reaction into the thought's reaction array
                result.reactions.push(req.body);
                // saves updated reactions to database
                result.save();

                res.status(200).json({ message:'Reaction posted!' });
            })
            .catch(err => res.status(400).json(err));

        })
        .catch(err => res.statsu(400).json(err));
        
    },
    // DELETE request to remove a reaction to a thought
    removeReaction(req,res) {
        Thought.findOne({ _id:req.params.thoughtId })
        .then((result)=>{
            // if thought is not found
            if (!result) {
                res.status(404).json({ message:'Thought not found!'});
                return;
            };

            // removes the reaction by reactionId
            result.reactions.remove({ reactionId:req.params.reactionId });
            // save updated reaction array to database
            result.save();
            res.status(200).json({ message:'Reaction Deleted!'});


        })
        .catch(err => res.status(400).json(err));
    }

};


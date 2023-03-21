const { Schema, model } = require('mongoose');
const reaction = require('./reaction');


function formatDate(date) {

    const timelapsed = new Date(date);

    return `${timelapsed.toDateString()} ${timelapsed.toLocaleTimeString()} EST`;

};


const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        maxLength: 280
    },
    // TODO: figure out how to use getter method for date/time
    createdAt: {
        type: Date,
        default: Date.now,
        immutable:true,
        get: formatDate
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reaction]

},{
    // allows virtuals and getters to run when converting to JSON
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false

});


thoughtSchema
    .virtual('reactionCount')
    .get(function(){
        return this.reactions.length
    });




const Thought = model('thought',thoughtSchema);



module.exports = Thought;
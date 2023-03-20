const { Schema, model } = require('mongoose');


function formatDate(date) {

    const timelapsed = new Date(date);

    return `${timelapsed.toDateString()} ${timelapsed.toLocaleTimeString()} EST`;

};

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    // TODO: figure out how to use getter method for date/time
    createdAt: {
        type: Date,
        default: Date.now,
        immutable:true,
        get: formatDate
    }
});

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
    reactions: [reactionSchema]

},{
    toJSON: {
        virtuals: true
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
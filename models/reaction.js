const { Schema,Types } = require('mongoose');

function formatDate(date) {

    const timelapsed = new Date(date);

    return `${timelapsed.toDateString()} ${timelapsed.toLocaleTimeString()} EST`;

};

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
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


module.exports = reactionSchema;
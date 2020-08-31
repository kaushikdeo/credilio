const {Schema, SchemaTypes, model} = require('mongoose');

const MovieSchema = new Schema({
    name: {
        type: String,
        unique : true,
        required : true,
        dropDups: true
    },
    pgRating: {
        type: String,
    },
    imdbRating: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    genre: [{
        type: String
    }],
    poster: {
        type: String,
    }
}, {timestamps: true})

module.exports = model('Movie', MovieSchema);
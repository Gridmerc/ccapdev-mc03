
var mongoose = require('mongoose');

/*
    TODO:   Complete the UserSchema which will contain the name and the
            number of contacts in the database.
*/

var UserSchema = new mongoose.Schema({
    uName: {
        type: String,
        required: true
    },
    uNumber: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);

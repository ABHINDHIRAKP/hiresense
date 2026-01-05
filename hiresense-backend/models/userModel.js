const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email address']
    },
    password: {
        type: String,
        required: [true, 'Please add a phone number']
    },
    roles: {
        type: [String],
        enum: ['recruiter', 'jobseeker'],
        required: [true, 'Please specify user role'],
        default: []
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema);
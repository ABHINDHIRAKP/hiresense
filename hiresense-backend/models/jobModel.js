const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    minExperience: {
      type: Number,
      required: true
    },
    skills: {
      type: [String],
      required: true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Job', jobSchema);
const mongoose = require ('mongoose')

const exerciseSchema = new mongoose.Schema ({
    type: {type: String},
    workout: {type: Boolean},
    exercise: {type: String},
    setOne: {type: Number},
    repsOne: {type: Number},
    setTwo: {type: Number},
    repsTwo: {type: Number},
    setThree: {type: Number},
    repsThree: {type: Number},
    setFour: {type: Number},
    repsFour: {type: Number},
    video: {type: String}
})

//creating the collection within mongoose with database created
//inside of the server page
const Exercise = mongoose.model('Log', exerciseSchema)
//exporting the shcema within variable given in line 28 to use in server page
module.exports = Exercise
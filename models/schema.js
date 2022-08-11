const mongoose = require ('mongoose')

const exerciseSchema = new mongoose.Schema ({
    day: {type: String, required: true },
    type: {type: String, required: true},
    workout: {type: Boolean, required: true},
    exercise: {type: String, required: true},
})

//creating the collection within mongoose with database created
//inside of the server page
const Exercise = mongoose.model('Log', exerciseSchema)
//exporting the shcema within variable given in line 28 to use in server page
module.exports = Exercise
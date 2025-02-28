const mongoose = require('mongoose')
// you must install this library
//const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3
  },
  passwordHash: String,
  favoriteGenre: {
    type: String,
    required: true,
    minlength: 5
  }
  /*friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author'
    }
  ],*/
})


//The below may be needed

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  },
})

//schema.plugin(uniqueValidator)

module.exports = mongoose.model('User', schema)
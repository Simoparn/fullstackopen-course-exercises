const mongoose = require('mongoose')
// you must install this library
//const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author'
    }
  ],
})

//schema.plugin(uniqueValidator)

module.exports = mongoose.model('User', schema)
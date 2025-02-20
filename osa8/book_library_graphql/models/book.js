const mongoose = require('mongoose')
// you must install this library
//const uniqueValidator = require('mongoose-unique-validator')


const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 5
  },
  published: {
    type: Number,
    //maximum possible year with a custom error message
    max: [10000, "Published year cannot exceed 10000"]
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  genres: {
    type: [String],
    validate: {
      validator: function(genresArray) {
        return genresArray.length > 0
      },
      message: "The genres array must have atleast 1 genre"
    }
  }
})

//schema.plugin(uniqueValidator)

module.exports = mongoose.model('Book', schema)
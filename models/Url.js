const mongoose = require('mongoose')
const { Schema, model } = mongoose

const urlSchema = new Schema({
  short_url: {
    type: String,
    required: true
  },
  origin_url: {
    type: String,
    required: true
  }
})

module.exports = model('Url', urlSchema)

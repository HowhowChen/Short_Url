const mongoose = require('mongoose')
const { Schema, model } = mongoose

const urlSchema = new Schema({
  shortUrl: {
    type: String,
    required: true
  },
  originUrl: {
    type: String,
    required: true
  }
})

module.exports = model('Url', urlSchema)

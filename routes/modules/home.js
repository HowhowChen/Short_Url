const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('index', { test: 123 })
})

module.exports = router
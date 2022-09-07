const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  const originUrl = req.body.originUrl.trim()
  console.log(originUrl)
  res.render('copy')
})

module.exports = router

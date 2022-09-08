const express = require('express')
const Url = require('../../models/Url')
const shortenUrl = require('../../utils/shortenUrl')
const router = express.Router()
let projectUrl = 'http://localhost/'

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  const originUrl = req.body.originUrl.trim()
  const shortUrl = shortenUrl()
  const url = projectUrl + shortUrl

  return Url.create({ originUrl, shortUrl })
    .then(() => {
      res.render('copy', { url })
    })
    .catch(error => console.log(error))
})

router.get('/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl
  return Url.find({ shortUrl })
    .lean()
    .then(url => {
      res.redirect(url.originUrl)
    })
})

module.exports = router

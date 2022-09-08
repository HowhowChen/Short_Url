const express = require('express')
const Url = require('../../models/Url')
const shortenUrl = require('../../utils/shortenUrl')
const router = express.Router()
const port = process.env.PORT || 3000
let projectUrl = `http://howhowshorturl.herokuapp.com:${port}/`

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
  return Url.findOne({ shortUrl })
    .lean()
    .then(url => {
      const originUrl = url.originUrl
      res.redirect(originUrl)
    })
})

module.exports = router

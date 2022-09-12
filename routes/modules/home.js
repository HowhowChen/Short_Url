const express = require('express')
const Url = require('../../models/Url')
const shortenUrl = require('../../utils/shortenUrl')
const router = express.Router()
const projectUrl = process.env.HOST

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  const originUrl = req.body.originUrl.trim()
  let copyUrl

  return Url.findOne({ origin_url: originUrl })
    .then(url => {
      //  未重複
      if (!url) {
        const shortUrl = shortenUrl()
        copyUrl = projectUrl + shortUrl
        return Url.create({ origin_url: originUrl, short_url: shortUrl })
          .then(() => res.render('copy', { copyUrl, success: 1 }))
          .catch(error => console.log(error))
      }
      //  重複
      copyUrl = projectUrl + url.short_url
      res.render('copy', { copyUrl, success: 1 })
    })
    .catch(error => console.log(error))
})

router.get('/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl
  let errorMsg
  return Url.findOne({ short_url: shortUrl })
    .lean()
    .then(url => {
      if (!url) {
        errorMsg = 'The url is not found!'
        return res.render('copy', { errorMsg, error: 1 })
      }
      res.redirect(url.origin_url)
    })
    .catch(error => {
      console.log(error)
      errorMsg = error.message
      res.render('copy', { errorMsg, error: 1 })
    })
})

module.exports = router

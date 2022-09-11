const express = require('express')
const Url = require('../../models/Url')
const shortenUrl = require('../../utils/shortenUrl')
const router = express.Router()
const port = process.env.PORT || 3000
//let projectUrl =  `http://howhowshorturl/`
let projectUrl =  `http://localhost:${port}/`
router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  const originUrl = req.body.originUrl.trim()
  let copyUrl

  return Url.findOne({ originUrl })
    .then(url => {
      //  未重複
      if (!url) {
        const shortUrl = shortenUrl()
        copyUrl = projectUrl + shortUrl
        return Url.create({ originUrl, shortUrl })
        .then(() => res.render('copy', { copyUrl, success: 1 })) 
        .catch(error => console.log(error))
      }
      //  重複
      copyUrl = projectUrl + url.shortUrl
      res.render('copy', { copyUrl, success: 1 })
    })
    .catch(error => console.log(error))
})

router.get('/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl
  let errorMsg
  return Url.findOne({ shortUrl })
    .lean()
    .then(url => {
      if (!url) {
        errorMsg = 'The url is not found!'
        return res.render('copy', { errorMsg, error: 1 })
      }
      
      res.redirect(url.originUrl)
    })
    .catch(error => {
      console.log(error)
      errorMsg = error.message
      res.render('copy', { errorMsg, error: 1 })
    })
})

module.exports = router

const express = require('express')
const exphbs = require('express-handlebars')

// setting routes
const routes = require('./routes')

//setting mongoose
require('./config/mongoose')

const app = express()
const port = 3000

//  setting handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//setting static file
app.use(express.static('public'))

//setting body parser
app.use(express.urlencoded({ extended: true }))

//setting routes
app.use(routes)

//setting listeng
app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`)
})

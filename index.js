const express = require('express')
const path = require('path')
const request = require('request')
const bodyparse = require('body-parser')
const { json } = require('express')
const PORT = process.env.PORT || 5000
const APIkey = "AIzaSyDdn6yzTBR15sshvZlumi1L_HVSpX3lvgk"

express() 
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyparse.urlencoded({extended:true}))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/home'))
  .post ('/bookcall', (req, res) => {
    var search = req.body.search
    var select = req.body.select
    if (select == "") {
      // request.get("https://www.googleapis.com/books/v1/volumes?q=" + search + "&maxResults=36&orderBy=relevance&key=AIzaSyDdn6yzTBR15sshvZlumi1L_HVSpX3lvgk", { json: true }, (error, data) => {
        request.get("https://www.googleapis.com/books/v1/volumes?q=" + search + "&maxResults=36&orderBy=relevance", { json: true }, (error, data) => {
          if (error) { return console.log(err) }
          res.type('json')
          res.json(data.body)
        })
    } else {
      request.get("https://www.googleapis.com/books/v1/volumes?q=" + select + search + "&maxResults=36&orderBy=relevance", { json: true }, (error, data) => {
        if (error) { return console.log(err) }
        res.type('json')
        res.json(data.body)
      })
    }
  })
.listen(PORT, () => console.log(`Listening on ${ PORT }`))

// function APIKey() {
//   return "AIzaSyDdn6yzTBR15sshvZlumi1L_HVSpX3lvgk"
// }
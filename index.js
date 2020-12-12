const express = require('express')
const path = require('path')
const request = require('request');
const PORT = process.env.PORT || 5000

express() 
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/bookcall', googleAPI)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

function googleAPI(req, res) {
  search = req.body.search
  select = req.body.select
  request("https://www.googleapis.com/books/v1/volumes?q=harry+potter&maxResults=36&orderBy=relevance", { json: true }, (err, res, data) => {

  //request("https://www.googleapis.com/books/v1/volumes?q=" + select + search + "&maxResults=36&orderBy=relevance&key=" + APIKey(), { json: true }, (err, res, data) => {
    if (err) { return console.log(err); }
    res.json(data);
  });}

// function APIKey() {
//   return "AIzaSyDdn6yzTBR15sshvZlumi1L_HVSpX3lvgk"
// }





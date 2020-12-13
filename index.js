const express = require('express')
const path = require('path')
const app = express()
const request = require('request');
const PORT = process.env.PORT || 5000

express() 
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/home'))
  .get('/bookcall', googleAPI)
//   .get ('/bookcall', (req, res) => {
//     var search = req.search
//     console.log(search)
//     var select = req.select
//     console.log(search)
//     request.get("https://www.googleapis.com/books/v1/volumes?q=" + select + search + "&maxResults=36&orderBy=relevance", { json: true }, (error, data) => {
//       if (error) { return console.log(err) }
//       console.log(data)
//       res.send(data)
//     })
// })
.listen(PORT, () => console.log(`Listening on ${ PORT }`))

// function googleAPI(req, res) {
//   search = req.search
//   select = req.select
//   res.send("https://www.googleapis.com/books/v1/volumes?q=" + select + search + "&maxResults=36&orderBy=relevance", { json: true }, (error, data) => {
//   if (error) { return console.log(err) }
//   // console.log(data)
//   res.send(data)
//   })
// }


function googleAPI(search, select) {
  // search = req.search
  // select = req.select
  request("https://www.googleapis.com/books/v1/volumes?q=" + select + search + "&maxResults=36&orderBy=relevance", (error, data) => {
    if (error) { return console.log(err) }
    console.log(data)
    res.send(data)
    }
  )
}
// request("https://www.googleapis.com/books/v1/volumes?q=" + select + search + "&maxResults=36&orderBy=relevance&key=" + APIKey(), { json: true }, (err, response, data) => {
//   if (err) { return console.log(err) }
//   console.log(data)
//   res.json(data)
// });
// }

// function APIKey() {
//   return "AIzaSyDdn6yzTBR15sshvZlumi1L_HVSpX3lvgk"
// }



// function bookSearch(){
//   var search = document.getElementById('inputSearch').value
//   var select = document.getElementById('searchSelect').value
//   document.getElementById('books').innerHTML = ""
//   console.log(search)
//   $.ajax({
//       url: "/bookcall",
//       dataType: "json",
//       type: 'GET',
//       //data: {search: search, select: select},
//       success: forLoop,
//       error: function(jqXHR, status, err) {
//           alert("Please enter informatiion into the search field to find a book");          },
//   });
// }
// document.getElementById('searchBTN').addEventListener('click', bookSearch, false)

// function forLoop(data) {
//   for(i = 0; i <= data.items.length; i++) {
//       let result = ""
//       result += "<div class=bookCard style={list-style-type: none;}>"
//       result += "<a href=" + data.items[i].volumeInfo.infoLink + "><img class=bookCover src=" + data.items[i].volumeInfo.imageLinks.smallThumbnail + "/></a>"
//       result += "<div class=bookDetails>"
//       result += "<h3>" + data.items[i].volumeInfo.title + "</h3>"
//       result += "<h4>Author(s):</h4>"
//       result += "<ul>" 
//           data.items[i].volumeInfo.authors.forEach(author => {result += "<li>" + author + "</li>" })
//       result += "</ul>"
//       result += "<p id=description>" + data.items[i].volumeInfo.description + "</p>"
//       //result += "<p>" +  + "</p>"
//       result += "</div></div>"
//       books.innerHTML += result
//   }      
// }


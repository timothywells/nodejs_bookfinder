
    var search = document.getElementById('inputSearch').value
    var select = document.getElementById('searchSelect').value
    
function bookSearch(){

    document.getElementById('books').innerHTML = ""
    //console.log(search)
    $.ajax({
        type: "GET",
        url: "/bookcall",
        //url: "https://www.googleapis.com/books/v1/volumes?q=" + select + search + "&maxResults=36&orderBy=relevance",
        data: {search: search, select: select},
        dataType: "json",
        contentType: "application/json",
        success: forLoop,
        error: function() {
            alert("Please enter informatiion into the search field to find a book");          },
    });
  }
  document.getElementById('searchBTN').addEventListener('click', bookSearch, false)
  
  function forLoop(data) {
    for(i = 0; i <= data.items.length; i++) {
        let result = ""
        result += "<div class=bookCard style={list-style-type: none;}>"
        result += "<a href=" + data.items[i].volumeInfo.infoLink + "><img class=bookCover src=" + data.items[i].volumeInfo.imageLinks.smallThumbnail + "/></a>"
        result += "<div class=bookDetails>"
        result += "<h3>" + data.items[i].volumeInfo.title + "</h3>"
        result += "<h4>Author(s):</h4>"
        result += "<ul>" 
            data.items[i].volumeInfo.authors.forEach(author => {result += "<li>" + author + "</li>" })
        result += "</ul>"
        result += "<p id=description>" + data.items[i].volumeInfo.description + "</p>"
        //result += "<p>" +  + "</p>"
        result += "</div></div>"
        books.innerHTML += result
    }      
  }
  
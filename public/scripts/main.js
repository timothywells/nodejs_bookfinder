function bookSearch(){
    var search = document.getElementById('inputSearch').value
    var select = document.getElementById('searchSelect').value
    document.getElementById('books').innerHTML = ""
    if(search == "") {
        alert("Please enter informatiion into the search field to find a book")
        return false
    } else if (select == ""){
        $.ajax({
            type:"POST",
            data: {search:search, select: ""},
            url: "/bookcall",
            dataType: "text",
            success: forLoop,
            error: function() {
                alert("Please enter informatiion into the search field to find a book");
            },
        });
    } else {
        $.ajax({
            type:"POST",
            data: {search:search, select:select + ":"},
            url: "/bookcall",
            dataType: "text",
            success: forLoop,
            error: function() {
                alert("Please enter informatiion into the search field to find a book");
            },
        });
    }
  }
  document.getElementById('searchBTN').addEventListener('click', bookSearch, false)

  function forLoop(inputdata) {
    var data = JSON.parse(inputdata)
    console.log(data)
    var i;
    var i;
    for(i in data.items) {
        let result = ""
        result += "<div class=bookCard>"
            result += "<div class=row>"
                result += "<a href=" + (data.items[i].volumeInfo.infoLink || '') + ">"
                    try {
                        try {
                            result += "<img class=bookCover src=" + data.items[i].volumeInfo.imageLinks.thumbnail + "/>"
                        } catch {
                            result += "<img class=bookCover src=" + data.items[i].volumeInfo.imageLinks.smallThumbnail + "/>"
                        }
                    } catch {
                        result += "<img class=bookCover src=/media/nobook.jpg>"
                    }
                result += "</a>"
                result += "<div class=bookDetails>"
                    result += "<h3 id=title>" + (data.items[i].volumeInfo.title || 'Title Unavailable') + "</h3>"
                        result += "<h4>Author(s):</h4>"
                            result += "<ul>"
                                try {
                                    data.items[i].volumeInfo.authors.forEach(author => {result += "<li>" + (author) + "</li>"})
                                } catch {
                                    result += "<li>Author Unavailable</li>"
                                }
                            result += "</ul>"
                        result += "<p id=description>" + (data.items[i].volumeInfo.description || 'Description Unavailable') + "</p>"
                    result += "</div>"
                result += "</div>"
            result += "<div class=links>"
                result += "<div>"
                    result += '<span id=GBS_Button0><img src=https://books.google.com/intl/en/googlebooks/images/gbs_preview_button1.gif border=0></span>'
                result += "</div>"
                result += "<div class=linkbtn><a href=" + (data.items[i].volumeInfo.previewLink || alert("Preview Unavailable")) + " target=_blank>Preview</a></div>"
                result += "<div class=linkbtn><a href=" + (data.items[i].volumeInfo.infoLink || alert("Preview Unavailable")) + " target=_blank>More Info</a></div>"
            result += "</div>"        
        result += "</div>"
    books.innerHTML += result
    }      
}
  
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
            data: {search:search, select:select},
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
    for(i = 0; i <= data.items.length; i++) {
        let result = ""
        result += "<div class=bookCard>"
            result += "<div class=row>"
                result += "<a href=" + (data.items[i].volumeInfo.infoLink || '') + "><img class=bookCover src=" + (data.items[i].volumeInfo.imageLinks.smallThumbnail || 'Image Unavailable') + "/></a>"
                    result += "<div class=bookDetails>"
                        result += "<h3>" + (data.items[i].volumeInfo.title || 'Title Unavailable') + "</h3>"
                            result += "<h4>Author(s):</h4>"
                                result += "<ul>" 
                                    data.items[i].volumeInfo.authors.forEach(author => {result += "<li>" + (author || 'Author Information Unavailable') + "</li>" })
                                result += "</ul>"
                            result += "<p id=description>" + (data.items[i].volumeInfo.description || 'Description Unavailable') + "</p>"
                    result += "</div>"
            result += "</div>"
            result += "<div class=links>"
                result += "<div>"
                    //result += '<script type=text/javascript src=https://books.google.com/books/previewlib.js></script>'
                    result += '<span id=GBS_Button0><img src=https://books.google.com/intl/en/googlebooks/images/gbs_preview_button1.gif border=0></span>'
                    //result += '<script type=text/javascript>GBS_insertPreviewButtonPopup(\'ISBN:' + data.items[i].volumeInfo.industryIdentifiers[0].identifier + '\');</script>'                        
                result += "</div>"
                result += "<div class=linkbtn><a href=" + (data.items[i].volumeInfo.previewLink || alert("Preview Unavailable")) + " target=_blank>Preview</a></div>"
                result += "<div class=linkbtn><a href=" + (data.items[i].volumeInfo.infoLink || alert("Preview Unavailable")) + " target=_blank>More Info</a></div>"
                //result += "<div class=linkbtn><a href=" + (data.items[i].volumeInfo.canonicalVolumeLink || alert("Preview Unavailable")) + " target=_blank>Preview</a></div>"
            result += "</div>"        
        result += "</div>"
    books.innerHTML += result
    }      
  }
  
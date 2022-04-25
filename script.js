// Class book
class books {
  constructor(name, author, type) {
    this.name = name.toLowerCase();
    this.author = author.toLowerCase();
    this.type = type;
  }
}

// Class display that contain all the necessory functions
class display {
  // Validating book
  validate(book) {
    if (book.name.length < 3) {
      return false;
    } else {
      return true;
    }
  }

  // Takes the book value in parameter and populates them in html document
  add(book) {
    // Storing books in localStorage
    let booksObj = localStorage.getItem("books");
    if (booksObj == null) {
      booksObj = [];
    } else {
      booksObj = JSON.parse(booksObj);
    }

    booksObj.push([book.name, book.author, book.type]);
    localStorage.setItem("books", JSON.stringify(booksObj));
  }

  // Clearing the form
  clear() {
    let libraryform = document.getElementById("libraryform");
    libraryform.reset();
  }

  // Showing alerts/response
  response(type, displayMessage) {
    let message = document.getElementById("message");
    let alert;
    if (type == "Added") {
      alert = "primary";
    } else {
      alert = "danger";
    }
    message.innerHTML = `<div class="alert alert-${alert} alert-dismissible fade show" role="alert">
              <strong>${type}:</strong> ${displayMessage}
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">×</span>
              </button>
              </div>`;
    setTimeout(() => {
      message.innerHTML = "";
    }, 1000);
  }

  // A static function that can be called without declaring a class object
  // It basically takes nothing and displays all the values of localStorage
  static displayBook() {
    let booksObj = localStorage.getItem("books");

    if (booksObj == null) {
      booksObj = [];
    } else {
      booksObj = JSON.parse(booksObj);
    }

    booksObj.forEach(function (element, index) {
      // console.log(index);
      let tableBody = document.getElementById("tableBody");

      tableBody.innerHTML += `<tr class='rows'>
      <td>${element[0]}</td>
      <td>${element[1]}</td>
      <td>${element[2]}</td>
      <td><button id="${index}"onclick="deleteBook(this.id)" class="btn btn-outline-dark">Delete Book</button> </td>
      </tr>`;
    });
  }
}

// Displaying all books
display.displayBook();

//Event listener to add books
document.getElementById("addBtn").addEventListener("click", () => {
  // e.preventDefault();

  let name = document.getElementById("bookName").value;
  let author = document.getElementById("author").value;

  // Getting checked value
  let type;
  let comic = document.getElementById("comic");
  let manga = document.getElementById("manga");
  let others = document.getElementById("others");
  if (comic.checked) {
    type = "comic";
  } else if (manga.checked) {
    type = "manga";
  } else if (others.checked) {
    type = "others";
  }
  console.log(type);

  // Defining a object of class book to initialize book values
  let book = new books(name, author, type);

  // Defining a object of class display
  let showBook = new display();

  // Here parameter "book" is an object that aleardy contains book values
  if (showBook.validate(book)) {
    showBook.add(book);
    showBook.clear();
    showBook.response("Added", "Your book has been added");
  } else {
    showBook.response("Error", "You can not add this book");
  }
  display.displayBook();
});

// Delete function
function deleteBook(index) {
  let book = JSON.parse(localStorage.getItem("books"));
  book.splice(index, 1);
  localStorage.setItem("books", JSON.stringify(book));
  location.reload();
}

// Searh functionality
let searchBook = document.getElementById("searchBook");
searchBook.addEventListener("input", () => {
  let inputVal = searchBook.value.toLowerCase();
  console.log("input event fired", inputVal);
  let rows = document.getElementsByClassName("rows");
  Array.from(rows).forEach(function (element) {
    if (element.getElementsByTagName("td")[0].innerText.includes(inputVal)) {
      element.style.display = "table-row";
    } else {
      element.style.display = "none";
    }
  });
});

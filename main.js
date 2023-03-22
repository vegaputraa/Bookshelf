const books = [];
const RENDER_EVENT = "render-book";

function generateId() {
  return +new Date();
}

function generateBookObject(id, title, author, year, isCompleted) {
  return {
    id,
    title,
    author,
    year,
    isCompleted,
  };
}

document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("inputBook");
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
  });
});

function addBook() {
  const titleBook = document.getElementById("inputBookTitle").value;
  const authorBook = document.getElementById("inputBookAuthor").value;
  const bookYear = document.getElementById("inputBookYear").value;

  const generatedID = generateId();
  const bookObject = generateBookObject(generatedID, titleBook, authorBook, bookYear, false);
  books.push(bookObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
}

function makeBook(bookObject) {
  const titleBook = document.createElement("h2");
  titleBook.innerText = bookObject.title;

  const authorBook = document.createElement("p");
  authorBook.innerText = bookObject.author;

  const bookYear = document.createElement("p");
  bookYear.innerText = bookObject.year;

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("inner");

  const container = document.createElement("article");
  container.classList.add("book_item");
  container.setAttribute("id", `book-${bookObject.id}`);
  container.append(titleBook, authorBook, bookYear);

  if (bookObject.isCompleted) {
    const undoButton = document.createElement("button");
    undoButton.classList.add("green");
    undoButton.setAttribute("id", "button-undo");
    undoButton.innerText = "Sudah Selesai Dibaca";

    undoButton.addEventListener("click", function () {
      undoBookFromCompleted(bookObject.id);
    });

    const trashButton = document.createElement("button");
    trashButton.classList.add("red");
    trashButton.setAttribute("id", "trash-button");
    trashButton.innerText = "Hapus Buku";

    trashButton.addEventListener("click", function () {
      removeBookFromCompleted(bookObject.id);
    });

    container.append(undoButton, trashButton);
  } else {
    const undoButton = document.createElement("button");
    undoButton.classList.add("green");
    undoButton.setAttribute("id", "button-undo");
    undoButton.innerText = "Sudah Selesai";

    undoButton.addEventListener("click", function () {
      undoBookFromCompleted(bookObject.id);
    });

    const trashButton = document.createElement("button");
    trashButton.classList.add("red");
    trashButton.setAttribute("id", "trash-button");
    trashButton.innerText = "Hapus Buku";

    trashButton.addEventListener("click", function () {
      removeBookFromCompleted(bookObject.id);
    });
    container.append(undoButton, trashButton);
  }

  return container;
}

document.addEventListener(RENDER_EVENT, function () {
  const incompletedBOOKList = document.getElementById("incompleteBookshelfList");
  incompletedBOOKList.innerHTML = "";

  for (const bookItem of books) {
    const bookElement = makeBook(bookItem);
    if (!bookItem.isCompleted) {
      incompletedBOOKList.append(bookElement);
    }
  }
});

function addBookToCompleted(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isCompleted = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
}

function findBook(bookId) {
  for (const bookItem of books) {
    if (bookItem.id === bookId) {
      return bookItem;
    }
    return null;
  }
}

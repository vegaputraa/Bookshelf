const books = [];
const RENDER_EVENT = "render-book";

function generateId() {
  return +new Date();
}

function generateBookshelfObject(id, title, author, year, isCompleted) {
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
  const bookshelfObject = generateBookshelfObject(generatedID, titleBook, authorBook, bookYear, false);
  books.push(bookshelfObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
}

function makeBook(bookshelfObject) {
  const titleBook = document.createElement("h2");
  titleBook.innerText = bookshelfObject.book;

  const authorBook = document.createElement("p");
  authorBook.innerText = bookshelfObject.author;

  const bookYear = document.createElement("p");
  bookYear.innerText = bookshelfObject.year;

  const buttonContainer = document.createElement("article");
  buttonContainer.classList.add("inner");

  const container = document.createElement("div");
  container.classList.add("book_item");
  container.setAttribute("id", `book-${bookshelfObject.id}`);
  container.append(titleBook, authorBook, bookYear);

  if (bookshelfObject.isCompleted) {
    const undoBotton = document.createElement("button");
    undoBotton.classList.add("undo-button", "green");
    undoBotton.setAttribute("id", "button-undo");
    undoBotton.innerText = "Sudah Selesai Dibaca";

    undoBotton.addEventListener("click", function () {
      undoBookFromCompleted(bookshelfObject.id);
    });

    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-button", "red");
    trashButton.setAttribute("id", "trash-button");
    trashButton.innerText = "Hapus Buku";

    trashButton.addEventListener("click", function () {
      removeBookFromCompleted(bookshelfObject.id);
    });

    container.append(undoBotton, trashButton);
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

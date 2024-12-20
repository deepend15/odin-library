const myLibrary = [
    {title: "Wool", author: "Hugh Howey", pages: 538, haveRead: "have read"},
    {title: "The Institute", author: "Steven King", pages: 576, haveRead: "have read"},
];

function Book(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
}

Book.prototype.info = function() {
    return `"${this.title}" by ${this.author}, ${this.pages} pages, ${this.haveRead}`;
}

function addBookToLibrary(title, author, pages, haveRead) {
    let book = new Book(title, author, pages, haveRead);
    myLibrary.push(book);
}

let cardContainer = document.querySelector(".card-container");

function displayBooks(library) {
    for (const book of library) {
        const card = document.createElement("div");
        card.classList.add("card");
        cardContainer.appendChild(card);
        const title = document.createElement("div");
        title.classList.add("title");
        title.textContent = `${book.title}`;
        card.appendChild(title);
        const author = document.createElement("p");
        author.textContent = `by ${book.author}`;
        card.appendChild(author);
        const pages = document.createElement("p");
        pages.textContent = `${book.pages} pages`;
        card.appendChild(pages);
        const haveRead = document.createElement("p");
        haveRead.textContent = `${book.haveRead}`;
        card.appendChild(haveRead);
    }
}

const dialog = document.querySelector("dialog");
const newBookButton = document.querySelector(".new-book-button");
const dialogCloseButton = document.querySelector("dialog button");

newBookButton.addEventListener("click", () => {
    dialog.showModal();
})

dialogCloseButton.addEventListener("click", () => {
    dialog.close();
})


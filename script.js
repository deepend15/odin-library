const myLibrary = [];

function Book(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
}

Book.prototype.info = function() {
    return `"${this.title}" by ${this.author}, ${this.pages} pages, ${this.haveRead}`;
}
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

const newBookButton = document.querySelector(".new-book-button");
const addBookDialog = document.getElementById("addBookDialog");
const dialogTitle = addBookDialog.querySelector("#title");
const dialogAuthor = addBookDialog.querySelector("#author");
const dialogPages = addBookDialog.querySelector("#pages");
const dialogHaveRead = addBookDialog.querySelector("select");
const cancelBtn = addBookDialog.querySelector("#cancelBtn");
const confirmBtn = addBookDialog.querySelector("#confirmBtn");

function dialogEscAndEnterBtns(e) {
    let clickEvent = new MouseEvent("click");
    if (e.key === "Escape") {
        addBookDialog.returnValue = "cancel";
    } else if (e.key === "Enter") {
        e.preventDefault();
        confirmBtn.dispatchEvent(clickEvent);
    };
}

newBookButton.addEventListener("click", () => {
    addBookDialog.showModal();
    dialogTitle.value = "";
    dialogAuthor.value = "";
    dialogPages.value = "";
    dialogHaveRead.value = "Yes";
    addBookDialog.returnValue = "";
    window.addEventListener("keydown", dialogEscAndEnterBtns);
})

addBookDialog.addEventListener("close", (e) => {
    let haveReadValue = "";
    if (dialogHaveRead.value === "Yes") {
        haveReadValue = "have read";
    } else if (dialogHaveRead.value === "No") {
        haveReadValue = "have not read";
    };
    if (addBookDialog.returnValue === "cancel") {
        console.log(`cancel`);
    } else {
        console.log(`Title: ${dialogTitle.value}. Author: ${dialogAuthor.value}. Pages: ${dialogPages.value}. Have read: ${haveReadValue}.`);
    };
    window.removeEventListener("keypress", dialogEscAndEnterBtns);
})

cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addBookDialog.close("cancel");
})
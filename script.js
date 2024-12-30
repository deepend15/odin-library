const myLibrary = [
    // {title: "Wool", author: "Hugh Howey", pages: 538, haveRead: "have read"},
    // {title: "The Institute", author: "Steven King", pages: 576, haveRead: "have read"},
];

function Book(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
}

// Book.prototype.info = function() {
//     return `"${this.title}" by ${this.author}, ${this.pages} pages, ${this.haveRead}`;
// }

function addBookToLibrary(title, author, pages, haveRead) {
    let book = new Book(title, author, pages, haveRead);
    myLibrary.push(book);
}

const displayedBooks = [];

function DisplayedBook(title, author) {
    this.title = title;
    this.author = author;
}

function addToDisplayedBooks(title, author) {
    let displayedBook = new DisplayedBook(title, author);
    displayedBooks.push(displayedBook);
}

function alreadyDisplayed(book) {
    function matches(book1, book2) {
        return (book1.title === book2.title && book1.author === book2.author);
    };
    function getMatch(book, arr) {
        let matching = [];
        for (const obj of arr) {
            if (matches(book, obj)) {
                matching.push(obj);
            };
        };
        return matching;
    };
    return !(getMatch(book, displayedBooks)[0] === undefined);
}

let cardContainer = document.querySelector(".card-container");

function displayBooks(library) {
    for (const book of library) {
        if (alreadyDisplayed(book)) {
            continue;
        } else {
            const card = document.createElement("div");
            card.classList.add("card");
            card.classList.add(`book${myLibrary.indexOf(book)}`);
            cardContainer.appendChild(card);
            const title = document.createElement("div");
            title.classList.add("title");
            title.textContent = `${book.title}`;
            card.appendChild(title);
            const author = document.createElement("p");
            author.textContent = `by ${book.author}`;
            card.appendChild(author);
            if (book.pages !== '') {
                const pages = document.createElement("p");
                pages.textContent = `${book.pages} pages`;
                card.appendChild(pages);
            };
            const haveRead = document.createElement("p");
            haveRead.textContent = `${book.haveRead}`;
            card.appendChild(haveRead);
            const removeButton = document.createElement("button");
            removeButton.classList.add("remove-button");
            removeButton.textContent = `- remove book`;
            card.appendChild(removeButton);
            removeButton.addEventListener("click", removeBook);
            addToDisplayedBooks(book.title, book.author);
        };
    };
}

function removeBook(e) {
    let indexInLibrary = Number(e.target.parentElement.className.at(-1));
    myLibrary.splice(indexInLibrary, 1);
    displayedBooks.splice(0, displayedBooks.length);
    const cards = document.querySelectorAll(".card");
    for (const card of cards) {
        card.remove();
    };
    displayBooks(myLibrary);
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

addBookDialog.addEventListener("close", () => {
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
        addBookToLibrary(dialogTitle.value, dialogAuthor.value, dialogPages.value, haveReadValue);
        displayBooks(myLibrary);
    };
    window.removeEventListener("keypress", dialogEscAndEnterBtns);
})

cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addBookDialog.close("cancel");
})
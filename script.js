const myLibrary = [];

function Book(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
}

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

const cardContainer = document.querySelector(".card-container");

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
            const haveReadLine = document.createElement("div");
            haveReadLine.classList.add("have-read-line");
            card.appendChild(haveReadLine);
            const haveReadCheckbox = document.createElement("input");
            haveReadCheckbox.setAttribute("type", "checkbox");
            haveReadCheckbox.setAttribute("name", "have-read-checkbox");
            if (book.haveRead === "have read") {
                haveReadCheckbox.setAttribute("checked", "true");
            };
            haveReadLine.appendChild(haveReadCheckbox);
            const haveReadText = document.createElement("span");
            if (book.haveRead === "have read") {
                haveReadText.classList.add("read");
            } else if (book.haveRead === "have not read") {
                haveReadText.classList.add("unread");
            };
            haveReadText.textContent = `${book.haveRead}`;
            haveReadLine.appendChild(haveReadText);
            haveReadCheckbox.addEventListener("click", changeHaveReadText);
            const removeButton = document.createElement("button");
            removeButton.classList.add("remove-button");
            removeButton.textContent = `- remove book`;
            card.appendChild(removeButton);
            removeButton.addEventListener("click", removeBook);
            addToDisplayedBooks(book.title, book.author);
        };
    };
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

cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addBookDialog.close("cancel");
})

addBookDialog.addEventListener("close", () => {
    let haveReadValue = "";
    if (dialogHaveRead.value === "Yes") {
        haveReadValue = "have read";
    } else if (dialogHaveRead.value === "No") {
        haveReadValue = "have not read";
    };
    if (addBookDialog.returnValue === "cancel") {
        return;
    } else {
        addBookToLibrary(dialogTitle.value, dialogAuthor.value, dialogPages.value, haveReadValue);
        displayBooks(myLibrary);
    };
    window.removeEventListener("keypress", dialogEscAndEnterBtns);
})

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

Book.prototype.changeHaveRead = function() {
    if (this.haveRead === "have read") {
        this.haveRead = "have not read";
    } else if (this.haveRead === "have not read") {
        this.haveRead = "have read";
    };
}

function changeHaveReadText(e) {
    let indexInLibrary = Number(e.target.parentElement.parentElement.className.at(-1));
    myLibrary[indexInLibrary].changeHaveRead();
    e.target.nextElementSibling.classList.toggle("unread");
    e.target.nextElementSibling.classList.toggle("read");
    if (e.target.nextElementSibling.className === "read") {
        e.target.nextElementSibling.textContent = "have read";
    } else if (e.target.nextElementSibling.className === "unread") {
        e.target.nextElementSibling.textContent = "have not read";
    };
}
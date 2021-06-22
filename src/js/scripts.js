const UNCOMPLETE_READ_BOOK = "bookList";
const COMPLETE_READ_BOOK = "bookList-complete"
const STORAGE_BOOK = "idBook"

function createBook(dataTitle, dataWriter, dataYear, dataComplete) {
    const textTitle = document.createElement('h2')
    textTitle.innerText = dataTitle
    const textWriter = document.createElement("span")
    textWriter.innerText = dataWriter
    const textYear = document.createElement("h6")
    textYear.innerText = dataYear
    const contentBook = document.createElement("div")
    contentBook.classList.add("content")
    const rowUnComplate = document.createElement("div")
    rowUnComplate.classList.add("row")
    rowUnComplate.append(createCheckButton(), editCheckButton(), deleteCheckButton())
    
    const rowComplate = document.createElement("div")
    rowComplate.classList.add("row")
    rowComplate.append(undoCheckButton(), editCheckButton(), deleteCheckButton())

    contentBook.append(textTitle, textWriter, textYear, dataComplete === true ? rowComplate : rowUnComplate)

    // container info
    const container = document.createElement("div");
    container.classList.add("info")
    container.append(contentBook)
    return container
}

function addBook() {
    const uncompletedBook = document.getElementById(UNCOMPLETE_READ_BOOK)
    const completedBook = document.getElementById(COMPLETE_READ_BOOK)
    const titleBook = document.getElementById('title').value
    const writerBook = document.getElementById('writer').value
    const yearBook = document.getElementById('year').value
    const statusBook = document.getElementById('status').value
    const isComplete = statusBook === 'true' ? true : false

    const book = createBook(titleBook, writerBook, yearBook, isComplete)
    const bookToObject = composeBookObject(titleBook, writerBook, yearBook, isComplete)

    book[STORAGE_BOOK] = bookToObject.id
    books.push(bookToObject)

    if (isComplete) {
        completedBook.append(book)
    } else  {
        uncompletedBook.append(book)
    }
    updateDataToStorage()
}

function createButtonBook (buttonTypeClass, eventListener) {
    const button = document.createElement("button")
    button.type = "submit"
    button.textContent = "Sudah selesai dibaca"
    button.classList.add(buttonTypeClass)
    button.addEventListener("click", function(e) {
        eventListener(e)
        e.stopPropagation();

    })
    return button
}


function createCheckButton() {
    return createButtonBook("check-complete", function(e) {
        addBookToComplete(e.path[2].parentElement)
    })
}

function undoButtonBook (buttonTypeClass, eventListener) {
    const button = document.createElement("button")
    button.type = "submit"
    button.textContent = "Belum selesai dibaca"
    button.classList.add(buttonTypeClass)
    button.addEventListener("click", function(e) {
        eventListener(e)
        e.stopPropagation()
    })
    return button
}

function undoCheckButton() {
    return undoButtonBook("check-complete", function(e) {
        addBookToUnComplete(e.path[2].parentElement)
    })
}

function createUnCompleteRead(book){
    book.remove()
}

// start function edit
function editButtonBook(buttonTypeClass, eventListener){
    const button = document.createElement("button")
    button.type = "submit"
    button.textContent = "Edit"
    button.classList.add(buttonTypeClass)
    button.addEventListener("click", function(e) {
        eventListener(e)
    })
    return button
}

function editCheckButton() {
    return editButtonBook("edit-book", function(e) {
        // createCompleteRead(e.target.parentElement)
    })
}

// start function delete

function deleteButtonBook(buttonTypeClass, eventListener){
    const button = document.createElement("button")
    button.type = "submit"
    button.textContent = "Hapus"
    button.classList.add(buttonTypeClass)
    button.addEventListener("click", function(e) {
        eventListener(e)
    })
    return button
}

function deleteCheckButton() {
    return deleteButtonBook("delete-book", function(e) {
        confirm("Apakah anda yakin menghapus data ini ?")
        deleteContentBook(e.path[2].parentElement)
    })
}


function addBookToComplete(bookComplete) {
    const listCompleteBook = document.getElementById(COMPLETE_READ_BOOK)
    const dataTitle = bookComplete.querySelector("h2").innerText
    const dataWriter = bookComplete.querySelector("span").innerText
    const dataYear = bookComplete.querySelector("h6").innerText

    const newDataBook = createBook(dataTitle, dataWriter, dataYear, true)

    // const dataId = 
    const bookList = findBook(bookComplete[STORAGE_BOOK])
    bookList.dataComplete = true;
    newDataBook[STORAGE_BOOK] = bookList.id
    
    listCompleteBook.append(newDataBook)
    bookComplete.remove()
    updateDataToStorage()

}


function addBookToUnComplete(bookComplete) {
    const listCompleteBook = document.getElementById(UNCOMPLETE_READ_BOOK)
    const dataTitle = bookComplete.querySelector("h2").innerText
    const dataWriter = bookComplete.querySelector("span").innerText
    const dataYear = bookComplete.querySelector("h6").innerText

    const newDataBook = createBook(dataTitle, dataWriter, dataYear, false)

    const bookList = findBook(bookComplete[STORAGE_BOOK])
    bookList.dataComplete = false;
    newDataBook[STORAGE_BOOK] = bookList.id

    listCompleteBook.append(newDataBook)
    bookComplete.remove()
    updateDataToStorage()
}

function deleteContentBook(bookComplete) {

    const dataBook = findBookIndex(bookComplete[STORAGE_BOOK]);
    books.splice(dataBook, 1);

    bookComplete.remove();
    updateDataToStorage();
}



function refreshDataFromTodos() {
    const listCompleted = document.getElementById(COMPLETE_READ_BOOK);
    const listUncompleted = document.getElementById(UNCOMPLETE_READ_BOOK);
    
    for(book of books){
        const newDataBook = createBook(book.dataTitle, book.dataWriter, book.dataYear, book.dataComplete);
        newDataBook[STORAGE_BOOK] = book.id;
        if(book.dataComplete){
            listCompleted.append(newDataBook);
        } else {
            listUncompleted.append(newDataBook);
        }
    }
 }


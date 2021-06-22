document.addEventListener("DOMContentLoaded", function() {
    const bookForm = document.getElementById("form")
    bookForm.addEventListener("submit", function(e) {
        e.preventDefault()
        addBook()
    })

    if(isStorageExist()){
        loadDataFromStorage();
    }
})

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan.");
 });

 document.addEventListener("ondataloaded", () => {
    refreshDataFromTodos();
 });
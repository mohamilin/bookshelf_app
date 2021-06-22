function filterFunction(e) {
    const input = document.getElementById("judul-buku")
    const filter = input.value.toUpperCase()
    const dataBook = books.filter(item => item.dataTitle.toUpperCase().indexOf(filter) > -1)

    const divBookListUnComplate = document.getElementById("bookList")
    const divBookListComplate = document.getElementById("bookList-complete")

    // for unCompleteBook
    const dataTitle = divBookListUnComplate.getElementsByTagName("h2")
    const dataWriter = divBookListUnComplate.getElementsByTagName("span")
    const dataYear = divBookListUnComplate.getElementsByTagName("h6")
    const button = divBookListUnComplate.getElementsByTagName("div")

    // for completeBook
    const dataTitleComplete = divBookListComplate.getElementsByTagName("h2")
    const dataWriterComplete = divBookListComplate.getElementsByTagName("span")
    const dataYearComplete = divBookListComplate.getElementsByTagName("h6")
    const buttonComplete = divBookListComplate.getElementsByTagName("div")

    
    // for unCompleteBook
    for (let i = 0; i < dataTitle.length; i++) {
      const txtValue = dataTitle[i].textContent || dataTitle[i].innerText;

      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        dataTitle[i].style.display = "block"
        dataWriter[i].style.display = "block"
        dataYear[i].style.display = "block"
        button[i * 3 + 2].style.display = "block"
      } else if(!dataBook.length)  {
        dataTitle[i].style.display = "block"
        dataWriter[i].style.display = "block"
        dataYear[i].style.display = "block"
        button[i * 3 + 2].style.display = "block"
      } else {
        dataTitle[i].style.display = "none"
        dataWriter[i].style.display = "none"
        dataYear[i].style.display = "none"
        button[i * 3 + 2].style.display = "none"
      }
    }

    // for completeBook
    for (let i = 0; i < dataTitleComplete.length; i++) {
      const txtValue = dataTitleComplete[i].textContent || dataTitleComplete[i].innerText;
      
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        dataTitleComplete[i].style.display = "block"
        dataWriterComplete[i].style.display = "block"
        dataYearComplete[i].style.display = "block"
        buttonComplete[i * 3 + 2].style.display = "block"
      } else if(!dataBook.length)  {
        dataTitleComplete[i].style.display = "block"
        dataWriterComplete[i].style.display = "block"
        dataYearComplete[i].style.display = "block"
        buttonComplete[i * 3 + 2].style.display = "block"
      }else {
        dataTitleComplete[i].style.display = "none"
        dataWriterComplete[i].style.display = "none"
        dataYearComplete[i].style.display = "none"
        buttonComplete[i * 3 + 2].style.display = "none"
      }
    }
  }
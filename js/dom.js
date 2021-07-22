function addBook() {
    const id = +new Date();
    const title = document.getElementById('inputBookTitle').value;
    const author = document.getElementById('inputBookAuthor').value;
    const year = document.getElementById('inputBookYear').value;
    const isRead = document.getElementById('inputBookIsComplete').checked;
    const bookObject = createBookObject(id, title, author, year, isRead);
    books.push(bookObject);

    console.log('id = ' + id);
    console.log('title = ' + title);
    console.log('author = ' + author);
    console.log('year = ' + year);
    console.log('isComplete = ' + isRead);

    const book = renderToHtml(id, title, author, year, isRead);

    const unReadBooks = document.getElementById('incompleteBookshelfList');
    unReadBooks.classList.add('book_list');

    const readBooks = document.getElementById('completeBookshelfList');
    readBooks.classList.add('book_list');
    
    if (isRead) {
        readBooks.append(book);
    } else {
        unReadBooks.append(book);
    }

    saveDataToStorage();
}

function renderToHtml(id, title, author, year, isRead) {
    // item container
    const container = document.createElement('article');
    container.classList.add('book_item');

    // set id element to hidden
    const idElement = document.createElement('p');
    idElement.innerText = id;
    idElement.setAttribute('hidden', 'true');

    // title
    const titleElement = document.createElement('h3');
    titleElement.innerText = title;

    // author
    const authorElement = document.createElement('p');
    authorElement.innerText = author;

    // year
    const yearElement = document.createElement('p');
    yearElement.innerText = year;

    // buttons container
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('action');

    // book status button (read or not read)
    const bookStatusButton = document.createElement('button');
    bookStatusButton.classList.add('green');
    if (isRead) {
        bookStatusButton.innerText = 'Belum Selesai Dibaca';
    } else {
        bookStatusButton.innerText = 'Selesai Dibaca';
    }

    // delete button
    const deleteBookButton = document.createElement('button');
    deleteBookButton.classList.add('red');
    deleteBookButton.innerText = 'Hapus Buku';
    deleteBookButton.addEventListener('click', function() {
        let result = confirm('Apakah Anda yakin mau menghapus ' + title);
        if (result) {
            container.remove();
            deleteDataFromStorage(id);
        }
    });

    // append buttons
    buttonsContainer.append(bookStatusButton, deleteBookButton);

    // append all contents in the book item
    container.append(titleElement, authorElement, yearElement, buttonsContainer);
    return container;
}
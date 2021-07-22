function addBook() {
    const id = +new Date();
    const title = document.getElementById('inputBookTitle').value;
    const author = document.getElementById('inputBookAuthor').value;
    const year = document.getElementById('inputBookYear').value;
    const isRead = document.getElementById('inputBookIsComplete').checked;
    const bookObject = createBookObject(id, title, author, year, isRead);
    books.push(bookObject);

    // render book data to html element
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
    bookStatusButton.addEventListener('click', function() {
        if (isRead) {
            container.remove();
            markBookAsNotRead(id);
            document.dispatchEvent(new Event('ondatamoved'));
        } else {
            container.remove();
            markBookAsRead(id);
            document.dispatchEvent(new Event('ondatamoved'));
        }
    });

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

function searchBook(title) {
    const unReadBooks = document.getElementById('incompleteBookshelfList');
    const readBooks = document.getElementById('completeBookshelfList');
    // clear all data first
    while (unReadBooks.firstChild) {
        unReadBooks.removeChild(unReadBooks.lastChild);
    }
    while (readBooks.firstChild) {
        readBooks.removeChild(readBooks.lastChild);
    }

    // populate the books data
    for (book of books) {
        const regex = new RegExp(title);
        if (regex.test(book.title)) {
            const bookElement = renderToHtml(book.id, book.title, book.author, book.year, book.isRead);
            if (book.isRead) {
                readBooks.append(bookElement);
            } else {
                unReadBooks.append(bookElement);
            }
        } else if (title === '' || title === null || title === undefined) {
            loadDataFromStorage();
        }
    }
}
const STORAGE_KEY = 'BOOKSHELF_APP';
let books = [];

function isStorageExist() {
    if (typeof(Storage) === undefined) {
        alert('Browser Anda tidak mendukung local storage.');
        return false;
    }
    return true;
}

function saveDataToStorage() {
    if (isStorageExist()) {
        const JsonStringData = JSON.stringify(books);
        localStorage.setItem(STORAGE_KEY, JsonStringData);
        document.dispatchEvent(new Event("ondatasaved"));
    }
}

function createBookObject(id, title, author, year, isRead) {
    return {
        id,
        title,
        author,
        year,
        isRead
    };
}

function refreshBookshelfData() {
    const unReadBooks = document.getElementById('incompleteBookshelfList');
    const readBooks = document.getElementById('completeBookshelfList');

    for (book of books) {
        const bookElement = renderToHtml(book.id, book.title, book.author, book.year, book.isRead);
        if (book.isRead) {
            readBooks.append(bookElement);
        } else {
            unReadBooks.append(bookElement);
        }
    }
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let jsonData = JSON.parse(serializedData);

    if (jsonData !== null) {
        books = jsonData;
    }
    document.dispatchEvent(new Event('ondataloaded'));
}

function deleteDataFromStorage(id) {
    bookIndex = findBookIndex(id);
    books.splice(bookIndex, 1);
    saveDataToStorage();
}

function findBookIndex(id) {
    index = 0;
    for (book of books) {
        if (book.id === id) {
            return index;
        }
        index++;
    }
    return -1;
}
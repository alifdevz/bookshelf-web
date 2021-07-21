const STORAGE_KEY = 'BOOKSHELF_APP';
let books = [];

function isStorageExist() {
    if (typeof(Storage) === undefined) {
        alert('Browser Anda tidak mendukung local storage.');
        return false;
    }
    return true;
}
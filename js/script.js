document.addEventListener('DOMContentLoaded', function() { 
    const submitForm = document.getElementById('inputBook');
    submitForm.addEventListener('submit', function(event) {
        event.preventDefault();
        addBook();
    });

    const searchForm = document.getElementById('searchBook');
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const bookTitle = document.getElementById('searchBookTitle').value;
        searchBook(bookTitle);
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

document.addEventListener('ondatasaved', () => {
    console.log('Data buku berhasil disimpan/diperbaharui.');
    loadDataFromStorage();
});

document.addEventListener('ondataloaded', () => {
    refreshBookshelfData();
});

document.addEventListener('ondatamoved', () => {
    console.log('Buku telah dipindahkan ke rak lain.');
    refreshBookshelfData();
});

document.addEventListener('ondatadeleted', () => {
    console.log('Buku telah dihapus.');
});
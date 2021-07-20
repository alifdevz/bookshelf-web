function addBook() {
    const id = +new Date();
    const title = document.getElementById('inputBookTitle').value;
    const author = document.getElementById('inputBookAuthor').value;
    const year = document.getElementById('inputBookYear').value;
    const isComplete = document.getElementById('inputBookIsComplete').checked;

    console.log('id = ' + id);
    console.log('title = ' + title);
    console.log('author = ' + author);
    console.log('year = ' + year);
    console.log('isComplete = ' + isComplete);
}
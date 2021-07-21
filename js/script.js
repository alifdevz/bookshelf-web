document.addEventListener('DOMContentLoaded', function() { 
    const submitForm = document.getElementById('inputBook');
    submitForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addBook();
    });
});

document.addEventListener('ondatasaved', () => {
    console.log('Data berhasil disimpan.');
});
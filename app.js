// Book Constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor
function UI(){}

// Add book to list
UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list');
    // create tr element
    const row = document.createElement('tr');
    // insert colls
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">x</a></td>
    `;
    list.appendChild(row);
}

// showAlert
UI.prototype.showAlert = function(message, className){
    // create Div
    const div = document.createElement('div');
    // add class
    div.className = `alert ${className}`;
    // add text
    div.appendChild(document.createTextNode(message));
    // get parent
    const container = document.querySelector('.container');
    // get form
    const form = document.querySelector('#book-form');
    // insert alert
    container.insertBefore(div, form);

    // timeout
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);
}

// delete book
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}


// clear fields
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// event listeners for add book
document.getElementById('book-form').addEventListener('submit',
function(e){
    // console.log('ok');
    const   title = document.getElementById('title').value,
            author = document.getElementById('author').value,
            isbn = document.getElementById('isbn').value;


    //  instantiate book
    const book = new Book(title, author, isbn);
    
    // instantiate ui object
    const ui = new UI();

    // validate
    if(title === '' || author === '' || isbn === ''){
        // error alert
        ui.showAlert('Please fill in all fields', 'error');
    }else{
        // Add book to list
        ui.addBookToList(book);
        // show message
        ui.showAlert('Book added successfully', 'success');

        // clear fields
        ui.clearFields();

    }

   
    e.preventDefault();
});

// event listener for delete
document.getElementById('book-list').addEventListener('click', function(e){

    // instantiate ui
    const ui = new UI();

    // delete book
    ui.deleteBook(e.target);
    
    // show alert
    ui.showAlert('Book Deleted Successfully', 'success');
    e.preventDefault();
});
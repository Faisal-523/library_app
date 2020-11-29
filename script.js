const book = {
    title:'default_title',
    author:'default_author',
    pages:'default_pages',
    read:false,
}

let myLibrary = [];

function insertDiv(str, myclass){
    let newDiv1 = document.createElement('div');
    newDiv1.textContent = str;
    newDiv1.classList.add(myclass);
    main_container.appendChild(newDiv1);
    return newDiv1;
}

function clearDisplay(){

    while(main_container.firstChild){
        main_container.removeChild(main_container.firstChild);
    }
}

function myLibraryDisplay(){
    let myIndex = 0;
    let myDiv;
    clearDisplay();
    myLibrary.forEach(item => {
        if(myIndex == 0){
        myDiv = insertDiv('No.', 'head');
        myDiv = insertDiv(item.title, 'head');
        myDiv = insertDiv(item.author, 'head');
        myDiv = insertDiv(item.pages, 'head');
        myDiv = insertDiv(item.status, 'head');
        myIndex++;
        }
        else if(item.read == false){
            myDiv = insertDiv(myIndex.toString(), 'book-unread');
            myDiv = insertDiv(item.title, 'book-unread');
            myDiv = insertDiv(item.author, 'book-unread');
            myDiv = insertDiv(item.pages, 'book-unread');
            myIndex++;
        }
        else{
            myDiv = insertDiv(myIndex.toString(), 'book-read');
            myDiv = insertDiv(item.title, 'book-read');
            myDiv = insertDiv(item.author, 'book-read');
            myDiv = insertDiv(item.pages, 'book-read');
            myIndex++;
        }

        
    });
}

function addBook(title, author, pages, status){
    let newBook = Object.create(book);
    newBook.title = title;
    newBook.author = author;
    newBook.pages = pages;
    newBook.status = status;
    myLibrary.push(newBook);
    console.table(myLibrary);
}

const main_container = document.querySelector('.main-container')
const add_btn = document.querySelector('.add-btn');
add_btn.addEventListener('click',addBook);

addBook('Title', 'Author', 'Pages', 'Status');
myLibraryDisplay();


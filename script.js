const book = {
    title:'default_title',
    author:'default_author',
    pages:'default_pages',
    read:'default_unread',
}

let myLibrary = [];

function insertDiv(str, myclass){
    let newDiv1 = document.createElement('div');
    newDiv1.textContent = str;
    newDiv1.classList.add(myclass);
    main_container.appendChild(newDiv1);
    return newDiv1;
}
function insertButton(str, data_id, myclass){
    let newBtn = document.createElement('button');
    newBtn.textContent = str;
    newBtn.classList.add(myclass);
    newBtn.setAttribute("data-id", data_id);
    main_container.appendChild(newBtn);
    return newBtn;
}

function clearDisplay(){

    while(main_container.firstChild){
        main_container.removeChild(main_container.firstChild);
    }
}

function updateStatus(e){
    let attr = this.getAttribute('data-id');
    attr = attr.replace(/^\D+/g,'');  //Use regex to extract index of element
    console.log(attr);
    if(myLibrary[Number(attr)].read == 'read')
    myLibrary[Number(attr)].read = 'unread';
    else
    myLibrary[Number(attr)].read = 'read';
    myLibraryDisplay();
}

function removeItem(e){
    let attr = this.getAttribute('data-id');
    attr = attr.replace(/^\D+/g,'');   //Use regex to extract index of element
    console.log(attr);
    myLibrary.splice(Number(attr),1);
    myLibraryDisplay();
}

function myLibraryDisplay(){
    let myIndex = 0;
    let myDiv;
    let myBtn;
    let readButton;
    let removeButton;
    let i;
    clearDisplay();
    myLibrary.forEach(item => {
        if(myIndex == 0){
        myDiv = insertDiv('No.', 'head');
        myDiv = insertDiv(item.title, 'head');
        myDiv = insertDiv(item.author, 'head');
        myDiv = insertDiv(item.pages, 'head');
        myDiv = insertDiv(item.read, 'head');
        myDiv = insertDiv('', 'head');
        myDiv = insertDiv('', 'head');
        myIndex++;
        }
        else if(item.read == 'unread'){
            myDiv = insertDiv(myIndex.toString(), 'book-unread');
            myDiv = insertDiv(item.title, 'book-unread');
            myDiv = insertDiv(item.author, 'book-unread');
            myDiv = insertDiv(item.pages, 'book-unread');
            myDiv = insertDiv(item.read, 'book-unread');
            myBtn = insertButton('Read/Unread', `upddate_${myIndex}`,'read-btn');
            myBtn = insertButton('Delete', `remove_${myIndex}`,'remove-btn');
            myIndex++;
        }
        else{
            myDiv = insertDiv(myIndex.toString(), 'book-read');
            myDiv = insertDiv(item.title, 'book-read');
            myDiv = insertDiv(item.author, 'book-read');
            myDiv = insertDiv(item.pages, 'book-read');
            myDiv = insertDiv(item.read, 'book-read');
            myBtn = insertButton('Read/Unread', `upddate_${myIndex}`,'read-btn');
            myBtn = insertButton('Delete', `remove_${myIndex}`,'remove-btn');
            myIndex++;
        }      
    });

        readButton = document.querySelectorAll('.read-btn');
        Array.from(readButton).forEach(item => item.addEventListener('click', updateStatus));
        removeButton = document.querySelectorAll('.remove-btn');
        Array.from(removeButton).forEach(item => item.addEventListener('click', removeItem));
        
}

/* script for pop up form */
function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  } 

function addBook(title, author, pages, status){
    let newBook = Object.create(book);
    newBook.title = title;
    newBook.author = author;
    newBook.pages = pages;
    newBook.read = status;
    myLibrary.push(newBook);
    localStorage.setItem("books", JSON.stringify(myLibrary)); //convert array to string and store it in local storage
    console.table(myLibrary);
    
}

function getData(){
    let readStatus;
    let status = document.getElementsByName('readStatus');
    status.forEach(item => {
        if(item.checked){
            readStatus = item.value;
        }
    });
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    if(!Number.isInteger(Number(pages)))
    pages = 0;
    closeForm();
    addBook(title,author,pages,readStatus);
    myLibraryDisplay();
}

const main_container = document.querySelector('.main-container')
const add_btn = document.querySelector('.add-btn');
add_btn.addEventListener('click',openForm);

const submit_btn = document.getElementById("submit");
submit_btn.addEventListener('click', getData);

if(localStorage.getItem("books")){
    myLibrary = JSON.parse(localStorage.getItem("books"));
    myLibraryDisplay();
}
else{
addBook('Title', 'Author', 'Pages', 'Status');
addBook('100 years of Solitude', 'Gabriel Garcia Marquez', 600, 'read');
addBook('Old Man and the sea', 'Ernest Hemingway', 100, 'unread');
}


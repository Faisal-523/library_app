//Class to create book
const book = class book{
    
    constructor(title, author, pages, status){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }
    get getTitle(){
        return this.title;
    }
    get getAuthor(){
        return this.author;
    }
    get getPages(){
        return this.pages;
    }
    get getStatus(){
        return this.status;
    }
    set setStatus(str){
        this.status = str;
    }
}

//This module contains the methods for modifying the list of books in the library
const myLibrary = (()=>{
    let bookList = [];
    this.mainHeader = document.querySelector(".main-header").getElementsByTagName('*');
    this.input = Array.from(mainHeader).filter((item=>item.tagName == 'INPUT'));
    this.buttons = Array.from(mainHeader).filter((item=>item.tagName == 'BUTTON'));

    function addBook(obj){

        let nBook = new book();
        console.log(obj);
        for(const prop in nBook){
            if(prop == 'status'){
                //console.log(obj.status || input.filter(item=>item.name=='readStatus' && item.checked == true)[0].value);

                nBook[prop] = obj ? obj[prop] : input.filter(item=>item.name=='readStatus' && item.checked == true)[0].value; //if correct obj is passed then take that as input. Otherwise, use html element
                //nBook[prop] = obj[prop] || statusArray.filter(item => item.checked==true)[0].value;
            }
            else{
                nBook[prop] = obj ? obj[prop] : input.filter(item=>item.id==prop)[0].value; //if correct obj is passed then take that as input. Otherwise, use html element
                //console.log(input.filter(item=>item.id==prop)[0].value)
            }
        };
        bookList.push(nBook);
        console.log(bookList);
        //displayControl.render();
    }

    function removeBook(event){
        bookList.splice(bookIndex,1);
        displayControl.render();
    }

    function updateBook(event){ 
        let bookIndex = Number(this.id.replace(/^\D+/g),''); //get index of the book from id
        if(bookList[bookIndex].getStatus === 'read'){
            bookList[bookIndex].setStatus = 'unread';
        }
        else{
            bookList[bookIndex].setStatus = 'read';
        }
        displayControl.render();
    }


    function initBtns(){
        addBook({title:'Title', author:'Author',pages:'Pages',status:'Status'});

        buttons.forEach(element=>{
            element.addEventListener('click',function(e){
                console.log(`${element.id} btn clicked`);
                    Array.from(mainHeader).filter(item=>item.id == 'myForm')[0].style.display = (element.id == 'add'?'block':'none');
                    if(this.id == 'submit')
                    addBook();
            });
        });
    }

    return{initBtns, removeBook, updateBook}
})();

const displayControl = (()=>{

    const headArray = ['No.', 'Title', 'Author', 'Pages', 'Status','readStatus','delete']
    function render(bookArray){
        bookArray.forEach(item=>{
            headArray.forEach(field=>{
                let newItem = Object.create(newElement);
                if(field == 'readStatus' || field == 'delete'){
                newItem.create('button');
                if(field == 'delete')
                newItem.addClass(['remove-btn']);
                else
                newItem.addClass('read-btn')
                }
                else{
                newItem.create('div');
                if(item.status == 'read')
                newItem.addClass(['read']);
                else
                newItem.addClass(['unread']);
                }
                newItem.addId(`${field}${bookArray.indexOf(item)}`);
                newItem.text(item.status);//This is not correct. Need to correct this.
                newItem.append();
            });
        });
    }
    function render(){
        addBookEntry();
    }
    return {render}
})();

myLibrary.initBtns();



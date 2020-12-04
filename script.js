

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

//domCache function handles DOM manipulation activities
const domCache = (()=>{
    this.mainHeader = document.querySelector(".main-header").getElementsByTagName('*');
    this.myForm = Array.from(Array.from(mainHeader).filter((items)=>items.getAttribute('class') === 'form-container'))[0];
    domList = [{name:'mainheader', container:this.mainHeader},{name:'myform',container:this.myForm}];


    function find(obj){
        let elem;
        domList.forEach(item=>{
            if(item.name == obj.name){
                elem = Array.from(domList[0].container).filter((element) => element.getAttribute(obj.attribute) == obj.match);
                console.log(elem);
            }
        });
        return elem;
    }
    return {find};
})();

//This module contains the methods for modifying the list of books in the library
const myLibrary = (()=>{
    let bookList = [];
    this.addBtn = domCache.find({name:'mainheader', attribute:'class',match:'add-btn'})[0];
    this.formContainer = domCache.find({name:'myform', attribute:'id',match:'myForm'})[0];
    this.submitBtn = domCache.find({name:'myform', attribute:'id',match:'submit'})[0];
    this.cancelBtn = domCache.find({name:'myform', attribute:'id',match:'cancel'})[0];


    function addBook(obj){

        let nBook = new book();
        for(const prop in nBook){
            if(prop == 'status'){
                let statusArray = domCache.find({name:'myform', attribute:'name',match:'readStatus'});
                nBook[prop] = obj[prop] || statusArray.filter(item => item.checked==true)[0].value;
            }
            else{
                console.log(prop);
                nBook[prop] = obj[prop] || domCache.find({name:'myform', attribute:'id',match:prop})[0].value;
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

    //let boundAddBook = addBook.bind(this); //Bind the function so that 'this' can be used properly

    function initBtns(){
        //console.table(mainHeader);
        //Array.from(mainHeader).forEach(item=>console.log(item.getAttribute('id')));
        //console.log(addBtn);
        //console.log(submitBtn);
        addBook({title:'Title', author:'Author',pages:'Pages',status:'Status'});

       addBtn.addEventListener('click',function(e){
           console.log('add btn clicked');
        formContainer.style.display = 'block';   
       });

       cancelBtn.addEventListener('click',function(e){
        console.log('cancel btn clicked');
        formContainer.style.display = 'none';   
       });

       submitBtn.addEventListener('click',function(e){
        console.log('submit btn clicked');
        formContainer.style.display = 'none';  
        addBook(); 
       });
       //console.log(Array.from(myForm).forEach(item =>console.log(item.id)));
       //console.log
        
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



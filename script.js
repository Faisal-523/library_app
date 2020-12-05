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
       displayControl.render(bookList);
    }

    function removeBook(event){
        bookList.splice(Number(this.id.replace(/^\D+/g,'')),1);
        displayControl.render(bookList);
    }

    function updateBook(event){ 
        console.log(this.id);
        let bookIndex = Number(this.id.replace(/^\D+/g,'')); //get index of the book from id
        if(bookList[bookIndex].getStatus === 'read'){
            bookList[bookIndex].setStatus = 'unread';
        }
        else{
            bookList[bookIndex].setStatus = 'read';
        }
        displayControl.render(bookList);
    }


    function init(){
        addBook({title:'Title', author:'Author',pages:'Pages',status:'Status'}); //This is added just to create a header

        buttons.forEach(element=>{  //add event listeners to all static html buttons
            element.addEventListener('click',function(e){
                console.log(`${element.id} btn clicked`);
                    Array.from(mainHeader).filter(item=>item.id == 'myForm')[0].style.display = (element.id == 'add'?'block':'none');
                    if(this.id == 'submit')
                    addBook();
            });
        });
    }

    return{init, removeBook, updateBook}
})();

const displayControl = (()=>{

    const headArray = ['No.', 'title', 'author', 'pages', 'Status','readStatus','delete'];
    const mainContainer = document.querySelector('.main-container');
    const handler = {   //create mapping of eventListeners corresponding to each class
        ['remove-btn']: myLibrary.removeBook,
        ['read-btn']: myLibrary.updateBook,
    }

    function addBlock(obj){
        let handle = document.createElement(obj['type']);
        handle.id = obj['id'];
        if(obj['class'])
        handle.classList.add(obj['class']);
        handle.textContent = obj['value'];
        console.log(handle);
        mainContainer.appendChild(handle);
        if(obj['type'] == 'button'){
            handle.addEventListener('click',handler[obj['class']]);
            }
        }

    function clear(){
        while(mainContainer.firstChild)
        mainContainer.removeChild(mainContainer.firstChild);
    }

    function render(bookArray){
        clear();
        bookArray.forEach(item=>{ //Iterate through each book
            console.log(item);
            addBlock({type:'div',id:`serial${bookArray.indexOf(item)}`,class:bookArray.indexOf(item)==0 ? 'head':(item.getStatus == 'read'? 'read':'unread'),value:(bookArray.indexOf(item)==0 ? 'Sr.No' : `${bookArray.indexOf(item)}`)});
            addBlock({type:'div',id:`title${bookArray.indexOf(item)}`,class:bookArray.indexOf(item)==0 ? 'head':(item.getStatus == 'read'? 'read':'unread'),value:`${item.getTitle}`});
            addBlock({type:'div',id:`author${bookArray.indexOf(item)}`,class:bookArray.indexOf(item)==0 ? 'head':(item.getStatus == 'read'? 'read':'unread'),value:`${item.getAuthor}`});
            addBlock({type:'div',id:`pages${bookArray.indexOf(item)}`,class:bookArray.indexOf(item)==0 ? 'head':(item.getStatus == 'read'? 'read':'unread'),value:`${item.getPages}`});
            addBlock({type:'div',id:`status${bookArray.indexOf(item)}`,class:bookArray.indexOf(item)==0 ? 'head':(item.getStatus == 'read'? 'read':'unread'),value:`${item.getStatus}`});
            if(bookArray.indexOf(item)>0){
            addBlock({type:'button',id:`readBtn${bookArray.indexOf(item)}`,class:'read-btn',value:'Read/Unread'});
            addBlock({type:'button',id:`deleteBtn${bookArray.indexOf(item)}`,class:'remove-btn',value:'Delete'});
            }
            else{ //empty div added to maintain symmetry
                addBlock({type:'div',id:`readBtn${bookArray.indexOf(item)}`,class:'',value:''});
                addBlock({type:'div',id:`readBtn${bookArray.indexOf(item)}`,class:'',value:''});
            }
                
        });
    }
    return {render}
})();

myLibrary.init();



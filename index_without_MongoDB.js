const db = require("./database");
const BookModel = require("./database/books");

const express = require("express");

const app = express();
app.use(express.json());


var mongoose = require('mongoose');
var mongoDB = "mongodb+srv://varsha_kumari:12Mongo@cluster0.abcy5.mongodb.net/book-company?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>console.log("CONNECTION ESTABLISHED"));


// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://varsha_kumari:12Mongo@cluster0.abcy5.mongodb.net/book-company?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const bcollection = client.db("book-company").collection("books").findOne({ISBN:"12345Three"});
//   bcollection.then((data)=>console.log(data)).catch((err)=>console.log(err));
// });
// client.close();


/*---Another method(mongoose)----*/
// async function listDatabases(client){
//     databasesList = await client.db().admin().listDatabases();
//     console.log("THE DATABASES ARE: ");
//     databasesList.databases.forEach(db => console.log(db.name));
// }


// async function main() {
//     const uri = "mongodb+srv://varsha_kumari:<1I3DmERQyRE4FhG9>@cluster0.abcy5.mongodb.net/book-company?retryWrites=true&w=majority";
//     const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//     try{
//         await client.connect();
//         const result = await client.db("book-company").collection("books").findOne({ISBN: "12345Three"});
//         console.log(result);
//         //await listDatabases(client);
//     }
//     catch(err){
//         console.log(err);
//     }
//     finally{
//         await client.close();
//     }
// }
// main();


/*------------------------------------------GET------------------------------------*/

//http://localhost:3000
app.get("/", (req, res) =>{
    return res.json({"WELCOME": `to my Backend software for the Book Company`});
});

//http://localhost:3000/books
app.get("/books", (req, res) => {
    const getAllBooks = db.books;
    return res.json(getAllBooks);             //res.send(getAllBooks) -- same 
});

//http://localhost:3000/book/12345Two
app.get("/book/:isbn", (req, res) => {
    //console.log(req.params);
    const {isbn} = req.params;
    //console.log(isbn);
    const getSpecificBook = db.books.filter((book) => book.ISBN === isbn);
    // console.log(getSpecificBook);
    // console.log(getSpecificBook.length);
    if(getSpecificBook.length === 0){
        return res.json({"error": `No book found for the ISBN of ${isbn}`});
    }
    return res.json(getSpecificBook[0]);
});

//http://localhost:3000/book-category/programming
app.get("/book-category/:category", (req, res) => {
    const {category} = req.params;
    const getSpecificBooks = db.books.filter((book) => book.category.includes(category));
    if(getSpecificBooks.length === 0){
        return res.json({"error": `No book found for the category of ${category}`});
    }
    return res.json(getSpecificBooks);
});

//http://localhost:3000/authors
app.get("/authors", (req, res) => {
    const getAllAuthors = db.authors;
    return res.json(getAllAuthors);            
});

//http://localhost:3000/authors/1
app.get("/author/:id", (req, res) => {
    let {id} = req.params;
    id = Number(id);
    const getSpecificAuthor = db.authors.filter((author) => author.id === id);
    if(getSpecificAuthor.length === 0){
        return res.json({"error": `No author found for the ${id}`});
    }
    return res.json(getSpecificAuthor[0]);
});

//http://localhost:3000/author-isbn/12345ONE                              
app.get("/author-isbn/:isbn", (req, res) => {
    console.log(req.params);
    const {isbn} = req.params;
    console.log(isbn);
    const getSpecificAuthors = db.authors.filter((author) => author.books.includes(isbn));
    console.log(getSpecificAuthors);
    if(getSpecificAuthors.length === 0){
        return res.json({"error": `No author found for the book of ISBN ${isbn}`});
    }
    return res.json(getSpecificAuthors);
});


//http://localhost:3000/publications
app.get("/publications", (req, res) => {
    const getAllPublications = db.publications;
    return res.json(getAllPublications);           
});

//http://localhost:3000/publications-isbn/12345Two               
app.get("/publications-isbn/:isbn", (req, res) => {
    console.log(req.params);
    const {isbn} = req.params;
    console.log(isbn);
    const getSpecificPublication = db.publications.filter((publication) => publication.books.includes(isbn));
    console.log(getSpecificPublication);
    console.log(getSpecificPublication.length);
    if(getSpecificPublication.length === 0){
        return res.json({"error": `No author found for the book of ISBN ${isbn}`});
    }
    return res.json(getSpecificPublication);
});

/*----------------------------------------------POST--------------------------------------------*/


//http://localhost:3000/book
app.post("/book", (req, res) => {
    console.log(req.body);
    const {newBook} = req.body;
    console.log(newBook);
    db.books.push(newBook);
    return res.json(db.books);
});

//http://localhost:3000/author
app.post("/author", (req, res) => {
    //console.log(req.body);
    db.authors.push(req.body);
    return res.json(db.authors);
});

//http://localhost:3000/publication
app.post("/publication", (req, res) => {
    //console.log(req.body);
    db.publications.push(req.body);
    return res.json(db.publications);
});

/*-----------------------------------------PUT----------------------------------*/

//http://localhost:3000/book-update/12345ONE
app.put("/book-update/:isbn", (req, res) => {
    console.log(req.body);
    console.log(req.params);
    const {isbn} = req.params;
    db.books.forEach((book) => {
        if(book.ISBN === isbn){
            console.log({...book, ...req.body});
            return {...book, ...req.body};
        }
        return book;
    })
    return res.json(db.books);
});

//http://localhost:3000/author-update/1
app.put("/author-update/:id", (req, res) => {
    console.log(req.body);
    console.log(req.params);
    const {id} = req.params;
    db.authors.forEach((author) => {
        if(author.id == id){
            console.log({...author, ...req.body});                    //id number (==, === thing) do it later
            return {...author, ...req.body};
        }
        return author;
    })
    return res.json(db.authors);
});

//http://localhost:3000/publication-update/1                           id number (==, === thing) do it later
app.put("/publication-update/:id", (req, res) => {
    console.log(req.body);
    console.log(req.params);
    const {id} = req.params;
    db.publications.forEach((publication) => {
        if(publication.id == id){
            console.log({...publication, ...req.body});
            return {...publication, ...req.body};
        }
        return publication;
    })
    return res.json(db.publications);
});

/*----------------------------------DELETE-----------------------------------*/

//http://localhost:3000/book-delete/12345ONE
app.delete("/book-delete/:isbn", (req,res) => {
    console.log(req.params);
    const {isbn} = req.params;
    const filteredBooks = db.books.filter((book) => book.ISBN!==isbn);
    console.log(filteredBooks);
    db.books=filteredBooks;
    return res.json(db.books);
});

//http://localhost:3000/book-author-delete/12345ONE/1
app.delete("/book-author-delete/:isbn/:id", (req,res) => {
    console.log(req.params);
    let {isbn,id} = req.params;
    id = Number(id);
    db.books.forEach((book) => {
        if(book.ISBN == isbn){
            if(!book.authors.includes(id))
            { 
                return;
            }
            book.authors = book.authors.filter((author) => author!==id);
            return book;
        }
        return book;
    })
    return res.json(db.books);
});

//http://localhost:3000/author-book-delete/1/12345ONE                   not working properly
app.delete("/author-book-delete/:id/:isbn", (req,res) => {
    console.log(req.params);
    let {isbn,id} = req.params;
    id = Number(id);
    db.authors.forEach((author) => {
        if(author.id == id){
            if(!author.books.includes(isbn))
            { 
                return;
            }
            author.books = author.books.filter((book) => book!==isbn);
            return book;
        }
        return author;
    })
    return res.json(db.authors);
});

//http://localhost:3000/author-delete/12345ONE                      // not working properly       
app.delete("/author-delete/:isbn", (req,res) => {
    console.log(req.params);
    const {isbn} = req.params;
    console.log(isbn);
    const getSpecificAuthor = db.authors.filter((author) => author.books.includes(isbn));
    console.log(getSpecificAuthor);
    if(getSpecificAuthor.length === 0){
        return res.json({"error": `No author found for the book of ISBN ${isbn}`});
    }
    return res.json(getSpecificAuthor);
});

//http://localhost:3000/publication-delete/1               
app.delete("/publication-delete/:id", (req,res) => {
    
});




app.listen(3000, () => {
    console.log("MY EXPRESS APP IS RUNNING.....");
})
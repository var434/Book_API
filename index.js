// const db = require("./database");
require('dotenv').config();
const BookModel = require("./database/books");
const AuthorModel = require("./database/authors");
const PublicationModel = require("./database/publications");

const express = require("express");

const app = express();
app.use(express.json());


var mongoose = require('mongoose');
var mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>console.log("CONNECTION ESTABLISHED"));


/*------------------------------------------GET------------------------------------*/

//http://localhost:3000
app.get("/", (req, res) =>{
    return res.json({"WELCOME": `to my Backend software for the Book Company`});
});

//http://localhost:3000/books
app.get("/books", async (req, res) => {
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);             //res.send(getAllBooks) -- same 
});

//http://localhost:3000/book/123One
app.get("/book/:isbn", async (req, res) => {
    const {isbn} = req.params;
    const getSpecificBook = await BookModel.findOne({ISBN: isbn});
    if(getSpecificBook === null){
        return res.json({"error": `No book found for the ISBN of ${isbn}`});
    }
    return res.json(getSpecificBook);
});

//http://localhost:3000/book-category/tech
app.get("/book-category/:category", async (req, res) => {
    const {category} = req.params;
    const getSpecificBooks = await BookModel.find({category: category});
    if(getSpecificBooks.length === 0){
        return res.json({"error": `No book found for the category of ${category}`});
    }
    return res.json(getSpecificBooks);
});

//http://localhost:3000/authors        
app.get("/authors", async (req, res) => {
    const getAllAuthors = await AuthorModel.find();
    return res.json(getAllAuthors);            
});

//http://localhost:3000/author-id/1               
app.get("/author-id/:id", async (req, res) => {
    const {id} = req.params;
    const getSpecificAuthor = await AuthorModel.findOne({id: id});
    if(getSpecificAuthor === null){
        return res.json({"error": `No author found for the ${id}`});
    }
    return res.json(getSpecificAuthor);
});

//http://localhost:3000/author-isbn/123One                        
app.get("/author-isbn/:isbn", async (req, res) => {
    const {isbn} = req.params;
    const getSpecificAuthors = await AuthorModel.find({books: isbn});
    if(getSpecificAuthors.length === 0){
        return res.json({"error": `No author found for the book of ISBN ${isbn}`});
    }
    return res.json(getSpecificAuthors);
});


//http://localhost:3000/publications 
app.get("/publications", async (req, res) => {
    const getAllPublications = await PublicationModel.find();
    return res.json(getAllPublications);        
});

//http://localhost:3000/publications-isbn/123One       
app.get("/publications-isbn/:isbn", async (req, res) => {
    const {isbn} = req.params;
    const getSpecificPublication = await PublicationModel.find({books: isbn});
    if(getSpecificPublication.length === 0){
        return res.json({"error": `No publication found for the book of ISBN ${isbn}`});
    }
    return res.json(getSpecificPublication);
});

/*----------------------------------------------POST--------------------------------------------*/


//http://localhost:3000/book
app.post("/book", async (req, res) => {
    const addNewBook = await BookModel.create(req.body);
    return res.json({
        bookAdded: addNewBook,
        message: "Book was added!!!"
    });
});

//http://localhost:3000/author          
app.post("/author", async (req, res) => {
    const addNewAuthor = await AuthorModel.create(req.body);
    return res.json({AuthorAdded: addNewAuthor,message: "Author was added!!!"});
});

//http://localhost:3000/publication
app.post("/publication", async (req, res) => {
    const addNewPublication = await PublicationModel.create(req.body);
    return res.json({PublicationAdded: addNewPublication,message: "Publication was added!!!"});
});

/*-----------------------------------------PUT----------------------------------*/

//http://localhost:3000/book-update/123Two
app.put("/book-update/:isbn", async (req, res) => {
    const {isbn} = req.params;
    const UpdateBook = await BookModel.findOneAndUpdate({ ISBN: isbn }, req.body,{ new: true });
    return res.json({ bookUpdated: UpdateBook, message: "Book was updated!!!"});
});

//http://localhost:3000/author-update/1                 
app.put("/author-update/:id", async (req, res) => {
    const {id} = req.params;
    const UpdateAuthor = await AuthorModel.findOneAndUpdate({ id: id }, req.body,{ new: true });
    return res.json({ AuthorUpdated: UpdateAuthor, message: "Author was updated!!!"});
});

//http://localhost:3000/publication-update/1   
app.put("/publication-update/:id", async (req, res) => {
    const {id} = req.params;
    const UpdatePublication = await PublicationModel.findOneAndUpdate({ id: id }, req.body,{ new: true });
    return res.json({ PublicationUpdated: UpdatePublication, message: "Publication was updated!!!"});
});

/*----------------------------------DELETE----------------------------------------*/

//http://localhost:3000/book-delete/123Two
app.delete("/book-delete/:isbn", async (req,res) => {
    console.log(req.params);
    const {isbn} = req.params;
    const deleteBook = await BookModel.deleteOne({ ISBN: isbn });
    return res.json({ bookDeleted: deleteBook, message: "Book was deleted!!!"});
});

//http://localhost:3000/book-author-delete/123One/1
app.delete("/book-author-delete/:isbn/:id", async (req,res) => {
    const {isbn,id} = req.params;
    let getSpecificBook = await BookModel.findOne({ISBN: isbn});
    if(getSpecificBook === null){
        return res.json({"error": `No book found for the ISBN of ${isbn}`});
    }
    else{
        getSpecificBook.authors.remove(id);
        const UpdateBook = await BookModel.findOneAndUpdate({ ISBN: isbn }, getSpecificBook ,{ new: true });
        return res.json({ BookUpdated: UpdateBook, message: "Author was deleted from Book!!!"});
    }
});

//http://localhost:3000/author-book-delete/1/123Three         
app.delete("/author-book-delete/:id/:isbn", async (req,res) => {
    const {id,isbn} = req.params;
    let getSpecificAuthor = await AuthorModel.findOne({id: id});
    if(getSpecificAuthor === null){
        return res.json({"error": `No author found of id ${id}`});
    }
    else{
        getSpecificAuthor.books.remove(isbn);
        const UpdateAuthor = await AuthorModel.findOneAndUpdate({ id: id }, getSpecificAuthor ,{ new: true });
        return res.json({ AuthorUpdated: UpdateAuthor, message: "Book was deleted from Author!!!"});
    }
});


//http://localhost:3000/author-delete/2
app.delete("/author-delete/:id", async (req,res) => {
    const {id} = req.params;
    const deleteAuthor = await AuthorModel.deleteOne({ id: id });
    return res.json({ AuthorDeleted: deleteAuthor, message: "Author was deleted!!!"});
});


//http://localhost:3000/publication-delete/1           
app.delete("/publication-delete/:id", async (req,res) => {
    const {id} = req.params;
    const deletePublication = await PublicationModel.deleteOne({ id: id });
    return res.json({ PublicationDeleted: deletePublication, message: "Publication was deleted!!!"});   
});




app.listen(3000, () => {
    console.log("MY EXPRESS APP IS RUNNING.....");
})
const exp = require('express');
const booksApis = exp.Router();
const expressErrorHandler = require("express-async-handler");
// body parser
booksApis.use(exp.json());

// CRUD - create-> POST ,Read->GET, Update->(PUT,PATCH), Delete->DELETE

// add book to Db
booksApis.post('/addBook',expressErrorHandler( async (req,res,next) => {
    let Bookscollection = req.app.get("bookCollection");
    let {bookname,isbn,author,subject,totalqty} = req.body;
    // check if books already exist
    let book = await Bookscollection.findOne({isbn: isbn});
    console.log(book);
    if(book !== null){
        res.send({
            message:"Book already Exist!"
        })
    }
    else{
        await Bookscollection.insertOne({
            bookname,
            isbn,
            author,
            subject,
            totalqty
        });
        res.status(200).send({
            message:"Book Added!!!"
        })
    }
    
}));

// get Books on Search
booksApis.get('/searchBook',expressErrorHandler(async (req,res,next) => {
    let Bookscollection = req.app.get("bookCollection");
    let searchText = req.query.searchText;
    // filter authorname, ISBN num, bookname
    let bookList = await Bookscollection.find({
        $or: [
          { bookname: { $regex: `${searchText}`, $options: "i" } },
          { author: { $regex: `${searchText}`, $options: "i" } },
          { isbn: { $regex: `${searchText}`, $options: "i" } },
        ],
      }).toArray();
      res.status(200).send({
        message:"books found ",
        response: bookList
      });
}));

// update total Quantity
booksApis.put('/updateBook',expressErrorHandler(async (req,res,next) => {
    let Bookscollection = req.app.get("bookCollection");
    let reqObj = req.body;
    let {isbn,} = reqObj
    // find the book data from isbn number
    let book = await Bookscollection.findOne({isbn: isbn});
    if(book === null){
        res.status(404).send({
            message: "Book not found!!"
        })
    }
    delete reqObj._id;
    await Bookscollection.updateOne({isbn:isbn}, {$set: {...reqObj}});
    res.status(200).send({
        message: "Quantity updated!"
    });
    
}));

//Delete Books
booksApis.delete('/deleteBook', expressErrorHandler(async (req,res) => {
    let Bookscollection = req.app.get('bookCollection');
    let reqIsbn = req.query.isbn;
    await Bookscollection.deleteOne({isbn: reqIsbn});
    res.status(200).send({
        message: "Book Deleted"
    });
}));

// get book by isbn number
booksApis.get('/getBookByISBN',expressErrorHandler( async (req,res) => {
    let Bookscollection = req.app.get('bookCollection');
    let reqIsbn = req.query.isbn;
    let book = await Bookscollection.findOne({isbn: reqIsbn});
    if(book === null){
        res.status(404).send({
            message: "Book not found"
        });
    }
    res.status(200).send({
        message: "Book found !",
        response: book
    });
}));


module.exports = booksApis;

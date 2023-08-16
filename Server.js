const express = require('express');
const app = express();
const path = require("path");
require('dotenv').config();

//connecting build of react with server
app.use(express.static(path.join(__dirname,'./build/')));


const booksApis = require("./APIS/booksApis");
const userApis = require("./APIS/userApis");
const requestApis = require("./APIS/requestApis");
// const adminApis = require("./APIS/adminApis");

//import mongo client
const mongoClient = require("mongodb").MongoClient;

const dburl = process.env.DATABASE_URL;

mongoClient.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if(err){
        console.log('error in db connection', err);
    }
    else{
        //cretae database obj
        let databaseObj = client.db("LibraryManagement");

        // create collection obj
        let bookCollection = databaseObj.collection('bookscollection');
        let userCollection = databaseObj.collection('userCollection');
        let requestCollection = databaseObj.collection('requestCollection');
        let adminCollection = databaseObj.collection('adminCollection');

        // when making api calls - we get the the collections in req object
        app.set('bookCollection', bookCollection);
        app.set('userCollection', userCollection);
        app.set('requestCollection', requestCollection);
        app.set('adminCollection', adminCollection);
    }

});

app.use('/books',booksApis); 
app.use('/user',userApis);
app.use('/request',requestApis);
// app.use('/admin',adminApis);

//function to solve the issue of refreshing 
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, './build/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })

//middleware to handle wrong path

app.use((req,res,next) => {
    res.send({message:`path ${req.url} is invalid`})
})


//handle errors
app.use((err,req,res,next) => {
    console.log(err);
    res.send({message:err.message})
})



const port = process.env.PORT || 8080;
app.listen(port,() => console.log(`server is listening to port ${port}.....`));




// create mini  express api
const exp = require("express");
const userApis = exp.Router();
const bcryptjs = require("bcryptjs");
const expressErrorHandler = require("express-async-handler");
const login = require("./Middlewares/login");
const serverContants = require("./constants");

require("dotenv").config();

//body parser middleware
userApis.use(exp.json());

// create user
userApis.post(
  "/createUser",
  expressErrorHandler(async (req, res) => {
    let userCollectionObj = req.app.get("userCollection");
    //get user obj
    let newUser = req.body;
    //seach for existing user
    let existinguser = await userCollectionObj.findOne({
      rollno: newUser.rollno,
    });
    //if user exist
    if (existinguser !== null) {
      res.send({ message: "User already existed" });
    } else {
      //hash the password before inserting
      let hashedPassword = await bcryptjs.hash(
        newUser.password,
        parseInt(process.env.HASH_COUNT)
      );
      //replace the plainpassword with hashed password
      newUser.password = hashedPassword;
      //insert new user
      await userCollectionObj.insertOne(newUser);
      res.status(200).send({ message: "User created" });
    }
  })
);

// login user
userApis.post(
  "/login",
  login,
  expressErrorHandler(async (req, res, next) => {})
);

// update fields in api
userApis.put(
  "/updateField",
  expressErrorHandler(async (req, res) => {
    let userCollection = req.app.get("userCollection");
    // type -> name, phone number, email
    let { type, newVal, rollno } = req.body;
    await userCollection.updateOne(
      { rollno: rollno },
      { $set: { [`${type}`]: newVal } }
    );
    res.status(200).send({
      message: `${type} is updated!`,
    });
  })
);

// Books array  update api - >  in user
userApis.put(
  "/updateUserBooks",
  expressErrorHandler(async (req, res) => {
    let userCollection = req.app.get("userCollection");
    let issueDate = new Date();
    let returnDate = new Date();
    returnDate.setDate(issueDate.getDate() + serverContants.bookIssueTime);
    let { rollNo, isbn } = req.query;
    let bookObj = {
      isbn,
      issueDate: issueDate,
      returnDate: returnDate,
    };
    //find if user Exist
    let user = await userCollection.findOne({ rollno: rollNo });
    if (user === null) {
      res.status(404).send({
        message: "User Not found!",
      });
    }
    await userCollection.updateOne(
      { rollno: rollNo },
      { $push: { issuedBooks: bookObj } }
    );
    res.status(200).send({
      message: "Book Issued",
    });
  })
);

// delete issued books from user
userApis.put(
  "/removeIssuedBook",
  expressErrorHandler(async (req, res) => {
    let userCollection = req.app.get("userCollection");
    let { rollNo, isbn } = req.query;
    //find if user Exist
    let user = await userCollection.findOne({ rollno: rollNo });
    let issuedBooks = user.issuedBooks.filter((bookObj) => {
      bookObj.isbn !== isbn;
    });
    if (user === null) {
      res.status(404).send({
        message: "User Not found!",
      });
    }
    await userCollection.updateOne(
      { rollno: rollNo },
      { $set: { issuedBooks: issuedBooks } }
    );
    res.status(200).send({
      message: "Books updated",
    });
  })
);

//search user
userApis.get(
  "/searchUser",
  expressErrorHandler(async (req, res) => {
    let userCollection = req.app.get("userCollection");
    let {searchTxt} = req.query;
    //find if user Exist
    let users = await userCollection
      .find({
        $or: [
          { name: { $regex: `${searchTxt}`, $options: "i" } },
          { rollno: { $regex: `${searchTxt}`, $options: "i" } },
          { isbn: { $regex: `${searchTxt}`, $options: "i" } },
        ],
      })
      .toArray();
    res.status(200).send({
      response: users,
    });
  })
);

// get all users

userApis.get(
  "/getUsers",
  expressErrorHandler(async (req, res) => {
    let userCollection = req.app.get("userCollection");
    //find if user Exist
    let users = await userCollection.find().toArray();
    res.status(200).send({
      response: users,
    });
  })
);

userApis.get("/getDashboardInfo", 
expressErrorHandler(async (req, res) => {
    let userCollection = req.app.get("userCollection");
    let Bookscollection = req.app.get("bookCollection");
    let requestCollection = req.app.get('requestCollection');
   
    let totalStudents = await userCollection.find({type:"student"}).toArray();
    let totalStaff = await userCollection.find({type:"staff"}).toArray();
    let totalBooks = await Bookscollection.find().toArray();
    let totalRequests = await requestCollection.find({status:"pending"}).toArray();
    
    totalStudents = totalStudents.length;
    totalStaff = totalStaff.length;
    totalRequests = totalRequests.length;
    totalBooks = totalBooks.length
    console.log("data",totalBooks,totalStaff,totalRequests,totalStudents);
    res.status(200).send({
      response: {
        totalStudents,
        totalBooks,
        totalStaff,
        totalRequests
      }
    });
  })
)

userApis.get("/getUserDashboardInfo",expressErrorHandler(async (req, res) => {
    let requestCollection = req.app.get('requestCollection');
    let {rollno} = req.query;
    let totalIssuedBooks = await requestCollection.find({status:"approved" , rollno:rollno}).toArray();
    let days = 0;
    totalIssuedBooks.forEach((reqData) => {
        let currentDate  = new Date();
        let lastDate = new Date(reqData.updateRequestDate);
        lastDate.setDate(lastDate.getDate() + 30);
        let timeDiff = lastDate.getTime()-currentDate.getTime();
        
        if(timeDiff < 0 ){
            days += Math.abs(timeDiff)/(1000*60*60*24);
        }
    })

    totalIssuedBooks = totalIssuedBooks.length;
    totalFine = days*5;
    console.log("data",totalIssuedBooks,totalFine);
    res.status(200).send({
      response: {
        totalIssuedBooks,
        totalFine
      }
    });
  }))


module.exports = userApis;

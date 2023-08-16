const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();


const login = async (req, res, next) => {

    try {

        let credentials = req.body;
        // console.log("credentials = ", credentials.type);

        let collectionObj = credentials.type === "student" || credentials.type === "staff" ? req.app.get("userCollection") : req.app.get("adminCollection");


        //verify username
        let user = await collectionObj.findOne({ email: credentials.username })
        console.log("user =>",user);
        //if user does not exist 
        if (user === null) {
            res.send({ message: "Invalid username" })
        }
        //if user exist 
        else {
            //compare password 
            //bcryptjs gives us compare method to compare to check the 2 passwords 
            //but as hashing the password is one way process so we  cannot decrypt it so to compare the 2 passwords we can hash the credentials password also the same times and check if that matches with the hashed password in the database

            let result = await bcryptjs.compare(credentials.password, user.password);

            if (credentials.type === "student" || credentials.type === "staff") {
                //if password not matched 
                if (result === false) {
                    res.send({ message: "Invalid password " });
                }

                //if passwords matched
                else {
                    //create a token and send it as response 
                    // sign method takes arguments - algorithm(defalt - HMAC SHA - hash based message authentication code )  payload , key , expiry time for token 
                    // token is encryption of algorithm , payload passed to create token , signature
                    // using await as creating is an asynchronous operation
                    let token = await jwt.sign({ username: credentials.username }, process.env.SECRET, { expiresIn: 180 })
                    //deleting the password
                    delete user.password;
                    res.send({ message: "login-success", token: token, username: credentials.username, userObj: user })
                    // next();

                }
            }
            else{
                if (user.password !== credentials.password) {
                    res.send({ message: "Invalid password " });
                }
                else{
                    let token = await jwt.sign({ username: credentials.username }, process.env.SECRET, { expiresIn: 180 })
                    delete user.password;
                    res.send({ message: "login-success", token: token, username: credentials.username, userObj: user })
                }
            }


        }
    }
    catch (err) {
        res.send({ message: err.message })
    }


}

module.exports = login;
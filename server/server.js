const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const mysql = require("mysql");
const path = require("path");
const bcrypt = require("bcrypt-nodejs");
const database = require("./database");
const utils = require("./utils");
const isUserAuthenticated = require("./filters/is-user-authenticated");
// create application/x-www-form-urlencoded parser
const jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const uiDestination = path.join(__dirname,"..","ui");

// create express app
const app = express();

app.set("port", 3000);

app.use(jsonParser);
app.use(urlencodedParser);

app.use(session({
    secret: 's3cr3T',
    resave: false,
    saveUninitialized: true
}));

function findUserById(id, callback) {
    const userQuery = "select nickname,email,phone,c.id as countryId from users u join countries c on(u.country_id=c.id) where u.id=" + mysql.escape(id);
    console.log(userQuery);

    database.executeQuery(userQuery,function (err,user) {
        if(err){
            return callback(err);
        }

        callback(null,user[0]);
    });
}

app.get("/api/countries", function (req,res) {
    database.executeQuery("select * from countries", function (err,countries) {
       if(err){
           return utils.sendInternalErrorResponse(res,err);
       }

       res.json(countries);
    });
});

app.post("/api/register", function (req,res) {
    const newUser = req.body;

    const insertUserQuery = "insert into users" +
        "(nickname,password,email,phone,country_id) " +
        "values ("
        + mysql.escape(newUser.nickname) + ","
        + mysql.escape(bcrypt.hashSync(newUser.password)) + ","
        + mysql.escape(newUser.email) + ","
        + mysql.escape(newUser.phone) + ","
        + mysql.escape(newUser.countryId)
        + ");";

    console.log(insertUserQuery);

    database.executeQuery(insertUserQuery,function (err, result) {
        if(err){
            return utils.sendInternalErrorResponse(res,err);
        }
        res.json("user was registered successfully");
    });

});

app.post("/api/login", function (req,res) {
   const credentials = req.body;
   const loginQuery = "select * from users where email=" + mysql.escape(credentials.email);

   console.log(loginQuery);

   database.executeQuery(loginQuery, function (err, user) {
      if(err){
          return utils.sendInternalErrorResponse(res,err);
      }

      if(user.length === 0 || !bcrypt.compareSync(credentials.password,user[0].password)){
          return res.status(401).json("Invalid credentials");
      }

      req.session.user = {
          id: user[0].id,
          username: user[0].email
      };

      req.session.save(function () {
         findUserById(user[0].id, function (err,user) {
            if(err){
                //something went wrong
                return req.session.destroy(function () {
                    utils.sendInternalErrorResponse(res,"Failed to get user by id");
                });
            }

            res.json(user);
         });
      });
   });
});

app.get("/api/user", isUserAuthenticated, function (req,res) {
   const currentUserInSession = req.session.user;
   findUserById(currentUserInSession.id, function (err,user) {
       if(err){
           return utils.sendInternalErrorResponse(res,err);
       }

       res.json(user);
   });
});

app.put("/api/user", isUserAuthenticated, function (req,res) {
   const userData = req.body;
   const currentUserInSession = req.session.user;

   const updateUserQuery = "update users set "
    + "nickname=" + mysql.escape(userData.nickname)
    + ",phone=" + mysql.escape(userData.phone)
    + ",country_id=" + mysql.escape(userData.countryId)
    + " where id=" + mysql.escape(currentUserInSession.id);

   console.log(updateUserQuery);

   database.executeQuery(updateUserQuery, function (err,result) {
      if(err){
          return utils.sendInternalErrorResponse(res,err);
      }

      findUserById(currentUserInSession.id,function (err,user) {
          if(err){
              return utils.sendInternalErrorResponse(res,err);
          }

          res.json(user);
      });
   });
});

app.get("/api/user/email/:email", function (req,res) {
    const email = req.params.email;
    const emailQuery = "select count(*) as count from users where email=" + mysql.escape(email);

    console.log(emailQuery);

    database.executeQuery(emailQuery, function (err,rows) {
       if(err){
           return utils.sendInternalErrorResponse(res,err);
       }

       res.json({
           isUsed: rows[0].count > 0
       });

    });
});

app.get("/api/user/nickname/:nickname", function (req,res) {
    const nickname = req.params.nickname;
    const nicknameQuery = "select count(*) as count from users where nickname=" + mysql.escape(nickname);

    console.log(nicknameQuery);

    database.executeQuery(nicknameQuery, function (err,rows) {
        if(err){
            return utils.sendInternalErrorResponse(res,err);
        }

        res.json({
            isUsed: rows[0].count > 0
        });

    });
});

app.get("/api/user/introspect", function (req,res) {
   res.json({
       active: req.session.user !== undefined
   });
});

app.get("/api/logout", function (req,res) {
   req.session.destroy(function () {
      res.json("");
   });
});

app.listen(app.get("port"), function () {
    console.log("Server is listening on port ", app.get("port"));
});
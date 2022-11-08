const express = require("express");
const cors = require('cors');
var mysql = require('mysql');
const app = express()
app.use(express.json())
app.use(cors())
var con = mysql.createConnection({
  host: "localhost",
  port:"4306",
  user: "root",
  password: ""
});
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.get("/",(req,res)=>{
  console.log("successful")
  res.send("helo")
})


app.post("/register",(req,res)=>{
    var name = req.body.name;
    var username = req.body.username;
    var password = req.body.password;
    let sql = "insert into myresume.usertab (username,fullname,pswd) values (?,?,?)"
    con.query(sql,[username,name,password], function (err, result) {
      if (err) throw err;
      console.log("Done");
  });
})

app.post("/login",(req,res)=>{
  var username = req.body.username;
  var password = req.body.password;
  let sql = "select * from myresume.usertab where username=(?) and pswd=(?)"
  con.query(sql,[username,password], function (err, result) {
    if (err) throw err;
    // console.log(result[0].pswd);
    let size = result.length;
    if(size===0){
      // console.log("No user")
      res.send({message:"No user found",status:"reject"})
    }else{
      // console.log("user")
      res.send({message:"user found",status:"accept"})
    }
});
})




app.listen(3001)


const express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const app = express();

var methodOverride = require("method-override");

app.use(methodOverride("_method"));

app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mongoose.connect(

  "mongodb+srv://wimpywarlord:qwerty123@cluster0.pyazn.mongodb.net/hr?retryWrites=true&w=majority",
  async function (err, res) {
      if (err) {
          console.log(err);
      } else {
          console.log("Connected To DB");
          app.emit('ready'); 
      }
  }

);

var studentSchema = new mongoose.Schema({
  name: String,
  school: String,
  year: String,
  program: String,
  univ: String,
});

var student = mongoose.model("college", studentSchema);

var global_context_student;

app.get("/", (req, res) => {
  res.render("./index.ejs", {
    yes_bank: "F",
    name:"",
  }
  );
    
  });

app.post("/lor", async (req, res) => {
  console.log(req.body)
  global_context_student = req.body.name;
  await student.create(
    {
      name: req.body.name,
      school:  req.body.school,
      year:  req.body.year,
      program:  req.body.program,
      univ:  req.body.univ,
    },
    function (err, response) {
        if (err) {
            console.log("STUDENT ERROR");
            console.log(err)
            // res.send("SOME ERROR occurred TRY AGAIN Or contact your tech guy <a href='/streamadd'>back</a>");
        } else {
            console.log("STUDENT HAS BEEN created");
            // res.send("Your Overseas entry has been successfully recorded. <a href='/streamadd'>back</a>");
        }
    }
  );
  res.render("./index.ejs", {
    yes_bank: "T",
    name: req.body.name,
  });
});

app.get("/temp1", async (req, res) => {

  await student.find({name:global_context_student},function (err,response) {
    if (err) {
        console.log("THE STREAM DATA IS NOT FETCHED")
    } else {
        console.log("Stream Data successfully fetched.")
        console.log(response[0])
      res.render("./temp1.ejs", {
        name: response[0].name,
        school:  response[0].school,
        year:  response[0].year,
        program:  response[0].program,
        univ:  response[0].univ,
      }
      );
    }
})
  

    
  });

  app.get("/temp2", async (req, res) => {

    await student.find({name:global_context_student},function (err,response) {
      if (err) {
          console.log("THE STREAM DATA IS NOT FETCHED")
      } else {
          console.log("Stream Data successfully fetched.")
          console.log(response[0])
        res.render("./temp2.ejs", {
          name: response[0].name,
          school:  response[0].school,
          year:  response[0].year,
          program:  response[0].program,
          univ:  response[0].univ,
        }
        );
      }
  })
    
  
      
  });
    
  app.get("/temp3", async (req, res) => {

    await student.find({name:global_context_student},function (err,response) {
      if (err) {
          console.log("THE STREAM DATA IS NOT FETCHED")
      } else {
          console.log("Stream Data successfully fetched.")
          console.log(response[0])
        res.render("./temp3.ejs", {
          name: response[0].name,
          school:  response[0].school,
          year:  response[0].year,
          program:  response[0].program,
          univ:  response[0].univ,
        }
        );
      }
  })
    
  
      
    });
  
  

app.listen(process.env.PORT || 5000, () => {
    console.log("working in 5000");
  });
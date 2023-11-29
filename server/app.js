const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const Cohort = require("./models/Cohort.model")
const Student = require("./models/Student.model")
const cors = require("cors")
const PORT = 5005;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...


// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then(x =>
    console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(err =>
    console.error("Error connecting to MongoDB", err));

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(cors())
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});


app.get("/api/cohorts", (req, res) => {
  Cohort.find()
    .then((cohorts) => {
      res.json(cohorts);
    })
    .catch((error) => {
      console.error("Error while retrieving cohorts ->", error);
      res.status(500).send({ error: "Failed to retrieve cohorts" });
    });
});

app.get("/api/cohort/:cohortId", (req, res, next) => {
  const cohortId = req.params.cohortId 
  Cohort.findById(cohortId) 
    .then((cohort)=> {
      res.status(200).json(cohort)
    })
    .catch((err) => {
      console.log("trouble: " + err)
      res.status(500).json({message: "Unable to get cohort"})
    })
})

app.post("/api/cohorts", (req, res, next) => {
  const {cohortSlug, cohortName, program, format, campus, startDate, endDate, inProgress, programManager, leadTeacher, totalHours} = req.body

  const newCohort = {
    cohortSlug, 
    cohortName,
    program,
    format,
    campus,
    startDate,
    endDate,
    inProgress,
    programManager,
    leadTeacher,
    totalHours
  }
  Cohort.create(newCohort)
  .then((cohort)=> {
    res.status(201).json(cohort)
  })
  .catch((err)=> {
    console.log("Failed to create cohort: " + err)
    res.status(500).json("Failed to create cohort")
  })
})

app.put("/api/cohorts/:cohortId", (req, res, next) => {
  const cohortId = req.params.cohortId

  const {cohortSlug, cohortName, program, format, campus, startDate, endDate, inProgress, programManager, leadTeacher, totalHours} = req.body

  const newCohort = {
    cohortSlug, 
    cohortName,
    program,
    format,
    campus,
    startDate,
    endDate,
    inProgress,
    programManager,
    leadTeacher,
    totalHours
  }
  Cohort.findByIdAndUpdate(cohortId, newCohort, {new:true})
  .then((cohort)=> {
    res.status(201).json(cohort)
  })
  .catch((err)=> {
    console.log("Failed to update cohort: " + err)
    res.status(500).json("Failed to update cohort")
  })
})

app.delete("/cohorts/:cohortId", (req, res, next) => {
  const cohortId = req.params.cohortId
  Cohort.findByIdAndDelete(cohortId)
  .then(()=> {
    res.status(204).send()
  })
  .catch((err)=> {
    console.log("Failed to delete cohort: " + err)
    res.status(500).json("Failed to delete cohort")
  })
})


app.get("/api/students", (req, res) => {
  Student.find()
    .then((students) => {
      res.json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving students ->", error);
      res.status(500).send({ message: "Failed to retrieve students" });
    });
});

app.get("api/students/:studentId", (req, res, next) => {
  const studentId = req.params.studentId
  Student.findById(studentId) 
  .then((student)=> {
    res.status(200).json({student})
  })
  .catch((err) => {
    console.log("error:" + err)
    res.status(500).json({message: "Unable to retrieve student"})
  })
})

app.post("/api/students", (req, res, next) => {
  const {firstName, lastName, email, phone, linkedinUrl, language, program, background, image, cohort, projects} = req.body

  const newStudent = {
    firstName, 
    lastName, 
    email, 
    phone, 
    linkedinUrl, 
    language, 
    program, 
    background, 
    image, 
    cohort, 
    projects
  }
  Student.create(newStudent)
  .then((student)=> {
    res.status(201).json(student)
  })
  .catch((err)=> {
    console.log("Failed to create student: " + err)
    res.status(500).json("Failed to create student")
  })
})

app.put("/api/students/:studentId", (req, res, next) => {
  const studentId = req.params.studentId

  const {firstName, lastName, email, phone, linkedinUrl, language, program, background, image, cohort, projects} = req.body

  const newStudent = {
      firstName, 
      lastName, 
      email, 
      phone, 
      linkedinUrl, 
      language, 
      program, 
      background, 
      image, 
      cohort, 
      projects
  }
  
  Student.findByIdAndUpdate(studentId, newStudent, {new:true})
  .then((student)=> {
    res.status(200).json(student)
  })
  .catch((err)=> {
    console.log("Failed to update student: " + err)
    res.status(500).json("Failed to update student")
  })
})

app.delete("/students/:studentId", (req, res, next) => {
  const studentId = req.params.studentId
  Cohort.findByIdAndDelete(studentId)
  .then(()=> {
    res.status(204).send()
  })
  .catch((err)=> {
    console.log("Failed to delete student: " + err)
    res.status(500).json("Failed to delete student")
  })
})





// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
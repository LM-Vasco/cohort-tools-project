## Mongoose

### 1. What is it? How to setup and connect to a database?

### 2. Using it to read/retrieve documents from a MongoDB database collection
<br>

## 1. What is Mongoose?

Mongoose is an npm package and an Object Document Mapper (ODM) used for Node.js applications when working with MongoDB. It helps us write database queries in pure JavaScript. :)

An Object-Document Mapper (ODM) is a tool that allows you to interact with your MongoDB database using JavaScript objects. It maps your objects in the application to documents in the database.

An ODM, like Mongoose, provides a way to interact with the documents in the database using JavaScript objects. With Mongoose, you can define a schema (a blueprint) for your objects and then use it to create instances of those objects. These instances can be saved, retrieved, updated and deleted in the database using mongoose methods.


### Installation

```
npm install mongoose
```

### Connecting to the Database

Import mongoose in our app.js:

```
    //shared across all files in the app
 const mongoose = require("mongoose");
```

```
 mongoose
   // local ip address and default port which you can use to access the MongoDB database
   // "mongoose-example-dev" refers to the name of the database
  .connect("mongodb://127.0.0.1:27017/mongoose-example-dev")
  .then(x => 
   console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(err => 
   console.error("Error connecting to MongoDB", err));
```

### Querying the Database

Before we can access and interact with any collection, we have to create a model that will control it.

A model is a JavaScript class that creates and handles documents for a specific collection in our database.

Example:

```
// ./models/Book.model.js
const mongoose = require("mongoose");
// Import the Schema class from the mongoose library
const Schema = mongoose.Schema;
 
// CREATE SCHEMA
// A Schema is a blueprint that describes the structure of the documents (objects) that will be stored in the MongoDB collection.

const bookSchema = new Schema({
  title: String,
  year: Number,
  quantity: { 
    type: Number, 
    min: 0, 
    default: 0 
    },
  author: String
});
 
// CREATE MODEL
// The model() method defines a model (Book) and creates a collection (books) in MongoDB
// The collection name will default to the lowercased, plural form of the model name:
//                          "Book" --> "books"

const Book = mongoose.model("Book", bookSchema);
 
// EXPORT THE MODEL
// Exports the Book model so that it can be used in other files within the project.

module.exports = Book;
```

To make the model accessible in our route handlers, we need to import it into the app.js file:

```
// app.js
 
// ...
 
const Book = require("./models/Book.model");
 
// ...
```

In addition, we can specify Default Values and Data Types and Validation:

```
const studentSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, min: 0, max: 30 },
  color: { type: String, enum: ['white', 'black', 'brown'] },
  avatarUrl: { type: String, default: 'images/default-avatar.png' },
  location: {
    address: String,
    city: String
  },
  countryCode: {
    type: String,
    match: /^[A-Z]{2}$/
  },
  created: {
    type: Date,
    default: Date.now
  }
});
```
<br>

## 2. Using it to read/retrieve documents from a MongoDB database collection

Mongoose provides several methods for retrieving documents from the database collection:

```
// Finds and retrieves all the documents from the corresponding collection.
Model.find({})

// It takes an optional filter object used to specify which document to retrieve:
Model.find({ field: searchValue });

// Finds and retrieves a single document by its _id field.
Model.findById()

```

Example:

```
// app.js
 
// ...
 
//  GET  /books - Retrieve all books from the database
app.get("/books", (req, res) => {
    // {} is an empty object so it will return all the books in the database.
  Book.find({})
    .then((books) => {
      console.log("Retrieved books ->", books);
      res.json(books);
    })
    .catch((error) => {
      console.error("Error while retrieving books ->", error);
      res.status(500).send({ error: "Failed to retrieve books" });
    });
});
```




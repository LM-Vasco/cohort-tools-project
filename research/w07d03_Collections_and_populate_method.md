## w07d03 > Mongoose | Introduction > Document Relationships

# 1. Creating reference relationships between collections

Main ways of creating a relationship between documents:
1. ``embedded documents``
<br>- documents stored inside other documents (like nested JSON)

2. ``references``
<br>- shortcuts to other documents
<br>- each MongoDB document has a unique ``_id`` field that functions as its main identifier
<br>- storing the ``_id`` of one document in another creates a ``reference`` relationship (like ``foreign keys`` in SQL databases)

## How to create a reference relationship between different collections in MongoDB

Note:
<br>Obviously, 2+ models are needed to be able to create a relationship between two collections.

### A ``one-to-one`` relationship

Suppose we have one model for ``Book`` and one for ``Author``:
<br>*use the Mongoose option ``ref``

1. In the ``Book`` model (``model/Book.model.js``), add a new field ``author`` that references the ``Author`` model:

```
const bookSchema = new Schema({
    title: ...
    ...

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author"
    }
});
```
Note:
<br>- The ``author`` field of the initial ``bookSchema`` was ``type: String``, but it has been updated as in the code block above.
<br>- This allows us to store the ``_id`` of a document from another collection.
<br>- The ``ref`` option specifies the model/collection where the document associated with the ``_id`` is stored.
<br>- Be certain that the model name in ``ref`` is the same as the name string used to create the model.

### Now when retrieving a book document, we only get the author's ``ObjectId``, but what if we want the author's full details? -->

# 2. The ``.populate()`` method in Mongoose

We can use this to substitute the ``ObjectId`` stored in the reference field with its corresponding document from the other collection.

For example:
<br>We can specify that we want to populate the ``author`` field and substitute id for the actual author document from the ``Author`` collection.

```
app.get(...

    Book.findById(BookId)
        // replaces author ObjectId with full document
        .populate('author')
        .then...

);
```
Note:
<br>the ``author`` field of the book model should now be populated (``nested``) with all of the author model's fields.
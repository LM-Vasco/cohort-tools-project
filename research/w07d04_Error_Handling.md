# Error handling - keeping code reliable

## ExpressJS - Default Error Handling

There is hidden built-in middleware that Express automatically adds at the end of the middleware function stack. If there is an error or a request that does not match any route, the error-handling middleware takes care of it as a catch-all, safety net.
    
If any synchronous code in your routes throws an error, Express will automatically catch it and send a response with a status code 500 (Internal Server Error) and a corresponding error message.


## Uncaught Errors and Rejected Promises
    
Async Code causes the server process to crash which makes it unavailable for any future request.

Inside terminal of crashed process: 
    
    "This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch()."

Solution:

Add a catch block ( .catch() )

Add next()
- pass error argument to forward error to the error-handling middleware for proper handling
- will then send a response with a status code 500 instead of the server crashing


Create custom Error Handling by using a middleware function that accepts four arguments: (err, req, res, next). Used to: tailor the error responses, log specific details.

## Setup of Error-handling middleware

Create a new middleware file.

Create two functions:
       
### 1. 404 Not Found Middleware 

- catches requests that don’t match the routes; used in the absence of additional work to do (Express has executed all middleware functions and routes, and found that none of them responded)
```
//has 4 arguments; will run whenever `next(err)` is called
function errorHandler (err, req, res, next) {
 
  // Log the error
  console.error("ERROR", req.method, req.path, err);
 
  // Check if response was already sent; sending it twice will cause an error
  if (!res.headersSent) {
 
  // If not, send a response with status code 500 and a generic error message
  res
    .status(500)
    .json({ message: "Internal server error. Check the server console"});
  }
};
```
 

 

### 2. Error Handling Middleware

- handles all the errors passed using next(err) (status code 500 (Internal Server Error))

```
//will run whenever the requested route is not found
function notFoundHandler (req, res, next) {
  res
    .status(404)
    .json({ message: "This route does not exist" });
};
```


Export file:

```
module.exports = {
  notFoundHandler,
  errorHandler
}
```

Import functions into main server file.

Register them in the app:
   
```
//error handlers are placed after all other middleware and routes to catch errors from preceding routes; first not found, then error handler
    app.use(notFoundHandler)
    app.use(errorHandler)
```

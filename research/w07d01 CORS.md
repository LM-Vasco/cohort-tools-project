## CORS: Cross-Origin Resource Sharing

### 1. What is it?

### 2. How to configure our server to accept HTTP requests coming from different an IP/Domain that is different from our server 

### --> How to configure our Express.js server to allow incoming requests from our React app that is running on a different origin


#### Terms:
- ``Origin`` --> IP address / domain where an app is running
- ``Cross-origin`` --> IP address / domain that is different from the server's
- ``HTTP header`` --> part of the HTTP message used to pass additional context/metadata about the req / res

<br>

## 1. What is CORS?

A mechanism that blocks cross-origin HTTP requests initiated by scripts running in the browser (via ``fetch``, ``axios``, ``XMLHttpRequest``, etc).

This restriction is an HTTP header security mechanism that is default browser behaviour --> this produces a ``CORS error``

By default, browsers make a ``preflight request`` to the server before sending an actual HTTP request to check if the server permits requests from the origin.

The browser will only permit an HTTP request once the origin of the client-side app is <i>whitelisted</i> by the server.

<br>

## 2. Configure CORS in Express.js

CORS allows any server to specify which origins are permitted access.

Servers respond to a browser's preflight request by sending ``HTTP headers`` with ``CORS preferences``, including a list of permitted origins for incoming requests.

<br>

## Configuring our Express.js server to allow requests from specific origins:

eg. our React app running at ``localhost:5173`` (?)

### Option 1: by manually configuring the corresponding HTTP headers
(not in student portal notes)

### Option 2: by using the CORS middleware

1. install the CORS package

    in the project directory, open a terminal:
    <br>``npm install cors``

2. import the CORS middleware

    in the ExpressJS server file (usually ``app.js``), import at the top along with other dependencies:
    <br>``const cors = require('cors');``

3. set up CORS middleware to allow requests

    use the CORS middleware to enable cross-origin requets:

    <b>A.</b> allow requests from any cross-origin --> <i>allow all requests</i>

    <b>B.</b> allow requests from specific cross-origins --> <i>restrictive</i>


### A. Allow requests from any cross-origin

To allow any type of req from any IP address and/or domain, set up ``cors()`` without any options:

``app.use(cors());``

### B. Allow requests from specific cross-origins

To allow from only specific origins, create an ``array`` with the whitelist containing allowed IP address / domains.

Pass the array as the ``origin`` option to the CORS middleware:

```
const app = express();
...
app.use(
    cors({
        // add URLs of allowed origins to this array
        origin: ['http://localhost5173', 'http://....'],
    })
);
```

### After setting this up:
Your Express server should now respond to preflight requests with the following header:
<br>``Access-Control-Allow-Origin``

## Note
Be sure to set your CORS middleware before any ``route`` or ``rotuer`` definition to be certain it functions properly.

Recommendation:
Place CORS as the <i>first</i> middleware immediately after instantiating the server: ``const app = express()``
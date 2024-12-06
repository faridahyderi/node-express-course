console.log('Express Tutorial')
// Import the Express library
const express = require('express');

//add the following require statement to the top of the program:
const { products,people } = require("./data");

// Creation of the app as returned from calling express()
const app = express();

//app.use statements for the middleware. You’ll eventually use many kinds of middleware, 
//but for now the only middleware we are using is express.static().
app.use(express.static('methods-public'))

//to implement router and controller
const peopleRouter = require('./routes/people');

//to implement authentication
const cookieParser = require('cookie-parser');


//Add an app.get statement to app.js. It should be after the Express static middleware, but before the “not found” handler. 
/*app.get('/api/v1/test',(req,res)=>{
    res.json({ message: "It worked!" });
})*/

/*app.get('/api/v1/products',(req,res)=>{
    res.json(products);
})*/

/*So add an app.get statement for the url
/api/v1/products. Write some code to return JSON for the products
array.*/
/*app.get('/api/v1/products/:productID',(req,res)=>{
    
    //API should actually return, in JSON form, the product that has an ID of 7. 
    const idToFind = parseInt(req.params.productID); 
    const product = products.find((p) => p.id === idToFind);
    res.json(product);
})*/

// Add a new app.get statement for /api/v1/query, and include logic to handle these query strings. Then test it out.
/*app.get('/api/v1/query',(req,res)=>{
    
    //The user may also want to do a simple search, instead of getting all the products
    const searchItem = req.query.search
    const limit = parseInt(req.query.limit)

    let simpleSearch = products.filter(product => 
        product.name.startsWith(searchItem)
    );

    let limitedSearch = simpleSearch.slice(0,limit);
    res.json(limitedSearch);

})*/

// the user might want to send a regular expression instead of search for starting letters
/*app.get('/api/v1/query', (req,res)=>{
    console.log("inside new get")
    const searchItem = req.query.search || '';
    const limit = parseInt(req.query.limit) || 3 ;
    const regularexp = req.query.regex;
    console.log(regularexp);
    
    const maxPrice = parseFloat(req.query.maxprice);
    console.log(maxPrice);

    let simpleSearch = products;

    if(searchItem)
    {
        simpleSearch = simpleSearch.filter(product => 
            product.name.startsWith(searchItem)
        );
     }

     if(regularexp)
     {
        try{
            const regexp = new RegExp(regularexp, 'i');
            simpleSearch = simpleSearch.filter(product => 
                regexp.test(product.name)
            );
        }
        catch(error){
            return res.status(400).json({error: 'Invalid regular expression'})
        }
     }
     if(!isNaN(maxPrice))
     {
         simpleSearch = simpleSearch.filter(product =>
            product.price <= maxPrice
        );
     }
     let limitedSearch = simpleSearch.slice(0,limit);
     res.json(limitedSearch);
});*/

/*Add a button to your index.html. Add JavaScript,
 either within a <script> tag in index.html or in a JavaScript file it references 
 (which would also be in the public directory.) When you click the button, your JavaScript would 
 issue a fetch call for /api/v1/products. Then you’d add the data you get back to a div in your HTML*/

/*week 4 : The middleware function you create should log the method and url properties from the req object,
 as well as the current time, before calling next()*/
 const logger = (req, res, next) => {
    const currentTime = new Date().toISOString(); // Get current time in ISO format
    console.log(`[${currentTime}] ${req.method} request to ${req.url}`);
    next(); // Pass control to the next middleware/route handler
};

app.use(logger);  // This will log requests for all routes */

// Use the logger middleware for specific routes
app.get('/', logger, (req, res) => {
    res.send('Hi There');
});

/*week 4:Then, take the logger call out of your app.get() statement, and call it via app.use(), 
for all paths, instead. Verify that it still works.*/
// Apply logger middleware to specific paths
app.use(["/about", "/product"], logger); 
app.get('/about', (req, res) => {
    res.send('About page');
});

app.get('/product', (req, res) => {
    res.send('product page');
});

//week 4:Now you implement the app.post statement for /api/v1/people
// Middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.json());  // Parse JSON bodies

//for imlementing router and controller
app.use("/api/v1/people", peopleRouter);

// GET endpoint to return people data
app.get('/api/v1/people', (req, res) => {
    res.json(people); // Send the people array as a JSON response
  });

  // POST endpoint to add a new person
app.post('/api/v1/people', (req, res) => {
    const { name } = req.body;
  
    // Check if the name was provided in the request body
    if (!name) {
      return res.status(400).json({ success: false, message: "Please provide a name" });
    }

    // Add a new person to the people array
  const newPerson = { id: people.length + 1, name: req.body.name };
  people.push(newPerson);

  // Return a success response with the new person's name
  res.status(201).json({ success: true, name: req.body.name });
});


//Week 4 optional authentication 

// Middleware for parsing JSON bodies and cookies
app.use(express.json());
app.use(cookieParser());

// Authentication middleware
function auth(req, res, next) {
    if (req.cookies.name) {
      req.user = req.cookies.name; // Set the user from the cookie
      return next(); // Proceed to the next middleware/route handler
    } else {
      res.status(401).json({ message: 'unauthorized' }); // User is not authenticated
    }
  }

  // POST /logon - Log in and set the 'name' cookie
app.post('/logon', (req, res) => {
    const { name } = req.body;
    if (name) {
      res.cookie('name', name); // Set the cookie with the user's name
      res.status(201).json({ message: `Hello, ${name}!` }); // Respond with a welcome message
    } else {
      res.status(400).json({ message: 'Name is required.' }); // If name is not provided, return a 400 error
    }
  });

  // DELETE /logoff - Log out and clear the 'name' cookie
app.delete('/logoff', (req, res) => {
    res.clearCookie('name'); // Clear the 'name' cookie
    res.status(200).json({ message: 'You have been logged off.' }); // Respond with a success message
  });

  // GET /test - Test if the user is authenticated
app.get('/test', auth, (req, res) => {
    res.status(200).json({ message: `Welcome, ${req.user}!` }); // Respond with a personalized welcome message
  });


//An app.all statement after these to handle page not found conditions.
app.all('*',(req,res)=>{
    res.status(400).send("page you are looking for is not found ")
})

//An app.listen statement to tell the server to listen for requests on a particular port.
app.listen(3000);

console.log("server is listening to requests at port 3000");
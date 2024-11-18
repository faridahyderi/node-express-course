console.log('Express Tutorial')
// Import the Express library
const express = require('express');

//add the following require statement to the top of the program:
const { products } = require("./data");

// Creation of the app as returned from calling express()
const app = express();

//app.use statements for the middleware. You’ll eventually use many kinds of middleware, 
//but for now the only middleware we are using is express.static().
app.use(express.static("./public"))

//Add an app.get statement to app.js. It should be after the Express static middleware, but before the “not found” handler. 
/*app.get('/api/v1/test',(req,res)=>{
    res.json({ message: "It worked!" });
})*/

app.get('/api/v1/products',(req,res)=>{
    res.json(products);
})

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


//An app.all statement after these to handle page not found conditions.
app.all('*',(req,res)=>{
    res.status(400).send("page you are looking for is not found ")
})

//An app.listen statement to tell the server to listen for requests on a particular port.
app.listen(3000);

console.log("server is listening to requests at port 3000");
const http= require('http')

//This program should use the built-in http module to create a simple web server that listens on port 3000
//You pass it a callback function that checks the request variable (req) for the current url property, 
//and depending on what the URL is, sends back a message to the browser screen

const server = http.createServer( (req,res) =>{
    if(req.url === '/')
    {
        res.end("Welcome to our Homepage")
    }
    if(req.url === '/about')
    {
        res.end("You are at Farida's About page")
    }
    res.end(`<h1>Sorry!</h1>
        <p>We can't find the page you are looking for</p>
        <a href ='/'>Back home</a>`)

})  
server.listen(3000)



//Again you write to temp.txt. You start it the same way, but this time, you use the .then style of asynchronous programming. You don’t need to create any functions. Instead, you just use cascading .then statements in your mainline


const { writeFile, readFile } = require("fs").promises; 
writeFile('temp.txt','My name is Farida\n ',{flag:'a'}) // write line 1  
 .then(() => {  
    console.log("inside first then")
    return writeFile('temp.txt','I am doing Node class with CTD\n',{flag:'a'})  // write line 2.  
    // Return the promise so you can chain the .then statements  
 })  
 .then(() => {  
    console.log("inside sec then")
    // write the third line, and follow that with two more .then blocks, 
     // one to call readFile to read it back out, and one to log the data to the screen.
    return writeFile('temp.txt','Node is interesting to learn',{flag:'a'})  // write line 3.  
    // Return the promise so you can chain the .then statements  
 })  
 .then(() => {     
    console.log("inside read then")
    return readFile('temp.txt','utf8')  
    // Return the promise so you can chain the .then statements  
 }) 
 .then((result) => {     
   console.log(result)
    // Return the promise so you can chain the .then statements  
 }) 
  
 
 
 .catch((error) => {  
     console.log("An error occurred: ", error)  
 })  
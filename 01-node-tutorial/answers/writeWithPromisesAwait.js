const { writeFile, readFile } = require("fs").promises;

//Then create an async function called writer that takes 0 arguments,
// and that writes three lines to a file named temp.txt, by calling the writeFile function with await

async function writer()
{ 
    try{
        await writeFile('temp.txt','My name is Farida\n I am doing Node class with CTD\n Node is interesting to learn',{flag:'a'})
        console.log("File writing is successful")
    }
    catch(error)
    {
    console.log("Error Unsuccessful")
    }
}

//create another async function called reader that reads the file with await readFile and logs the return value to the screen.
async function reader()
{
   try{
         const result=await readFile('temp.txt','utf8')
         console.log(result)
   }
   catch(error)
   {
    console.log("Error",error)
   }
}

//Now we want to call the two functions in order, first the writer, and the reader.
//you write a third async function called readWrite. In that function, you call await reader and await writer. 
async function readWrite()
{
    await writer();
    await reader();
}

//Finally, write a line at the bottom of the file that calls the readWrite function.
readWrite();
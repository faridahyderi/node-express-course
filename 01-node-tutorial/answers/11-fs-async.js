

//This should load the fs module, and use the asynchronous function writeFile to write 3 lines to a file
// ./temporary/fileB.txt. Now, be careful here! 
//First, you need to use the "append" flag for all but the first line.
//Second, each time you write a line to the file, you need to have a callback, because the writeFile operation is asynchronous.
//Third, for each line you write, you need to do the write for the line that follows it within the callback - otherwise the operations won’t happen in order
const { writeFile } = require("fs");
console.log("at start");
writeFile("./temporary/fileB.txt", "This is line 1\n", (err, result) => {
  console.log("at point 1");
  if (err) {
    console.log("This error happened: ", err);
  } else {
    // here you write your next line
    writeFile("./temporary/fileB.txt", "This is line 2\n", {flag: "a"},(err, result) => {
        console.log("at point 2");
        if (err) {
          console.log("This error happened: ", err);
        } else {
          // here you write your next line
          writeFile("./temporary/fileB.txt", "This is line 3\n", {flag: "a"},(err, result) => {
            console.log("at point 3");
            if (err) {
              console.log("This error happened: ", err);
            } else {
              // here you write your next line
              
            }
            console.log("at end");
        });
        }
  });
}

});

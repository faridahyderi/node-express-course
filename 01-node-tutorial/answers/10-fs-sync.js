const {readFileSync,writeFileSync} = require('fs')

//reading the files first.txt and second.txt
const first=readFileSync('./content/first.txt','utf8')
const second=readFileSync('./content/second.txt','utf8')
console.log(first,second)


//use writeFileSync to write 3 lines to a file, ./temporary/fileA.txt, using the "append" flag for each line after the first one.
writeFileSync('./temporary/fileA.txt', 'line1 using writefilesync function \n',{flag: 'a'})
writeFileSync('./temporary/fileA.txt', 'line2 using writefilesync function \n',{flag: 'a'})
writeFileSync('./temporary/fileA.txt', 'line3 using writefilesync function \n',{flag: 'a'})

//Then use readFileSync to read the file, and log the contents to the console.
const result=readFileSync('./temporary/fileA.txt','utf8')
console.log(result)
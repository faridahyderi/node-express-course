const path= require('path');

console.log(path.sep)

//using the join method
const filePath=path.join('/content','subfolder','test.txt')
console.log(filePath)

//to get the base name
const base=path.basename(filePath)
console.log(base)

//to get the absolute path
const absolute =path.resolve(__dirname,'content','subfolder','test.txt')
console.log(absolute)
const fs = require('fs');
const path = require('path');

// Path to the big.txt file
const filePath = path.join(__dirname, '../content/big.txt');

// Create a read stream with specified encoding and highWaterMark
const stream = fs.createReadStream(filePath, { encoding: 'utf8', highWaterMark: 700 });

// Initialize a counter for the number of chunks received
let counter = 0;

// Handle the 'data' event
stream.on('data', (chunk) => {
    counter += 1;
    console.log(`Chunk ${counter}:`, chunk);
});

// Handle the 'end' event
stream.on('end', () => {
    console.log(`\nStream has ended. Total chunks received: ${counter}`);
});

// Handle the 'error' event
stream.on('error', (error) => {
    console.error('An error has occurred:', error.message);
});

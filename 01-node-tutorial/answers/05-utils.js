//05-utils.js should export a single value, which is a function you will call in 03-modules.js.

sayWelcome =(name) => {
    console.log(`Welcome ${name}`)
}

module.exports = sayWelcome
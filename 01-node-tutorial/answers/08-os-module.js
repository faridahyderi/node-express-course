const os=require('os')

//user info
const user=os.userInfo()
console.log(user)

//method the returns the uptime in seconds
console.log(`systems uptime is : ${os.uptime()} seconds`)

//returning the current os properties as an object
const currentOs= {
    name: os.type(),
    release: os.release(),
    totalMem: os.totalmem(),
    freeMem: os.freemem(),
}
console.log(currentOs)

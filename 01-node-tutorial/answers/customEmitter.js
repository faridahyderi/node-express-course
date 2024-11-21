

const EventEmitter = require('events');
const weatherMonitor = new EventEmitter();

//weatherMonitor is an object of EventEmitter class

weatherMonitor.on('changeTemperature', (temp) => {
    console.log(`Recorded Temperature is :${temp}F`);
    if(temp>80)
    {
        weatherMonitor.emit('changeTrigger','heat');
    }
    else if(temp<32 )
    {
        weatherMonitor.emit('changeTrigger','cold');
    }
    else if(temp>32 && temp <60)
    {
        weatherMonitor.emit('changeTrigger1','good')
    }
    else if(temp>=60 && temp <=80)
    {
        weatherMonitor.emit('changeTrigger2','good')
    }
});

//changeTrigger Issues a heat or cold warning if the temperature is extreme 
weatherMonitor.on('changeTrigger', (kind) => {
    console.log(`${kind.toUpperCase()} Warning : Extreme Temperature condition` );
    weatherMonitor.emit('precautionTrigger',kind)
});

//changeTrigger1 Issues a message when the temperature is between 32 and 60
weatherMonitor.on('changeTrigger1', (kind) => {
    console.log(`${kind.toUpperCase()} Need an extra layer of clothes but can stay outdoors` );
    weatherMonitor.emit('precautionTrigger',kind)
});

//changeTrigger2 Issues a message when the temperature is between 60 and 80
weatherMonitor.on('changeTrigger2', (kind) => {
    console.log(`${kind.toUpperCase()} Temperature Enjoy Outside!!` );
    weatherMonitor.emit('precautionTrigger',kind)
});

//precautionTrigger Initiates safety precautions based on the kind of warning.
weatherMonitor.on('precautionTrigger', (kind) => {
    if (kind === 'heat') {
        console.log("Precaution: Stay hydrated and avoid direct sunlight.");
    } else if (kind === 'cold') {
        console.log("Precaution: Wear layers and stay indoors if possible.");
    }
    else if(kind === 'good')
    {
        console.log("can stay outside");
    }
});

//Emitting a temperature change
weatherMonitor.emit('changeTemperature', 70);
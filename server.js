const express = require('express');

const app = express();

function delay(duration) {
    const startTime = Date.now();

    while(Date.now() - startTime < duration) {
        // while loop is blocked...
    }
}

app.get('/', (req, res) => {
    // real life blocking functions...
    // JSON.stringify({}) => "{}"
    // JSON.parse("{}") => {}
    // [5,1,2,3,4].sort()
    
    res.send(`Node.js performance example: ${process.pid}`);
});

app.get('/timer', (req, res) => {
    console.log(`${process.pid}`);
    delay(4000);
    res.send(`Beep beep beep! ${process.pid}`);
});


console.log(`Worker process started...${process.pid}`);
app.listen(3000);
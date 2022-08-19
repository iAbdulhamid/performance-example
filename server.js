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
    
    res.send('Node.js performance example');
});

app.get('/timer', (req, res) => {
    delay(10000);
    res.send('Ding ding ding!');
});

app.listen(3000);
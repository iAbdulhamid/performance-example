const express = require('express');
const cluster = require('cluster');
const os      = require('os');

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
    delay(10000);
    res.send(`Ding ding ding! ${process.pid}`);
});

if (cluster.isMaster) {
    console.log(`Master has been started...${process.pid}`);
    const NUM_OF_WORKERS = os.cpus().length;
    for (let i = 0; i < NUM_OF_WORKERS; i++) {
        cluster.fork();
    }
} else {
    console.log(`Worker process started...${process.pid}`);
    app.listen(3000);
}

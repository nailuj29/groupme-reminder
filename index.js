const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const jsonParser = bodyParser.json();

app.post('/', jsonParser, (req, res) => {
    const text = req.body.text;
    const words = text.split(' ');
    if (!words[0] == '/remind') {
        return;
    }

    
});

app.listen(1676, () => {
    console.log('Server is running on port 1676');
})
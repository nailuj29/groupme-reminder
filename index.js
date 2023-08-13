import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { sendMessage } from './groupme.js';
dotenv.config();

const app = express();

const jsonParser = bodyParser.json();

app.post('/', jsonParser, async (req, res) => {
    const text = req.body.text;
    const words = text.split(' ');

    if (req.body.name === process.env.BOT_NAME) {
        return;
    }

    if (words[0] !== '/remind') {
        return;
    }
    
    console.log("Received command: " + text);

    const time = words[1];
    const remindText = words.slice(2).join(' ');
});

app.listen(1676, () => {
    console.log('Server is running on port 1676');
})
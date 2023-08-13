import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { sendMessage } from './groupme.js';
import { addReminder, init } from './reminderProcessing.js';
import { processTime } from './intervals.js';
dotenv.config();

const app = express();

const jsonParser = bodyParser.json();

init();

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
    let time;
    try {
        time = processTime(words[1]);
    } catch (err) {
        console.error(err);
    }
    const remindText = words.slice(2).join(' ');
    const reminder = {
        time: Date.now() / 1000 + time,
        text: remindText,
        user_name: req.body.name,
        user_id: req.body.user_id,
    };
    addReminder(reminder);

    sendMessage("Reminder added! It will go off at " + new Date(reminder.time * 1000).toLocaleString());
});

app.listen(1676, () => {
    console.log('Server is running on port 1676');
})
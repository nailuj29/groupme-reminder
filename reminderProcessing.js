import sqlite3 from "sqlite3";
import { sendMentionMessage } from "./groupme";

const db = new sqlite3.Database("./db.sqlite");

const sendReminders = () => {
    const time = Date.now() / 1000;
    db.all(`SELECT * FROM reminders WHERE time < ?`, [time], (err, rows) => {
        if (err != null) {
            console.error(err);
        }

        rows.forEach((row) => {
            sendMentionMessage(row.user_name, row.user_id, row.text);
        });
    });

    db.run(`DELETE FROM reminders WHERE time < ?`, [time], (err) => {
        if (err != null) {
            console.error(err);
        }
    });
}

export const init = () => {
    db.run(`CREATE TABLE IF NOT EXISTS reminders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        time INTEGER,
        text TEXT,
        user_name TEXT,
        user_id INTEGER}`, 
        (err) => {
            if (err != null) {
                console.error(err);
            }
        });

    setInterval(sendReminders, 1000 * 60);
};

export const addReminder = (reminder) => {
    db.run(`INSERT INTO reminders (time, text, user_name, user_id) VALUES (?, ?, ?)`, [reminder.time, reminder.text, reminder.user_name, reminder.user_id],
        (err) => {
            if (err != null) {
                console.error(err);
            }
        });
};
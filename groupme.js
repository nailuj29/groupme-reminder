import fetch from 'node-fetch';

export const sendMessage = async (text) => {
    const body = {
        bot_id: process.env.BOT_ID,
        text,
    }

    const res = await fetch(`https://api.groupme.com/v3/bots/post`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (res.status !== 202) {
        console.error("Error sending message");
    }
}

export const sendMentionMessage = async (user_name, user_id, text) => {
    const body = {
        bot_id: process.env.BOT_ID,
        attachments: [
            {
                type: "mentions",
                user_ids: [user_id],
                loci: [0, user_name.length + 1],
            }
        ],
        text: `@${user_name} ${text}`,
    }

    const res = await fetch(`https://api.groupme.com/v3/bots/post`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (res.status !== 202) {
        console.error("Error sending message");
    }
}

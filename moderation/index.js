const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const morgan = require('morgan');

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));



app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    if (type === 'CommentCreated') {
        const status = data.content.includes('orange') ? 'rejected' : 'approved'


        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentModerated',
            data: {
                id: data.id,
                postId: data.postId,
                content: data.content,
                status
            }
        }).catch((err) => {
            console.log(err.message)
        })
    }

    res.send({})

})


app.listen(4003, () => {
    console.log('Moderation Service listening on 4003');
})
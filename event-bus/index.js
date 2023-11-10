const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const morgan = require('morgan');

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));


const events = []

app.post('/events', async (req, res) => {
    const event = req.body;

    events.push(event);

    axios.post('http://posts-clusterip-srv:4000/events', event).catch((err) => {
        console.log(err.message)
    });
    axios.post('http://comments-srv:4001/events', event).catch((err) => {
        console.log(err.message)
    });
    axios.post('http://query-srv:4002/events', event).catch((err) => {
        console.log(err.message)
    });
    axios.post('http://moderation-srv:4003/events', event).catch((err) => {
        console.log(err.message)
    });

    return res.send({ status: 'OK' })
})

// implement basic event bus sync, in case of an event bus crash
app.get('/events', (req, res) => {
    res.send(events)
})

app.listen(4005, () => {
    console.log('Event bus listening on 4005')
})
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const axios = require('axios');

const app = express();
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('dev'))

const posts = {}

const handleEvent = async (type, data) => {
    if (type === 'PostCreated') {
        const { id, title } = data
        posts[id] = { id, title, comments: [] }
    }
    if (type === 'CommentCreated') {
        const { id, content, postId, status } = data
        const post = await posts[postId]
        post.comments.push({ id, content, status })
    }

    if (type === 'CommentUpdated') {
        const { id, content, postId, status } = data

        const post = posts[postId]
        const comment = post.comments.find(c => {
            return c.id === id
        });
        console.log('comment', comment)
        comment.status = status
        comment.content = content
    }
}

app.get('/posts', (req, res) => {
    res.send(posts)

})

app.post('/events', async (req, res) => {
    const { type, data } = req.body

    handleEvent(type, data)

    res.send({})
})

app.listen(4002, async () => {
    console.log('Query service listening on 4002');
    const res = await axios.get('http://event-bus-srv:4005/events')
    for (let event of res.data) {
        console.log('Processing event:', event.type)
        handleEvent(event.type, event.data)
    }
})
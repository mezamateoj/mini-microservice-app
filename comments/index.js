const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const { randomBytes } = require('crypto');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
    const { id } = req.params
    console.log('this get works ' + id)

    res.send(commentsByPostId[id] || [])
})

app.post('/posts/:id/comments', async (req, res) => {
    const { id } = req.params
    const { content } = req.body

    console.log('this post works ' + id)


    const commentId = randomBytes(4).toString('hex')
    const comments = commentsByPostId[id] || [];

    comments.push({ id: commentId, content, status: 'pending' })
    commentsByPostId[id] = comments

    await axios.post('http://event-bus-srv:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: id,
            status: 'pending'
        }
    }).catch((err) => {
        console.log(err.message)
    });

    res.status(201).send(comments)

})

app.post('/events', async (req, res) => {
    console.log('Received Event', req.body.type)
    const { type, data } = req.body

    if (type === 'CommentModerated') {
        // console.log(data)
        const { postId, id, status, content } = data
        const comments = commentsByPostId[postId]

        const comment = comments.find(c => {
            return c.id === id
        })
        comment.status = status

        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentUpdated',
            data: {
                id,
                postId,
                content,
                status
            }
        })
    }


    res.send({})
})



app.listen(4001, () => {
    console.log('comments listening on 4001')
})
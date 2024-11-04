import express from 'express';
import cors from 'cors';
const app = express();
const port = 5000;

const blogPosts = [];

// Middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/posts', (req, res) => {
    res.json(blogPosts);
});

app.post('/api/posts', (req, res) => {
    const {name, username, blogPost} = req.body;
    const newPost = { id: blogPosts.length + 1, name, username, blogPost };
    blogPosts.push(newPost);
    res.json({success: true, message: 'Post added!'});
});

app.get('/viewPosts', (req, res) => {
    res.send("Hello World! viewPosts");
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})

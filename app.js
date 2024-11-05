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

app.delete('/api/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = blogPosts.findIndex(post => post.id === postId);

    if (postIndex !== -1) {
        blogPosts.splice(postIndex, 1);
        res.json({ success: true, message: 'Post deleted!' });
    } else {
        res.status(404).json({ success: false, message: 'Post not found!' });
    }
});

app.put('/api/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = blogPosts.findIndex(post => post.id === postId);

    if (postIndex !== -1) {
        const { blogPost } = req.body;  
        blogPosts[postIndex].blogPost = blogPost;

        res.json({
            success: true,
            message: 'Post updated!',
            post: { 
                id: blogPosts[postIndex].id,
                name: blogPosts[postIndex].name,
                username: blogPosts[postIndex].username,
                blogPost: blogPosts[postIndex].blogPost 
            }
        });
    } else {
        res.status(404).json({ success: false, message: 'Post not found!' });
    }
});


app.get('/viewPosts', (req, res) => {
    res.send("Hello World! viewPosts");
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})

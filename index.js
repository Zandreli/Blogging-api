import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express()
const client = new PrismaClient();

app.use(express.json());
app.get('/', (req, res) => {
    res.send("<h1>Welcome to the Minimal Blogging Platform Restful API</h1>");
})

app.get('/users', async (req, res) => {
    try {
        const users = await client.user.findMany();
        res.status(200).json(users);
    } catch (e) {
        res.status(500).json({ message: "Something went wrong"});
    }
});

app.get('/users/:id', async (req, res) => {
    try {
        const user = await client.user.findUnique({
            where: {
                id: req.params.id
            },
            include: {
                posts: true
            }
        });
        if (user)
            res.status(200).json(user);
        else
            res.status(404).json({ message: "User not found" });
    } catch (e) {
        res.status(500).json({ message: "Something went wrong" });
    }
});

app.post('/users', async (req, res) => {
    const { firstName, lastName, emailAddress, username } = req.body;
    try {
        const user = await client.user.create({
            data: {
                firstName,
                lastName,
                emailAddress,
                username
            }
        });
        res.status(201).json(user);
    } catch (e) {
        res.status(500).json({ message: "Something went wrong" });
    }
});

app.get('/posts', async (req, res) => {
    try {
        const posts = await client.post.findMany({
            where: { isDeleted: false },
            include: { author: true }
        })
        res.status(200).json(posts);
    } catch (e) {
        res.status(500).json({ message: "Something went wrong" });
    }
});

app.get('/posts/:id', async (req, res) => {
    try {
        const post = await client.post.findUnique({
            where: { id: req.params.id },
            include: { author: true }
        });
        if (post)
            res.status(200).json(post);
        else
            res.status(404).json({ message: "Post not found" });
    } catch (e) {
        res.status(500).json({ message: "Something went wrong" });
    }
});

app.post('/posts', async (req, res) => {
    const { title, content, authorId } = req.body;
    try {
        const post = await client.post.create({
            data: {
                title,
                content,
                authorId
            }
        });
        res.status(201).json(post);
    } catch (e) {
        res.status(500).json({ message: "Something went wrong" });
    }
});

app.put('/posts/:id', async (req, res) => {
    const { title, content } = req.body;
    try {
        const post = await client.post.update({
            where: { id: req.params.id },
            data: { title, content }
        });
        res.status(200).json(post);
    } catch (e) {
        res.status(500).json({ message: "Something went wrong" });
    }
});

app.delete('/posts/:id', async (req, res) => {
    try {
        await client.post.update({
            where: { id: req.params.id },
            data: { isDeleted: true }
        });
        res.json({ message: "Post deleted successfully" });
    } catch (e) {
        res.status(500).json({ message: "Something went wrong" });
    }
});

let port;
if (process.env.PORT) {
    port = process.env.PORT;
} else {
    port = 4000;
}
app.listen(port, () => {
    console.log('API is running on port 4000');
})
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// 데이터 저장소 (메모리)
let posts = [];

// 게시물 생성
app.post('/posts', (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content,
    createdAt: new Date().toISOString(),
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// 게시물 조회
app.get('/posts', (req, res) => {
  res.json(posts);
});

// 특정 게시물 조회
app.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  const post = posts.find((p) => p.id == id);

  if (post) {
    res.json(post);
  } else {
    res.status(404).send('Post not found');
  }
});

// 게시물 수정
app.put('/posts/:id', (req, res) => {
  const { id } = req.params;
  const index = posts.findIndex((post) => post.id == id);

  if (index !== -1) {
    posts[index] = {
      ...posts[index],
      title: req.body.title,
      content: req.body.content,
    };
    res.json(posts[index]);
  } else {
    res.status(404).send('Post not found');
  }
});

// 게시물 삭제
app.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  const index = posts.findIndex((post) => post.id == id);

  if (index !== -1) {
    posts.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Post not found');
  }
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

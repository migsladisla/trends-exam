const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

// Init app
const app = express();

// Load view engine
app.engine('pug', require('pug').__express)
app.set('public', path.join(__dirname, 'public'));
app.set('view engine', 'pug');

// Home route
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Trends Exam'
  });
});

// Fake API
var fakeApi = 'https://jsonplaceholder.typicode.com/';

// Fetched data
var fakeUsers = fetch(`${fakeApi}users`)
                .then((res) => res.json())
                .then((data) => fakeUsers = data)

var fakePosts = fetch(`${fakeApi}posts`)
                .then((res) => res.json())
                .then((data) => fakePosts = data)

var fakeAlbums = fetch(`${fakeApi}albums`)
                .then((res) => res.json())
                .then((data) => fakeAlbums = data)

var fakePhotos = fetch(`${fakeApi}photos`)
                .then((res) => res.json())
                .then((data) => fakePhotos = data)

var fakeComm  = fetch(`${fakeApi}comments`)
                .then((res) => res.json())
                .then((data) => fakeComm = data)
     
// Users route
app.get('/users', (req, res) => {
  res.render('users', {
    title: 'Trends Exam - Users',
    users: fakeUsers
  });
});                

// Posts route
app.get('/posts', (req, res) => {
  res.render('posts', {
    title: 'Trends Exam - Posts',
    posts: fakePosts
  });
});

// Single post route
app.get('/posts/:id', (req, res) => {
  let post = fakePosts.find(p => p.id === parseInt(req.params.id));
  if (!post) res.status(404).send('The post with the given ID was not found.');
  
  res.render('view_post', {
    title: 'Trends Exam - View Post',
    post
  });
});

// Albums route
app.get('/albums', (req, res) => {
  res.render('albums', {
    title: 'Trends Exam - Albums',
    albums: fakeAlbums
  });
});

// Photos on album route
app.get('/albums/:albumId/photos', (req, res) => {
  let album = fakePhotos.filter(a => a.albumId === parseInt(req.params.albumId));
  if (!album) res.status(404).send('The album with the given ID was not found.');
  
  res.render('view_photos', {
    title: 'Trends Exam - View Photos',
    album
  });
});

// Comments route
app.get('/posts/:postId/comments', (req, res) => {
  const comms = fakeComm.filter(c => c.postId === parseInt(req.params.postId));
  if (comms.length == 0) res.status(404).send('The post with the given ID was not found.');

  res.render('view_comments', {
    title: 'Trends Exam - View Comments',
    comms
  });
});

// Invalid URL route
app.all('*', function(req, res) {
  res.render('404', {
    title: 'Error 404'
  });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
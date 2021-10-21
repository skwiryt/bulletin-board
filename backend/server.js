const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts.routes');

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* API ENDPOINTS */
app.use('/api', postsRoutes);

/* API ERROR PAGES */
app.use('/api', (req, res) => {
  res.status(404).send({ post: 'Not found...' });
});

/* REACT WEBSITE */
// app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../build')));

// change the place of uploads
app.use(express.static(path.join(__dirname, './public')));

app.use('*', (req, res) => {  
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

/* MONGOOSE */
// process.env directs to Atlas DB, comment out the line according to the need
// const connectionUrl = 'mongodb://localhost:27017/bulletinBoardDB';
const connectionUrl = process.env.BULLETIN_DB_STRING;
mongoose.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => {
  console.log('Successfully connected to the database');
});
db.on('error', err => console.log('Error: ' + err));

/* START SERVER */
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Server is running on port: '+port);
});

// /home/mzb/works/kodilla/bulletin-board/backend/posts.json
// mongoimport --uri "connection string" --collection posts --drop --file /home/mzb/works/kodilla/bulletin-board/backend/posts.json --jsonArray
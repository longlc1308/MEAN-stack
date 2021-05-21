const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const Post = require('./models/posts.class');
const route = require('./route/index')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())


const db = require('./config/posts');
db.connect();

//route
route(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
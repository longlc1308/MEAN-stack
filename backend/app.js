const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const cors = require('cors');
const Post = require('./models/posts.class');
const route = require('./route/index')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());




app.use("/images", express.static(path.join("images")));



const db = require('./config/posts');
db.connect();

//route
route(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
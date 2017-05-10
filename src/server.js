require('../config.js');
const express = require('express');

const loginRouter = require('./routers/login.js');
const postRouter = require('./routers/posts.js');

const app = express();

app.use(express.static('view'));
app.use('/api', loginRouter);
app.use('/api', postRouter);
app.get('/*', (req, res) => res.redirect('/'));

const port = 8080;
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}...`);
});

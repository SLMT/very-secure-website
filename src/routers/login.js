const express = require('express');
const bodyParser = require('body-parser');

const userModel = require('../model/users.js');

const router = express.Router();

router.use(bodyParser.json());

// Login Check
router.post('/login', function(req, res, next) {
    const {username, password} = req.body;

    if (!username || !password) {
        const err = new Error('Username and password are required');
        err.status = 400;
        throw err;
    }

    userModel.get(username, password).then(user => {
      if (user.length == 1)
        res.json(user);
      else {
        res.sendStatus(404);
      }

    }).catch(next);
});

module.exports = router;

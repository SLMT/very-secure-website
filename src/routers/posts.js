const express = require('express');
const bodyParser = require('body-parser');

const postModel = require('../model/posts.js');

const router = express.Router();

router.use(bodyParser.json());

// Get
router.get('/posts', function(req, res, next) {
  if (req.query.id)
      postModel.get(req.query.id).then(post => {
          res.json(post);
      }).catch(next);
  else
      postModel.list().then(posts => {
          res.json(posts);
      }).catch(next);
});

module.exports = router;

const router = require('express').Router();

const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
    res.json({posts: 'Some random data'});
});

module.exports = router;
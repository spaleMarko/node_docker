const router = require('express').Router();

router.post('/register', (req, res) => {
    res.send('REGISTER');
});

router.post('/login', (req, res) => {
    res.send('LOGIN');
});

module.exports = router;
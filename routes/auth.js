const router = require('express').Router();
const User = require('../model/User');

//VALIDATION
const {registerValidation, loginValidation} = require('../validation');

router.post('/register', async (req, res) => {
    // LETS VALIDATE THE DATA BEFORE WE A USER
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)
    //Checking if the user already in the database
    const emailExist = await User.findOne({email: req.body.email})
    if (emailExist) return res.status(400).send('Email alredy exists')
    // Create new User
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
});

router.post('/login', (req, res) => {
    res.send('LOGIN');
});

module.exports = router;
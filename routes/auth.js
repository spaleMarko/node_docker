const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../model/User');

//VALIDATION
const {registerValidation} = require('../validation');

router.post('/register', async (req, res) => {
    // LETS VALIDATE THE DATA BEFORE WE A USER
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    //Checking if the user already in the database
    const emailExist = await User.findOne({email: req.body.email})
    if (emailExist) return res.status(400).send('Email alredy exists')

    // Hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new User
    const user = new User({
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.send({user: user._id});
    }catch(err){
        res.status(400).send(err);
    }
});

router.post('/login', async(req, res) => {
    // LETS VALIDATE THE DATA BEFORE WE A USER
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Checking if the email exists
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Email is not egist please Register');

    // PASSWORD IS CORRECT
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid password');

    res.send('Logged in!');
});

module.exports = router;
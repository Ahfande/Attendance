const express = require('express');
const router = express.Router();
const User = require ('../models/user');

// Endpoin login
router.post('/login', async (req, res) => {
    const { name, id, password } = req.body;
    try{
        const user = await User.findOne({ id });
        if(!user){
            return res.status(400).json({ message: 'User not found' });
        }
    if (user.password !== password){
        return res.status(400).json({ message: 'Invalid password'})
    }
    res.json ({ message: 'Login successful'});
    }catch (err){
    res.status(500).json({message: 'server error', error: err});
    }
});
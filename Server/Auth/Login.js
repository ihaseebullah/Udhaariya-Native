const passport = require('passport');
const jwt = require('jsonwebtoken');
const USER = require('../Models/User');
const dotenv = require('dotenv').config();

function Login(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(400).json({ message: info.message || 'Login failed' });

        req.logIn(user, async (err) => {
            if (err) return next(err);
            try {
                req.user = user;
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: (30 * 24 * 60 * 60 * 1000) });
                res.cookie('jwt', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: (30 * 24 * 60 * 60 * 1000) });
                return res.json({ message: 'Login successful', token, user });
            } catch (error) {
                return res.status(500).json({ message: 'Token creation failed' });
            }
        });
    })(req, res, next);
}
async function GetUser(req, res) {
    try {
        if ((req.params.identifier).includes('@')) {
            const userInfo = await USER.findOne({ email: req.params.identifier }, { email: 1, username: 1, fullName: 1, profilePicture: 1 })
            if (userInfo) {
                res.status(200).json(userInfo)
            } else {
                res.status(404).json({ message: 'User not found' })
            }
        } else {
            const userInfo = await USER.findOne({ username: req.params.identifier }, { email: 1, username: 1, fullName: 1, profilePicture: 1 })
            if (userInfo) {
                res.status(200).json(userInfo)
            } else {
                res.status(404).json({ message: 'User not found' })
            }
        }
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'An error occurred' })
    }
}
module.exports = { Login, GetUser };

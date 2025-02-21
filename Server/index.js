const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const authenticateJWT = require('./Middlewares/authenticateJWT');
const AuthRouter = require('./Router/AuthRoutes');
const isLoggedin = require('./Middlewares/isLoggedin');
const { sendNotification } = require('./firebase/admin');
const dotenv = require('dotenv').config()
const app = express();
const port = process.env.PORT;
require('./Utils/connectToDb')
require('./Auth/Passport')
require('./firebase/admin')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get('/', () => {
    sendNotification("eNgwjvvtS8WACZyejc2Opx:APA91bFSFQvgeQaiToetm4uxgf1yqCenJCcJEpdgmcI-Zk0c91J0jhA1bO2H7gwtK7tiTwWmhB6KMri0ByxBnss4duJ-aw2UCflol9f_fl0S7Ri_TCicUDg", "Hello", "This is a test notification")
})
// Set up session management
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000
    }
}));
// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

//Authentication
app.use('/auth', AuthRouter);
app.use(authenticateJWT)


// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});


app.get('/root', isLoggedin, (req, res) => {
    res.json(req.user)
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
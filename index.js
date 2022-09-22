const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const Keys = require('./config/keys');
const keys = require('./config/keys');

// called in right order!!
require('./models/user'); // don't return anything
require('./services/passport'); // don't return anything

mongoose.connect(Keys.mogoURI);

const app = express();
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());


require('./routes/authRoutes')(app); // require(js script and calls the app)

const PORT = process.env.PORT || 8081;
app.listen(PORT);
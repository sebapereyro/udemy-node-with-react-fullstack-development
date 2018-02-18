// common js module instead of ES2015 modules
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = process.env.ENV != 'prod' ? require('./config/keys') : null;
require('./models/user.js');
//const passportConfig = require('./services/passport');
require('./services/passport');

const authRoutes = require('./routes/authRoutes');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    // 30 days
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);

//read PORT env variable
const PORT = process.env.PORT || 5000;
app.listen(PORT);

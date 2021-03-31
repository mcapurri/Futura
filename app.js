// Gets access to environment variables/settings
require('dotenv/config');

// Connects to the database
require('./db');

const express = require('express');
const app = express();

// This function is getting exported from the config folder. It runs most middlewares
require('./config')(app);

// passport configuration
const User = require('./models/User');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// we serialize only the `_id` field of the user to keep the information stored minimum
passport.serializeUser((user, done) => {
    done(null, user._id);
});

// when we need the information for the user, the deserializeUser function is called with the id that we previously serialized to fetch the user from the database
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then((dbUser) => {
            done(null, dbUser);
        })
        .catch((err) => {
            done(err);
        });
});

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        (email, password, done) => {
            console.log('credentials', email, password);
            // login
            User.findOne({ email })
                .then((userFromDB) => {
                    if (!userFromDB) {
                        // there is no user with this username
                        done(null, false, { message: 'Wrong Credentials' });
                    } else if (
                        !bcrypt.compareSync(password, userFromDB.password)
                    ) {
                        // the password is not matching
                        done(null, false, { message: 'Wrong Credentials' });
                    } else {
                        // the userFromDB should now be logged in
                        done(null, userFromDB);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    )
);

app.use(passport.initialize());
app.use(passport.session());

// passport - github config
const GithubStrategy = require('passport-github').Strategy;
passport.use(
    new GithubStrategy(
        {
            clientID: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            callbackURL: 'http://127.0.0.1:3000/auth/github/callback',
        },
        (accessToken, refreshToken, profile, done) => {
            console.log('profile', profile);
            // find or create user
            User.findOne({ githubId: profile.id })
                .then((userFromDB) => {
                    if (userFromDB !== null) {
                        done(null, userFromDB);
                    } else {
                        User.create({
                            githubId: profile.id,
                            username: profile._json.login,
                            avatar: profile._json.avatar_url,
                        }).then((userFromDB) => {
                            done(null, userFromDB);
                        });
                    }
                })
                .catch((err) => {
                    done(err);
                });
        }
    )
);

// end of passport

// Routes
const allRoutes = require('./routes');
app.use('/api', allRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;

// Gets access to environment variables/settings
require('dotenv/config');

// Connects to the database
require('./db');

const express = require('express');
const app = express();

// This function is getting exported from the config folder. It runs most middlewares
require('./config')(app);

// session configuration
const session = require('express-session');
// // session store using mongo
const MongoStore = require('connect-mongo');

const mongoose = require('mongoose');

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        cookie: {
            SameSite: ' none',
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
        },
        saveUninitialized: false,
        resave: true,
        store: new MongoStore({
            mongooseConnection: mongoose.connection,
            mongoUrl: 'mongodb://localhost/recycling-app',
        }),
    })
);
// end of session configuration

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

// local config
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

// Passport JWT config
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    // issuer: 'accounts.examplesoft.com',
    // audience: 'yoursite.net',
};

passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
        User.findOne({ id: jwt_payload.sub })
            .then((err, user) => {
                console.log('userJWTstr', user);
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    console.log('user jwt', user);
                    return done(null, user);
                } else {
                    return done(null, false);
                    // or you could create a new account
                }
            })
            .catch((err) => console.log(err));
    })
);

app.use(passport.initialize());
// passport.authenticate('jwt', cfg.jwtSession);

// end of passport

// Socket.io
// const socketIo = require('socket.io');
// const http = require('http');
// const server = http.createServer(app);
// const io = socketIo(server, {
//     cors: {
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST'],
//         credentials: true,
//     },
// });

// io.on('connection', (socket) => {
//     const { id } = socket.client;
//     console.log(`User Connected: ${id}`);
//     socket.on('chat message', ({ nickname, msg }) => {
//         io.emit('chat message', { nickname, msg });
//     });
// });

// End Socket.io

// Routes
const allRoutes = require('./routes');
app.use('/api', allRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;

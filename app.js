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
        // cookie: {
        //     SameSite: 'none',
        //     Secure: true,
        //     httpOnly: true,
        //     maxAge: 1000 * 60 * 60 * 24,
        // },
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
                    } else {
                        bcrypt.compare(
                            password,
                            userFromDB.password,
                            function (err, valid) {
                                if (valid) {
                                    done(null, userFromDB);
                                } else {
                                    done(null, false, {
                                        message: 'Wrong Credentials',
                                    });
                                }
                            }
                        );
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
            .then((user) => {
                console.log('userJWTstr', user);
                // if (err) {
                //     return done(err, false);
                // }
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

const server = require('http').createServer();
const io = require('socket.io')(server, {
    cors: {
        // origin: 'http://localhost:3000',
        // methods: ['GET', 'POST'],
        // credentials: true,
        origin: '*',
    },
});
const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage';

io.on('connection', (socket) => {
    console.log(`Client ${socket.id} connected`);

    // Join a conversation
    const { roomId } = socket.handshake.query;
    socket.join(roomId);

    // Listen for new messages
    socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
        io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
    });

    // Leave the room if the user closes the socket
    socket.on('disconnect', () => {
        console.log(`Client ${socket.id} diconnected`);
        socket.leave(roomId);
    });
});

// End Socket.io

// Routes
const allRoutes = require('./routes');
app.use('/api', allRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;

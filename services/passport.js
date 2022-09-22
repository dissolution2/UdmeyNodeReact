const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const Keys = require('../config/keys');

const User = mongoose.model('users');

/** mongoose user.id / model / */
passport.serializeUser((user, done) =>{
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});


passport.use(
    new GoogleStrategy(
        {
        clientID: Keys.googleClientID,
        clientSecret: Keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        //proxy: true
        },
        (accessToken, refreshToken, profile, done) => {
            //console.log('accessToken', accessToken);
            //console.log('refresh token', refreshToken);
            //console.log('profile:', profile);

            User.findOne({ googleId: profile.id })
            .then((existingUser) => {
                if( existingUser){
                    // exist in db!!
                    done(null,existingUser);
                }else{
                    /* new record!!  Async */
                    new User({ googleId: profile.id })
                        .save()
                        .then(user => done(null, user));

                }
            });
        }
    )
);
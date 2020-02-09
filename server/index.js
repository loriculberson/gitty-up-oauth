const express = require("express");
const app = express();
const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy;
require('dotenv').config()

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(passport.initialize());
// app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: `${process.env.HOST}/auth/github/callback`
},
  function(accessToken, refreshToken, profile, done) {
    console.log('profile', profile)

    return done(null, profile)
  }
));

app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] })
);
 
app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/fail' }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log('req user', req.user)
    res.redirect('/');
  });

  app.get('/fail', (req, res) => {
    res.send("Failed attempt")
  })

app.listen(process.env.PORT || 3001, () => {
  console.log("Server started on: https://localhost:3001");
  console.log("Visit this URL for the client: https://localhost:3000");
});

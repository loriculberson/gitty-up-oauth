const express = require("express");
const app = express();
const path = require("path");
const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy;
const session = require('express-session');
require('dotenv').config()

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "client", "build")));
}

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

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
    const user = {
      displayName: profile.displayName,
      username: profile.username,
      image: profile._json.avatar_url
    } 
    return done(null, user)
  }
));

app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] })
);
 
app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/fail' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

  app.get('/current-user', (req, res) => {
    res.send(JSON.stringify({currentUser: req.user}))
  })

  app.get('/fail', (req, res) => {
    res.send("Failed attempt")
  })

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });
  

app.listen(process.env.PORT || 3001, () => {
  console.log("Server started on: https://localhost:3001");
  console.log("Visit this URL for the client: https://localhost:3000");
});

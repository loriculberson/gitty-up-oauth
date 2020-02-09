const express = require("express");
const app = express();
const passport = require('passport')

passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: "http://127.0.0.1:3000/auth/github/callback"
},
function(accessToken, refreshToken, profile, done) {
  User.findOrCreate({ githubId: profile.id }, function (err, user) {
    return done(err, user);
  });
}
));

app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));
 
app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.get('/foo.json', (req, res) => {
  res.header('Accept', 'application/json')
  res.send('{"hey":"there"}');
})

app.listen(process.env.PORT || 3001, () => {
  console.log("Server started on: https://localhost:3001");
  console.log("Visit this URL for the client: https://localhost:3000");
});

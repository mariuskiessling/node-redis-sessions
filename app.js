var express    = require('express');
var session    = require('express-session');
var redis      = require("redis");
var RedisStore = require('connect-redis')(session);
var app        = express();

app.use(express.urlencoded());

app.use(session({
  store: new RedisStore({
    host: '127.0.0.1',
    port: 6379,
  }),
  secret: '•ᴗ•',
  resave: true, // Don't force a reforce on unmodified sessions
  saveUninitialized: true // Don't store sessions that are unmodified
}));

app.get('/', function (req, res) {
  if(req.session.name) {
    res.send(`
      <h1>Hello, ${req.session.name}!</h1>
      <a href="/logout">Logout</a>
    `);
  } else {
    res.send(`
      <form method="POST" action="/login">
        <input type="text" placeholder="Your name" name="name" required>
        <input type="submit" value="Login">
      </form>
    `);
  }
});

app.post('/login', function (req, res) {
  req.session.name = req.body.name;
  res.redirect('/');
});

app.get('/logout', function(req, res) {
  req.session.destroy();
  res.redirect('/');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

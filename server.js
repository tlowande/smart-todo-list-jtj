// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const cookieSession = require('cookie-session');
const { isUserLogged } = require('./helpers/middleRouter');

// PG database client/connection setup
const { db } = require('./db/index');
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

app.use(isUserLogged);
// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const loginRoutes = require('./routes/login');
const logoutRoutes = require('./routes/logout');
const tasksRoutes = require('./routes/tasks');
const registerRoutes = require('./routes/register');
const updateRoutes = require('./routes/update');
const updateProfile = require('./routes/update_profile');


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use('/login', loginRoutes());
app.use('/logout', logoutRoutes());
app.use('/tasks', tasksRoutes());
app.use('/register', registerRoutes());
app.use('/update', updateRoutes(db));
app.use('/update_profile', updateProfile(db));
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.redirect('/login');
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

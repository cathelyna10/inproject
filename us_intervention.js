
//platform set up on the top!
const express = require('express')
const { credentials } = require('./config')
const expressSession = require('express-session')
const csrf = require('csurf')
//proper form handling
//const booksUsersRouter = require('./routes/books_users');

const path = require('path');

const bodyParser = require('body-parser')

// ./ means from where i am rn, go to there. 
const indexRouter = require('./routes/index');
const us_actionsRouter = require('./routes/us_actions');
const eventsRouter = require('./routes/events');
const countriesRouter = require('./routes/countries');
const individualsRouter = require('./routes/individuals');

//const usersRouter = require('./routes/users');
//const commentsRouter = require('./routes/comments');

const app = express()
const port = 3000
const cookieParser = require('cookie-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser(credentials.cookieSecret));
app.use(expressSession({
  secret: credentials.cookieSecret,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}));

//flash message
app.use((req, res, next) => {
  res.locals.flash = req.session.flash
  delete req.session.flash
  next()
})
//to show the current session's user
app.use((req, res, next) => {
  res.locals.currentUser = req.session.currentUser
  next()
})

var handlebars = require('express-handlebars').create({
  helpers: {
    eq: (v1, v2) => v1 == v2,
    ne: (v1, v2) => v1 != v2,
    lt: (v1, v2) => v1 < v2,
    gt: (v1, v2) => v1 > v2,
    lte: (v1, v2) => v1 <= v2,
    gte: (v1, v2) => v1 >= v2,
    and() {
        return Array.prototype.every.call(arguments, Boolean);
    },
    or() {
        return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
    },
    someId: (arr, id) => arr && arr.some(obj => obj.id == id),
    in: (arr, obj) => arr && arr.some(val => val == obj),
    dateStr: (v) => v && v.toLocaleDateString("en-US")
  }
});


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', indexRouter);
app.use('/us_actions', us_actionsRouter);
app.use('/events', eventsRouter);
app.use('/countries', countriesRouter);
app.use('/individuals', individualsRouter);
//app.use('/users', usersRouter);
//app.use('/books_users', booksUsersRouter);
//app.use('/comments', commentsRouter);
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')))



//test

// express has a router. thats why were gonna name the folder 'routes'

// custom 404 page
app.use((req, res) => {
  res.status(404)
  res.send('<h1>404 - oopsies Not Found<h1>')
})
// custom 500 page

app.use((err, req, res, next) => {
  console.error(err.message)
  res.type('text/plain')
  res.status(500)
  res.send('500 - Server Error')
})

app.listen(port, () => console.log(
`Express started on http://localhost:${port}; ` +
`press Ctrl-C to terminate.`))

app.use(csrf({ cookie: true }))
app.use((req, res, next) => {
  res.locals._csrfToken = req.csrfToken()
  next()
})


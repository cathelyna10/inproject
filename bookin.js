
//platform set up on the top!
const express = require('express')
//proper form handling

var handlebars = require('express-handlebars').create();
const bodyParser = require('body-parser')
// ./ means from where i am rn, go to there. .means where i
const indexRouter = require('./routes/index');
const authorsRouter = require('./routes/authors');
const booksRouter = require('./routes/books');

const app = express()
const port = 3000

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', indexRouter);
app.use('/authors', authorsRouter);
app.use('/books', booksRouter);





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


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

require('dotenv').config({ path: __dirname + '/.env' })

const PORT = process.env.PORT || 5000 // So we can run on heroku || (OR) localhost:5000

const app = express();
const store = new MongoDBStore({
  uri: process.env.MONGODB_URL,
  collection: 'sessions'
});

const routes = require('./routes')
const User = require('./models/project-models/project-01/user');

app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .use(bodyParser({ extended: false })) // For parsing the body of a POST
  .use(
    session({
      secret: 'my secret',
      resave: false,
      saveUninitialized: false,
      store: store
    })
  )
  .use('/', routes);
// .listen(PORT, () => console.log(`Listening on ${PORT}`));

const corsOptions = {
  origin: "https://nameless-reaches-04389.herokuapp.com/",
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  family: 4
};

const MONGODB_URL = process.env.MONGODB_URL;

mongoose
  .connect(
    MONGODB_URL, options
  )
  .then(result => {
    console.log(" * Connected to Database: ", result.connections[0].name)

    User.findOne().then(
      user => {
        if (!user) {
          const user = new User({
            name: 'Chandler Childs',
            email: 'rubberband75@gmail.com',
            cart: {
              items: []
            }
          });
          user.save();
        }
      }
    )

    app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
  })
  .catch(err => {
    console.log(err);
  });
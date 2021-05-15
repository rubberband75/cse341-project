const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5001 // So we can run on heroku || (OR) localhost:5000

const app = express();
const routes = require('./routes')

app.use(express.static(path.join(__dirname, 'public')))
   .set('views', path.join(__dirname, 'views'))
   .set('view engine', 'ejs')
   .use(bodyParser({ extended: false })) // For parsing the body of a POST
   .use('/', routes)
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

const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://node_client:PpXbxTbztitZrsxWoz09BC5R3he74JKo@cluster0.ckbll.mongodb.net/project01?retryWrites=true&w=majority";

mongoose
  .connect(
    MONGODB_URL, options
  )
  .then(result => {
    // This should be your user handling code implement following the course videos
    console.log(" * Connected to Database: ", result.connections[0].name)
    app.listen(PORT);
  })
  .catch(err => {
    console.log(err);
  });
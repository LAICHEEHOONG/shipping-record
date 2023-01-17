

const express = require('express');
const app = express();
const path = require('path');
const cookieParse = require('cookie-parser');

const mongoose = require('mongoose');
require('dotenv').config();
const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_COLLECTION}?retryWrites=true&w=majority`;


const passwordRoute = require('./api/password');
const loginRoute = require('./api/login');
const deliveryRoute = require('./api/delivery');

mongoose.connect(mongoUri);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParse());

app.use('/api/password', passwordRoute);
app.use('/api/login', loginRoute);
app.use('/api/delivery', deliveryRoute);


app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '/build/index.html'), function (err) {
    if (err) {
      res.status(404).sendFile(path.join(__dirname, '/view/index.html'));
    }
  });
})


// app.use(express.static('client/build'));

// if (process.env.NODE_ENV === 'production') {
//     app.get('/*', function (req, res) {
//       res.sendFile(path.join(__dirname, '../client/build/index.html'), function (err) {
//         if (err) {
//           res.status(500).send(err)
//         }
//       });
//     })
//   }


const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Connected port: ${port}`)
})

//rm -rf .git // cd client

//heroku login
//git add .
//git commit -am ""
//git push heroku master

//username: laicheehoong
//password: deliveryRecord
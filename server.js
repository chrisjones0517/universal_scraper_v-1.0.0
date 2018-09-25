// const Nightmare = require('nightmare');
// const nightmare = Nightmare({ 
//   show: true,
//   executionTimeout: 20000,
//   waitTimeout: 20000,
//   gotoTimeout: 20000,
//   loadTimeout: 20000 
// });
const DeathByCaptcha = require("deathbycaptcha");
const fs = require('fs');
const express = require('express')
const app = express()
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

const dbc = new DeathByCaptcha(process.env.DBC_USERNAME, process.env.DBC_PASSWORD);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

let numAttempts = 0;



app.post('/post', (req, res) => {
  console.log('post ran');
  numAttempts = 0;
  runNightmare(req.body.first, req.body.last, (data) => {
    if (numAttempts < 4) {
      res.send(data);
    } else {
      console.log('bad request error was sent');
      res.sendStatus(400);
    }
  });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

function runNightmare(first, last, cb) {
  const Nightmare = require('nightmare');
  const nightmare = Nightmare({
    show: false,
    executionTimeout: 20000, //20000
    waitTimeout: 5000, //2000
    gotoTimeout: 20000, //20000
    loadTimeout: 20000 //20000
  });
  console.log('nightmare function ran');
  console.log(first, last);
  nightmare
    .goto('https://nmbn.boardsofnursing.org/licenselookup')
    .scrollTo(300, 0)
    .screenshot('image.jpg')
    .then(() => {
      dbc.solve(fs.readFileSync('./image.jpg'), function (err, id, solution) {
        console.log(solution);
        if (err) return console.error(err); // onoes!
        if (solution !== "moo") {
          // It was wrong!
          dbc.report(id, function (err) {
            if (err) {
              return console.error(err); // ONOES!
            }
          });
        }
        nightmare
          .type('#CaptchaCode', solution)
          .type('#grpLastName > input', last)
          .type('#grpFirstName > input', first)
          .select('#LicenseSearch_NameSearchInput_LicenseTypeId', [value = "2"])
          .click('#btnNameSearch')
          .wait('#dvResults')
          .evaluate(() => {
            return document.querySelector('.search-results').innerHTML;
          })
          .end((data) => {
            cb(data);
          })
          .catch(error => {
            console.error('Action failed:', error);
            numAttempts++;
            console.log(numAttempts);
            if (numAttempts < 4) {
              runNightmare(first, last, cb);
            }
          })
      });
    })
    .then((data) => {
      if (data) {
        console.log('data was returned');
      }
    })
    .catch(error => {
      numAttempts++;
      console.error('Search failed:', error);
      console.log(numAttempts);
      if (numAttempts < 4) {
        runNightmare(first, last, cb);
      }
    });
}


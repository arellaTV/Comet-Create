var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
var port = process.env.PORT || 3000;

app.use('/', express.static(`${__dirname}/../public`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', router);

router.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

var tempStorage = [
  {i: 'a', x: 0, y: 0, w: 8, h: 4, maxW: 8, maxH: 8},
  {i: 'b', x: 0, y: 4, w: 4, h: 4, maxW: 8, maxH: 8},
  {i: 'c', x: 4, y: 4, w: 4, h: 4, maxW: 8, maxH: 8},
];

router.route('/page')
  .get((req, res) => {
    console.log('getting');
    res.json(tempStorage)
  })
  .post((req, res) => {
    console.log('posting');
    let layout = req.body.layout;
    tempStorage = layout;
    console.log(tempStorage);
    res.json(tempStorage);
  });

app.listen(port, () => {
  console.log('Currently listening on port:', port);
})

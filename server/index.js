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
  var date = new Date();
  var currentTime = `${date.getHours() + 1}:${date.getMinutes() + 1}:${date.getSeconds() + 1}`;
  console.log('Time:', currentTime);
  next();
});

var tempStorage = [
  {i: 'a', x: 0, y: 0, w: 8, h: 4, maxW: 8, maxH: 8},
  {i: 'b', x: 0, y: 4, w: 4, h: 4, maxW: 8, maxH: 8},
  {i: 'c', x: 4, y: 4, w: 4, h: 4, maxW: 8, maxH: 8},
];

var imageStorage = {
  a: {
    src: 'http://blog.spoongraphics.co.uk/wp-content/uploads/2016/sketch-effect/sketch-effect-sm-cropped.jpg',
    style: {
      width: '100%',
      margin: 'auto auto'
    }
  }
}

router.route('/page')
  .get((req, res) => {
    console.log('getting');
    var responseObj = {
      layout: tempStorage,
      images: imageStorage
    }
    res.json(responseObj)
  })
  .post((req, res) => {
    console.log('posting');
    let layout = req.body.layout;
    let images = req.body.images;
    tempStorage = layout;
    imageStorage = images;
    res.json({
      layout: tempStorage,
      images: imageStorage
    });
  });

app.listen(port, () => {
  console.log('Currently listening on port:', port);
})

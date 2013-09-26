/*
 * GET home page.
 */
var request = require('request'),
    gm = require('gm'),
    imageMagick = gm.subClass({imageMagick: true}),
    hands = {
      'hand': {
        src: 'hands/hand.png',
        gravity: 'SouthWest'
      },
      'pinch-1': {
        src: 'hands/pinch-1.png',
        gravity: 'SouthEast'
      },
      'pinch-2': {
        src: 'hands/pinch-2.png',
        gravity: 'East'
      },
      'point': {
        src: 'hands/pinch-2.png',
        gravity: 'South'
      }
    };

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.hand = function(req, res, next){
  var source_url = req.query.src;
  var user_hand = req.query.hand;
  var hand = hands['hand'];

  if(user_hand && hands.hasOwnProperty(user_hand)){
    hand = hands[user_hand];
  }

  imageMagick(request(source_url)).size(function(err, size){
    var resize = size.height + 'x' + size.width;

    imageMagick(request(source_url))
      .gravity(hand.gravity)
      .out('(', hand.src, ' ', '-resize', resize, ')')
      .out('-composite')
      .stream('png', function (err, stdout) {
        if (err) return next(err);
        res.setHeader('Expires', new Date(Date.now() + 604800000));
        res.setHeader('Content-Type', 'image/png');
        stdout.pipe(res);
      });
  });
};


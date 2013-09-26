var request = require('request'),
    gm = require('gm'),
    imageMagick = gm.subClass({imageMagick: true});

var hands = {
    'hand': {
      path: 'hands/hand.png',
      gravity: 'SouthWest'
    },
    'pinch-1': {
      path: 'hands/pinch-1.png',
      gravity: 'SouthEast'
    },
    'pinch-2': {
      path: 'hands/pinch-2.png',
      gravity: 'East'
    },
    'point': {
      path: 'hands/pinch-2.png',
      gravity: 'South'
    }
  };

var defaultHand = 'hand';

imageMagick.prototype.overlayHand = function(hand, resize) {
  return this.gravity(hand.gravity)
    .out('(', hand.path, ' ', '-resize', resize, ')')
    .out('-composite');
}

/*
 * GET /hand
 *  params:
 *    url:      source image
 *    [type]:   type of hand (default: 'hand')
 */
exports.hand = function(req, res, next){
  var sourceUrl = req.query.url;
  var handType = req.query.type;
  var hand = hands[defaultHand];

  if(handType && hands.hasOwnProperty(handType)){
    hand = hands[handType];
  }

  // TODO: fix the double request nonsense
  imageMagick(request(sourceUrl)).size(function(err, size){
    var resize = size.width + 'x' + size.height + '^';
    if (err) return next(err);

    imageMagick(request(sourceUrl))
      .overlayHand(hand, resize)
      .stream('png', function (err, stdout) {
        if (err) return next(err);
        res.setHeader('Expires', new Date(Date.now() + 604800000));
        res.setHeader('Content-Type', 'image/png');
        stdout.pipe(res);
      });
  });
};


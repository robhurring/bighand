var request = require('request'),
    gm = require('gm'),
    imageMagick = gm.subClass({imageMagick: true});

var hands = {
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

var defaultHand = 'hand';

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
    var resize = size.height + 'x' + size.width;
    if (err) return next(err);

    imageMagick(request(sourceUrl))
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


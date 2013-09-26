var request = require('request'),
    config = require('../config'),
    gm = require('gm'),
    imageMagick = gm.subClass({imageMagick: true});

var hands = config.hands;
var defaultHand = config.defaultHandType;

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

  if(!sourceUrl) {
    return res.render('index', {hands: hands});
  }

  if(handType && hands.hasOwnProperty(handType)){
    hand = hands[handType];
  }

  // TODO: fix the double request nonsense
  imageMagick(request(sourceUrl)).size(function(err, size){
    if (err) return next(err);
    var resizeTo = hand.size(size.width, size.height);

    imageMagick(request(sourceUrl))
      .overlayHand(hand, resizeTo)
      .stream('png', function (err, stdout) {
        if (err) return next(err);
        res.setHeader('Expires', new Date(Date.now() + 604800000));
        res.setHeader('Content-Type', 'image/png');
        stdout.pipe(res);
      });
  });
};


module.exports = {
  hands: {
    'hand': {
      description: 'Just a hand',
      path: 'hands/hand.png',
      gravity: 'SouthWest',
      size: function(width, height) {
        return width + 'x' + height + '^';
      }
    },
    'pinch-1': {
      description: 'Pinchy pinchy!',
      path: 'hands/pinch-1.png',
      gravity: 'SouthEast',
      size: function(width, height) {
        return width + 'x' + height + '>';
      }
    },
    'pinch-2': {
      description: 'Another pinchy',
      path: 'hands/pinch-2.png',
      gravity: 'East',
      size: function(width, height) {
        return width + 'x' + height + '^';
      }
    },
    'point': {
      description: 'To the point',
      path: 'hands/point.png',
      gravity: 'South',
      size: function(width, height) {
        return width + 'x' + height + '>';
      }
    },
    'thumbs': {
      description: 'An approved hand',
      path: 'hands/thumbs-up.png',
      gravity: 'SouthWest',
      size: function(width, height) {
        return width + 'x' + height + '>';
      }
    },
    'reach': {
      description: 'Almost there!',
      path: 'hands/reach.png',
      gravity: 'South',
      size: function(width, height) {
        return width + 'x' + height + '>';
      }
    },
    'scratch': {
      description: 'Scratching',
      path: 'hands/scratch.png',
      gravity: 'South',
      size: function(width, height) {
        return width + 'x' + height + '>';
      }
    }
  },

  defaultHandType: 'hand'
};

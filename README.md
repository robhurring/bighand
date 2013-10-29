# Everyone loves a giant hand, right?

So, heres an app that will overlay a giant hand on any image URL you pass it. Who can't find a way to incorporate this into their daily workflow? 

* Someone send you an image? Wish it had a giant hand on top of it? Use this app.
* Boring vacation photos? Spice them up with a giant hand!
* Stock art has watermarks? Fuck that, put a hand over it as well.

## Who is this for?

This was written as an inside joke, but may still be useful for people looking how to do overlays on a platform like heroku (with no file system access).

Also, if you are curious how to do image overlays on a platform like heroku (or anywhere without writing temp files) this may provide some insight. This is not the best piece of code you will find, but it may point you in the right direction or get you started.

## Ok, I'll bite. How can I run this?

To get this baddie running locally:

1. fork
2. npm install
3. npm start

### Adding extra overlays

If big hands aren't your thing, you can modify this to overlay other types of interesting things. Just find some images with a transparent background and follow these steps:

1. Add your image to `hands` directory
2. Add your new image to the `config.js` hands dict

```javascript
'my-new-hand': {
  description: 'Just another really badass hand photo',
  // this is where you put your awesome new photo
  path: 'hands/your-new-hand.png', 
  // where to place the overlay on the photo
  gravity: 'SouthWest', 
  // a small function to set the sizing for your hand photo. the height and width params
  // are of the source image so you can dynamically re-size your overlay according to the
  // source's dimensions
  size: function(width, height) {
    return width + 'x' + height + '^';
  }
}
```
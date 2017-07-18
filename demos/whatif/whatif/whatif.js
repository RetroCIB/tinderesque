(function(){

  var all = 0;

  document.body.addEventListener('yepcard', function(ev) {
  });

  document.body.addEventListener('nopecard', function(ev) {
  });

  document.body.addEventListener('deckempty', function(ev) {
    seedlist();
  });

  window.addEventListener('load', function(ev) {
    seedlist();
  });

  var c = document.querySelector('canvas');
  var cx = c.getContext('2d');
  c.width = 250;
  c.height = 300;
  c.hasimg = false;
  var currentthumbone = null;
  var currentthumbtwo = null;

  function seedlist() {
    var tinderlist = document.querySelector('.cardlist');
    var firstthumbs = document.querySelectorAll('.thumbs-one img');
    var secondthumbs = document.querySelectorAll('.thumbs-two img');
    var all = firstthumbs.length;
    var out = '';
    for (var i = 0; i < all; i++) {
      out += '<li class="';
      out += (i > 0) ? 'card' : 'card current';
      out += '"><img src="' + miximages(firstthumbs[i], secondthumbs[i]) + '" alt=""></li>';
    }
    tinderlist.innerHTML = out;
  }

  function miximages(img1, img2) {
    cx.clearRect(0, 0, 250, 300);
    cx.drawImage(img1, 0, 0, 250, 300);
    cx.drawImage(img2, 0, 150, 250, 300);
    watermark();
    return c.toDataURL("image/jpeg", 0.5);
  }

  function addtocanvas(img, clear) {
    if (img.tagName === 'IMG') {
      if (clear) {
        cx.clearRect(0, 0, 250, 300);
      }
      var y = clear ? 0 : 150;
      cx.drawImage(img, 0, y, 250, 300);
      if (!clear) {
        watermark();
      }
    }
  }
  function watermark() {
    cx.fillStyle = 'rgba(0,0,0,0.6)';
    cx.fillRect(0, 270, 250, 300);
    cx.fillStyle = '#fff';
    cx.font = '14pt Calibri';
    cx.fillText("what-if.net", 5, 290);    //cx.strokeText("#whatif", 180, 290);
    cx.fillText("#whatif", 180, 290);
  }

  var tinderswipe = new Hammer(document.querySelector('.cardcontainer'));
  tinderswipe.on('swipeleft', function(ev) {
    document.querySelector('.but-nope').click();
  });
  tinderswipe.on('swiperight', function(ev) {
    document.querySelector('.but-yay').click();
  });

  var thumbstapone = new Hammer(document.querySelector('.thumbs-one'));
  thumbstapone.on('tap', function(ev) {
    addtocanvas(ev.target, 1);
    if (currentthumbone) {
      currentthumbone.classList.remove('current');
    }
    currentthumbone = ev.target;
    ev.target.classList.add('current');
  });

  if (document.querySelector('.build')) {
    var buildtap = new Hammer(document.querySelector('.build'));
    buildtap.on('tap', function(ev) {
      document.body.classList.toggle('tweak');
    });
  }

  var thumbstaptwo = new Hammer(document.querySelector('.thumbs-two'));
  thumbstaptwo.on('tap', function(ev) {
    addtocanvas(ev.target);
    if (currentthumbtwo) {
      currentthumbtwo.classList.remove('current');
    }
    currentthumbtwo = ev.target;
    ev.target.classList.add('current');
  });

})();

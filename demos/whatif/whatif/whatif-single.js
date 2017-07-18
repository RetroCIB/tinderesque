(function(){

  var all = 0;
  var cardcontainer = document.querySelector('.cardcontainer');

  tinderesque.yepcard = function(detail) {
    liked(detail);
  }
  tinderesque.nopecard = function(detail) {
    disliked(detail);
  }

  window.addEventListener('yepcard', function(ev) {
    liked(ev.detail);
  });

  window.addEventListener('nopecard', function(ev) {
    disliked(ev.detail);
  });


  document.forms[0].addEventListener('submit', function(ev) {
    ev.preventDefault();
    seedlist();
    document.body.classList.add('sent');
  });

  document.querySelector('#demos').addEventListener('click', function(ev) {
    ev.preventDefault();
    if (ev.target.tagName === 'A') {
      document.querySelector('#request').value = ev.target.innerHTML;
    seedlist();
    document.body.classList.add('sent');
    }
  });

  window.addEventListener('load', function(ev) {
    document.body.classList.add('loaded');
  });

  function liked(detail) {
    console.log(detail);
  }
  function disliked(detail) {

  }



  var img = document.querySelector('.card img');
  var c = document.querySelector('canvas');
  var cx = c.getContext('2d');
  c.width = 400;
  c.height = 225;
  c.hasimg = false;
  var currentthumbone = null;
  var currentthumbtwo = null;

  function seedlist() {
    var listitems = document.querySelectorAll('.cardlist .card');
    var all = listitems.length;
    while (all--) {
      var img = listitems[all].querySelector('img');
      c.width = img.offsetWidth;
      c.height = img.offsetHeight;
      watermark(img, c.width, c.height)
    }
  }

  function watermark(img, x, y) {
    var c = document.createElement('canvas');
    cx = c.getContext('2d');
    c.width = x;
    c.height = y;
    cx.drawImage(img, 0, 0, x, y);
    cx.fillStyle = 'rgba(0,0,0,0.6)';
    cx.fillRect(0, y-25, x, y-25);
    cx.fillStyle = '#fff';
    cx.font = '14pt Calibri';
    cx.fillText("what-if.net", 5, y - 8);
    cx.fillText("#whatif", x - 65, y - 8);
    img.src = c.toDataURL('image/jpeg', 1);
    var link = document.createElement('a');
    link.href = c.toDataURL('image/jpeg', 1);
    link.download = 'whatif.jpg';
    img.parentNode.insertBefore(link, img);
    link.appendChild(img);
  }

  var tinderswipe = new Hammer(document.querySelector('#showimage'));
  tinderswipe.on('swipeleft', function(ev) {
    document.querySelector('.but-nope').click();
  });
  tinderswipe.on('swiperight', function(ev) {
    document.querySelector('.but-yay').click();
  });
  tinderswipe.on('swipeup', function(ev) {
    share();
  });

  document.querySelector('.but-share').addEventListener('click', function(ev) {
    share();
  });


  function share() {
    alert('sharing is caring');
  }

  /* video stuff */
  document.querySelector('#simplecamshot').
    addEventListener('click',function(ev) {
    var t = ev.target;
    if (t.tagName === 'IMG') {
      ev.target.style.display = 'none';
    }
  });
  document.querySelector('button.done').
    addEventListener('click',function(ev) {
      document.querySelector('#simplecamshot button').click();
      document.querySelector('#getcamera').style.display = 'none';
      // TODO: image upload
  });
  document.querySelector('#simplecamshot').
    addEventListener('imagetaken',function(ev) {
      document.querySelector('button.done').style.opacity = 1;  });
      simplecamshot.config.width = 320;
      simplecamshot.init(document.querySelector('#simplecamshot'));
})();

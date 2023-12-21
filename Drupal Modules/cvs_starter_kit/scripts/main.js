//import Main Sass file for webpack compilation
import "../style/style.scss"

//Import JS
import "./accessible_forms.js"

(function ($, Drupal) {
  $(document).ready(function () {
    //adjust header if toolbar is there.
    if ($('#toolbar-administration').length) {
      $('header').addClass('header-with-toolbar');
    }

    // SKip to main nav link functionality

    // Find if an h1 exists and if so, give it the ID and tabindex
    if($('main').find('h1').length){
      if ($('main h1 a').length) {
        $('main h1 a').first().attr('id','main-content-title').attr('tabindex',0);
      } else {
        $('main h1').first().attr('id','main-content-title').attr('tabindex',-1);
      }
    }
    // Else if h1 DNE, find if an h2 exists and if so, give it the ID and tabindex
    else if($('main').find('h2').length) {
      if ($('main h2 a').length) {
        $('main h2 a').first().attr('id','main-content-title').attr('tabindex',0);
      } else {
        $('main h2').first().attr('id','main-content-title').attr('tabindex',-1);
      }
    }
    else {
      return;
    }

    $('#skip-link-container a').click(function(event) {
      event.preventDefault();
      setVoiceOverFocus($('#main-content-title'));
        
      if ($('#main-content-title')[0].tagName != 'A') {
        $('#main-content-title').attr('tabindex', '-1');
      }
    });

    $('#skip-link-container a').on("keydown", function(event) {
      if(event.keyCode == 32 || event.keyCode == 13){
        event.preventDefault();
        $('#skip-link-container a').trigger('click');
        setVoiceOverFocus($('#main-content-title'));
        
        if ($('#main-content-title')[0].tagName != 'A') {
          $('#main-content-title').attr('tabindex', '-1');
        }
      }
    });

    //Add video play/pause functionality.
    var iframes = $('iframe');

    iframes.each(function() {
      var iframe_src = $(this).attr('src').slice(0, 24);
      if (iframe_src == 'https://player.vimeo.com') {
        var player = new Vimeo.Player(this),
          controls = $(this).siblings('.controls'),
          play_btn = controls.children('.controls-play'),
          pause_btn = controls.children('.controls-pause');

          pause_btn.show();

        controls.on('click', function(e) {
          e.preventDefault();
          player.getPaused().then(function(paused) {
            if (paused) {
              player.play();
              pause_btn.show();
              play_btn.hide();
            } else {
              player.pause();
              play_btn.show();
              pause_btn.hide();
            }
          });
        });
      }
    });

    /* Function that shifts focus for both tabindex and voiceover. */
    var setVoiceOverFocus = function(element) {
      var focusInterval = 10; // ms, time between function calls
      var focusTotalRepetitions = 10; // number of repetitions

      element.attr('tabindex', '0');
      element.blur();

      var focusRepetitions = 0;
      var interval = window.setInterval(function() {
        element.focus();
        focusRepetitions++;
        if (focusRepetitions >= focusTotalRepetitions) {
          window.clearInterval(interval);
        }
      }, focusInterval);
    };
  });
})(window.jQuery, window.Drupal);
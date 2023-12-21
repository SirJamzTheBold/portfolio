window.onload = function () {
  $("#loading-message")
    .delay(2000)
    .fadeOut("fast", function () {
      var hashtag = window.location.href.split("#")[1];
      if (hashtag == "360") {
        $("#scroll-down").trigger("click");
      }
    });
};

$(document).ready(function () {
  var $particles = $("#particles"),
    frame = {},
    content = { start: 0 },
    count = 100,
    min_particle_size = 4,
    max_particle_size = 120,
    particle_distribution_pow = 9,
    particles = [],
    max_y = frame.height,
    scroll_top = window.scrollY,
    header_fixed = false,
    light_opacity1 = 0.6,
    light_opacity2 = 0.6,
    light_opacity3 = 0.6,
    toolbar_offset = $("#toolbar").length ? 60 : 0,
    /**
     * Adjusts the opacity of the Mask as you scroll down.
     *
     * @return void
     */
    updateMask = function () {
      $("#sea-mask").css({ opacity: "" + (0.1 + (0.4 / 3000) * scroll_top) });
    },
    /**
     * Adjusts the header as you scroll down.
     *
     * @return void
     */
    updateHeader = function () {
      scroll_top = window.scrollY;

      if (scroll_top > 280 && !header_fixed) {
        $("#header").addClass("header-fixed");
        header_fixed = true;
        $(".header-container").fadeOut();
      }

      if (scroll_top <= 280 && header_fixed) {
        $("#header").removeClass("header-fixed");
        header_fixed = false;
        $(".header-container").show();
      }

      if (!header_fixed) {
        $("#header").css({
          "font-size": 46 - (23 / 315) * scroll_top + "px",
          width: 35 - (20 / 315) * scroll_top + "%",
          padding: "20px " + (0 + (2.5 / 315) * scroll_top) + "%",
          top: "300px",
          left: "" + (32.5 + (7.5 / 315) * scroll_top) + "%",
          position: "absolute",
        });
      }

      if (header_fixed) {
        $("#header").css({
          position: "fixed",
          "font-size": "23px",
          padding: "20px 2.5%",
          width: "15%",
          top: "" + (20 + toolbar_offset) + "px",
          left: "40%",
        });
      }
    },
    /**
     * Updates the dimensions of the page.
     *
     * @return void
     */
    updateDimensions = function () {
      frame.width = document.documentElement.offsetWidth;
      frame.height = document.documentElement.offsetHeight;
      max_y = frame.height;
    },
    /**
     * Create the particles that float in front of the screen.
     *
     * @return void
     */
    generateParticles = function () {
      particles.length = 0;

      var elements = [],
        $el,
        zoom,
        size,
        x,
        y,
        zIndex;

      // Particles
      for (var i = 0; i < count; i++) {
        $el = $("<li/>");
        zoom = Math.pow(Math.random(), particle_distribution_pow) * 0.99 + 0.01;
        size = Math.max(min_particle_size, max_particle_size * zoom);

        x = Math.random() * (frame.width - size);
        y = Math.random() * (max_y - size) - zoom;
        zIndex = Math.round(zoom * 100);

        // Adjust dot size
        $el
          .css({
            width: Math.round(size),
            height: Math.round(size),
            zIndex: zIndex,
            opacity: 1 - zoom,
            left: Math.round(x),
            top: Math.round(y),
          })
          .attr(
            "data-scrollax",
            "properties: { 'translateY': '" + (zIndex - zIndex * 50) + "px' }"
          );

        // Add to particles
        elements.push($el[0]);
      }

      $particles.empty().append(elements);
    },
    /**
     * Update the flickering lights.
     *
     * @see updateLight()
     * @see updateLights()
     * @return void
     */
    updateLights = function () {
      updateLight("#light-mask1", light_opacity1);
      updateLight("#light-mask2", light_opacity2);
      updateLight("#light-mask3", light_opacity3);

      setTimeout(function () {
        updateLights();
      }, 1000);
    },
    /**
     * Changes the opacity of a particular light randomly.
     *
     * @var string div_id The ID of the div being animated.
     * @var int light_opacity The current opacity of the light.
     * @return void
     */
    updateLight = function (div_id, light_opacity) {
      var increase_decrease = Math.round(Math.random()),
        new_opacity = Math.random() * 0.5;

      if (increase_decrease == 1) {
        new_opacity = new_opacity * -1;
      }

      light_opacity += new_opacity;

      if (light_opacity >= 0.8) {
        light_opacity = 0.8;
      } else if (light_opacity <= 0.3) {
        light_opacity = 0.3;
      }

      $(div_id).fadeTo(750, light_opacity);
    };

  updateLights();

  const seaMask = basicScroll.create({
    elem: document.querySelector("#sea-mask"),
    from: 0,
    to: 4000,
    props: {
      "--sea-mask-opacity": {
        from: 0.1,
        to: 0.5,
      },
    },
  });

  seaMask.start();

  const turtle = basicScroll.create({
    elem: document.querySelector("#turtle"),
    from: 2000,
    to: 4000,
    props: {
      "--turtle-left": {
        from: "25%",
        to: "60%",
      },
      "--turtle-top": {
        from: "3400px",
        to: "3000px",
      },
    },
  });

  turtle.start();

  const butterfly = basicScroll.create({
    elem: document.querySelector("#lg_butterfly"),
    from: 0,
    to: 1500,
    props: {
      "--lg-butterfly-left": {
        from: "20%",
        to: "80%",
      },
      "--med-butterfly-bottom-left": {
        from: "-10%",
        to: "40%",
      },
      "--med-butterfly-left": {
        from: "-2%",
        to: "48%",
      },
      "--sm-butterfly-left": {
        from: "20%",
        to: "50%",
      },
      "--xs-butterfly-left": {
        from: "35%",
        to: "55%",
      },
    },
  });

  butterfly.start();

  const diver = basicScroll.create({
    elem: document.querySelector("#diver"),
    from: 200,
    to: 2800,
    props: {
      "--diver-left": {
        from: "-25%",
        to: "30%",
      },
      "--diver-top": {
        from: "1400px",
        to: "2200px",
      },
      "--diver-opacity": {
        from: 1,
        to: 0.75,
      },
      "--diver-width": {
        from: "100%",
        to: "75%",
      },
    },
  });

  diver.start();

  const diverSmall = basicScroll.create({
    elem: document.querySelector("#diver_small"),
    from: 1500,
    to: 4000,
    props: {
      "--diver-sm-right": {
        from: "-25%",
        to: "0%",
      },
      "--diver-sm-top": {
        from: "3050px",
        to: "3350px",
      },
    },
  });

  diverSmall.start();

  const parrotFish = basicScroll.create({
    elem: document.querySelector("#parrotfish"),
    from: 1800,
    to: 3500,
    props: {
      "--parrotfish-left": {
        from: "-25%",
        to: "50%",
      },
    },
  });

  parrotFish.start();

  const shark = basicScroll.create({
    elem: document.querySelector("#shark"),
    from: 1800,
    to: 4000,
    props: {
      "--shark-left": {
        from: "-10%",
        to: "50%",
      },
    },
  });

  shark.start();

  const angelFish = basicScroll.create({
    elem: document.querySelector("lg_angelfish"),
    from: 0,
    to: 1800,
    props: {
      "--lg-angelfish-right": {
        from: "-25%",
        to: "35%",
      },
      "--sm-angelfish-right": {
        from: "-38%",
        to: "12%",
      },
      "--xs-angelfish-right": {
        from: "-5%",
        to: "15%",
      },
      "--xxs-angelfish-right": {
        from: "4%",
        to: "11%",
      },
    },
  });

  angelFish.start();

  /* SCROLL DOWN ON ARROW CLICK */
  $("#scroll-down").click(function (e) {
    e.preventDefault();
    var target = this.hash;
    var $target = $(target);
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $target.offset().top,
        },
        3400,
        "swing",
        function () {
          //window.location.hash = target;
        }
      );
    return false;
  });
});

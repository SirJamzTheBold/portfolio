/* Main JS code */

//import Main Sass file for webpack compilation
import "../style/cvs_common_header.scss"

(function ($, Drupal) {
  $(document).ready(function () {
    var SEARCH_POPUP_CONTAINER = $('.search-popup-container'),
        BODY = $('body'),
        BODY_CHILDREN = BODY.children(),
        REGIONS = $('.region-hero, .region-content, .region-footer'),
        COMMON_HEADER_ROOT =  $('#cvs-common-header'),
        MAIN_CANVAS = $('.dialog-off-canvas-main-canvas'),
        OPEN_SEARCH_LINK = null, // populate later w/ element that triggered search modal
        SEARCH_FIRST_ITEM = $('.search-popup-inner .block').find(':not(:has(*))').first(),
        KEYCODE_ENTER = 13,
        KEYCODE_SPACE = 32,
        KEYCODE_ESC = 27,
        KEYCODE_LEFT = 37,
        KEYCODE_RIGHT = 39,
        KEYCODE_UP = 38,
        KEYCODE_DOWN = 40,
        KEYCODE_TAB = 9;

    //Ensure that Hash links do not get overlaid by the header.
    var changeHash = false;
    $(document).once().on('click', 'a[href^="#"]', function (event) {

      if ($(this).attr('href').length === 1) {
        // Don't do anything for JS fragment links of no length.
        return false;
      }

      let offset = $($.attr(this, 'href')).offset();
      if (typeof offset === 'undefined') {
        return false;
      }

      event.preventDefault();

      $('html, body').animate({
        scrollTop: offset.top - $('#cvs-common-header').height() - 50
      }, 500);

      $($.attr(this, 'href')).attr('original_tabindex', $($.attr(this, 'href')).attr('tabindex'));

      setVoiceOverFocus($($.attr(this, 'href')));

      $($.attr(this, 'href')).blur(function(current_tabindex) {
        var original_tabindex = $(this).attr('original_tabindex');

        if (original_tabindex) {
          $(this).attr('tabindex', original_tabindex);
        } else {
          $(this).removeAttr('tabindex');
        }
      });
    });

    if (typeof cvs_common_header_breakpoint !== "undefined") {
      var breakpoint = cvs_common_header_breakpoint;
    } else {
      var breakpoint = 750;
    }

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

    var toggleMobileHeaderClass = function() {
      //Close the menu
      $('.desktop-menu .main-menu .menu-level-0 .menu-item .menu-expand-button-expanded').trigger('click');
      $('.desktop-menu .utility-menu .menu-level-0 .menu-item .menu-expand-button-expanded').trigger('click');

      if ($(window).width() >= breakpoint) {
        // Show desktop menu, hide mobile menu
        COMMON_HEADER_ROOT.removeClass('mobile-cvs-common-header');
        $('.desktop-menu').removeClass('hide-menu'); // NOTE: From Piotr: Keep using this method of adding/removing a class that shows/hides things
      } else {
        // Hide desktop menu, show mobile menu
        COMMON_HEADER_ROOT.addClass('mobile-cvs-common-header');
        $('.desktop-menu').addClass('hide-menu');
      }
    }

    // The 2 parameters can be set if custom "animate" times are needed when this function is called
    var adjustHeaderSize = function(time1, time2) {
      //Get initial size
      var initial_size = 5;
      $('.menu-level-1.menu-expanded').children('.menu-item').each(function() {
        initial_size += $(this).actual( 'height' ) + 24;
      });

      if (initial_size > 0) {
        initial_size -= 24;
      }

      //Get the largest open menu.
      var max_size = 0;
      $('.menu-expanded').each(function() {
        if ($(this).actual( 'height' ) > max_size && !$(this).hasClass('menu-level-1')) {
          max_size = $(this).actual( 'height' );
        }
      });

      if ($(window).width() >= 1300) {
        $('.menu-level-1.menu-expanded').find('.featured-article-container').each(function() {
          if ($(this).actual( 'height' ) > max_size) {
            max_size = $(this).actual( 'height' );
          }
        });

        if (max_size > initial_size) {
          // $('.menu-level-1.menu-expanded').animate({height: max_size + 160}, time1); // You can set custom time1
          $('.menu-level-1.menu-expanded').animate({height: max_size + 160}, time1); // You can set custom time1
        } else {
          // $('.menu-level-1.menu-expanded').animate({height: initial_size + 160}, time2); // You can set custom time2
          $('.menu-level-1.menu-expanded').animate({height: initial_size + 160}, time2); // You can set custom time2
        }

        $('.menu-level-1.menu-expanded .featured-article-container').css('top', '80px');
      } else {
        var featured_article_height = $('.menu-level-1.menu-expanded .featured-article-container').actual( 'height' );

        if (max_size > initial_size) {
          $('.menu-level-1.menu-expanded .featured-article-container').css('top', max_size + 140);
          $('.menu-level-1.menu-expanded').height(featured_article_height + max_size + 80);
        } else {
          $('.menu-level-1.menu-expanded .featured-article-container').css('top', initial_size + 140);
          $('.menu-level-1.menu-expanded').height(featured_article_height + initial_size + 80);
        }
      }
    }

    //If tabbing out of the header navigation.
    var tabOut = function(e, last) {
      var link = $('nav.main-menu .menu-item.expand-collapse > button.menu-expand-button-expanded');
      var keyCode = e.keyCode || e.which;
      if(keyCode == KEYCODE_TAB || keyCode == KEYCODE_RIGHT) {
        if(e.shiftKey) { // Do what normal SHIFT+TAB does, which is go to previous
          return;
        }
        else { // If keypress is TAB or LEFT on last item
          collapseOnly(link); // Run fn to close the current submenu

          //Shift focus to content
          if (last) {
            if ($('#main-content h1 a').length) {
              setVoiceOverFocus($('#main-content h1 a').first());
            } else if ($('#main-content h1').length) {
              setVoiceOverFocus($('#main-content h1').first());
            } else if ($('#main-content h2 a').length) {
              setVoiceOverFocus($('#main-content h2 a').first());
            } else if ($('#main-content h2').length) {
              setVoiceOverFocus($('#main-content h2').first());
            } else {
              setVoiceOverFocus($('#main-content').children().first());
            }
          }
        }
      }
    }

    var expandMobileMenu = function(SELF) {
      $('.mobile-back-button').show();

      //Trap focus
      SELF.parent('.menu-item').parent('.menu').children('.menu-item').children('a, .menu-expand-button').attr('tabindex', '-2').attr('aria-hidden', 'true');
      $('#cvs-common-header-search').attr('tabindex', '-2').attr('aria-hidden', 'true');
      $('#cvs-common-header .mobile-menu .main-menu').attr('tabindex', '-2').attr('aria-hidden', 'true');
      $('#cvs-common-header .mobile-menu .utility-menu').attr('tabindex', '-2').attr('aria-hidden', 'true');
      $('#cvs-common-header .mobile-menu .search-menu').attr('tabindex', '-2').attr('aria-hidden', 'true');
      $('#cvs-common-header .mobile-menu').attr('tabindex', '-2').attr('aria-hidden', 'true');
      $('#cvs-common-header .mobile-menu .menu').attr('tabindex', '-2').attr('aria-hidden', 'true');

      //Remove focus from sibling menu
      if (SELF.parent('.menu-item').parent('.menu').hasClass('menu-level-0')) {
        var parent_menu = SELF.parent('.menu-item').parent('.menu').parent(),
          sibling_menu = '';

        if (parent_menu.hasClass('main-menu')) {
          sibling_menu = parent_menu.siblings('.utility-menu').children('.menu');
        } else if (parent_menu.hasClass('utility-menu')) {
          sibling_menu = parent_menu.siblings('.main-menu').children('.menu');
        }

        if (sibling_menu != '') {
          sibling_menu.children('.menu-item').children('a, .menu-expand-button').attr('tabindex', '-2').attr('aria-hidden', 'true');
        }
      }

      //Shift focus
      //var first_child = SELF.siblings('.menu').children('.menu-item').first().children('a, .menu-expand-button');
      setVoiceOverFocus($('.mobile-back-button'));
    }

    var previous_link = '';

    //Hide the menus if visible
    $(window).click(function(e) {
      // What element called this event?
      var $trigger = $(e.target);

      $('.desktop-menu .main-menu .menu-level-0 .menu-item .menu-expand-button-expanded').trigger('click');

      if (
        !$trigger.hasClass('open-search') && // don't close search if we're trying to open it
        $('.search-popup').is(':visible')    // oh, and make sure it's visible before closing
      ) {
        $('.search-popup-close').trigger('click');
      }
    });

    COMMON_HEADER_ROOT.click(function(event){
      event.stopPropagation();
    });

    $('.search-popup').click(function(event){
      event.stopPropagation();
    });

    $('.mobile-menu .menu-expand-button').keydown(function(e) {
      var keyCode = e.keyCode || e.which;
      if (keyCode == KEYCODE_ENTER) {
        expandMobileMenu($(this));
      }
    });

    $('.mobile-menu .menu-expand-button').click(function() {
      expandMobileMenu($(this));
    });

/* ------ KEYBOARD FUNCTIONALITY ------ */
/*
- PRESSING LEFT/RIGHT ARROW KEYS on Utility menu and main menu move FOCUS left/right w/in their own <nav>
- PRESSING DOWN ARROW KEY on expand/collapse button opens submenu and FOCUS automatically moves to 1st submenu link item
- INSIDE OF EXPAND/COLLAPSE SUBMENU
  - PRESSING DOWN/UP ARROW KEYS moves FOCUS up/down the submenu link items
  - PRESSING ESCAPE KEY ANY TIME moves FOCUS to the expand/collapse button and collapses current submenu
  - PRESSING TAB KEY ON LAST ITEM moves FOCUS to the NEXT expand/collapse button and collapses current submenu
  - PRESSING LEFT KEY ON EXPAND/COLLAPSE BUTTON moves FOCUS to the PREV expand/collapse button and closes current submenu
  - PRESSING RIGHT KEY ON EXPAND/COLLAPSE BUTTON opens another submenu and FOCUS automatically moves to 1st submenu link item
  - PRESSING RIGHT KEY ON A SECONDARY SUBMENU LINK ITEM closes submenu and FOCUS moves to EXPAND/COLLAPSE BUTTON
  - PRESSING LEFT/RIGHT KEY ON REGULAR LINKS moves FOCUS to PREV/NEXT expand/collapse button
*/

    // Add custom class to submenu items for easier targeting
    $('ul.menu-level-1').find('> li.menu-item').addClass('submenu-item');
    $('ul.menu-level-2').find('> li.menu-item').addClass('submenu-item-level-2');
    $('ul.menu-level-1').find('> li.menu-item button.menu-expand-button').addClass('button-level-2');
    $('nav.main-menu > ul > li').addClass('expand-collapse'); // Expand/collapse parents

    // Make sure that if user clicks on a sublink link - especially if an anchor link - the expandable menu closes
    $('nav.main-menu ul.menu li.submenu-item a').click(function() {
      var link = $(this);
      // Find the expanded parent button
      var parentDropdown = link.closest('.expand-collapse').find('button.menu-expand-button');

      // Close the expanded parent button
      collapseOnly(parentDropdown);

      // Focus on the parent button
      parentDropdown.delay().fadeIn(function() {
        $(this).focus();
      });
    });

    // TOP LEVEL MENUS: If keydown LEFT/RIGHT on utility menu item, or expandable button, or lone link
    $('.utility-menu nav ul.menu li.menu-item a, nav.utility-menu ul.menu li.menu-item a, nav.main-menu > .menu-level-0 > li.menu-item > button.menu-expand-button, nav.main-menu > .menu-level-0 > li.menu-item > a.menu-item, nav.main-menu > .menu-level-0 > li.menu-item > a').keydown(function(e){
      // Store the reference to our top level link
      var link = $(this);
      switch(e.keyCode) {
        case KEYCODE_LEFT:
          // Make sure to stop event bubbling
          e.preventDefault();
          e.stopPropagation();
          // This is the first item in the top level menu list
          if(link.parent('li').prevAll('li').filter(':visible').first().length == 0) {
              // Focus on the last item in the top level
              link.parent('li').nextAll('li').filter(':visible').last().find('a, button').first().focus();
          } else {
              // Focus on the previous item in the top level
              link.parent('li').prevAll('li').filter(':visible').first().find('a, button').first().focus();
          }
        break;

        case KEYCODE_RIGHT:
          // Make sure to stop event bubbling
          e.preventDefault();
          e.stopPropagation();
          // This is the last item
          if(link.parent('li').nextAll('li').filter(':visible').first().length == 0) {
            // Focus on the first item in the top level
            link.parent('li').prevAll('li').filter(':visible').last().find('a, button').first().focus();
          } else {
            // Focus on the next item in the top level
            link.parent('li').nextAll('li').filter(':visible').first().find('a, button').first().focus();
          }
        break;
      }
    });

    //Tab out of the menu if the user is on the final item in the navigation.
    $('.desktop-menu .menu-level-0 > .menu-item--collapsed:not(:last-child)').each(function() {
      $(this).find('> ul > li:last-child > a').keydown(function(e) {
        tabOut(e, false);
      });

      $(this).find('> ul > li:last-child > .menu-expand-button').keydown(function(e) {
        if (!$(this).hasClass('menu-expand-button-expanded')) {
          if (e.keyCode != KEYCODE_RIGHT) {
            tabOut(e, false);
          }
        }
      });

      $(this).find('> ul > li:last-child > ul > li:last-child a').keydown(function(e) {
        tabOut(e, false);
      });

      $(this).find('.featured-article-container a').last().keydown(function(e) {
        tabOut(e, false);
      });
    });

    $('.desktop-menu .menu-level-0 > .menu-item--collapsed:last-child').each(function() {
      $(this).find('> ul > li:last-child > a').keydown(function(e) {
        tabOut(e, true);
      });

      $(this).find('> ul > li:last-child > .menu-expand-button').keydown(function(e) {
        if (!$(this).hasClass('menu-expand-button-expanded')) {
          if (e.keyCode != KEYCODE_RIGHT) {
            tabOut(e, true);
          }
        }
      });

      $(this).find('> ul > li:last-child > ul > li:last-child a').keydown(function(e) {
        tabOut(e, true);
      });

      $(this).find('.featured-article-container a').last().keydown(function(e) {
        tabOut(e, true);
      });
    });

    // If keydown DOWN/SPACE/ENTER on top/parent expandable button
    $('nav.main-menu .menu-item.expand-collapse > button.menu-expand-button').keydown(function(e){
      // Store the reference to our top level link
      var link = $(this);
      switch(e.keyCode) {
        case KEYCODE_DOWN: case KEYCODE_SPACE: case KEYCODE_ENTER:
          
          // Target any link/button inside of the submenu
          var dropdown = link.parent('li').find('ul.menu.menu-level-1 > li.submenu-item > a, ul.menu.menu-level-1 button');

          // Target link inside of submenu list item (Top DD button > Sub link item)
          var dropdownSublink = link.parent('li').find('li.submenu-item > a');

          // Target link inside of submenu list item (Top DD button > Sub DD button > Link item)
          var subDropdownItem = link.parent('li').find('.submenu-item-level-2 a');

          var featuredArticleLink = link.parent('li').find('ul.menu.menu-level-1 > .featured-article-container a'); // Check if featured article section has a link

          expandOnly(link); // Open submenu

          // Check if there are links/buttons in the submenu
          if(dropdown.length > 0){
            // Make sure to stop event bubbling
            e.preventDefault();
            e.stopPropagation();

            // Set focus to the first item in the submenu list automatically. Needs a second to detect.
            dropdown.first().focus(); // Focus on first item
            // Keypress inside of submenu
            dropdown.keydown(function(e){
              switch(e.keyCode) {
                case KEYCODE_ESC:
                  // Make sure to stop event bubbling
                  e.preventDefault();
                  e.stopPropagation();
                  link.focus(); // Focus on parent of submenu link
                  collapseOnly(link); // Run fn to close the current submenu
                break;
                case KEYCODE_LEFT:
                  // Make sure to stop event bubbling
                  e.preventDefault();
                  e.stopPropagation();
                  // Check if there is a submenu in the submenu (an inception of submenus)
                  if(link.parent('li').hasClass('submenu-link-level2')){
                    link.focus(); // Focus on parent of submenu link
                  }
                  else {
                    // Focus on parent of previous submenu link
                    // This is the first item in the top level menu list
                    if(link.parent('li').prevAll('li').filter(':visible').first().length == 0) {
                      // Focus on the last item in the top level
                      link.parent('li').nextAll('li').filter(':visible').last().find('button, a').first().focus();
                      collapseOnly(link); // Run fn to close the current submenu
                    } else {
                      // Focus on the previous item in the top level
                      link.parent('li').prevAll('li').filter(':visible').first().find('button, a').first().focus();
                      collapseOnly(link); // Run fn to close the current submenu
                    }
                  }
                break;
              };
            });


            featuredArticleLink.first().keydown(function(e){
              var subDropdown = link.parent('li').find('.menu-level-2.menu-expanded');
              switch(e.keyCode) {
                case KEYCODE_LEFT:
                  if(subDropdown.length) {
                    subDropdownItem.focus();
                  }
                  else {
                    dropdownSublink.last().focus();
                  }
                break;
              }
            });

            // Sub link only (Top DD button > Sub link item)
            dropdownSublink.keydown(function(e){
              switch(e.keyCode) {
                case KEYCODE_RIGHT: // If link is pressed and is not a drop down button, close top current parent drop down and focus on next top parent
                  // Make sure to stop event bubbling
                  e.preventDefault();
                  e.stopPropagation();

                  // If link exists in featured article section, focus on first instance
                  if(featuredArticleLink.length > 0) {
                    featuredArticleLink.first().focus();
                  }
                  // If link doesn't not exist in featured article section, close top current parent drop down and focus on next top parent
                  else {
                    // This is the last item
                    if(link.parent('li').nextAll('li').filter(':visible').first().length == 0) {
                      // Focus on the first item in the top level
                      link.parent('li').prevAll('li').filter(':visible').last().find('button, a').first().focus();
                      collapseOnly(link);// Run fn to close the current submenu
                    } else {
                      // Focus on the next item in the top level
                      link.parent('li').nextAll('li').filter(':visible').first().find('button, a').first().focus();
                      collapseOnly(link);// Run fn to close the current submenu
                    }
                  }
                break;
              }
            });
            // Sub link button link item (Top DD button > Sub DD button > Link item)
            subDropdownItem.keydown(function(e){
              switch(e.keyCode) {
                case KEYCODE_RIGHT: // If pressed while inside sub sub menu do this
                  // Make sure to stop event bubbling
                  e.preventDefault();
                  e.stopPropagation();

                  // If link exists in featured article section, focus on first instance
                  if(featuredArticleLink.length > 0) {
                    featuredArticleLink.first().focus();
                  }
                  // If link doesn't not exist in featured article section, close top current parent drop down and focus on next top parent
                  else {
                    // This is the last item
                    if(link.parent('li').nextAll('li').filter(':visible').first().length == 0) {
                      // Focus on the first item in the top level
                      link.parent('li').prevAll('li').filter(':visible').last().find('button, a').first().focus();
                      collapseOnly(link);// Run fn to close the current submenu
                    } else {
                      // Focus on the next item in the top level
                      link.parent('li').nextAll('li').filter(':visible').first().find('button, a').first().focus();
                      collapseOnly(link);// Run fn to close the current submenu
                    }
                  }
                break;
              }
            });
          }
        break;
      }
    });

    // If keydown DOWN/UP on expandable submenu link items
    $('nav.main-menu ul.menu li.submenu-item a, nav.main-menu ul.menu li.submenu-item button.menu-expand-button').keydown(function(e){
      // Store the reference to our top level link
      var link = $(this);
      switch(e.keyCode) {
        case KEYCODE_DOWN:
          e.preventDefault();
          e.stopPropagation();
          // This is the last item
          if(link.parent('li').nextAll('li').filter(':visible').first().length == 0) {
            // Focus on the first item in the top level
            link.parent('li').prevAll('li').filter(':visible').last().find('a, button').first().focus();
          } else {
            // Focus on the next item in the top level
            link.parent('li').nextAll('li').filter(':visible').first().find('a, button').first().focus();
          }
        break;
        case KEYCODE_UP:
          e.preventDefault();
          e.stopPropagation();
          // This is the first item in the top level menu list
          if(link.parent('li').prevAll('li').filter(':visible').first().length == 0) {
            // Focus on the last item in the top level
            link.parent('li').nextAll('li').filter(':visible').last().find('a, button').first().focus();
          } else {
            // Focus on the previous item in the top level
            link.parent('li').prevAll('li').filter(':visible').first().find('a, button').first().focus();
          }
        break;
      }
    });

    // If keydown LEFT/RIGHT on LEVEL 2 submenu link items
    $('nav.main-menu ul.menu li.submenu-item button.menu-expand-button').keydown(function(e){
      // Store the reference to our top level link
      var link = $(this);
      switch(e.keyCode) {
        case KEYCODE_RIGHT:
          e.preventDefault();
          e.stopPropagation();
          expandOnly(link); // Open submenu
          // Any link or button inside of the submenu
          var dropdown = link.parent('li').find('ul.menu a, ul.menu button');

          // Check if there are links/buttons in the submenu
          if(dropdown.length > 0){
            // Make sure to stop event bubbling
            e.preventDefault();
            e.stopPropagation();

            // Set focus to the first item in the submenu list automatically. Needs a second to detect.
            dropdown.first().focus(); // Focus on first item

            // Keypress inside of submenu level 2 on link items
            dropdown.keydown(function(e){
              switch(e.keyCode) {
                case KEYCODE_LEFT: case KEYCODE_ESC:
                  // Make sure to stop event bubbling
                  e.preventDefault();
                  e.stopPropagation();
                  link.focus(); // Focus on parent of submenu link
                  collapseOnly(link); // Run fn to close the current submenu
                break;
                case KEYCODE_TAB:
                  var configureLink = link.parent('li').find('ul.menu button.trigger.focusable'); // Edit/Configure link when logged in
                  // If tabbed on last link/button in the submenu
                  if(dropdown.last().is(":focus")){ // Check if focussed on last link/button
                    collapseOnly(link); // Run fn to close the current submenu
                  }
                  // If tabbed on last edit/configure link in submenu (only seen when logged into Drupal)
                  else if(configureLink.last().is(":focus")){
                    collapseOnly(link);// Run fn to close the current submenu
                  }
                  else {
                    return;
                  }
                break;
              };
            });
          }
        break;
      }
    });

    // GENERAL EXPAND/COLLAPSE FOR SUBMENU
    $('.menu-expand-button').click(function() {
      expandCollapse($(this));
    });

    // Expand/Collapse Functionality - Mainly used for when users click on expand/collapse menus
    function expandCollapse(param){
      if (!param.hasClass('menu-expand-button-expanded')) {
        //Update aria label
        param.attr('aria-label', param.attr('aria-label').replace('expand', 'collapse'));

        var parent_container = param.parent('.menu-item').parent('.menu');
        var parent_container_button = parent_container.find('.menu-expand-button-expanded');
        var parent_container_expanded_menu =  parent_container.find('.menu-expanded');
        var sibling_container_menu = param.parents('.container-menu').siblings('.container-menu');
        var sibling_container_button = sibling_container_menu.find('.menu-expand-button-expanded');
        var sibling_container_expanded_menu =  sibling_container_menu.find('.menu-expanded');

        if (parent_container_expanded_menu.length || sibling_container_expanded_menu.length) {
          var delay_duration = 750;
        } else {
          var delay_duration = 250;
        }

        //Clean up items from this container menu.
        if (parent_container_button.length) {
          parent_container_button.attr('aria-label', parent_container_button.attr('aria-label').replace('collapse', 'expand'));
          parent_container_button.removeClass('menu-expand-button-expanded');
        }
        parent_container.find('.menu-expanded .featured-article-container').fadeOut(250);
        parent_container_expanded_menu.children('li').animate({opacity: 0}, 250);
        parent_container_expanded_menu.slideUp(250);

        //Clean up items from other container menu
        if (sibling_container_button.length) {
          sibling_container_button.attr('aria-label', sibling_container_button.attr('aria-label').replace('collapse', 'expand'));
          sibling_container_button.removeClass('menu-expand-button-expanded');
        }
        sibling_container_menu.find('.menu-expanded .featured-article-container').fadeOut(250);
        sibling_container_expanded_menu.children('.menu-item').animate({opacity: 0}, 250);
        sibling_container_expanded_menu.slideUp(250);

        parent_container_expanded_menu.removeClass('menu-expanded');
        sibling_container_expanded_menu.removeClass('menu-expanded');
        param.siblings('.menu').addClass('menu-expanded');
        if ($(window).width() > 750) {
          adjustHeaderSize();
        }

        var SELF = param;
        SELF.addClass('menu-expand-button-expanded');

        // Adding delay() to slow down transition, specifically at tablet size
        // Without delay() the expand/collapse moves way to fast if you click between two of them
        SELF.siblings('.menu').delay(delay_duration).slideDown(function() {
          $(this).children('.menu-item').animate({opacity: 1.0}, 250);

          //Adjust size of the menu to accomodate new elements
          if ($(window).width() > breakpoint) {
            //Slide down the related articles section if applicable
            if ($(this).children('.featured-article-container').length) {
              $(this).children('.featured-article-container').fadeIn();
            }

            //Display overlay
            $('.cvs-common-header-shadow').fadeIn();

            //Prevent Scroll
            BODY.css('overflow-y', 'hidden');

            //Trap focus
            BODY_CHILDREN.attr('aria-hidden', 'true');
            MAIN_CANVAS.attr('aria-hidden', 'false');
            REGIONS.attr('aria-hidden', 'true');
            $('a[href], area[href], input, select, textarea, button, iframe, object, embed, *[tabindex], *[contenteditable]').attr('tabindex', '-2');
            COMMON_HEADER_ROOT.find('[tabindex=-2]').attr('tabindex', '0');

            //Adjust header size.
            adjustHeaderSize();

            //Adjust top position based on height of the common header element.
            var top_position = $('#cvs-common-header').height() - 16;
            $('.menu-level-1.menu-expanded').css('top', top_position + 'px');
          } else {
            if (parent_container.hasClass('menu-level-1')) {
              parent_container.scrollTop(0);
              parent_container.css('overflow-y', 'hidden').addClass('scroll-off');

              var link_text = parent_container.find('.menu-item a').first().html().replace(" overview", "");
              $('.mobile-back-button').html("Back to " + link_text.toLowerCase());
            }
          }
        });

        previous_link = SELF;

      } else {
        //Update aria label
        param.attr('aria-label', param.attr('aria-label').replace('collapse', 'expand'));

        param.removeClass('menu-expand-button-expanded');
        param.siblings('.menu').removeClass('menu-expanded');

        $('.menu-level-1.menu-expanded').css('min-height', '0px');

        // Adding delay() to slow down transition, specifically at tablet size
        // Without delay() the expand/collapse moves way to fast if you click between two of them
        param.siblings('.menu').delay(delay_duration).slideUp(function() {
          //Adjust size of the menu to accomodate new elements
          if ($(window).width() > breakpoint) {

            //Slide up the related articles section if applicable
            if (param.children('.featured-article-container').length) {
              param.children('.featured-article-container').slideUp();
            }

            adjustHeaderSize();
          }
        });

        //Update aria label
        param.attr('aria-label', param.attr('aria-label').replace('collapse', 'expand'));

        //Slide up the related articles section if applicable
        if (param.siblings('.menu').children('.featured-article-container').length) {
          param.siblings('.menu').children('.featured-article-container').fadeOut();
        }

        //Fade out the links
        param.siblings('.menu').children('.menu-item').animate({opacity: 0}, 250);

        //Slide up the container
        var SELF = param;
        // Adding delay() to slow down transition, specifically at tablet size
        // Without delay() the expand/collapse moves way to fast if you click between two of them
        SELF.siblings('.menu').delay(delay_duration).slideUp(function() {
          //hide overlay
          if ($(this).hasClass('menu-level-1')) {
            //Hide the background shadow.
            $('.cvs-common-header-shadow').fadeOut();

            //Enable scroll
            BODY.css('overflow-y', 'scroll');
            $('html').css('overflow-y', 'initial');

            //Release focus
            BODY_CHILDREN.attr('aria-hidden', 'false');
            REGIONS.attr('aria-hidden', 'false');
            $('[tabindex=-2]').attr('tabindex', '0');
            $('#main-content').attr('tabindex', '-1');
          }
        });

        var parent_menu = param.parent('.menu-item').parent('.menu');

        if (parent_menu.length > 0) {
          if (parent_menu.siblings('.menu-expand-button').length > 0) {
            previous_link = parent_menu.siblings('.menu-expand-button');
          } else {
            $('.mobile-back-button').hide();
          }
        } else {
          $('.mobile-back-button').hide();
        }
      }
    }
    // End Expand/Collapse Functionality

    // Expands Menu Only - Mainly used for keyboard functionality
    // NOTE: expandOnly() and collapseOnly() do not use delay() like the expandCollapse().
    // On keydown of an expanded menu, FOCUS must be set to the first item in the list. delay() hinders this, so it is not used here
    function expandOnly(param) {
      if (!param.hasClass('menu-expand-button-expanded')) {
        //Update aria label
        param.attr('aria-label', param.attr('aria-label').replace('expand', 'collapse'));

        var parent_container = param.parent('.menu-item').parent('.menu');
        var parent_container_button = parent_container.find('.menu-expand-button-expanded');
        var parent_container_expanded_menu =  parent_container.find('.menu-expanded');
        var sibling_container_menu = param.parents('.container-menu').siblings('.container-menu');
        var sibling_container_button = sibling_container_menu.find('.menu-expand-button-expanded');
        var sibling_container_expanded_menu =  sibling_container_menu.find('.menu-expanded');

        //Clean up items from this container menu.
        if (parent_container_button.length) {
          parent_container_button.attr('aria-label', parent_container_button.attr('aria-label').replace('collapse', 'expand'));
          parent_container_button.removeClass('menu-expand-button-expanded');
        }
        parent_container.find('.menu-expanded .featured-article-container').fadeOut(250);
        parent_container_expanded_menu.children('li').animate({opacity: 0}, 250);
        parent_container_expanded_menu.slideUp(250);

        //Clean up items from other container menu
        if (sibling_container_button.length) {
          sibling_container_button.attr('aria-label', sibling_container_button.attr('aria-label').replace('collapse', 'expand'));
          sibling_container_button.removeClass('menu-expand-button-expanded');
        }
        sibling_container_menu.find('.menu-expanded .featured-article-container').fadeOut(250);
        sibling_container_expanded_menu.children('.menu-item').animate({opacity: 0}, 250);
        sibling_container_expanded_menu.slideUp(250);

        parent_container_expanded_menu.removeClass('menu-expanded');
        sibling_container_expanded_menu.removeClass('menu-expanded');
        param.siblings('.menu').addClass('menu-expanded');
        if ($(window).width() > 750) {
          adjustHeaderSize(0,0);
        }

        var SELF = param;
        SELF.addClass('menu-expand-button-expanded');

        SELF.siblings('.menu').slideDown(function() {
          $(this).children('.menu-item').animate({opacity: 1.0}, 250);

          //Adjust size of the menu to accomodate new elements
          if ($(window).width() > breakpoint) {
            //Slide down the related articles section if applicable
            if ($(this).children('.featured-article-container').length) {
              $(this).children('.featured-article-container').fadeIn();
            }

            //Display overlay
            $('.cvs-common-header-shadow').fadeIn();

            //Prevent Scroll
            BODY.css('overflow-y', 'hidden');

            //Trap focus
            BODY_CHILDREN.attr('aria-hidden', 'true');
            MAIN_CANVAS.attr('aria-hidden', 'false');
            REGIONS.attr('aria-hidden', 'true');
            $('a[href], area[href], input, select, textarea, button, iframe, object, embed, *[tabindex], *[contenteditable]').attr('tabindex', '-2');
            COMMON_HEADER_ROOT.find('[tabindex=-2]').attr('tabindex', '0');

            //Adjust header size.
            adjustHeaderSize(0,0);

            //Adjust top position based on height of the common header element.
            var top_position = $('#cvs-common-header').height() - 16;
            $('.menu-level-1.menu-expanded').css('top', top_position + 'px');
          } else {
            if (parent_container.hasClass('menu-level-1')) {
              var link_text = parent_container.find('.menu-item a').first().html().replace(" overview", "");
              $('.mobile-back-button').html("Back to " + link_text.toLowerCase());
            }
          }
        });

        previous_link = SELF;
      }
      else {
        return;
      }
    }
    // End Expands Menu Only

    // Collapses Menu Only - Mainly used for keyboard functionality
    // NOTE: expandOnly() and collapseOnly() do not use delay() like the expandCollapse().
    // On keydown of an expanded menu, FOCUS must be set to the first item in the list. delay() hinders this, so it is not used here
    function collapseOnly(param){
      if (param.hasClass('menu-expand-button-expanded')){
        //Update aria label
        param.attr('aria-label', param.attr('aria-label').replace('collapse', 'expand'));

        param.removeClass('menu-expand-button-expanded');
        param.siblings('.menu').removeClass('menu-expanded');

        $('.menu-level-1.menu-expanded').css('min-height', '0px');
        param.siblings('.menu').slideUp(function() {
          //Adjust size of the menu to accomodate new elements
          if ($(window).width() > breakpoint) {

            //Slide up the related articles section if applicable
            if (param.children('.featured-article-container').length) {
              param.children('.featured-article-container').slideUp();
            }

            adjustHeaderSize();
          }
        });

        //Update aria label
        param.attr('aria-label', param.attr('aria-label').replace('collapse', 'expand'));

        //Slide up the related articles section if applicable
        if (param.siblings('.menu').children('.featured-article-container').length) {
          param.siblings('.menu').children('.featured-article-container').fadeOut();
        }

        //Fade out the links
        param.siblings('.menu').children('.menu-item').animate({opacity: 0}, 250);

        //Slide up the container
        var SELF = param;
        SELF.siblings('.menu').slideUp(function() {
          //hide overlay
          if ($(this).hasClass('menu-level-1')) {
            //Hide the background shadow.
            $('.cvs-common-header-shadow').fadeOut();

            //Enable scroll
            BODY.css('overflow-y', 'scroll');

            //Release focus
            BODY_CHILDREN.attr('aria-hidden', 'false');
            REGIONS.attr('aria-hidden', 'false');
            $('[tabindex=-2]').attr('tabindex', '0');
            $('#main-content').attr('tabindex', '-1');
          }
        });

        var parent_menu = param.parent('.menu-item').parent('.menu');
        
        if (parent_menu.length > 0) {
          if (parent_menu.siblings('.menu-expand-button').length > 0) {
            previous_link = parent_menu.siblings('.menu-expand-button');
          } else {
            $('.mobile-back-button').hide();
          }
        } else {
          $('.mobile-back-button').hide();
        }
      }
      else {
        return;
      }
    }
    // End Collapses Menu Only

    $(document).on('keydown', '.mobile-cvs-common-header', function (e) {
      var jqTarget = $(e.target).first();
      if (e.keyCode == KEYCODE_TAB) {
          if ($('.mobile-back-button').is(":visible")) {
            var jqFirst = $('.mobile-back-button').first();
          } else {
            var jqFirst = $('#cvs-common-header .mobile-menu .main-menu .menu-expand-button[tabindex=0], #cvs-common-header .mobile-menu .main-menu a[tabindex=0]').first();
          }
          var jqLast = $('.close-mobile-menu').first();
  
          if (!e.shiftKey && jqTarget.is(jqLast)) {
            e.preventDefault();
            setVoiceOverFocus(jqFirst);
          } else if (e.shiftKey && jqTarget.is(jqFirst)) {
            e.preventDefault();
            setVoiceOverFocus(jqLast);
          }
      }
  });

    $('.mobile-back-button').click(function() {
      //Reset back button text
      $('.mobile-back-button').html('Back');

      //Create archive of previous link.
      var previous_link_old = previous_link;

      //Trigger animation.
      if (previous_link.parent('.menu-item').parent('.menu').hasClass('menu-level-0')) {
        var previous_link_container = previous_link.parent('.menu-item').parent('.menu').children('.menu-item')
        previous_link_container.children('.menu-expanded').removeClass('menu-expanded').slideUp();
        previous_link_container.children('.menu-expand-button-expanded').attr('aria-label', previous_link_container.children('.menu-expand-button-expanded').attr('aria-label').replace('collapse', 'expand')).removeClass('menu-expand-button-expanded');
        $('.mobile-back-button').hide();
      } else {
        previous_link.trigger('click');
      }

      //Restore focus
      previous_link_old.parent('.menu-item').parent('.menu').children('.menu-item').children('a, .menu-expand-button').attr('tabindex', '0').attr('aria-hidden', 'false');

      //Restore focus from sibling menu
      if (previous_link_old.parent('.menu-item').parent('.menu').hasClass('menu-level-0')) {
        var parent_menu = previous_link_old.parent('.menu-item').parent('.menu').parent(),
          sibling_menu = '';

        if (parent_menu.hasClass('main-menu')) {
          sibling_menu = parent_menu.siblings('.utility-menu').children('.menu');
        } else if (parent_menu.hasClass('utility-menu')) {
          sibling_menu = parent_menu.siblings('.main-menu').children('.menu');
        }

        if (sibling_menu != '') {
          sibling_menu.children('.menu-item').children('a, .menu-expand-button').attr('tabindex', '0').attr('aria-hidden', 'false');
          $('#cvs-common-header-search').attr('tabindex', '0').attr('aria-hidden', 'false');
          $('#cvs-common-header .mobile-menu .main-menu').attr('tabindex', '0').attr('aria-hidden', 'false');
          $('#cvs-common-header .mobile-menu .utility-menu').attr('tabindex', '0').attr('aria-hidden', 'false');
          $('#cvs-common-header .mobile-menu .search-menu').attr('tabindex', '0').attr('aria-hidden', 'false');
          $('#cvs-common-header .mobile-menu').attr('tabindex', '0').attr('aria-hidden', 'false');
          $('#cvs-common-header .mobile-menu .menu').attr('tabindex', '0').attr('aria-hidden', 'false');
        }
      }

      //Restore Scroll
      if (previous_link_old.parent('.menu-item').parent('.menu').hasClass('scroll-off')) {
        previous_link_old.parent('.menu-item').parent('.menu').css('overflow-y', 'auto').removeClass('scroll-off');
      }

      //shift focus
      setVoiceOverFocus(previous_link_old);
    });

    //Open the search menu
    $('.open-search').click(function(e) {
      // Store which button triggered this
      OPEN_SEARCH_LINK = $(e.target);

      //Shift focus to first element of the search popup.
      SEARCH_POPUP_CONTAINER.attr('aria-hidden', 'false');
      setVoiceOverFocus(SEARCH_FIRST_ITEM);

      //Fade in the search popup.
      SEARCH_POPUP_CONTAINER.fadeIn();

      //Remove Scroll
      BODY.css('overflow-y', 'hidden');

      //Adjust position of close search button based on screen size.
      if ($(window).width() < breakpoint && $('#toolbar-bar').length > 0) {
        $('.search-popup-close').css('top', '65px');
      }

      //Trap focus
      BODY_CHILDREN.attr('aria-hidden', 'true');
      MAIN_CANVAS.attr('aria-hidden', 'false');
      REGIONS.attr('aria-hidden', 'true');
      $('a[href], area[href], input, select, textarea, button, iframe, object, embed, *[tabindex], *[contenteditable]').attr('tabindex', '-2');
      COMMON_HEADER_ROOT.attr('aria-hidden', 'true');
      SEARCH_POPUP_CONTAINER.find('[tabindex=-2]').attr('tabindex', '0');
    });

    $('.advancedSearchTrigger, .standardSearchTrigger').click(function() {
      setVoiceOverFocus($('.search-popup'));
    });

    //Close the search menu
    $('.search-popup-close').click(function() {
      //Release focus
      REGIONS.attr('aria-hidden', 'false');
      COMMON_HEADER_ROOT.attr('aria-hidden', 'false');

      //Shift voiceover focus to the search button that opened this
      setVoiceOverFocus(OPEN_SEARCH_LINK);

      //Fade out the search popup.
      SEARCH_POPUP_CONTAINER.fadeOut();

      //Adjust menu
      if ($(window).width() < breakpoint) {
        $('.mobile-menu').hide();
        $('.close-mobile-menu').hide();
        $('.open-mobile-menu').show();
        $('.site-logo-link').show();
      }

      //Resore Scroll
      BODY.css('overflow-y', 'scroll');
      $('html').css('overflow-y', 'initial');

      //Release focus
      BODY_CHILDREN.attr('aria-hidden', 'false');
      $('[tabindex=-2]').attr('tabindex', '0');
      $('#main-content').attr('tabindex', '-1');
      SEARCH_POPUP_CONTAINER.attr('aria-hidden', 'true');
    });

    //Close on escape keypress
    $(document).on('keydown', function(event) {
      if ($('.search-popup').is(':visible') && event.key == 'Escape') {
        $('.search-popup-close').trigger('click');
      }
    });

    //Open the mobile menu
    //NOTE: Maybe try using a callback here, and use debug to figure out how things are being ordered/firing
    $('.open-mobile-menu').click(function() {
      $('.mobile-menu').slideDown(function() {
        $('.mobile-menu').scrollTop(0);
      });
      $('.close-mobile-menu').show();
      $('.open-mobile-menu').hide();
      BODY.css('overflow-y', 'hidden');
      $('html').css('overflow-y', 'hidden');

      //Trap focus
      BODY_CHILDREN.attr('aria-hidden', 'true');
      MAIN_CANVAS.attr('aria-hidden', 'false');
      REGIONS.attr('aria-hidden', 'true');
      $('a[href], area[href], input, select, textarea, button, iframe, object, embed, *[tabindex], *[contenteditable]').attr('tabindex', '-2');
      COMMON_HEADER_ROOT.find('[tabindex=-2]').attr('tabindex', '0');
      $('.site-logo-link').hide().attr('tabindex', '-2');

      //shift focus
      setVoiceOverFocus($('#cvs-common-header .mobile-menu .main-menu .menu-level-0').children('.menu-item').first().children('a, .menu-expand-button').first());
    });

    //Close the mobile menu
    $('.close-mobile-menu').click(function() {
      $('.mobile-menu').slideUp();
      $('.close-mobile-menu').hide();
      $('.open-mobile-menu').show();
      $('.site-logo-link').show();
      $('.cvs-common-header-shadow').hide();
      BODY.css('overflow-y', 'scroll');
      $('html').css('overflow-y', 'initial');
      $('#cvs-common-header-inner').show();

      var mobile_menu_expanded_button = $('.mobile-menu').find('.menu-expand-button-expanded');
      if (mobile_menu_expanded_button.length) {
        mobile_menu_expanded_button.attr('aria-label',  mobile_menu_expanded_button.attr('aria-label').replace('expand', 'collapse'));
        mobile_menu_expanded_button.removeClass('menu-expand-button-expanded');
      }

      $('.mobile-menu').find('.menu-expanded').slideUp().removeClass('.menu-expanded');
      $('.mobile-menu').find('[tabindex="-2"]').attr('tabindex', '0').attr('aria-hidden', 'false');
      $('.mobile-back-button').hide();

      //Release focus
      BODY_CHILDREN.attr('aria-hidden', 'false');
      REGIONS.attr('aria-hidden', 'false');
      $('[tabindex=-2]').attr('tabindex', '0');
      $('#main-content').attr('tabindex', '-1');

      //Restore Scroll
      $('#cvs-common-header ul.menu.menu-level-1.scroll-off').css('overflow-y', 'auto').removeClass('scroll-off');

      //Shift focus
      setVoiceOverFocus($('.open-mobile-menu'));
    });

    toggleMobileHeaderClass();
    $(window).on('resize', function () {
      toggleMobileHeaderClass();
    });


    // We set <header> to position fixed, requiring us to set margin-top of <main> equal to the height of the <header> DOM element 
    //   to offset the main content from behind the fixed <header>
    // This needs to run after the 

    // Needs to be outside of on load for HWW
    setMarginTopOfMain(); // run on initial page load

    // run on initial page load for other sites
    $(window).on('load', function () {
      setMarginTopOfMain();
    });

    $(window).resize( function () {
      setMarginTopOfMain(); // run again after resize event to update top margin on header height changes
    });
    // Define function behavior to calc <header> height and offset <main> with dynamic margin-top value
    function setMarginTopOfMain(){
      var cvs_common_header_height = $('header').height();
      $('main').css('margin-top', cvs_common_header_height + 20);
    }
  });
})(window.jQuery, window.Drupal);

(function () {
	window.onpageshow = function(event) {
		if (event.persisted) {
			window.location.reload();
		}
	};
})();

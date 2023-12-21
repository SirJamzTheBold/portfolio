/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./scripts/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./scripts/accessible_forms.js":
/*!*************************************!*\
  !*** ./scripts/accessible_forms.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function ($, Drupal) {
  $(function ($, Drupal) {
    var updateTelephone = function (string_raw) {
      var string_unformatted = string_raw.replaceAll(/\D/g, ''),
          string_formatted = '',
          string_length = string_unformatted.length;

      if (string_length < 4) {
        string_formatted = string_unformatted;
      } else if (string_length >= 4 && string_length < 7) {
        string_formatted = string_unformatted.slice(0, 3) + '-' + string_unformatted.slice(3, 6);
      } else if (string_length >= 7) {
        string_formatted = string_unformatted.slice(0, 3) + '-' + string_unformatted.slice(3, 6) + '-' + string_unformatted.slice(6, 10);
      }

      return string_formatted;
    }; //Required form fields


    $('.paragraph--type--csk-form-component .form-required').each(function () {
      if (!$(this).hasClass('star-added')) {
        $(this).append('&nbsp;<span class="required-symbol">*</span>').addClass('star-added');
      }
    }); //Auto format the telephone as the user enters it.

    $(document).on('keyup', 'form .form-tel', function () {
      $(this).val(updateTelephone($(this).val()));
    });
    $(document).on('change', 'form .form-tel', function () {
      $(this).val(updateTelephone($(this).val()));
    });
    var inline_error_counter = 0;
    $('form.accessible-ajax-webform .js-webform-checkboxes').on('keydown', function (event) {
      //Right or Down
      if (event.keyCode == 39 || event.keyCode == 40) {
        setVoiceOverFocus($(document.activeElement).parents('.js-form-item').next('.js-form-item').children('input')); //Left or Up
      } else if (event.keyCode == 37 || event.keyCode == 38) {
        setVoiceOverFocus($(document.activeElement).parents('.js-form-item').prev('.js-form-item').children('input'));
      }
    });
    $('form.accessible-ajax-webform .js-webform-checkboxes-other').removeAttr('aria-required');

    if ($('.webform-confirmation .webform-confirmation__message').length) {
      $('.webform-confirmation .webform-confirmation__message').focus();
      setVoiceOverFocus($('.webform-confirmation .webform-confirmation__message'));
    }

    $(document).ajaxStop(function (e) {
      if ($('form.accessible-ajax-webform').length) {
        e.preventDefault();
        $('form.accessible-ajax-webform .js-webform-checkboxes-other').removeAttr('aria-required');
        $('form.accessible-ajax-webform h1').attr('id', 'main-content-title').attr('tabindex', '-1');

        if ($('form.accessible-ajax-webform .messages--error').length) {
          $('form.accessible-ajax-webform .messages--error').attr('tabindex', '-1').attr('role', 'dialog');
          $('form.accessible-ajax-webform .messages--error h2.visually-hidden').remove();
          $('form.accessible-ajax-webform .messages--error').removeAttr('aria-label').attr('aria-labelledby', 'csk-form-error');
          var error_counter = $('form.accessible-ajax-webform .messages--error .messages__list .messages__item').length;
          $('form.accessible-ajax-webform .messages--error .messages__list .messages__item').each(function () {
            $(this).html($(this).html().replace(' * ', ' '));
            $(this).html($(this).html().replace(' (000-000-0000) ', ' '));
          });

          if (error_counter < 2) {
            list_html = '<h2 id="csk-form-error">1 error has been found: </h2>';
          } else {
            list_html = '<h2 id="csk-form-error">' + error_counter + ' errors have been found: </h2>';
          }

          $('form.accessible-ajax-webform  .form-item .error').each(function () {
            var message = '<div class="supplemental-error-message">A valid ' + $(this).siblings('label').first().text().toLowerCase().replace('(000-000-0000)', '') + ' is required</div>';
            $(this).after(message);
          }); //Required form fields

          $('.paragraph--type--csk-form-component .form-required').each(function () {
            if (!$(this).hasClass('star-added')) {
              $(this).append('&nbsp;<span class="required-symbol">*</span>').addClass('star-added');
            }
          });
          $('form.accessible-ajax-webform .messages--error div[role="alert"] .item-list').remove();
          $('form.accessible-ajax-webform .messages--error div[role="alert"]').prepend(list_html);
          $('form.accessible-ajax-webform .messages--error div[role="alert"]').removeAttr('role');
          $('form.accessible-ajax-webform .messages--error').focus();
          setVoiceOverFocus($('form.accessible-ajax-webform .messages--error'));
        } else if ($('form.accessible-ajax-webform .webform-confirmation').length) {
          $('form.accessible-ajax-webform .webform-confirmation').attr('tabindex', '0').attr('role', 'dialog');
          $('form.accessible-ajax-webform .webform-confirmation').focus();
          setVoiceOverFocus($('form.accessible-ajax-webform .webform-confirmation'));
        }

        $('.form-item--error-message').each(function () {
          $(this).attr('id', 'inline-error-message-' + inline_error_counter);
          var form_input = $(this).siblings('input, select').first(); //Update inline error message for email address

          if (form_input.attr('data-drupal-selector') == 'edit-email-address') {
            $(this).html('<strong>Email address is required</strong>');
          }

          if (form_input.length) {
            form_input.attr('aria-describedby', 'inline-error-message-' + inline_error_counter);

            if (form_input.siblings('.description').length) {
              form_input.attr('aria-describedby', 'inline-error-message-' + inline_error_counter + ' ' + form_input.siblings('.description').children().first().attr('id'));
            } else {
              form_input.attr('aria-describedby', 'inline-error-message-' + inline_error_counter);
            }
          } else {
            var form_fieldset = $(this).parents('.fieldset-wrapper').parents('fieldset');

            if (form_fieldset.length) {
              form_fieldset.attr('aria-describedby', 'inline-error-message-' + inline_error_counter);
            }
          }

          inline_error_counter++;
        });
      } else {
        return true;
      }
    });
    var canvas_elements = $('.field--name-field-dx8-layout-canvas').children().length,
        canvas_webform_elements = $('.field--name-field-dx8-layout-canvas').children('.field--name-field-webform').length,
        is_admin = $('#toolbar-administration').length;

    if (canvas_elements == 1 && canvas_webform_elements == 1 && is_admin == 0) {
      $('head').prepend('<style>' + '#at4-share a:focus,' + '#block-followus a:focus,' + '#cvs-common-header button:focus,' + '#cvs-common-header a:focus,' + '.main-footer button:focus,' + '.main-footer a:focus {' + 'border: 4px solid #80BFFE !important;' + '}' + '</style>');
    }
  });
})(window.jQuery, window.Drupal);

/***/ }),

/***/ "./scripts/main.js":
/*!*************************!*\
  !*** ./scripts/main.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../style/style.scss */ "./style/style.scss");
/* harmony import */ var _style_style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_style_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _accessible_forms_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./accessible_forms.js */ "./scripts/accessible_forms.js");
/* harmony import */ var _accessible_forms_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_accessible_forms_js__WEBPACK_IMPORTED_MODULE_1__);
//import Main Sass file for webpack compilation
 //Import JS



(function ($, Drupal) {
  $(document).ready(function () {
    //adjust header if toolbar is there.
    if ($('#toolbar-administration').length) {
      $('header').addClass('header-with-toolbar');
    } // SKip to main nav link functionality
    // Find if an h1 exists and if so, give it the ID and tabindex


    if ($('main').find('h1').length) {
      if ($('main h1 a').length) {
        $('main h1 a').first().attr('id', 'main-content-title').attr('tabindex', 0);
      } else {
        $('main h1').first().attr('id', 'main-content-title').attr('tabindex', -1);
      }
    } // Else if h1 DNE, find if an h2 exists and if so, give it the ID and tabindex
    else if ($('main').find('h2').length) {
        if ($('main h2 a').length) {
          $('main h2 a').first().attr('id', 'main-content-title').attr('tabindex', 0);
        } else {
          $('main h2').first().attr('id', 'main-content-title').attr('tabindex', -1);
        }
      } else {
        return;
      }

    $('#skip-link-container a').click(function (event) {
      event.preventDefault();
      setVoiceOverFocus($('#main-content-title'));

      if ($('#main-content-title')[0].tagName != 'A') {
        $('#main-content-title').attr('tabindex', '-1');
      }
    });
    $('#skip-link-container a').on("keydown", function (event) {
      if (event.keyCode == 32 || event.keyCode == 13) {
        event.preventDefault();
        $('#skip-link-container a').trigger('click');
        setVoiceOverFocus($('#main-content-title'));

        if ($('#main-content-title')[0].tagName != 'A') {
          $('#main-content-title').attr('tabindex', '-1');
        }
      }
    }); //Add video play/pause functionality.

    var iframes = $('iframe');
    iframes.each(function () {
      var iframe_src = $(this).attr('src').slice(0, 24);

      if (iframe_src == 'https://player.vimeo.com') {
        var player = new Vimeo.Player(this),
            controls = $(this).siblings('.controls'),
            play_btn = controls.children('.controls-play'),
            pause_btn = controls.children('.controls-pause');
        pause_btn.show();
        controls.on('click', function (e) {
          e.preventDefault();
          player.getPaused().then(function (paused) {
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

    var setVoiceOverFocus = function (element) {
      var focusInterval = 10; // ms, time between function calls

      var focusTotalRepetitions = 10; // number of repetitions

      element.attr('tabindex', '0');
      element.blur();
      var focusRepetitions = 0;
      var interval = window.setInterval(function () {
        element.focus();
        focusRepetitions++;

        if (focusRepetitions >= focusTotalRepetitions) {
          window.clearInterval(interval);
        }
      }, focusInterval);
    };
  });
})(window.jQuery, window.Drupal);

/***/ }),

/***/ "./style/style.scss":
/*!**************************!*\
  !*** ./style/style.scss ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hY2Nlc3NpYmxlX2Zvcm1zLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zdHlsZS9zdHlsZS5zY3NzPzIwODYiXSwibmFtZXMiOlsiJCIsIkRydXBhbCIsInVwZGF0ZVRlbGVwaG9uZSIsInN0cmluZ19yYXciLCJzdHJpbmdfdW5mb3JtYXR0ZWQiLCJyZXBsYWNlQWxsIiwic3RyaW5nX2Zvcm1hdHRlZCIsInN0cmluZ19sZW5ndGgiLCJsZW5ndGgiLCJzbGljZSIsImVhY2giLCJoYXNDbGFzcyIsImFwcGVuZCIsImFkZENsYXNzIiwiZG9jdW1lbnQiLCJvbiIsInZhbCIsImlubGluZV9lcnJvcl9jb3VudGVyIiwiZXZlbnQiLCJrZXlDb2RlIiwic2V0Vm9pY2VPdmVyRm9jdXMiLCJhY3RpdmVFbGVtZW50IiwicGFyZW50cyIsIm5leHQiLCJjaGlsZHJlbiIsInByZXYiLCJyZW1vdmVBdHRyIiwiZm9jdXMiLCJhamF4U3RvcCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImF0dHIiLCJyZW1vdmUiLCJlcnJvcl9jb3VudGVyIiwiaHRtbCIsInJlcGxhY2UiLCJsaXN0X2h0bWwiLCJtZXNzYWdlIiwic2libGluZ3MiLCJmaXJzdCIsInRleHQiLCJ0b0xvd2VyQ2FzZSIsImFmdGVyIiwicHJlcGVuZCIsImZvcm1faW5wdXQiLCJmb3JtX2ZpZWxkc2V0IiwiY2FudmFzX2VsZW1lbnRzIiwiY2FudmFzX3dlYmZvcm1fZWxlbWVudHMiLCJpc19hZG1pbiIsIndpbmRvdyIsImpRdWVyeSIsInJlYWR5IiwiZmluZCIsImNsaWNrIiwidGFnTmFtZSIsInRyaWdnZXIiLCJpZnJhbWVzIiwiaWZyYW1lX3NyYyIsInBsYXllciIsIlZpbWVvIiwiUGxheWVyIiwiY29udHJvbHMiLCJwbGF5X2J0biIsInBhdXNlX2J0biIsInNob3ciLCJnZXRQYXVzZWQiLCJ0aGVuIiwicGF1c2VkIiwicGxheSIsImhpZGUiLCJwYXVzZSIsImVsZW1lbnQiLCJmb2N1c0ludGVydmFsIiwiZm9jdXNUb3RhbFJlcGV0aXRpb25zIiwiYmx1ciIsImZvY3VzUmVwZXRpdGlvbnMiLCJpbnRlcnZhbCIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLENBQUMsVUFBU0EsQ0FBVCxFQUFZQyxNQUFaLEVBQW1CO0FBQ2xCRCxHQUFDLENBQUMsVUFBU0EsQ0FBVCxFQUFZQyxNQUFaLEVBQW1CO0FBQ25CLFFBQUlDLGVBQWUsR0FBRyxVQUFTQyxVQUFULEVBQXFCO0FBQ3pDLFVBQUlDLGtCQUFrQixHQUFHRCxVQUFVLENBQUNFLFVBQVgsQ0FBc0IsS0FBdEIsRUFBNkIsRUFBN0IsQ0FBekI7QUFBQSxVQUNFQyxnQkFBZ0IsR0FBRyxFQURyQjtBQUFBLFVBRUVDLGFBQWEsR0FBR0gsa0JBQWtCLENBQUNJLE1BRnJDOztBQUlBLFVBQUlELGFBQWEsR0FBRyxDQUFwQixFQUF1QjtBQUNyQkQsd0JBQWdCLEdBQUdGLGtCQUFuQjtBQUNELE9BRkQsTUFFTyxJQUFJRyxhQUFhLElBQUksQ0FBakIsSUFBc0JBLGFBQWEsR0FBRyxDQUExQyxFQUE2QztBQUNsREQsd0JBQWdCLEdBQUdGLGtCQUFrQixDQUFDSyxLQUFuQixDQUF5QixDQUF6QixFQUE0QixDQUE1QixJQUFpQyxHQUFqQyxHQUF3Q0wsa0JBQWtCLENBQUNLLEtBQW5CLENBQXlCLENBQXpCLEVBQTRCLENBQTVCLENBQTNEO0FBQ0QsT0FGTSxNQUVBLElBQUlGLGFBQWEsSUFBSSxDQUFyQixFQUF3QjtBQUM3QkQsd0JBQWdCLEdBQUdGLGtCQUFrQixDQUFDSyxLQUFuQixDQUF5QixDQUF6QixFQUE0QixDQUE1QixJQUFpQyxHQUFqQyxHQUF3Q0wsa0JBQWtCLENBQUNLLEtBQW5CLENBQXlCLENBQXpCLEVBQTRCLENBQTVCLENBQXhDLEdBQXlFLEdBQXpFLEdBQStFTCxrQkFBa0IsQ0FBQ0ssS0FBbkIsQ0FBeUIsQ0FBekIsRUFBNEIsRUFBNUIsQ0FBbEc7QUFDRDs7QUFFRCxhQUFPSCxnQkFBUDtBQUNELEtBZEQsQ0FEbUIsQ0FpQm5COzs7QUFDQU4sS0FBQyxDQUFDLHFEQUFELENBQUQsQ0FBeURVLElBQXpELENBQThELFlBQVc7QUFDdkUsVUFBSSxDQUFDVixDQUFDLENBQUMsSUFBRCxDQUFELENBQVFXLFFBQVIsQ0FBaUIsWUFBakIsQ0FBTCxFQUFxQztBQUNuQ1gsU0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRWSxNQUFSLENBQWUsOENBQWYsRUFBK0RDLFFBQS9ELENBQXdFLFlBQXhFO0FBQ0Q7QUFDRixLQUpELEVBbEJtQixDQXdCbkI7O0FBQ0FiLEtBQUMsQ0FBQ2MsUUFBRCxDQUFELENBQVlDLEVBQVosQ0FBZSxPQUFmLEVBQXdCLGdCQUF4QixFQUEwQyxZQUFZO0FBQ3BEZixPQUFDLENBQUMsSUFBRCxDQUFELENBQVFnQixHQUFSLENBQVlkLGVBQWUsQ0FBQ0YsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRZ0IsR0FBUixFQUFELENBQTNCO0FBQ0QsS0FGRDtBQUlBaEIsS0FBQyxDQUFDYyxRQUFELENBQUQsQ0FBWUMsRUFBWixDQUFlLFFBQWYsRUFBeUIsZ0JBQXpCLEVBQTJDLFlBQVk7QUFDckRmLE9BQUMsQ0FBQyxJQUFELENBQUQsQ0FBUWdCLEdBQVIsQ0FBWWQsZUFBZSxDQUFDRixDQUFDLENBQUMsSUFBRCxDQUFELENBQVFnQixHQUFSLEVBQUQsQ0FBM0I7QUFDRCxLQUZEO0FBSUEsUUFBSUMsb0JBQW9CLEdBQUcsQ0FBM0I7QUFFQWpCLEtBQUMsQ0FBQyxxREFBRCxDQUFELENBQXlEZSxFQUF6RCxDQUE0RCxTQUE1RCxFQUF1RSxVQUFTRyxLQUFULEVBQWdCO0FBQ3JGO0FBQ0EsVUFBSUEsS0FBSyxDQUFDQyxPQUFOLElBQWlCLEVBQWpCLElBQXVCRCxLQUFLLENBQUNDLE9BQU4sSUFBaUIsRUFBNUMsRUFBZ0Q7QUFDOUNDLHlCQUFpQixDQUFDcEIsQ0FBQyxDQUFDYyxRQUFRLENBQUNPLGFBQVYsQ0FBRCxDQUEwQkMsT0FBMUIsQ0FBa0MsZUFBbEMsRUFBbURDLElBQW5ELENBQXdELGVBQXhELEVBQXlFQyxRQUF6RSxDQUFrRixPQUFsRixDQUFELENBQWpCLENBRDhDLENBR2hEO0FBQ0MsT0FKRCxNQUlPLElBQUlOLEtBQUssQ0FBQ0MsT0FBTixJQUFpQixFQUFqQixJQUF1QkQsS0FBSyxDQUFDQyxPQUFOLElBQWlCLEVBQTVDLEVBQWdEO0FBQ3JEQyx5QkFBaUIsQ0FBQ3BCLENBQUMsQ0FBQ2MsUUFBUSxDQUFDTyxhQUFWLENBQUQsQ0FBMEJDLE9BQTFCLENBQWtDLGVBQWxDLEVBQW1ERyxJQUFuRCxDQUF3RCxlQUF4RCxFQUF5RUQsUUFBekUsQ0FBa0YsT0FBbEYsQ0FBRCxDQUFqQjtBQUNEO0FBQ0YsS0FURDtBQVdBeEIsS0FBQyxDQUFDLDJEQUFELENBQUQsQ0FBK0QwQixVQUEvRCxDQUEwRSxlQUExRTs7QUFFQSxRQUFJMUIsQ0FBQyxDQUFDLHNEQUFELENBQUQsQ0FBMERRLE1BQTlELEVBQXNFO0FBQ3BFUixPQUFDLENBQUMsc0RBQUQsQ0FBRCxDQUEwRDJCLEtBQTFEO0FBQ0FQLHVCQUFpQixDQUFDcEIsQ0FBQyxDQUFDLHNEQUFELENBQUYsQ0FBakI7QUFDRDs7QUFFREEsS0FBQyxDQUFDYyxRQUFELENBQUQsQ0FBWWMsUUFBWixDQUFxQixVQUFTQyxDQUFULEVBQVk7QUFDL0IsVUFBSTdCLENBQUMsQ0FBQyw4QkFBRCxDQUFELENBQWtDUSxNQUF0QyxFQUE4QztBQUM1Q3FCLFNBQUMsQ0FBQ0MsY0FBRjtBQUNBOUIsU0FBQyxDQUFDLDJEQUFELENBQUQsQ0FBK0QwQixVQUEvRCxDQUEwRSxlQUExRTtBQUNBMUIsU0FBQyxDQUFDLGlDQUFELENBQUQsQ0FBcUMrQixJQUFyQyxDQUEwQyxJQUExQyxFQUFnRCxvQkFBaEQsRUFBc0VBLElBQXRFLENBQTJFLFVBQTNFLEVBQXVGLElBQXZGOztBQUVBLFlBQUkvQixDQUFDLENBQUMsK0NBQUQsQ0FBRCxDQUFtRFEsTUFBdkQsRUFBK0Q7QUFDN0RSLFdBQUMsQ0FBQywrQ0FBRCxDQUFELENBQW1EK0IsSUFBbkQsQ0FBd0QsVUFBeEQsRUFBb0UsSUFBcEUsRUFBMEVBLElBQTFFLENBQStFLE1BQS9FLEVBQXVGLFFBQXZGO0FBQ0EvQixXQUFDLENBQUMsa0VBQUQsQ0FBRCxDQUFzRWdDLE1BQXRFO0FBQ0FoQyxXQUFDLENBQUMsK0NBQUQsQ0FBRCxDQUFtRDBCLFVBQW5ELENBQThELFlBQTlELEVBQTRFSyxJQUE1RSxDQUFpRixpQkFBakYsRUFBb0csZ0JBQXBHO0FBRUEsY0FBSUUsYUFBYSxHQUFHakMsQ0FBQyxDQUFDLCtFQUFELENBQUQsQ0FBbUZRLE1BQXZHO0FBRUFSLFdBQUMsQ0FBQywrRUFBRCxDQUFELENBQW1GVSxJQUFuRixDQUF3RixZQUFXO0FBQ2pHVixhQUFDLENBQUMsSUFBRCxDQUFELENBQVFrQyxJQUFSLENBQWFsQyxDQUFDLENBQUMsSUFBRCxDQUFELENBQVFrQyxJQUFSLEdBQWVDLE9BQWYsQ0FBdUIsS0FBdkIsRUFBOEIsR0FBOUIsQ0FBYjtBQUNBbkMsYUFBQyxDQUFDLElBQUQsQ0FBRCxDQUFRa0MsSUFBUixDQUFhbEMsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRa0MsSUFBUixHQUFlQyxPQUFmLENBQXVCLGtCQUF2QixFQUEyQyxHQUEzQyxDQUFiO0FBQ0QsV0FIRDs7QUFLQSxjQUFJRixhQUFhLEdBQUcsQ0FBcEIsRUFBdUI7QUFDckJHLHFCQUFTLEdBQUcsdURBQVo7QUFDRCxXQUZELE1BRU87QUFDTEEscUJBQVMsR0FBRyw2QkFBNkJILGFBQTdCLEdBQTZDLGdDQUF6RDtBQUNEOztBQUVEakMsV0FBQyxDQUFDLGlEQUFELENBQUQsQ0FBcURVLElBQXJELENBQTBELFlBQVc7QUFDbkUsZ0JBQUkyQixPQUFPLEdBQUcscURBQXFEckMsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRc0MsUUFBUixDQUFpQixPQUFqQixFQUEwQkMsS0FBMUIsR0FBa0NDLElBQWxDLEdBQXlDQyxXQUF6QyxHQUF1RE4sT0FBdkQsQ0FBK0QsZ0JBQS9ELEVBQWlGLEVBQWpGLENBQXJELEdBQTRJLG9CQUExSjtBQUNBbkMsYUFBQyxDQUFDLElBQUQsQ0FBRCxDQUFRMEMsS0FBUixDQUFjTCxPQUFkO0FBQ0QsV0FIRCxFQWxCNkQsQ0F1QjdEOztBQUNBckMsV0FBQyxDQUFDLHFEQUFELENBQUQsQ0FBeURVLElBQXpELENBQThELFlBQVc7QUFDdkUsZ0JBQUksQ0FBQ1YsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRVyxRQUFSLENBQWlCLFlBQWpCLENBQUwsRUFBcUM7QUFDbkNYLGVBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUVksTUFBUixDQUFlLDhDQUFmLEVBQStEQyxRQUEvRCxDQUF3RSxZQUF4RTtBQUNEO0FBQ0YsV0FKRDtBQU1BYixXQUFDLENBQUMsNEVBQUQsQ0FBRCxDQUFnRmdDLE1BQWhGO0FBQ0FoQyxXQUFDLENBQUMsaUVBQUQsQ0FBRCxDQUFxRTJDLE9BQXJFLENBQTZFUCxTQUE3RTtBQUNBcEMsV0FBQyxDQUFDLGlFQUFELENBQUQsQ0FBcUUwQixVQUFyRSxDQUFnRixNQUFoRjtBQUVBMUIsV0FBQyxDQUFDLCtDQUFELENBQUQsQ0FBbUQyQixLQUFuRDtBQUNBUCwyQkFBaUIsQ0FBQ3BCLENBQUMsQ0FBQywrQ0FBRCxDQUFGLENBQWpCO0FBQ0QsU0FwQ0QsTUFvQ08sSUFBSUEsQ0FBQyxDQUFDLG9EQUFELENBQUQsQ0FBd0RRLE1BQTVELEVBQW9FO0FBQ3pFUixXQUFDLENBQUMsb0RBQUQsQ0FBRCxDQUF3RCtCLElBQXhELENBQTZELFVBQTdELEVBQXlFLEdBQXpFLEVBQThFQSxJQUE5RSxDQUFtRixNQUFuRixFQUEyRixRQUEzRjtBQUNBL0IsV0FBQyxDQUFDLG9EQUFELENBQUQsQ0FBd0QyQixLQUF4RDtBQUNBUCwyQkFBaUIsQ0FBQ3BCLENBQUMsQ0FBQyxvREFBRCxDQUFGLENBQWpCO0FBQ0Q7O0FBRURBLFNBQUMsQ0FBQywyQkFBRCxDQUFELENBQStCVSxJQUEvQixDQUFvQyxZQUFXO0FBQzdDVixXQUFDLENBQUMsSUFBRCxDQUFELENBQVErQixJQUFSLENBQWEsSUFBYixFQUFtQiwwQkFBMEJkLG9CQUE3QztBQUNBLGNBQUkyQixVQUFVLEdBQUc1QyxDQUFDLENBQUMsSUFBRCxDQUFELENBQVFzQyxRQUFSLENBQWlCLGVBQWpCLEVBQWtDQyxLQUFsQyxFQUFqQixDQUY2QyxDQUk3Qzs7QUFDQSxjQUFJSyxVQUFVLENBQUNiLElBQVgsQ0FBZ0Isc0JBQWhCLEtBQTJDLG9CQUEvQyxFQUFxRTtBQUNuRS9CLGFBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUWtDLElBQVIsQ0FBYSw0Q0FBYjtBQUNEOztBQUVELGNBQUlVLFVBQVUsQ0FBQ3BDLE1BQWYsRUFBdUI7QUFDckJvQyxzQkFBVSxDQUFDYixJQUFYLENBQWdCLGtCQUFoQixFQUFvQywwQkFBMEJkLG9CQUE5RDs7QUFDQSxnQkFBSTJCLFVBQVUsQ0FBQ04sUUFBWCxDQUFvQixjQUFwQixFQUFvQzlCLE1BQXhDLEVBQWdEO0FBQzlDb0Msd0JBQVUsQ0FBQ2IsSUFBWCxDQUFnQixrQkFBaEIsRUFBb0MsMEJBQTBCZCxvQkFBMUIsR0FBaUQsR0FBakQsR0FBdUQyQixVQUFVLENBQUNOLFFBQVgsQ0FBb0IsY0FBcEIsRUFBb0NkLFFBQXBDLEdBQStDZSxLQUEvQyxHQUF1RFIsSUFBdkQsQ0FBNEQsSUFBNUQsQ0FBM0Y7QUFDRCxhQUZELE1BRU87QUFDTGEsd0JBQVUsQ0FBQ2IsSUFBWCxDQUFnQixrQkFBaEIsRUFBb0MsMEJBQTBCZCxvQkFBOUQ7QUFDRDtBQUNGLFdBUEQsTUFPTztBQUNMLGdCQUFJNEIsYUFBYSxHQUFHN0MsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRc0IsT0FBUixDQUFnQixtQkFBaEIsRUFBcUNBLE9BQXJDLENBQTZDLFVBQTdDLENBQXBCOztBQUNBLGdCQUFJdUIsYUFBYSxDQUFDckMsTUFBbEIsRUFBMEI7QUFDeEJxQywyQkFBYSxDQUFDZCxJQUFkLENBQW1CLGtCQUFuQixFQUF1QywwQkFBMEJkLG9CQUFqRTtBQUNEO0FBQ0Y7O0FBRURBLDhCQUFvQjtBQUNyQixTQXhCRDtBQXlCRCxPQXhFRCxNQXdFTztBQUNMLGVBQU8sSUFBUDtBQUNEO0FBQ0YsS0E1RUQ7QUE4RUEsUUFBSTZCLGVBQWUsR0FBRzlDLENBQUMsQ0FBQyxzQ0FBRCxDQUFELENBQTBDd0IsUUFBMUMsR0FBcURoQixNQUEzRTtBQUFBLFFBQ0V1Qyx1QkFBdUIsR0FBRy9DLENBQUMsQ0FBQyxzQ0FBRCxDQUFELENBQTBDd0IsUUFBMUMsQ0FBbUQsNEJBQW5ELEVBQWlGaEIsTUFEN0c7QUFBQSxRQUVFd0MsUUFBUSxHQUFHaEQsQ0FBQyxDQUFDLHlCQUFELENBQUQsQ0FBNkJRLE1BRjFDOztBQUlBLFFBQUlzQyxlQUFlLElBQUksQ0FBbkIsSUFBd0JDLHVCQUF1QixJQUFJLENBQW5ELElBQXdEQyxRQUFRLElBQUksQ0FBeEUsRUFBMkU7QUFDekVoRCxPQUFDLENBQUMsTUFBRCxDQUFELENBQVUyQyxPQUFWLENBQWtCLFlBQ2QscUJBRGMsR0FFZCwwQkFGYyxHQUdkLGtDQUhjLEdBSWQsNkJBSmMsR0FLZCw0QkFMYyxHQU1kLHdCQU5jLEdBT1YsdUNBUFUsR0FRZCxHQVJjLEdBU2QsVUFUSjtBQVVEO0FBQ0YsR0FuSkEsQ0FBRDtBQW9KRCxDQXJKRCxFQXFKR00sTUFBTSxDQUFDQyxNQXJKVixFQXFKa0JELE1BQU0sQ0FBQ2hELE1Bckp6QixFOzs7Ozs7Ozs7Ozs7QUNBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Q0FHQTs7QUFDQTs7QUFFQSxDQUFDLFVBQVVELENBQVYsRUFBYUMsTUFBYixFQUFxQjtBQUNwQkQsR0FBQyxDQUFDYyxRQUFELENBQUQsQ0FBWXFDLEtBQVosQ0FBa0IsWUFBWTtBQUM1QjtBQUNBLFFBQUluRCxDQUFDLENBQUMseUJBQUQsQ0FBRCxDQUE2QlEsTUFBakMsRUFBeUM7QUFDdkNSLE9BQUMsQ0FBQyxRQUFELENBQUQsQ0FBWWEsUUFBWixDQUFxQixxQkFBckI7QUFDRCxLQUoyQixDQU01QjtBQUVBOzs7QUFDQSxRQUFHYixDQUFDLENBQUMsTUFBRCxDQUFELENBQVVvRCxJQUFWLENBQWUsSUFBZixFQUFxQjVDLE1BQXhCLEVBQStCO0FBQzdCLFVBQUlSLENBQUMsQ0FBQyxXQUFELENBQUQsQ0FBZVEsTUFBbkIsRUFBMkI7QUFDekJSLFNBQUMsQ0FBQyxXQUFELENBQUQsQ0FBZXVDLEtBQWYsR0FBdUJSLElBQXZCLENBQTRCLElBQTVCLEVBQWlDLG9CQUFqQyxFQUF1REEsSUFBdkQsQ0FBNEQsVUFBNUQsRUFBdUUsQ0FBdkU7QUFDRCxPQUZELE1BRU87QUFDTC9CLFNBQUMsQ0FBQyxTQUFELENBQUQsQ0FBYXVDLEtBQWIsR0FBcUJSLElBQXJCLENBQTBCLElBQTFCLEVBQStCLG9CQUEvQixFQUFxREEsSUFBckQsQ0FBMEQsVUFBMUQsRUFBcUUsQ0FBQyxDQUF0RTtBQUNEO0FBQ0YsS0FORCxDQU9BO0FBUEEsU0FRSyxJQUFHL0IsQ0FBQyxDQUFDLE1BQUQsQ0FBRCxDQUFVb0QsSUFBVixDQUFlLElBQWYsRUFBcUI1QyxNQUF4QixFQUFnQztBQUNuQyxZQUFJUixDQUFDLENBQUMsV0FBRCxDQUFELENBQWVRLE1BQW5CLEVBQTJCO0FBQ3pCUixXQUFDLENBQUMsV0FBRCxDQUFELENBQWV1QyxLQUFmLEdBQXVCUixJQUF2QixDQUE0QixJQUE1QixFQUFpQyxvQkFBakMsRUFBdURBLElBQXZELENBQTRELFVBQTVELEVBQXVFLENBQXZFO0FBQ0QsU0FGRCxNQUVPO0FBQ0wvQixXQUFDLENBQUMsU0FBRCxDQUFELENBQWF1QyxLQUFiLEdBQXFCUixJQUFyQixDQUEwQixJQUExQixFQUErQixvQkFBL0IsRUFBcURBLElBQXJELENBQTBELFVBQTFELEVBQXFFLENBQUMsQ0FBdEU7QUFDRDtBQUNGLE9BTkksTUFPQTtBQUNIO0FBQ0Q7O0FBRUQvQixLQUFDLENBQUMsd0JBQUQsQ0FBRCxDQUE0QnFELEtBQTVCLENBQWtDLFVBQVNuQyxLQUFULEVBQWdCO0FBQ2hEQSxXQUFLLENBQUNZLGNBQU47QUFDQVYsdUJBQWlCLENBQUNwQixDQUFDLENBQUMscUJBQUQsQ0FBRixDQUFqQjs7QUFFQSxVQUFJQSxDQUFDLENBQUMscUJBQUQsQ0FBRCxDQUF5QixDQUF6QixFQUE0QnNELE9BQTVCLElBQXVDLEdBQTNDLEVBQWdEO0FBQzlDdEQsU0FBQyxDQUFDLHFCQUFELENBQUQsQ0FBeUIrQixJQUF6QixDQUE4QixVQUE5QixFQUEwQyxJQUExQztBQUNEO0FBQ0YsS0FQRDtBQVNBL0IsS0FBQyxDQUFDLHdCQUFELENBQUQsQ0FBNEJlLEVBQTVCLENBQStCLFNBQS9CLEVBQTBDLFVBQVNHLEtBQVQsRUFBZ0I7QUFDeEQsVUFBR0EsS0FBSyxDQUFDQyxPQUFOLElBQWlCLEVBQWpCLElBQXVCRCxLQUFLLENBQUNDLE9BQU4sSUFBaUIsRUFBM0MsRUFBOEM7QUFDNUNELGFBQUssQ0FBQ1ksY0FBTjtBQUNBOUIsU0FBQyxDQUFDLHdCQUFELENBQUQsQ0FBNEJ1RCxPQUE1QixDQUFvQyxPQUFwQztBQUNBbkMseUJBQWlCLENBQUNwQixDQUFDLENBQUMscUJBQUQsQ0FBRixDQUFqQjs7QUFFQSxZQUFJQSxDQUFDLENBQUMscUJBQUQsQ0FBRCxDQUF5QixDQUF6QixFQUE0QnNELE9BQTVCLElBQXVDLEdBQTNDLEVBQWdEO0FBQzlDdEQsV0FBQyxDQUFDLHFCQUFELENBQUQsQ0FBeUIrQixJQUF6QixDQUE4QixVQUE5QixFQUEwQyxJQUExQztBQUNEO0FBQ0Y7QUFDRixLQVZELEVBckM0QixDQWlENUI7O0FBQ0EsUUFBSXlCLE9BQU8sR0FBR3hELENBQUMsQ0FBQyxRQUFELENBQWY7QUFFQXdELFdBQU8sQ0FBQzlDLElBQVIsQ0FBYSxZQUFXO0FBQ3RCLFVBQUkrQyxVQUFVLEdBQUd6RCxDQUFDLENBQUMsSUFBRCxDQUFELENBQVErQixJQUFSLENBQWEsS0FBYixFQUFvQnRCLEtBQXBCLENBQTBCLENBQTFCLEVBQTZCLEVBQTdCLENBQWpCOztBQUNBLFVBQUlnRCxVQUFVLElBQUksMEJBQWxCLEVBQThDO0FBQzVDLFlBQUlDLE1BQU0sR0FBRyxJQUFJQyxLQUFLLENBQUNDLE1BQVYsQ0FBaUIsSUFBakIsQ0FBYjtBQUFBLFlBQ0VDLFFBQVEsR0FBRzdELENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUXNDLFFBQVIsQ0FBaUIsV0FBakIsQ0FEYjtBQUFBLFlBRUV3QixRQUFRLEdBQUdELFFBQVEsQ0FBQ3JDLFFBQVQsQ0FBa0IsZ0JBQWxCLENBRmI7QUFBQSxZQUdFdUMsU0FBUyxHQUFHRixRQUFRLENBQUNyQyxRQUFULENBQWtCLGlCQUFsQixDQUhkO0FBS0V1QyxpQkFBUyxDQUFDQyxJQUFWO0FBRUZILGdCQUFRLENBQUM5QyxFQUFULENBQVksT0FBWixFQUFxQixVQUFTYyxDQUFULEVBQVk7QUFDL0JBLFdBQUMsQ0FBQ0MsY0FBRjtBQUNBNEIsZ0JBQU0sQ0FBQ08sU0FBUCxHQUFtQkMsSUFBbkIsQ0FBd0IsVUFBU0MsTUFBVCxFQUFpQjtBQUN2QyxnQkFBSUEsTUFBSixFQUFZO0FBQ1ZULG9CQUFNLENBQUNVLElBQVA7QUFDQUwsdUJBQVMsQ0FBQ0MsSUFBVjtBQUNBRixzQkFBUSxDQUFDTyxJQUFUO0FBQ0QsYUFKRCxNQUlPO0FBQ0xYLG9CQUFNLENBQUNZLEtBQVA7QUFDQVIsc0JBQVEsQ0FBQ0UsSUFBVDtBQUNBRCx1QkFBUyxDQUFDTSxJQUFWO0FBQ0Q7QUFDRixXQVZEO0FBV0QsU0FiRDtBQWNEO0FBQ0YsS0F6QkQ7QUEyQkE7O0FBQ0EsUUFBSWpELGlCQUFpQixHQUFHLFVBQVNtRCxPQUFULEVBQWtCO0FBQ3hDLFVBQUlDLGFBQWEsR0FBRyxFQUFwQixDQUR3QyxDQUNoQjs7QUFDeEIsVUFBSUMscUJBQXFCLEdBQUcsRUFBNUIsQ0FGd0MsQ0FFUjs7QUFFaENGLGFBQU8sQ0FBQ3hDLElBQVIsQ0FBYSxVQUFiLEVBQXlCLEdBQXpCO0FBQ0F3QyxhQUFPLENBQUNHLElBQVI7QUFFQSxVQUFJQyxnQkFBZ0IsR0FBRyxDQUF2QjtBQUNBLFVBQUlDLFFBQVEsR0FBRzNCLE1BQU0sQ0FBQzRCLFdBQVAsQ0FBbUIsWUFBVztBQUMzQ04sZUFBTyxDQUFDNUMsS0FBUjtBQUNBZ0Qsd0JBQWdCOztBQUNoQixZQUFJQSxnQkFBZ0IsSUFBSUYscUJBQXhCLEVBQStDO0FBQzdDeEIsZ0JBQU0sQ0FBQzZCLGFBQVAsQ0FBcUJGLFFBQXJCO0FBQ0Q7QUFDRixPQU5jLEVBTVpKLGFBTlksQ0FBZjtBQU9ELEtBZkQ7QUFnQkQsR0FoR0Q7QUFpR0QsQ0FsR0QsRUFrR0d2QixNQUFNLENBQUNDLE1BbEdWLEVBa0drQkQsTUFBTSxDQUFDaEQsTUFsR3pCLEU7Ozs7Ozs7Ozs7O0FDTkEsdUMiLCJmaWxlIjoianMvY3ZzX3N0YXJ0ZXJfa2l0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvanMvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc2NyaXB0cy9tYWluLmpzXCIpO1xuIiwiKGZ1bmN0aW9uKCQsIERydXBhbCl7XG4gICQoZnVuY3Rpb24oJCwgRHJ1cGFsKXtcbiAgICB2YXIgdXBkYXRlVGVsZXBob25lID0gZnVuY3Rpb24oc3RyaW5nX3Jhdykge1xuICAgICAgdmFyIHN0cmluZ191bmZvcm1hdHRlZCA9IHN0cmluZ19yYXcucmVwbGFjZUFsbCgvXFxEL2csICcnKSxcbiAgICAgICAgc3RyaW5nX2Zvcm1hdHRlZCA9ICcnLFxuICAgICAgICBzdHJpbmdfbGVuZ3RoID0gc3RyaW5nX3VuZm9ybWF0dGVkLmxlbmd0aDtcblxuICAgICAgaWYgKHN0cmluZ19sZW5ndGggPCA0KSB7XG4gICAgICAgIHN0cmluZ19mb3JtYXR0ZWQgPSBzdHJpbmdfdW5mb3JtYXR0ZWQ7XG4gICAgICB9IGVsc2UgaWYgKHN0cmluZ19sZW5ndGggPj0gNCAmJiBzdHJpbmdfbGVuZ3RoIDwgNykge1xuICAgICAgICBzdHJpbmdfZm9ybWF0dGVkID0gc3RyaW5nX3VuZm9ybWF0dGVkLnNsaWNlKDAsIDMpICsgJy0nICsgIHN0cmluZ191bmZvcm1hdHRlZC5zbGljZSgzLCA2KTtcbiAgICAgIH0gZWxzZSBpZiAoc3RyaW5nX2xlbmd0aCA+PSA3KSB7XG4gICAgICAgIHN0cmluZ19mb3JtYXR0ZWQgPSBzdHJpbmdfdW5mb3JtYXR0ZWQuc2xpY2UoMCwgMykgKyAnLScgKyAgc3RyaW5nX3VuZm9ybWF0dGVkLnNsaWNlKDMsIDYpICsgJy0nICsgc3RyaW5nX3VuZm9ybWF0dGVkLnNsaWNlKDYsIDEwKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN0cmluZ19mb3JtYXR0ZWQ7XG4gICAgfVxuXG4gICAgLy9SZXF1aXJlZCBmb3JtIGZpZWxkc1xuICAgICQoJy5wYXJhZ3JhcGgtLXR5cGUtLWNzay1mb3JtLWNvbXBvbmVudCAuZm9ybS1yZXF1aXJlZCcpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoISQodGhpcykuaGFzQ2xhc3MoJ3N0YXItYWRkZWQnKSkge1xuICAgICAgICAkKHRoaXMpLmFwcGVuZCgnJm5ic3A7PHNwYW4gY2xhc3M9XCJyZXF1aXJlZC1zeW1ib2xcIj4qPC9zcGFuPicpLmFkZENsYXNzKCdzdGFyLWFkZGVkJyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvL0F1dG8gZm9ybWF0IHRoZSB0ZWxlcGhvbmUgYXMgdGhlIHVzZXIgZW50ZXJzIGl0LlxuICAgICQoZG9jdW1lbnQpLm9uKCdrZXl1cCcsICdmb3JtIC5mb3JtLXRlbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICQodGhpcykudmFsKHVwZGF0ZVRlbGVwaG9uZSgkKHRoaXMpLnZhbCgpKSk7XG4gICAgfSk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignY2hhbmdlJywgJ2Zvcm0gLmZvcm0tdGVsJywgZnVuY3Rpb24gKCkge1xuICAgICAgJCh0aGlzKS52YWwodXBkYXRlVGVsZXBob25lKCQodGhpcykudmFsKCkpKTtcbiAgICB9KTtcbiAgICBcbiAgICB2YXIgaW5saW5lX2Vycm9yX2NvdW50ZXIgPSAwO1xuXG4gICAgJCgnZm9ybS5hY2Nlc3NpYmxlLWFqYXgtd2ViZm9ybSAuanMtd2ViZm9ybS1jaGVja2JveGVzJykub24oJ2tleWRvd24nLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgLy9SaWdodCBvciBEb3duXG4gICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PSAzOSB8fCBldmVudC5rZXlDb2RlID09IDQwKSB7XG4gICAgICAgIHNldFZvaWNlT3ZlckZvY3VzKCQoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkucGFyZW50cygnLmpzLWZvcm0taXRlbScpLm5leHQoJy5qcy1mb3JtLWl0ZW0nKS5jaGlsZHJlbignaW5wdXQnKSk7XG5cbiAgICAgIC8vTGVmdCBvciBVcFxuICAgICAgfSBlbHNlIGlmIChldmVudC5rZXlDb2RlID09IDM3IHx8IGV2ZW50LmtleUNvZGUgPT0gMzgpIHtcbiAgICAgICAgc2V0Vm9pY2VPdmVyRm9jdXMoJChkb2N1bWVudC5hY3RpdmVFbGVtZW50KS5wYXJlbnRzKCcuanMtZm9ybS1pdGVtJykucHJldignLmpzLWZvcm0taXRlbScpLmNoaWxkcmVuKCdpbnB1dCcpKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgICQoJ2Zvcm0uYWNjZXNzaWJsZS1hamF4LXdlYmZvcm0gLmpzLXdlYmZvcm0tY2hlY2tib3hlcy1vdGhlcicpLnJlbW92ZUF0dHIoJ2FyaWEtcmVxdWlyZWQnKTtcblxuICAgIGlmICgkKCcud2ViZm9ybS1jb25maXJtYXRpb24gLndlYmZvcm0tY29uZmlybWF0aW9uX19tZXNzYWdlJykubGVuZ3RoKSB7XG4gICAgICAkKCcud2ViZm9ybS1jb25maXJtYXRpb24gLndlYmZvcm0tY29uZmlybWF0aW9uX19tZXNzYWdlJykuZm9jdXMoKTtcbiAgICAgIHNldFZvaWNlT3ZlckZvY3VzKCQoJy53ZWJmb3JtLWNvbmZpcm1hdGlvbiAud2ViZm9ybS1jb25maXJtYXRpb25fX21lc3NhZ2UnKSk7XG4gICAgfVxuXG4gICAgJChkb2N1bWVudCkuYWpheFN0b3AoZnVuY3Rpb24oZSkge1xuICAgICAgaWYgKCQoJ2Zvcm0uYWNjZXNzaWJsZS1hamF4LXdlYmZvcm0nKS5sZW5ndGgpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkKCdmb3JtLmFjY2Vzc2libGUtYWpheC13ZWJmb3JtIC5qcy13ZWJmb3JtLWNoZWNrYm94ZXMtb3RoZXInKS5yZW1vdmVBdHRyKCdhcmlhLXJlcXVpcmVkJyk7XG4gICAgICAgICQoJ2Zvcm0uYWNjZXNzaWJsZS1hamF4LXdlYmZvcm0gaDEnKS5hdHRyKCdpZCcsICdtYWluLWNvbnRlbnQtdGl0bGUnKS5hdHRyKCd0YWJpbmRleCcsICctMScpO1xuXG4gICAgICAgIGlmICgkKCdmb3JtLmFjY2Vzc2libGUtYWpheC13ZWJmb3JtIC5tZXNzYWdlcy0tZXJyb3InKS5sZW5ndGgpIHtcbiAgICAgICAgICAkKCdmb3JtLmFjY2Vzc2libGUtYWpheC13ZWJmb3JtIC5tZXNzYWdlcy0tZXJyb3InKS5hdHRyKCd0YWJpbmRleCcsICctMScpLmF0dHIoJ3JvbGUnLCAnZGlhbG9nJyk7XG4gICAgICAgICAgJCgnZm9ybS5hY2Nlc3NpYmxlLWFqYXgtd2ViZm9ybSAubWVzc2FnZXMtLWVycm9yIGgyLnZpc3VhbGx5LWhpZGRlbicpLnJlbW92ZSgpO1xuICAgICAgICAgICQoJ2Zvcm0uYWNjZXNzaWJsZS1hamF4LXdlYmZvcm0gLm1lc3NhZ2VzLS1lcnJvcicpLnJlbW92ZUF0dHIoJ2FyaWEtbGFiZWwnKS5hdHRyKCdhcmlhLWxhYmVsbGVkYnknLCAnY3NrLWZvcm0tZXJyb3InKTtcblxuICAgICAgICAgIHZhciBlcnJvcl9jb3VudGVyID0gJCgnZm9ybS5hY2Nlc3NpYmxlLWFqYXgtd2ViZm9ybSAubWVzc2FnZXMtLWVycm9yIC5tZXNzYWdlc19fbGlzdCAubWVzc2FnZXNfX2l0ZW0nKS5sZW5ndGg7XG5cbiAgICAgICAgICAkKCdmb3JtLmFjY2Vzc2libGUtYWpheC13ZWJmb3JtIC5tZXNzYWdlcy0tZXJyb3IgLm1lc3NhZ2VzX19saXN0IC5tZXNzYWdlc19faXRlbScpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkKHRoaXMpLmh0bWwoJCh0aGlzKS5odG1sKCkucmVwbGFjZSgnICogJywgJyAnKSk7XG4gICAgICAgICAgICAkKHRoaXMpLmh0bWwoJCh0aGlzKS5odG1sKCkucmVwbGFjZSgnICgwMDAtMDAwLTAwMDApICcsICcgJykpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaWYgKGVycm9yX2NvdW50ZXIgPCAyKSB7XG4gICAgICAgICAgICBsaXN0X2h0bWwgPSAnPGgyIGlkPVwiY3NrLWZvcm0tZXJyb3JcIj4xIGVycm9yIGhhcyBiZWVuIGZvdW5kOiA8L2gyPic7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxpc3RfaHRtbCA9ICc8aDIgaWQ9XCJjc2stZm9ybS1lcnJvclwiPicgKyBlcnJvcl9jb3VudGVyICsgJyBlcnJvcnMgaGF2ZSBiZWVuIGZvdW5kOiA8L2gyPic7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJCgnZm9ybS5hY2Nlc3NpYmxlLWFqYXgtd2ViZm9ybSAgLmZvcm0taXRlbSAuZXJyb3InKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSAnPGRpdiBjbGFzcz1cInN1cHBsZW1lbnRhbC1lcnJvci1tZXNzYWdlXCI+QSB2YWxpZCAnICsgJCh0aGlzKS5zaWJsaW5ncygnbGFiZWwnKS5maXJzdCgpLnRleHQoKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoJygwMDAtMDAwLTAwMDApJywgJycpICsgJyBpcyByZXF1aXJlZDwvZGl2Pic7XG4gICAgICAgICAgICAkKHRoaXMpLmFmdGVyKG1lc3NhZ2UpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy9SZXF1aXJlZCBmb3JtIGZpZWxkc1xuICAgICAgICAgICQoJy5wYXJhZ3JhcGgtLXR5cGUtLWNzay1mb3JtLWNvbXBvbmVudCAuZm9ybS1yZXF1aXJlZCcpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoISQodGhpcykuaGFzQ2xhc3MoJ3N0YXItYWRkZWQnKSkge1xuICAgICAgICAgICAgICAkKHRoaXMpLmFwcGVuZCgnJm5ic3A7PHNwYW4gY2xhc3M9XCJyZXF1aXJlZC1zeW1ib2xcIj4qPC9zcGFuPicpLmFkZENsYXNzKCdzdGFyLWFkZGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gIFxuICAgICAgICAgICQoJ2Zvcm0uYWNjZXNzaWJsZS1hamF4LXdlYmZvcm0gLm1lc3NhZ2VzLS1lcnJvciBkaXZbcm9sZT1cImFsZXJ0XCJdIC5pdGVtLWxpc3QnKS5yZW1vdmUoKTtcbiAgICAgICAgICAkKCdmb3JtLmFjY2Vzc2libGUtYWpheC13ZWJmb3JtIC5tZXNzYWdlcy0tZXJyb3IgZGl2W3JvbGU9XCJhbGVydFwiXScpLnByZXBlbmQobGlzdF9odG1sKTtcbiAgICAgICAgICAkKCdmb3JtLmFjY2Vzc2libGUtYWpheC13ZWJmb3JtIC5tZXNzYWdlcy0tZXJyb3IgZGl2W3JvbGU9XCJhbGVydFwiXScpLnJlbW92ZUF0dHIoJ3JvbGUnKTtcblxuICAgICAgICAgICQoJ2Zvcm0uYWNjZXNzaWJsZS1hamF4LXdlYmZvcm0gLm1lc3NhZ2VzLS1lcnJvcicpLmZvY3VzKCk7XG4gICAgICAgICAgc2V0Vm9pY2VPdmVyRm9jdXMoJCgnZm9ybS5hY2Nlc3NpYmxlLWFqYXgtd2ViZm9ybSAubWVzc2FnZXMtLWVycm9yJykpO1xuICAgICAgICB9IGVsc2UgaWYgKCQoJ2Zvcm0uYWNjZXNzaWJsZS1hamF4LXdlYmZvcm0gLndlYmZvcm0tY29uZmlybWF0aW9uJykubGVuZ3RoKSB7XG4gICAgICAgICAgJCgnZm9ybS5hY2Nlc3NpYmxlLWFqYXgtd2ViZm9ybSAud2ViZm9ybS1jb25maXJtYXRpb24nKS5hdHRyKCd0YWJpbmRleCcsICcwJykuYXR0cigncm9sZScsICdkaWFsb2cnKTtcbiAgICAgICAgICAkKCdmb3JtLmFjY2Vzc2libGUtYWpheC13ZWJmb3JtIC53ZWJmb3JtLWNvbmZpcm1hdGlvbicpLmZvY3VzKCk7XG4gICAgICAgICAgc2V0Vm9pY2VPdmVyRm9jdXMoJCgnZm9ybS5hY2Nlc3NpYmxlLWFqYXgtd2ViZm9ybSAud2ViZm9ybS1jb25maXJtYXRpb24nKSk7XG4gICAgICAgIH1cblxuICAgICAgICAkKCcuZm9ybS1pdGVtLS1lcnJvci1tZXNzYWdlJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAkKHRoaXMpLmF0dHIoJ2lkJywgJ2lubGluZS1lcnJvci1tZXNzYWdlLScgKyBpbmxpbmVfZXJyb3JfY291bnRlcik7XG4gICAgICAgICAgdmFyIGZvcm1faW5wdXQgPSAkKHRoaXMpLnNpYmxpbmdzKCdpbnB1dCwgc2VsZWN0JykuZmlyc3QoKTtcbiAgXG4gICAgICAgICAgLy9VcGRhdGUgaW5saW5lIGVycm9yIG1lc3NhZ2UgZm9yIGVtYWlsIGFkZHJlc3NcbiAgICAgICAgICBpZiAoZm9ybV9pbnB1dC5hdHRyKCdkYXRhLWRydXBhbC1zZWxlY3RvcicpID09ICdlZGl0LWVtYWlsLWFkZHJlc3MnKSB7XG4gICAgICAgICAgICAkKHRoaXMpLmh0bWwoJzxzdHJvbmc+RW1haWwgYWRkcmVzcyBpcyByZXF1aXJlZDwvc3Ryb25nPicpO1xuICAgICAgICAgIH1cbiAgXG4gICAgICAgICAgaWYgKGZvcm1faW5wdXQubGVuZ3RoKSB7XG4gICAgICAgICAgICBmb3JtX2lucHV0LmF0dHIoJ2FyaWEtZGVzY3JpYmVkYnknLCAnaW5saW5lLWVycm9yLW1lc3NhZ2UtJyArIGlubGluZV9lcnJvcl9jb3VudGVyKTtcbiAgICAgICAgICAgIGlmIChmb3JtX2lucHV0LnNpYmxpbmdzKCcuZGVzY3JpcHRpb24nKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgZm9ybV9pbnB1dC5hdHRyKCdhcmlhLWRlc2NyaWJlZGJ5JywgJ2lubGluZS1lcnJvci1tZXNzYWdlLScgKyBpbmxpbmVfZXJyb3JfY291bnRlciArICcgJyArIGZvcm1faW5wdXQuc2libGluZ3MoJy5kZXNjcmlwdGlvbicpLmNoaWxkcmVuKCkuZmlyc3QoKS5hdHRyKCdpZCcpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGZvcm1faW5wdXQuYXR0cignYXJpYS1kZXNjcmliZWRieScsICdpbmxpbmUtZXJyb3ItbWVzc2FnZS0nICsgaW5saW5lX2Vycm9yX2NvdW50ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgZm9ybV9maWVsZHNldCA9ICQodGhpcykucGFyZW50cygnLmZpZWxkc2V0LXdyYXBwZXInKS5wYXJlbnRzKCdmaWVsZHNldCcpO1xuICAgICAgICAgICAgaWYgKGZvcm1fZmllbGRzZXQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIGZvcm1fZmllbGRzZXQuYXR0cignYXJpYS1kZXNjcmliZWRieScsICdpbmxpbmUtZXJyb3ItbWVzc2FnZS0nICsgaW5saW5lX2Vycm9yX2NvdW50ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgXG4gICAgICAgICAgaW5saW5lX2Vycm9yX2NvdW50ZXIrKztcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHZhciBjYW52YXNfZWxlbWVudHMgPSAkKCcuZmllbGQtLW5hbWUtZmllbGQtZHg4LWxheW91dC1jYW52YXMnKS5jaGlsZHJlbigpLmxlbmd0aCxcbiAgICAgIGNhbnZhc193ZWJmb3JtX2VsZW1lbnRzID0gJCgnLmZpZWxkLS1uYW1lLWZpZWxkLWR4OC1sYXlvdXQtY2FudmFzJykuY2hpbGRyZW4oJy5maWVsZC0tbmFtZS1maWVsZC13ZWJmb3JtJykubGVuZ3RoLFxuICAgICAgaXNfYWRtaW4gPSAkKCcjdG9vbGJhci1hZG1pbmlzdHJhdGlvbicpLmxlbmd0aDtcblxuICAgIGlmIChjYW52YXNfZWxlbWVudHMgPT0gMSAmJiBjYW52YXNfd2ViZm9ybV9lbGVtZW50cyA9PSAxICYmIGlzX2FkbWluID09IDApIHtcbiAgICAgICQoJ2hlYWQnKS5wcmVwZW5kKCc8c3R5bGU+JyArXG4gICAgICAgICAgJyNhdDQtc2hhcmUgYTpmb2N1cywnICtcbiAgICAgICAgICAnI2Jsb2NrLWZvbGxvd3VzIGE6Zm9jdXMsJyArIFxuICAgICAgICAgICcjY3ZzLWNvbW1vbi1oZWFkZXIgYnV0dG9uOmZvY3VzLCcgK1xuICAgICAgICAgICcjY3ZzLWNvbW1vbi1oZWFkZXIgYTpmb2N1cywnICtcbiAgICAgICAgICAnLm1haW4tZm9vdGVyIGJ1dHRvbjpmb2N1cywnICtcbiAgICAgICAgICAnLm1haW4tZm9vdGVyIGE6Zm9jdXMgeycgK1xuICAgICAgICAgICAgICAnYm9yZGVyOiA0cHggc29saWQgIzgwQkZGRSAhaW1wb3J0YW50OycgK1xuICAgICAgICAgICd9JyArXG4gICAgICAgICAgJzwvc3R5bGU+Jyk7XG4gICAgfVxuICB9KTtcbn0pKHdpbmRvdy5qUXVlcnksIHdpbmRvdy5EcnVwYWwpIiwiLy9pbXBvcnQgTWFpbiBTYXNzIGZpbGUgZm9yIHdlYnBhY2sgY29tcGlsYXRpb25cbmltcG9ydCBcIi4uL3N0eWxlL3N0eWxlLnNjc3NcIlxuXG4vL0ltcG9ydCBKU1xuaW1wb3J0IFwiLi9hY2Nlc3NpYmxlX2Zvcm1zLmpzXCJcblxuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgIC8vYWRqdXN0IGhlYWRlciBpZiB0b29sYmFyIGlzIHRoZXJlLlxuICAgIGlmICgkKCcjdG9vbGJhci1hZG1pbmlzdHJhdGlvbicpLmxlbmd0aCkge1xuICAgICAgJCgnaGVhZGVyJykuYWRkQ2xhc3MoJ2hlYWRlci13aXRoLXRvb2xiYXInKTtcbiAgICB9XG5cbiAgICAvLyBTS2lwIHRvIG1haW4gbmF2IGxpbmsgZnVuY3Rpb25hbGl0eVxuXG4gICAgLy8gRmluZCBpZiBhbiBoMSBleGlzdHMgYW5kIGlmIHNvLCBnaXZlIGl0IHRoZSBJRCBhbmQgdGFiaW5kZXhcbiAgICBpZigkKCdtYWluJykuZmluZCgnaDEnKS5sZW5ndGgpe1xuICAgICAgaWYgKCQoJ21haW4gaDEgYScpLmxlbmd0aCkge1xuICAgICAgICAkKCdtYWluIGgxIGEnKS5maXJzdCgpLmF0dHIoJ2lkJywnbWFpbi1jb250ZW50LXRpdGxlJykuYXR0cigndGFiaW5kZXgnLDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJCgnbWFpbiBoMScpLmZpcnN0KCkuYXR0cignaWQnLCdtYWluLWNvbnRlbnQtdGl0bGUnKS5hdHRyKCd0YWJpbmRleCcsLTEpO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBFbHNlIGlmIGgxIERORSwgZmluZCBpZiBhbiBoMiBleGlzdHMgYW5kIGlmIHNvLCBnaXZlIGl0IHRoZSBJRCBhbmQgdGFiaW5kZXhcbiAgICBlbHNlIGlmKCQoJ21haW4nKS5maW5kKCdoMicpLmxlbmd0aCkge1xuICAgICAgaWYgKCQoJ21haW4gaDIgYScpLmxlbmd0aCkge1xuICAgICAgICAkKCdtYWluIGgyIGEnKS5maXJzdCgpLmF0dHIoJ2lkJywnbWFpbi1jb250ZW50LXRpdGxlJykuYXR0cigndGFiaW5kZXgnLDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJCgnbWFpbiBoMicpLmZpcnN0KCkuYXR0cignaWQnLCdtYWluLWNvbnRlbnQtdGl0bGUnKS5hdHRyKCd0YWJpbmRleCcsLTEpO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAkKCcjc2tpcC1saW5rLWNvbnRhaW5lciBhJykuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBzZXRWb2ljZU92ZXJGb2N1cygkKCcjbWFpbi1jb250ZW50LXRpdGxlJykpO1xuICAgICAgICBcbiAgICAgIGlmICgkKCcjbWFpbi1jb250ZW50LXRpdGxlJylbMF0udGFnTmFtZSAhPSAnQScpIHtcbiAgICAgICAgJCgnI21haW4tY29udGVudC10aXRsZScpLmF0dHIoJ3RhYmluZGV4JywgJy0xJyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAkKCcjc2tpcC1saW5rLWNvbnRhaW5lciBhJykub24oXCJrZXlkb3duXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICBpZihldmVudC5rZXlDb2RlID09IDMyIHx8IGV2ZW50LmtleUNvZGUgPT0gMTMpe1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkKCcjc2tpcC1saW5rLWNvbnRhaW5lciBhJykudHJpZ2dlcignY2xpY2snKTtcbiAgICAgICAgc2V0Vm9pY2VPdmVyRm9jdXMoJCgnI21haW4tY29udGVudC10aXRsZScpKTtcbiAgICAgICAgXG4gICAgICAgIGlmICgkKCcjbWFpbi1jb250ZW50LXRpdGxlJylbMF0udGFnTmFtZSAhPSAnQScpIHtcbiAgICAgICAgICAkKCcjbWFpbi1jb250ZW50LXRpdGxlJykuYXR0cigndGFiaW5kZXgnLCAnLTEnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy9BZGQgdmlkZW8gcGxheS9wYXVzZSBmdW5jdGlvbmFsaXR5LlxuICAgIHZhciBpZnJhbWVzID0gJCgnaWZyYW1lJyk7XG5cbiAgICBpZnJhbWVzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaWZyYW1lX3NyYyA9ICQodGhpcykuYXR0cignc3JjJykuc2xpY2UoMCwgMjQpO1xuICAgICAgaWYgKGlmcmFtZV9zcmMgPT0gJ2h0dHBzOi8vcGxheWVyLnZpbWVvLmNvbScpIHtcbiAgICAgICAgdmFyIHBsYXllciA9IG5ldyBWaW1lby5QbGF5ZXIodGhpcyksXG4gICAgICAgICAgY29udHJvbHMgPSAkKHRoaXMpLnNpYmxpbmdzKCcuY29udHJvbHMnKSxcbiAgICAgICAgICBwbGF5X2J0biA9IGNvbnRyb2xzLmNoaWxkcmVuKCcuY29udHJvbHMtcGxheScpLFxuICAgICAgICAgIHBhdXNlX2J0biA9IGNvbnRyb2xzLmNoaWxkcmVuKCcuY29udHJvbHMtcGF1c2UnKTtcblxuICAgICAgICAgIHBhdXNlX2J0bi5zaG93KCk7XG5cbiAgICAgICAgY29udHJvbHMub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBwbGF5ZXIuZ2V0UGF1c2VkKCkudGhlbihmdW5jdGlvbihwYXVzZWQpIHtcbiAgICAgICAgICAgIGlmIChwYXVzZWQpIHtcbiAgICAgICAgICAgICAgcGxheWVyLnBsYXkoKTtcbiAgICAgICAgICAgICAgcGF1c2VfYnRuLnNob3coKTtcbiAgICAgICAgICAgICAgcGxheV9idG4uaGlkZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcGxheWVyLnBhdXNlKCk7XG4gICAgICAgICAgICAgIHBsYXlfYnRuLnNob3coKTtcbiAgICAgICAgICAgICAgcGF1c2VfYnRuLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvKiBGdW5jdGlvbiB0aGF0IHNoaWZ0cyBmb2N1cyBmb3IgYm90aCB0YWJpbmRleCBhbmQgdm9pY2VvdmVyLiAqL1xuICAgIHZhciBzZXRWb2ljZU92ZXJGb2N1cyA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgIHZhciBmb2N1c0ludGVydmFsID0gMTA7IC8vIG1zLCB0aW1lIGJldHdlZW4gZnVuY3Rpb24gY2FsbHNcbiAgICAgIHZhciBmb2N1c1RvdGFsUmVwZXRpdGlvbnMgPSAxMDsgLy8gbnVtYmVyIG9mIHJlcGV0aXRpb25zXG5cbiAgICAgIGVsZW1lbnQuYXR0cigndGFiaW5kZXgnLCAnMCcpO1xuICAgICAgZWxlbWVudC5ibHVyKCk7XG5cbiAgICAgIHZhciBmb2N1c1JlcGV0aXRpb25zID0gMDtcbiAgICAgIHZhciBpbnRlcnZhbCA9IHdpbmRvdy5zZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgZWxlbWVudC5mb2N1cygpO1xuICAgICAgICBmb2N1c1JlcGV0aXRpb25zKys7XG4gICAgICAgIGlmIChmb2N1c1JlcGV0aXRpb25zID49IGZvY3VzVG90YWxSZXBldGl0aW9ucykge1xuICAgICAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgfVxuICAgICAgfSwgZm9jdXNJbnRlcnZhbCk7XG4gICAgfTtcbiAgfSk7XG59KSh3aW5kb3cualF1ZXJ5LCB3aW5kb3cuRHJ1cGFsKTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iXSwic291cmNlUm9vdCI6IiJ9
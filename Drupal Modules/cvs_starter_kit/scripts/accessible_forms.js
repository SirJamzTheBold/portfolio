(function($, Drupal){
  $(function($, Drupal){
    var updateTelephone = function(string_raw) {
      var string_unformatted = string_raw.replaceAll(/\D/g, ''),
        string_formatted = '',
        string_length = string_unformatted.length;

      if (string_length < 4) {
        string_formatted = string_unformatted;
      } else if (string_length >= 4 && string_length < 7) {
        string_formatted = string_unformatted.slice(0, 3) + '-' +  string_unformatted.slice(3, 6);
      } else if (string_length >= 7) {
        string_formatted = string_unformatted.slice(0, 3) + '-' +  string_unformatted.slice(3, 6) + '-' + string_unformatted.slice(6, 10);
      }

      return string_formatted;
    }

    //Required form fields
    $('.paragraph--type--csk-form-component .form-required').each(function() {
      if (!$(this).hasClass('star-added')) {
        $(this).append('&nbsp;<span class="required-symbol">*</span>').addClass('star-added');
      }
    });

    //Auto format the telephone as the user enters it.
    $(document).on('keyup', 'form .form-tel', function () {
      $(this).val(updateTelephone($(this).val()));
    });

    $(document).on('change', 'form .form-tel', function () {
      $(this).val(updateTelephone($(this).val()));
    });
    
    var inline_error_counter = 0;

    $('form.accessible-ajax-webform .js-webform-checkboxes').on('keydown', function(event) {
      //Right or Down
      if (event.keyCode == 39 || event.keyCode == 40) {
        setVoiceOverFocus($(document.activeElement).parents('.js-form-item').next('.js-form-item').children('input'));

      //Left or Up
      } else if (event.keyCode == 37 || event.keyCode == 38) {
        setVoiceOverFocus($(document.activeElement).parents('.js-form-item').prev('.js-form-item').children('input'));
      }
    });

    $('form.accessible-ajax-webform .js-webform-checkboxes-other').removeAttr('aria-required');

    if ($('.webform-confirmation .webform-confirmation__message').length) {
      $('.webform-confirmation .webform-confirmation__message').focus();
      setVoiceOverFocus($('.webform-confirmation .webform-confirmation__message'));
    }

    $(document).ajaxStop(function(e) {
      if ($('form.accessible-ajax-webform').length) {
        e.preventDefault();
        $('form.accessible-ajax-webform .js-webform-checkboxes-other').removeAttr('aria-required');
        $('form.accessible-ajax-webform h1').attr('id', 'main-content-title').attr('tabindex', '-1');

        if ($('form.accessible-ajax-webform .messages--error').length) {
          $('form.accessible-ajax-webform .messages--error').attr('tabindex', '-1').attr('role', 'dialog');
          $('form.accessible-ajax-webform .messages--error h2.visually-hidden').remove();
          $('form.accessible-ajax-webform .messages--error').removeAttr('aria-label').attr('aria-labelledby', 'csk-form-error');

          var error_counter = $('form.accessible-ajax-webform .messages--error .messages__list .messages__item').length;

          $('form.accessible-ajax-webform .messages--error .messages__list .messages__item').each(function() {
            $(this).html($(this).html().replace(' * ', ' '));
            $(this).html($(this).html().replace(' (000-000-0000) ', ' '));
          });

          if (error_counter < 2) {
            list_html = '<h2 id="csk-form-error">1 error has been found: </h2>';
          } else {
            list_html = '<h2 id="csk-form-error">' + error_counter + ' errors have been found: </h2>';
          }

          $('form.accessible-ajax-webform  .form-item .error').each(function() {
            var message = '<div class="supplemental-error-message">A valid ' + $(this).siblings('label').first().text().toLowerCase().replace('(000-000-0000)', '') + ' is required</div>';
            $(this).after(message);
          });

          //Required form fields
          $('.paragraph--type--csk-form-component .form-required').each(function() {
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

        $('.form-item--error-message').each(function() {
          $(this).attr('id', 'inline-error-message-' + inline_error_counter);
          var form_input = $(this).siblings('input, select').first();
  
          //Update inline error message for email address
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
      $('head').prepend('<style>' +
          '#at4-share a:focus,' +
          '#block-followus a:focus,' + 
          '#cvs-common-header button:focus,' +
          '#cvs-common-header a:focus,' +
          '.main-footer button:focus,' +
          '.main-footer a:focus {' +
              'border: 4px solid #80BFFE !important;' +
          '}' +
          '</style>');
    }
  });
})(window.jQuery, window.Drupal)
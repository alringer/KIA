'use strict';

$(document).ready(function () {
  window.login = {
    elements: {
      login_email: $('.login-form .login-email'),
      create_email: $('.create-form .create-email'),
      reset_email: $('.recover-form .reset-email'),
      create_password: $('.create-form .create-password'),
      create_password_validator: $('.create-form .create-password-validator'),
      toggle_show_password_rules: $('.create-form .toggle-show-password-rules'),

      use_email_to_create: $('.use-email-to-craete'),
      use_email_to_recover: $('.create-form .use-email-to-recover'),

      reset_email_button: $('[data-action="login.reset_link"]'),
      reset_password_flow: $('.reset-password-flow'),

      back_to_signin: $('[data-action="back-to-sign-in"]'),

      toggle_show_password: $('.toggle-show-password'),

      demo_error_button: $('[data-action="login.demo.error"]'),
      demo_error_create_button: $('[data-action="login.demo.error_create"]')
    },
    methods: {
      // Used to demo the desired functionality of passing data between fields
      _use_email_to_create: function _use_email_to_create() {
        var value = window.login.elements.login_email.val();
        window.login.elements.create_email.val(value);
      },
      // Used to demo the desired functionality of passing data between fields
      _use_email_to_recover: function _use_email_to_recover() {
        var value = window.login.elements.create_email.val();
        window.login.elements.reset_email.val(value);
      },
      // Shows or hides the password valuation
      _password_validation: function _password_validation(e) {
        var $this = $(e.currentTarget);
        // If there is a value, add the "show" class to transition in the validation elemenbt
        if ($this.val()) {
          window.login.elements.create_password_validator.addClass('show');
        } else {
          window.login.elements.create_password_validator.removeClass('show');
        }
      },
      // Globally closes the validation element
      _password_validation_close: function _password_validation_close() {
        window.login.elements.create_password_validator.removeClass('show');
      },
      // Used on mobile to force toggle the password validation rules
      _toggle_show_password_rules: function _toggle_show_password_rules() {
        window.login.elements.create_password_validator.toggleClass('toggle-show');
      },
      // Swaps the input type from text <-> password ( used on mobile for password creation )
      _toggle_show_password: function _toggle_show_password() {
        var $this = $(this),
            $input = $this.prev('input');
        // If it's a password, swap for text, and vice versa
        if ($input.is('[type="password"]')) {
          $input.attr('type', 'text');
        } else {
          $input.attr('type', 'password');
        }
      },
      // Forces the password field to be a password input ( desktop/tablet do not have the icons to toggle )
      _resize_password_input: function _resize_password_input() {
        if (window.innerWidth > 500) {
          window.login.elements.create_password.attr('type', 'password');
        }
      },
      // The reset email overlay has a progression ( possible future buildout of overlay progression if this functionaltiy is found in other places )
      _reset_email: function _reset_email(e) {
        e.preventDefault();
        // Work from the active modal
        var $active_modal = window.modals.elements.modal.filter('.active'),
            modal_width = $active_modal.outerWidth();
        // Progress the password reset to the next slide
        window.login.elements.reset_password_flow.css('left', -modal_width);
        // Update the UI ( this class hides various UI elements as per design )
        $active_modal.addClass('reset-flow-finished');
      },
      // Resets the login modal
      _back_to_signin: function _back_to_signin() {
        // Work from active modal
        var $active_modal = window.modals.elements.modal.filter('.active'),
            $errors = $active_modal.find('.error');
        // Remove All error styles
        $errors.removeClass('error');
        $errors.find('.error-message').removeAttr('style');

        // Reset Classes
        $active_modal.removeClass('reset-flow-finished');
        // This class is used to correct some animations and is removed at the end.
        $active_modal.addClass('back-to-sign-in');
        // Move back to the first slide
        window.modals.methods._nav_to(1);
        // Close the modal overlay ( modal overlays cover the content of a modal -- not to be confused with the transparent background )
        window.modals.methods._overlay_toggle('close');
        // Reset the password flow overlay
        window.login.elements.reset_password_flow.css('left', 0);

        // Set all values to what was used as a reset
        var value = window.login.elements.reset_email.val();
        window.login.elements.login_email.val(value);
        window.login.elements.create_email.val(value);

        // Remove the class used to correct animations
        setTimeout(function () {
          $active_modal.removeClass('back-to-sign-in');
        }, 550);
      },
      // Demo the display of errors
      demo: {
        _error: function _error(e) {
          e.preventDefault();
          window.forms.methods._error($('.login-form li').first());
        },
        _error_create: function _error_create(e) {
          e.preventDefault();
          window.forms.methods._error($('.create-form li').first());
          window.forms.methods._error($('.create-form'));
          window.forms.methods._error($('.create-form li:nth-child(3)'));
          window.forms.methods._error($('.create-form li:nth-child(4)'));
        }
      }
    }
  };
  // EVENTS
  window.login.elements.use_email_to_create.on('click', window.login.methods._use_email_to_create);
  window.login.elements.use_email_to_recover.on('click', window.login.methods._use_email_to_recover);

  window.login.elements.create_password.on('change', window.login.methods._password_validation);
  window.login.elements.create_password.on('keyup', window.login.methods._password_validation);
  window.login.elements.create_password.on('blur', window.login.methods._password_validation_close);
  window.login.elements.create_password.on('focus', window.login.methods._password_validation);
  window.login.elements.toggle_show_password.on('click', window.login.methods._toggle_show_password);
  window.login.elements.toggle_show_password_rules.on('click', window.login.methods._toggle_show_password_rules);

  window.login.elements.reset_email_button.on('click', window.login.methods._reset_email);
  window.login.elements.back_to_signin.on('click', window.login.methods._back_to_signin);

  // DEMO EVENTS
  window.login.elements.demo_error_button.on('click', window.login.methods.demo._error);
  window.login.elements.demo_error_create_button.on('click', window.login.methods.demo._error_create);

  $(window).on('resize', function () {
    window.login.methods._resize_password_input();
  });
});

'use strict';

$(document).ready(function () {
  window.registration = {
    elements: {
      registration_form: $('.registration-block form'),
      registration_year: $('.vehicle-lookup-form .registration-year'),
      registration_model: $('.vehicle-lookup-form .registration-model'),
      registration_extra: $('.vehicle-lookup-form .registration-extra'),
      registration_vin: $('.vehicle-vin-form .registration-vin'),
      registration_send_code_to: $('.vehicle-activate-form [name="send-code-to"]'),
      registration_block_hidden_options: $('.vehicle-lookup-form .registration-block-hidden-options'),
      registration_submit_button: $('.registration-block form input[type="submit"]'),
      registration_slider: $('.view-registration-header-context-steps')
    },
    methods: {
      // Shows or hidhes the extra form fields if critera is met
      _reveal_exta: function _reveal_exta() {
        // If both the fields have values
        if (window.registration.elements.registration_year.val().length && window.registration.elements.registration_model.val().length) {
          // Show the extra fields
          window.registration.elements.registration_block_hidden_options.addClass('open');
        } else {
          // otherwise hide the fields
          window.registration.elements.registration_block_hidden_options.removeClass('open');
          window.registration.elements.registration_extra.prop('checked', false);
        }
      },
      // Toggle the disabled state for form buttons based on required critera when the form is interactied with
      _toggle_disable1: function _toggle_disable1() {
        var $this = $(this);
        // For the vehicle lookup form
        if (window.registration.elements.registration_form.is('.vehicle-lookup-form')) {
          // Make sure all fields have a value and the extra fields have been selected
          if (window.registration.elements.registration_year.val().length && window.registration.elements.registration_model.val().length && window.registration.elements.registration_extra.filter(':checked').val()) {
            window.registration.elements.registration_submit_button.removeClass('disabled');
          } else {
            window.registration.elements.registration_submit_button.addClass('disabled');
          }
          // For the VIN lookup form
        } else if (window.registration.elements.registration_form.is('.vehicle-vin-form')) {
          // VIN must be 17 chars
          if (window.registration.elements.registration_vin.val().length === 17) {
            window.registration.elements.registration_submit_button.removeClass('disabled');
          } else {
            window.registration.elements.registration_submit_button.addClass('disabled');
          }
          // For the vehicle activation form
        } else if (window.registration.elements.registration_form.is('.vehicle-activate-form')) {
          // Make sure the dual inputs have been set and have a value
          if ($this.is(':checked') && $this.parents('.dual-inputs').find('input').not('[type="radio"]').val()) {
            window.registration.elements.registration_submit_button.removeClass('disabled');
          } else {
            window.registration.elements.registration_submit_button.addClass('disabled');
          }
        }
      },
      // Stop registration if a dsiabled state has been set
      _submit: function _submit(e) {
        if (window.registration.elements.registration_submit_button.hasClass('disabled')) {
          e.preventDefault();
        }
      },
      // Sets up a responsive slider to be used on mobile for some views
      _slick: function _slick() {
        window.registration.elements.registration_slider.slick({
          arrows: false,
          infinite: false,
          centerMode: true,
          slidesToShow: 3,
          responsive: [{
            breakpoint: 590,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: true,
              variableWidth: true
            }
          }]
        });
      },
      // Fake display a VIN error
      error: {
        _vin_submit: function _vin_submit(e) {
          if (window.registration.elements.registration_form.is('.vehicle-vin-form')) {
            e.preventDefault();
            window.forms.methods._error($('.vehicle-vin-form li:first-child'));
          }
        }
      }
    }
  };

  // EVENTS
  window.registration.elements.registration_year.on('change', window.registration.methods._reveal_exta);
  window.registration.elements.registration_model.on('change', window.registration.methods._reveal_exta);

  window.registration.elements.registration_model.on('change', window.registration.methods._toggle_disable);
  window.registration.elements.registration_year.on('change', window.registration.methods._toggle_disable);
  window.registration.elements.registration_extra.on('change', window.registration.methods._toggle_disable);
  window.registration.elements.registration_send_code_to.on('change', window.registration.methods._toggle_disable);
  window.registration.elements.registration_vin.on('keyup', window.registration.methods._toggle_disable);
  window.registration.elements.registration_form.on('submit', window.registration.methods._toggle_disable);

  window.registration.elements.registration_form.on('submit', window.registration.methods.error._vin_submit);
  window.registration.elements.registration_submit_button.on('click', window.registration.methods.error._vin_submit);

  window.registration.methods._slick();
});

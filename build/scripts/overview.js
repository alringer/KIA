'use strict';

$(document).ready(function () {
  window.overview = {
    elements: {
      add_meta_submit: $('.add-meta-field-submit'),
      add_meta_input: $('.add-meta-field-input'),
      set_dealer_radio: $('[name="preferred-dealer"]'),
      dealer_submit: $('.preferred-dealer-submit')
    },
    methods: {
      _meta_form_validation: function _meta_form_validation() {
        var $this = $(this);
        if ($this.val().length) {
          window.overview.elements.add_meta_submit.removeClass('disabled');
        } else {
          window.overview.elements.add_meta_submit.addClass('disabled');
        }
      },
      _dealer_validation: function _dealer_validation() {
        if (window.overview.elements.set_dealer_radio.filter(':checked').length) {
          window.overview.elements.dealer_submit.removeClass('disabled');
        } else {
          window.overview.elements.dealer_submit.addClass('disabled');
        }
      }
    }
  };
  // EVENTS
  window.overview.elements.add_meta_input.on('keyup', window.overview.methods._meta_form_validation);
  window.overview.elements.set_dealer_radio.on('change', window.overview.methods._dealer_validation);
});

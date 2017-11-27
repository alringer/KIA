'use strict';

$(document).ready(function () {
  window.overview = {
    elements: {
      add_meta_submit: $('.add-meta-field-submit'),
      add_meta_input: $('.add-meta-field-input')
    },
    methods: {
      _meta_form_validation: function _meta_form_validation() {
        var $this = $(this);
        if ($this.val().length) {
          window.overview.elements.add_meta_submit.removeClass('disabled');
        } else {
          window.overview.elements.add_meta_submit.addClass('disabled');
        }
      }
    }
  };
  // EVENTS
  window.overview.elements.add_meta_input.on('keyup', window.overview.methods._meta_form_validation);
});

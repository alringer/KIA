'use strict';

$(document).ready(function () {
  window.forms = {
    // Form elements
    elements: {
      selectize: $('.selectize'),
      dual_inputs: $('form .dual-inputs input')
    },
    methods: {
      // Setups the selectize plugin
      _selectize: function _selectize() {
        if (window.forms.elements.selectize.length) {
          window.forms.elements.selectize.selectize({
            allowEmptyOption: true,
            items: false
          });
        }
      },
      // Dsiplay an error message
      _error: function _error($field) {
        // Add the error class
        $field.addClass('error');

        // Grab error fields
        var $error_message = $field.find('.error-message'),
            $error_message_inner = $error_message.find('.error-message-inner');

        // Set the height of the error message -- this uses a css3 transtion to animate in
        $error_message.css({
          'height': $error_message_inner[0].clientHeight + 'px'
        });

        // Diplay error message ( transitions opacity, etc )
        $error_message_inner.addClass('show');
      },
      // There are some form fields that have dual inputs (for example: both text / radio buttons)
      // Selecting one selects them both
      _dual_inputs: function _dual_inputs() {
        var $this = $(this),
            $parent = $this.parents('.dual-inputs'),
            $inputs = $parent.find('input'),
            $radio = $inputs.filter('[type="checkbox"], [type="radio"]');
        // Make sure the radio/checkbox gets checked
        $('[name="' + $radio.attr('name') + '"]').prop('checked', false);
        $radio.prop('checked', true);
        // Trigger the default change event
        $radio.trigger('change');
      }
    }
  };
  // EVENTS
  window.forms.elements.dual_inputs.on('focus', window.forms.methods._dual_inputs);

  // RUN METHODS
  window.forms.methods._selectize();
});

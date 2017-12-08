'use strict';

$(document).ready(function () {
  window.forms = {
    // Form elements
    elements: {
      selectize: $('.selectize'),
      selectpicker: $('.selectpicker'),
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
      _select_picker: function _select_picker() {
        if (!window.forms.elements.selectize.length) {
          return;
        }
        window.forms.elements.selectize.selectpicker({
          style: 'btn-info',
          size: 4
        });
      },
      // Dsiplay an error message
      _error: function _error($field) {
        $field.addClass('error');

        // Get the error fields
        var $error_message = $field.is('form') ? $field.children('.error-message') : $field.find('.error-message'),
            $error_message_inner = $error_message.find('.error-message-inner');

        // Use css3 transition to slide down error message
        $error_message.css({
          'height': $error_message_inner[0].clientHeight + 'px'
        });
        setTimeout(function () {
          $error_message.css({
            'height': 'auto'
          });
        }, 250);

        // Toggles opacity, etc.
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
  window.forms.methods._select_picker();
  // window.forms.methods._selectize();
});

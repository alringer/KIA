'use strict';

$(document).ready(function () {
  window.forms = {
    elements: {
      selectize: $('.selectize'),
      dual_inputs: $('form .dual-inputs input')
    },
    methods: {
      _selectize: function _selectize() {
        if (window.forms.elements.selectize.length) {
          window.forms.elements.selectize.selectize({
            // placeholder : 'Testing',
            allowEmptyOption: true,
            items: false
          });
        }
      },
      _error: function _error($field) {
        $field.addClass('error');

        var $error_message = $field.find('.error-message'),
            $error_message_inner = $error_message.find('.error-message-inner');

        $error_message.css({
          'height': $error_message_inner[0].clientHeight + 'px'
        });

        $error_message_inner.addClass('show');
      },
      _dual_inputs: function _dual_inputs() {
        var $this = $(this),
            $parent = $this.parents('.dual-inputs'),
            $inputs = $parent.find('input'),
            $radio = $inputs.filter('[type="checkbox"], [type="radio"]');
        $('[name="' + $radio.attr('name') + '"]').removeAttr('checked');
        $radio.attr('checked', 'checked');
        $radio.trigger('change');
      }
    }
  };
  // EVENTS
  window.forms.elements.dual_inputs.on('focus', window.forms.methods._dual_inputs);

  // RUN METHODS
  window.forms.methods._selectize();
});

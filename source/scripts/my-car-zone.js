$(document).ready(() => {
  window.myCarZone = {
    elements : {
      copy_options : $('.copy-options input'),
    },
    methods : {
      _enable_button : function() {
        var $this = $(this),
            $parent = $this.parents('.copy-options'),
            $button = $parent.next('.modal-actions').find('.button');
          $button.removeClass('disabled');
      },
    }
  };
  // EVENTS
  window.myCarZone.elements.copy_options.on('change', window.myCarZone.methods._enable_button);
});

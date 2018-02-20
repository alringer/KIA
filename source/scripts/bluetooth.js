$(document).ready(() => {
  window.bluetooth = {
    elements : {
      select : $('form .selectpicker'),
    },
    methods : {
      _select : function() {
        var $this = $(this),
            $parent = $this.parents('li'),
            $next = $parent.next('li');
        if($this.val() && $next.length) {
          $next.removeClass('disabled');
        }
      },
    }
  };
  // EVENTS
  window.bluetooth.elements.select.on('change.disabled', window.bluetooth.methods._select);
});

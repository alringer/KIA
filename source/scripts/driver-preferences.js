$(document).ready(() => {
  window.driverPrefs = {
    elements : {
      toggle : $('.driver-preferences-setting .toggle input'),
    },
    methods : {
      _enable : function() {
        var $this = $(this),
            $parent = $this.parents('.driver-preferences-setting');
        if($this.prop('checked')) {
          $parent.removeClass('disabled');
        }else{
          $parent.addClass('disabled');
        }
      },
    }
  };
  // EVENTS
  window.driverPrefs.elements.toggle.on('change', window.driverPrefs.methods._enable);
});

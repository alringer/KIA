$(document).ready(() => {
  window.softwareUpdate = {
    elements : {
      demo_update : $('[data-software-update]'),
      modal : $('.modal'),
      terms_checkbox : $('.terms-checkbox'),
      download_button : $('.download-button'),
    },
    methods : {
      _clear_demo : () => {
        clearTimeout(window.updateTimeout);
      },
      _demo : function() {
        var $this = $(this),
            update = $this.data('software-update'),
            $modal_slider = $('#software-update-slider');
        clearTimeout(window.updateTimeout);
        if(update) {
          window.updateTimeout = setTimeout(() => {
            $modal_slider.carousel(2);
          }, 4000);
        }else{
          window.updateTimeout = setTimeout(() => {
            $modal_slider.carousel(1);
          }, 4000);
        }
      },
      download : {
        _disable : function() {
          var $this = $(this);
          if($this.prop('checked')) {
            window.softwareUpdate.elements.download_button.removeClass('disabled');
          }else{
            window.softwareUpdate.elements.download_button.addClass('disabled');
          }
        }
      }
    }
  };
  // EVENTS
  window.softwareUpdate.elements.demo_update.on('click', window.softwareUpdate.methods._demo);
  window.softwareUpdate.elements.modal.on('hidden.bs.modal', window.softwareUpdate.methods._clear_demo);
  window.softwareUpdate.elements.terms_checkbox.on('change', window.softwareUpdate.methods.download._disable);
});

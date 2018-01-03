$(document).ready(() => {
  window.slider_bar = {
    elements : {
      slider_bar : $('.slider-bar-js'),
    },
    methods : {
      _init : () => {
        window.slider_bar.elements.slider_bar.each(function(){
          var $this = $(this);
          $this.slider({
             slide: function( event, ui ) {
               $this.next('.slider-bar-js-blue').css({
                 width : ui.value + '%',
               });
             }
          });
        });
      },
    }
  };
  // EVENTS
  window.slider_bar.methods._init();
});

$(document).ready(() => {
  window.slider_bar = {
    elements : {
      slider_bar : $('.slider-bar-js'),
      slider_bar_control : $('.slider-bar-control'),
    },
    methods : {
      _init : () => {
        window.slider_bar.elements.slider_bar.each(function(){
          var $this = $(this);
          $this.slider({
             slide: function( event, ui ) {
               window.slider_bar.methods._update_progress($this.next('.slider-bar-js-blue'), ui.value);
             }
          });
        });
      },
      _update_progress : ($element, value) => {
        $element.css({
          width : value + '%',
        });
      },
      _button : function() {
        var $this = $(this),
            $parent = $this.parents('.slider-bar'),
            $slider = $parent.find('.slider-bar-js'),
            $line = $slider.next('.slider-bar-js-blue'),
            current_value = $slider.slider( "option", "value"),
            new_value;
        if($this.hasClass('up')) {
          new_value = current_value += 10;
          new_value = new_value > 100 ? 100 : new_value;
        }else{
          new_value = current_value -= 10;
          new_value = new_value < 0 ? 0 : new_value;
        }
        $slider.slider( "option", "value", new_value );
        window.slider_bar.methods._update_progress($line, new_value);
      },
    }
  };
  // EVENTS
  window.slider_bar.methods._init();
  window.slider_bar.elements.slider_bar_control.on('click', window.slider_bar.methods._button);
});

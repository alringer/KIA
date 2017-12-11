$(document).ready(() => {
  window.dial = {
    elements : {
      dial : $('.ui-dial'),
      dial_canvas : $('.ui-dial-canvas'),
      dial_value : $('.ui-dial-value'),
      dial_value_text : $('.ui-dial-temperateure-text'),
      dial_handle : $('.ui-dial-handle'),
      dial_control : $('.ui-dial-controls > *'),
    },
    properties : {},
    methods : {
      _setup : () => {
        var value_max = window.dial.elements.dial.data('max'),
            value_min = window.dial.elements.dial.data('min'),
            value_diff = value_max - value_min,
            min = 0,
            max = 265,
            step = Math.floor(max / (value_diff + 1));
        window.dial.properties = {
          value_max,
          value_min,
          value_diff,
          min,
          max,
          step,
        };
        window.dial.elements.dial_canvas.knob({
            step,
            angleArc : max,
            angleOffset : `-${max/2}`,
            min,
            max,
            width: 295,
            height: 295,
            change : (v) => {
              window.dial.methods._adjust_ui(v);
            },
        });
        window.dial.elements.dial_canvas = $('.ui-dial-canvas');
        window.dial.methods._set(window.dial.methods._get());
      },
      _adjust_ui : (v) => {
        var degree = v - (window.dial.properties.step / 2);
        degree = Math.ceil(degree / window.dial.properties.step) * window.dial.properties.step;
        var percentage = degree / window.dial.properties.max,
            value_diff = window.dial.properties.value_max - window.dial.properties.value_min,
            value = Math.round(window.dial.properties.value_min + (value_diff * percentage));
        window.dial.elements.dial_value_text.text(value);
        if(percentage > .5) {
          window.dial.elements.dial.addClass('hot');
        }else{
          window.dial.elements.dial.removeClass('hot')
        }
        degree -= 43;
        window.dial.elements.dial_handle.css({
          transform : `rotate(${degree}deg) translate(-140px) rotate(${-degree}deg)`
        });
        window.dial.elements.dial_value.val(value);
      },
      _get : () => {
        return parseInt(window.dial.elements.dial_value.val(), 10);
      },
      _set : (v) => {
        if(v < window.dial.properties.value_min) {
          v = window.dial.properties.value_min;
        }
        if(v > window.dial.properties.value_max ) {
          v = window.dial.properties.value_max;
        }
        window.dial.elements.dial_canvas.val(v);
        var adjust_v = (v - window.dial.properties.value_min) / window.dial.properties.value_diff;
        adjust_v = Math.round(adjust_v * window.dial.properties.max);
        window.dial.elements.dial_canvas.val(adjust_v)
          .trigger('change');
        clearTimeout(window.settingDialClass);
        window.dial.elements.dial.addClass('setting');
        window.dial.methods._adjust_ui(adjust_v);
        window.settingDialClass = setTimeout(() => {
          window.dial.elements.dial.removeClass('setting');
        }, 550);
      },
      _increment : function() {
        var $this = $(this),
            current = window.dial.methods._get(),
            set = 0;
        if($this.hasClass('up')) {
          set = current += 1;
        }
        if($this.hasClass('down')) {
          set = current -= 1;
        }
        window.dial.methods._set(set);
      },
    }
  };
  // EVENTS
  window.dial.elements.dial_control.on('click', window.dial.methods._increment);
  window.dial.methods._setup();
});

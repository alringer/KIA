'use strict';

$(document).ready(function () {
  window.dial = {
    elements: {
      dial: $('.ui-dial'),
      dial_canvas: $('.ui-dial-canvas'),
      dial_value: $('.ui-dial-value'),
      dial_value_text: $('.ui-dial-temperateure-text'),
      dial_handle: $('.ui-dial-handle'),
      dial_control: $('.ui-dial-controls > *')
    },
    properties: {
      dials: []
    },
    methods: {
      _setup: function _setup() {
        var c = 0;
        window.dial.elements.dial.each(function () {
          var $this = $(this),
              value_max = $this.data('max'),
              value_min = $this.data('min'),
              value_diff = value_max - value_min,
              min = 0,
              max = 265,
              step = Math.floor(max / value_diff);
          window.dial.properties.dials.push({
            value_max: value_max,
            value_min: value_min,
            value_diff: value_diff,
            min: min,
            max: max,
            step: step,
            element: $this,
            input: $this.find('.ui-dial-value'),
            tempText: $this.find('.ui-dial-temperateure-text'),
            handle: $this.find('.ui-dial-handle')
          });
          $this.find('.ui-dial-canvas').knob({
            step: step,
            angleArc: max,
            angleOffset: '-' + max / 2,
            min: min,
            max: max,
            width: 295,
            height: 295,
            change: function change(v) {
              window.dial.methods._adjust_ui(window.dial.elements.dial.index($this), v);
            }
          });
          window.dial.methods._set(c, window.dial.methods._get(c));
          c++;
        });
      },
      _adjust_ui: function _adjust_ui(c, v) {
        var props = window.dial.properties.dials[c],
            degree = v - props.step / 2;
        degree = Math.ceil(degree / props.step) * props.step;
        var percentage = degree / props.max,
            value_diff = props.value_max - props.value_min,
            value = Math.round(props.value_min + value_diff * percentage);
        props.tempText.text(value);
        if ((value - 1) / value_diff === .5) {
          props.element.addClass('nuetral');
          props.element.removeClass('hot');
        } else if (percentage > .5) {
          props.element.addClass('hot');
          props.element.removeClass('nuetral');
        } else {
          props.element.removeClass('hot');
          props.element.removeClass('nuetral');
        }
        degree -= 43;
        props.handle.css({
          transform: 'rotate(' + degree + 'deg) translate(-140px) rotate(' + -degree + 'deg)'
        });
        props.input.val(value);
      },
      _get: function _get(c) {
        return parseInt(window.dial.properties.dials[c].input.val(), 10);
      },
      _set: function _set(c, v) {
        var props = window.dial.properties.dials[c];
        if (v < props.value_min) {
          v = props.value_min;
        }
        if (v > props.value_max) {
          v = props.value_max;
        }
        props.element.val(v);
        var adjust_v = (v - props.value_min) / props.value_diff;
        adjust_v = Math.round(adjust_v * props.max);
        props.element.val(adjust_v).trigger('change');
        clearTimeout(window['settingDialClass' + c]);
        props.element.addClass('setting');
        window.dial.methods._adjust_ui(c, adjust_v);
        window['settingDialClass' + c] = setTimeout(function () {
          props.element.removeClass('setting');
        }, 550);
      },
      _increment: function _increment() {
        var $this = $(this),
            c = window.dial.elements.dial.index($this.parents('.ui-dial')),
            current = window.dial.methods._get(c),
            set = 0;
        if ($this.hasClass('up')) {
          set = current += 1;
        }
        if ($this.hasClass('down')) {
          set = current -= 1;
        }
        window.dial.methods._set(c, set);
      }
    }
  };
  // EVENTS
  window.dial.elements.dial_control.on('click', window.dial.methods._increment);
  window.dial.methods._setup();
});

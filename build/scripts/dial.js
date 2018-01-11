'use strict';

$(document).ready(function () {
  window.dial = {
    elements: {
      dial: $('.ui-dial'),
      dial_canvas: $('.ui-dial-canvas'),
      dial_value: $('.ui-dial-value'),
      dial_value_text: $('.ui-dial-temperateure-text'),
      dial_handle: $('.ui-dial-handle'),
      dial_control: $('.ui-dial-controls > span:not(.button)')
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
              max = $this.hasClass('speed') ? 240 : 265,
              step = max / value_diff,
              steps = Math.floor(max / step);
          window.dial.properties.dials.push({
            value_max: value_max,
            value_min: value_min,
            value_diff: value_diff,
            min: min,
            max: max,
            step: step,
            steps: steps,
            element: $this,
            input: $this.find('.ui-dial-value'),
            tempText: $this.find('.ui-dial-temperateure-text'),
            handle: $this.find('.ui-dial-handle'),
            pin: $this.find('.ui-dial-handle-pin')
          });
          $this.find('.ui-dial-canvas').knob({
            step: step,
            angleArc: max,
            angleOffset: '-' + max / 2,
            min: min,
            max: max,
            width: 295,
            height: 295,
            thickness: .015,
            fgColor: '#8EC439',
            bgColor: '#c5c9ce',
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
        var current_step = (value - props.value_min) / (props.value_max - props.value_min) * props.steps + 1;
        percentage = (current_step - 1) / props.steps;
        var offset_by = props.element.hasClass('speed') ? 30 : 43;
        degree = Math.ceil(props.max * percentage) - offset_by;
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
        var adjust_by = props.element.hasClass('speed') ? '143' : '140';
        props.handle.css({
          transform: 'rotate(' + degree + 'deg) translate(-' + adjust_by + 'px) rotate(' + -degree + 'deg)'
        });
        props.pin.css({
          transform: 'rotate(' + (degree - 90) + 'deg)'
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
        var adjust_v = (v - props.value_min) / props.value_diff;
        adjust_v = Math.round(adjust_v * props.max);
        props.element.find('.ui-dial-canvas').val(adjust_v).trigger('change');
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

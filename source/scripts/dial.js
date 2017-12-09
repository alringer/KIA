$(document).ready(() => {
  window.dial = {
    elements : {
      dial_canvas : $('.ui-dial-canvas'),
      dial_handle : $('.ui-dial-handle'),
    },
    methods : {
      _setup : () => {
        window.dial.elements.dial_canvas.knob({
            step : 1,
            angleArc : 265,
            angleOffset : -132.5,
            min: 0,
            max: 265,
            width: 295,
            height: 295,
            change : function(v) {
              var degree = v - 43;
              window.dial.elements.dial_handle.css({
                transform : `rotate(${degree}deg) translate(-140px) rotate(${-degree}deg)`
              });
            },
        });
      },
    }
  };
  // EVENTS
  // window.template.elements.element.on('click', window.template.methods._method);
  window.dial.methods._setup();
});

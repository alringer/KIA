$(document).ready(() => {
  window.dial = {
    elements : {
      dial_canvas : $('.ui-dial-canvas'),
      dial_handle : $('.ui-dial-handle'),
    },
    methods : {
      _setup : () => {
        var step = 1;
        window.dial.elements.dial_canvas.knob({
            step,
            angleArc : 265,
            angleOffset : -132.5,
            min: 0,
            max: 265,
            width: 295,
            height: 295,
            change : function(v) {
              // console.log(v);
              // var degree = v - 43;
              var degree = v - (step / 2);
              degree = Math.ceil(degree / step) * step;
              degree -= 43;
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

$(document).ready(() => {
  window.dial = {
    elements : {
      dial_canvas : $('.ui-dial-canvas'),
    },
    methods : {
      _setup : () => {
        window.dial.elements.dial_canvas.knob({
            step : 10,
            angleArc : 250,
            angleOffset : -125,
            min: 0,
            max: 50,
            change : function(v) {
              console.log(v)
            },
        });
      },
    }
  };
  // EVENTS
  // window.template.elements.element.on('click', window.template.methods._method);
  window.dial.methods._setup();
});

$(document).ready(() => {
  window.stats = {
    elements : {
      stats : $('.stats'),
      stats_value : $('.stats-value'),
      stats_handle : $('.ui-dial-handle'),
      stats_car : $('.ui-dial-handle .car'),
    },
    methods : {
      _init : () => {
        var step = 1,
            min = 0,
            max = 360;
        window.stats.elements.stats.knob({
          // step,
          // angleArc : max,
          // angleOffset : `-${max/2}`,
          // min,
          // max,
          width: 300,
          height: 300,
          thickness : .105,
          fgColor : '#b9ff4b',
          bgColor : 'none',
        });
      },
      _animate_to : (value) => {
        if(window.statsIntervalRunning) {
          return;
        }
        var anim_value = parseInt(window.stats.elements.stats.val(), 10);
        anim_value = anim_value ? anim_value : 1;
        window.statsInterval = setInterval(() => {
          if(anim_value == value) {
            clearInterval(window.statsInterval);
            window.statsIntervalRunning = false;
          }
          window.stats.elements.stats.val(anim_value).trigger('change');
          window.stats.elements.stats_value.text(anim_value);
          window.stats.methods._update_handle(anim_value);
          if(value > anim_value) {
            anim_value += 1;
          }else{
            anim_value -= 1;
          }
        }, 20);
      },
      _update_handle : (value) => {
        var degree = 90 + ((value / 100) * (360));
        window.stats.elements.stats_handle.css({
          transform : `rotate(${degree}deg) translate(-140px) rotate(${-degree}deg)`
        });
        window.stats.elements.stats_car.css({
          transform : `rotate(${degree}deg)`,
        });
      }
    }
  };
  // EVENTS
  // window.stats.elements.stats.on('click', window.stats.methods._init);
  window.stats.methods._init();
  setTimeout(() => {
    window.stats.methods._animate_to(93);
  }, 500);
});

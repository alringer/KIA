$(document).ready(() => {
  window.preLogin = {
    elements : {
      status : $('.status'),
      nav_scroll : $('nav.scroll'),
      nav_scroll_trigger : $('.trigger-nav-scroll'),
      map : $('.map-scroll'),
      map_element : $('.map-element'),
      car : $('.car'),
      car_icon : $('.car-element'),
      car_container : $('.car-container'),
      car_stop : $('.car-stop'),
      path : $('#pathy'),
      path_m : $('#pathm'),
      map_path_m : $('.map-path-m'),
      mobile_map : $('.mobile-map'),
      scroll_box : $('.white-box.on-scroll'),
      scroll_info : $('.map-info.on-scroll'),
      alert : $('.alert-circle.on-scroll'),
      map_stats : $('.map-stats'),
    },
    methods : {
      _scroll : () => {
        if(!window.preLogin.elements.status.length) {
          return;
        }
        var status_start = window.preLogin.elements.status.offset().top,
            y = window.pageYOffset,
            window_height = window.innerHeight;
        if(y > (status_start - (window_height * .75))) {
          window.preLogin.elements.status.addClass('play')
        }
        if(y > window.preLogin.elements.nav_scroll_trigger.offset().top) {
          window.preLogin.elements.nav_scroll.addClass('show');
        }else{
          window.preLogin.elements.nav_scroll.removeClass('show');
        }

        var scale = (window.innerWidth > 767) ? window.preLogin.elements.map_element.outerWidth() / 807 : 1,
            start_offset = (window.innerWidth > 767) ? 150 : (-70 * scale),
            map_start = window.preLogin.elements.map_element.offset().top - (start_offset * (1 - scale + 1)),
            path = (window.innerWidth > 767) ? document.getElementById('pathy') : document.getElementById('pathm'),
            path_start =
              (window.innerWidth > 767)
                ?
                  window.preLogin.elements.path.offset().top - Math.abs(map_start - window.preLogin.elements.path.offset().top)
                :
                  window.preLogin.elements.mobile_map.offset().top  - Math.abs(map_start - window.preLogin.elements.mobile_map.offset().top)
            ;
        if(path) {
          var point_offset = (window.innerWidth > 767) ? 1896 : 1748;
          var point = path.getPointAtLength(
              (y - path_start) / (point_offset * scale) * Math.floor( path.getTotalLength() )
          );
          console.log();
          point.x = point.x * scale;
          point.y = point.y * scale;
          window.preLogin.elements.mobile_map.css({
            'transform' : `translateX(50%) scale(${scale})`,
            '-webkit-transform' : `translateX(50%) scale(${scale})`
          });
          if( y > map_start) {
            window.preLogin.elements.car.addClass('fixed');
            if(point.x >= 0) {
              window.preLogin.elements.car_container.css({
                'transform' : `translateX(${point.x}px) scale(${scale})`,
                '-webkit-transform' : `translateX(${point.x}px) scale(${scale})`
              });
              var pointData = window.preLogin.elements.car_container.data('point');
              if(pointData) {
                  var rotate = (Math.atan2(point.y - pointData.y, point.x - pointData.x) * 180 / Math.PI) - 90;
                  window.preLogin.elements.car_icon.css({
                    'transform' : `rotate(${rotate}deg)`,
                    '-webkit-transform' : `rotate(${rotate}deg)`
                  })
              }

              window.preLogin.elements.car_container.data('point', point);
            }else{
              window.preLogin.elements.car_container.css({
                'transform' : `scale(${scale})`,
                '-webkit-transform' : `scale(${scale})`,
              });
            }
          }else{
            window.preLogin.elements.car.removeClass('fixed');
          }
          if(y > window.preLogin.elements.car_stop.offset().top - 275 ) {
            window.preLogin.elements.car.addClass('hide-car');
          }else{
            window.preLogin.elements.car.removeClass('hide-car');
          }
        }
        window.preLogin.elements.scroll_box.each(function() {
          var $this = $(this);
          if(y > $this.offset().top - 400) {
            $this.addClass('show');
          }
        });
        window.preLogin.elements.scroll_info.each(function() {
          var $this = $(this);
          if(y > $this.offset().top - 200) {
            $this.addClass('show');
          }
        });
        window.preLogin.elements.alert.each(function() {
          var $this = $(this);
          if(y > $this.offset().top - 310) {
            $this.addClass('show');
          }
        });
        if(y > window.preLogin.elements.map_stats.offset().top - 300) {
          var c = 0;
          window.preLogin.elements.map_stats.find('.count').each(function(){
            var $count = $(this);
            if($count.data('interval')) {
              return;
            }
            $count.data('interval', setInterval(() => {
              var $count = $(this),
                  count_to = $count.data('count'),
                  count_current = parseInt($count.text(), 10);
              if(count_current >= count_to) {
                clearInterval($count.data('interval'));
                return;
              }
              $count.text(count_current+1);
            }, 50));
            c++;
          });
        }
      },
    }
  };
  // EVENTS
  $(window).on('scroll', window.preLogin.methods._scroll);
  $(window).on('resize', window.preLogin.methods._scroll);
  $(document).ready(() => {
    setTimeout(() => {
      window.preLogin.methods._scroll();
    }, 200);
  });
});

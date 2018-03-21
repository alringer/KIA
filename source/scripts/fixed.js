$(document).ready(() => {
  window.fixed = {
    elements : {
      fix_start : $('.fix-start'),
      window : $(window),
    },
    methods : {
      _fix : () => {
        window.fixed.elements.fix_start.each(function() {
          var $this = $(this);
          if(window.pageYOffset > $this.offset().top - 60) {
            $this.addClass('fixed');
          }else{
            $this.removeClass('fixed');
          }
        });
      },
    }
  };
  // EVENTS
  window.fixed.elements.window.on('scroll', window.fixed.methods._fix);
});

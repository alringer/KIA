$(document).ready(() => {
  window.preLogin = {
    elements : {
      status : $('.status'),
      nav_scroll : $('nav.scroll'),
      nav_scroll_trigger : $('.trigger-nav-scroll'),
    },
    methods : {
      _satus_scroll : () => {
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
      },
    }
  };
  console.log(window.preLogin.elements.nav_scroll.length);
  // EVENTS
  $(window).on('scroll', window.preLogin.methods._satus_scroll);
});

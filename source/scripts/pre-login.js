$(document).ready(() => {
  window.preLogin = {
    elements : {
      status : $('.status'),
    },
    methods : {
      _satus_scroll : () => {
        if(!window.preLogin.elements.status.length) {
          return;
        }
        var status_start = window.preLogin.elements.status.offset().top,
            y = window.pageYOffset,
            window_height = window.innerHeight;
        console.log(y);
        if(y > (status_start - (window_height * .75))) {
          window.preLogin.elements.status.addClass('play')
        }
      },
    }
  };
  // EVENTS
  $(window).on('scroll', window.preLogin.methods._satus_scroll);
});

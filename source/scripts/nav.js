$(document).ready(() => {
  window.nav = {
    elements : {
      body : $('body'),
      nav_open : $('[data-action="nav-open"]'),
      nav_toggle : $('[data-action="nav-toggle"]'),
      nav_menu : $('.nav-app-mobile-menu'),
      nav_menu_icons : $('.nav-app-menu li a'),
      nav_menu_icon_more : $('.nav-app-menu li.more a'),
    },
    methods : {
      _toggle : () => {
        if( !window.nav.elements.nav_menu.hasClass('open') ) {
          window.nav.methods._open();
        }else{
          window.nav.methods._close();
        }
      },
      _open : () => {
        window.nav.elements.nav_open.addClass('active');
        window.nav.elements.nav_menu_icons.filter('.active').addClass('save-active');
        window.nav.elements.nav_menu_icons.removeClass('active');
        window.nav.elements.nav_menu_icon_more.addClass('active');
        window.nav.elements.nav_menu.addClass('open');
      },
      _close : function(e) {
        window.nav.elements.nav_menu_icons.removeClass('active');
        window.nav.elements.nav_menu_icons.filter('.save-active').addClass('active').removeClass('save-active');
        window.nav.elements.nav_menu.removeClass('open');
      },
      _stop_propagation : function(e) {
        e.preventDefault();
        e.stopPropagation();
      }
    }
  };
  // EVENTS
  window.nav.elements.nav_toggle.on('click', window.nav.methods._toggle);
  window.nav.elements.nav_open.on('click', window.nav.methods._open);
  window.nav.elements.body.on('click', window.nav.methods._close);
  window.nav.elements.nav_menu.on('click', window.nav.methods._stop_propagation);
  window.nav.elements.nav_open.on('click', window.nav.methods._stop_propagation);
  window.nav.elements.nav_toggle.on('click', window.nav.methods._stop_propagation);
});

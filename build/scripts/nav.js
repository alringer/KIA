'use strict';

$(document).ready(function () {
  window.nav = {
    elements: {
      body: $('body'),
      nav_open: $('[data-action="nav-open"]'),
      nav_toggle: $('[data-action="nav-toggle"]'),
      nav_menu: $('.nav-app-mobile-menu'),
      nav_menu_icons: $('.nav-app-menu li a'),
      nav_menu_icon_more: $('.nav-app-menu li.more a'),
      nav_menu_inner: $('.nav-app-mobile-menu-inner'),
      nav_vehicle_selector_open: $('[data-action="vehicle-selector-next"]'),
      nav_vehicle_selector_close: $('[data-action="vehicle-selector-back"]')
    },
    methods: {
      _toggle: function _toggle() {
        if (!window.nav.elements.nav_menu.hasClass('open')) {
          window.nav.methods._open();
        } else {
          window.nav.methods._close();
        }
      },
      _open: function _open() {
        window.nav.elements.nav_open.addClass('active');
        window.nav.elements.nav_menu_icons.filter('.active').addClass('save-active');
        window.nav.elements.nav_menu_icons.removeClass('active');
        window.nav.elements.nav_menu_icon_more.addClass('active');
        window.nav.elements.nav_menu.addClass('open');
      },
      _close: function _close(e) {
        if ($(e.target).is('[data-toggle="modal"]') || $(e.target).parents('[data-toggle="modal"]').length) {
          return;
        }
        if (!window.nav.elements.nav_menu.hasClass('open')) {
          return;
        }
        window.nav.elements.nav_menu_icons.removeClass('active');
        window.nav.elements.nav_menu_icons.filter('.save-active').addClass('active').removeClass('save-active');
        window.nav.elements.nav_menu.removeClass('open');
        window.nav.methods._vehicle_selector_close();
      },
      _stop_propagation: function _stop_propagation(e) {
        // e.preventDefault();
        if (!$(e.target).is('[data-toggle="modal"]') && !$(e.target).parents('[data-toggle="modal"]').length) {
          e.stopPropagation();
        }
      },
      _vehicle_selector_open: function _vehicle_selector_open() {
        window.nav.elements.nav_menu_inner.addClass('selector');
      },
      _vehicle_selector_close: function _vehicle_selector_close() {
        window.nav.elements.nav_menu_inner.removeClass('selector');
      }
    }
  };
  // EVENTS
  window.nav.elements.nav_toggle.on('click', window.nav.methods._toggle);
  window.nav.elements.nav_open.on('click', window.nav.methods._open);
  window.nav.elements.body.on('click touchstart', window.nav.methods._close);
  $('.has-mobile-nav').on('click touchstart', window.nav.methods._close);
  window.nav.elements.nav_menu.on('click touchstart', window.nav.methods._stop_propagation);
  window.nav.elements.nav_open.on('click touchstart', window.nav.methods._stop_propagation);
  window.nav.elements.nav_toggle.on('click touchstart', window.nav.methods._stop_propagation);
  window.nav.elements.nav_vehicle_selector_open.on('click', window.nav.methods._vehicle_selector_open);
  window.nav.elements.nav_vehicle_selector_close.on('click', window.nav.methods._vehicle_selector_close);
});

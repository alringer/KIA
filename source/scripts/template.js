$(document).ready(() => {
  window.NAME = {
    elements : {
      'element' : $('.element'),
    },
    methods : {
      _method : () => {

      },
    }
  };
  // EVENTS
  window.login.elements.element.on('click', window.NAME.methods._method);
});

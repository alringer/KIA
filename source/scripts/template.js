$(document).ready(() => {
  window.template = {
    elements : {
      'element' : $('.element'),
    },
    methods : {
      _method : () => {

      },
    }
  };
  // EVENTS
  window.template.elements.element.on('click', window.template.methods._method);
});

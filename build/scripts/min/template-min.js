'use strict';

$(document).ready(function () {
  window.template = {
    elements: {
      'element': $('.element')
    },
    methods: {
      _method: function _method() {}
    }
  };
  // EVENTS
  window.template.elements.element.on('click', window.template.methods._method);
});

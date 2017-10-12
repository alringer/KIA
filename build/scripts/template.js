'use strict';

$(document).ready(function () {
  window.NAME = {
    elements: {
      'element': $('.element')
    },
    methods: {
      _method: function _method() {}
    }
  };
  // EVENTS
  window.login.elements.element.on('click', window.NAME.methods._method);
});

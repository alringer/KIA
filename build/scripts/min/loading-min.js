'use strict';

$(document).ready(function () {
  window.loading = {
    elements: {
      loading_bar: $('.loading-bar')
    },
    methods: {
      _loading_start: function _loading_start() {
        window.loading.elements.loading_bar.addClass('loading');
      },
      _loading_stop: function _loading_stop() {
        window.loading.elements.loading_bar.removeClass('loading');
      }
    }
  };
});

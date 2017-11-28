'use strict';

$(document).ready(function () {
  window.alerts = {
    elements: {
      alerts: $('.alerts .alert:not(.locked)')
    },
    methods: {
      _reset: function _reset() {
        window.alerts.methods.close._error();
        window.alerts.methods.close._sccuess();
        clearTimeout(window.closeAlertError);
        clearTimeout(window.closeAlertSuccess);
      },
      open: {
        _error: function _error() {
          window.alerts.methods._reset();
          window.alerts.elements.alerts.filter('.alert-failed').addClass('in');
          window.closeAlertError = setTimeout(function () {
            window.alerts.methods.close._error();
          }, 6000);
        },
        _success: function _success() {
          window.alerts.methods._reset();
          window.alerts.elements.alerts.filter('.alert-success').addClass('in');
          window.closeAlertSuccess = setTimeout(function () {
            window.alerts.methods.close._sccuess();
          }, 6000);
        }
      },
      close: {
        _all: function _all() {
          window.alerts.elements.alerts.removeClass('in');
        },
        _error: function _error() {
          window.alerts.elements.alerts.filter('.alert-failed').removeClass('in');
        },
        _sccuess: function _sccuess() {
          window.alerts.elements.alerts.filter('.alert-success').removeClass('in');
        }
      }
    }
  };
  // EVENTS
  // window.alert.elements.element.on('click', window.template.methods._method);
});

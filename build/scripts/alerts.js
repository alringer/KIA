'use strict';

$(document).ready(function () {
  window.alerts = {
    elements: {
      alerts: $('.alerts .alert:not(.locked)'),
      alerts_close: $('.alerts .alert .close')
    },
    methods: {
      _reset: function _reset() {
        window.alerts.methods.close._error();
        window.alerts.methods.close._sccuess();
        window.alerts.methods.close._notification();
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
        },
        _notification: function _notification() {
          window.alerts.methods._reset();
          window.alerts.elements.alerts.filter('.alert-notification').addClass('in');
          window.closeAlertSuccess = setTimeout(function () {
            window.alerts.methods.close._notification();
          }, 6000);
        }
      },
      close: {
        _all: function _all() {
          window.alerts.methods._reset();
        },
        _error: function _error() {
          window.alerts.elements.alerts.filter('.alert-failed').removeClass('in');
        },
        _sccuess: function _sccuess() {
          window.alerts.elements.alerts.filter('.alert-success').removeClass('in');
        },
        _notification: function _notification() {
          window.alerts.elements.alerts.filter('.alert-notification').removeClass('in');
        }
      }
    }
  };
  // EVENTS
  window.alerts.elements.alerts_close.on('click', window.alerts.methods.close._all);
});

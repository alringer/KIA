'use strict';

$(document).ready(function () {
  window.remoteCommands = {
    elements: {
      body: $('body'),
      view: $('.view-overview'),
      remote_command: $('.overview-remote-command'),
      remote_command_buttons: $('.overview-remote-command-actions .action-button, .remote-command-action-button'),
      refresh_buttons: $('[data-action="refresh-page"]'),
      trigger_error: $('.trigger-remote-error'),
      remote_body: $('.remote-body')
    },
    methods: {
      _communicate: function _communicate() {
        var $this = $(this),
            $this_command = $this.parents('.overview-remote-command'),
            $this_transitioning_messages = $this_command.find('.transitioning-messages span'),
            action = $this.data('action'),
            first_state = action.replace('state-', '').substr(0, 1),
            new_state = action.substr(-1),
            current_state = null;
        if ($this.hasClass('show-warning')) {
          return;
        }
        if ($this_command.hasClass('state-1')) {
          current_state = '1';
        }
        if ($this_command.hasClass('state-2')) {
          current_state = '2';
        }
        if ($this_command.hasClass('state-3')) {
          current_state = '3';
        }
        $this_transitioning_messages.removeClass('active');
        $this_transitioning_messages.filter('.' + action).addClass('active');
        $this_command.addClass('communicating');
        $this_command.removeClass('state-1 state-2 state-3');
        $this_command.addClass('state-' + new_state + '-communicating');
        window.remoteCommands.elements.view.addClass('communicating');
        window.loading.methods._loading_start();
        if (first_state === 'x') {
          new_state = current_state;
        }
        if (window.remoteCommands.elements.remote_body.length) {
          window.remoteCommands.elements.remote_body.removeClass('state-1 state-2 state-3 state-1-communicating state-2-communicating state-3-communicating');
          window.remoteCommands.elements.remote_body.addClass('state-' + new_state + '-communicating');
        }
        setTimeout(function () {
          window.remoteCommands.methods._commiunicate_stop($this_command, first_state, new_state);
        }, 3000);
      },
      _commiunicate_stop: function _commiunicate_stop($command, first_state, new_state) {
        $command.find('.state-' + first_state).removeClass('active');
        $command.find('.state-' + new_state).addClass('active');
        $command.removeClass('communicating');
        window.remoteCommands.elements.view.removeClass('communicating');
        window.loading.methods._loading_stop();
        $command.addClass('state-' + new_state);
        $command.removeClass('state-1-communicating state-2-communicating state-3-communicating');
        if (window.remoteCommands.elements.remote_body.length) {
          window.remoteCommands.elements.remote_body.removeClass('state-1 state-2 state-3 state-1-communicating state-2-communicating state-3-communicating');
          window.remoteCommands.elements.remote_body.addClass('state-' + new_state);
        }
      },
      _refresh: function _refresh() {
        if (window.remoteCommands.elements.body.hasClass('refreshing')) {
          return;
        }
        window.remoteCommands.elements.body.addClass('refreshing');
        window.loading.methods._loading_start();
        setTimeout(function () {
          $('.last-refreshed .time').text('just now');
          window.remoteCommands.elements.body.removeClass('refreshing');
          window.loading.methods._loading_stop();
        }, 3000);
      },
      _trigger_error: function _trigger_error() {
        setTimeout(function () {
          window.alerts.methods.open._error();
        }, 3000);
      }
    }
  };
  // EVENTS
  window.remoteCommands.elements.remote_command_buttons.on('click', window.remoteCommands.methods._communicate);
  window.remoteCommands.elements.refresh_buttons.on('click', window.remoteCommands.methods._refresh);
  window.remoteCommands.elements.trigger_error.on('click', window.remoteCommands.methods._trigger_error);
});

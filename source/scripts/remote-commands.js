$(document).ready(() => {
  window.remoteCommands = {
    elements : {
      body : $('body'),
      view : $('.view-overview'),
      remote_command : $('.overview-remote-command'),
      remote_command_buttons : $('.overview-remote-command-actions .action-button'),
      refresh_buttons : $('[data-action="refresh-page"]'),
      trigger_error : $('.trigger-remote-error'),
    },
    methods : {
      _communicate : function() {
        var $this = $(this),
            $this_command = $this.parents('.overview-remote-command'),
            $this_transitioning_messages = $this_command.find('.transitioning-messages span'),
            action = $this.data('action'),
            first_state = action.replace('state-', '').substr(0, 1),
            new_state = action.substr(-1);
        $this_transitioning_messages.removeClass('active');
        $this_transitioning_messages.filter(`.${action}`).addClass('active');

        $this_command.addClass('communicating');
        $this_command.removeClass('state-1 state-2 state-3');
        $this_command.addClass(`state-${new_state}-communicating`);
        window.remoteCommands.elements.view.addClass('communicating');
        window.loading.methods._loading_start();

        setTimeout(() => {
          window.remoteCommands.methods._commiunicate_stop($this_command, first_state, new_state);
        }, 3000);
      },
      _commiunicate_stop : ($command, first_state, new_state) => {
        $command.find(`.state-${first_state}`).removeClass('active');
        $command.find(`.state-${new_state}`).addClass('active');
        $command.removeClass('communicating');
        window.remoteCommands.elements.view.removeClass('communicating');
        window.loading.methods._loading_stop();
        $command.addClass(`state-${new_state}`);
        $command.removeClass(`state-${new_state}-communicating`);
      },
      _refresh : () => {
        if( window.remoteCommands.elements.body.hasClass('refreshing') ) {
          return;
        }
        window.remoteCommands.elements.body.addClass('refreshing');
        window.loading.methods._loading_start();
        setTimeout(() => {
          $('.last-refreshed .time').text('just now');
          window.remoteCommands.elements.body.removeClass('refreshing');
          window.loading.methods._loading_stop();
        }, 3000);
      },
      _trigger_error : () => {
        setTimeout(() => {
          window.alerts.methods.open._error();
        }, 3000)
      }
    }
  };
  // EVENTS
  window.remoteCommands.elements.remote_command_buttons.on('click', window.remoteCommands.methods._communicate);
  window.remoteCommands.elements.refresh_buttons.on('click', window.remoteCommands.methods._refresh);
  window.remoteCommands.elements.trigger_error.on('click', window.remoteCommands.methods._trigger_error);
});

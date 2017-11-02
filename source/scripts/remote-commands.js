$(document).ready(() => {
  window.remoteCommands = {
    elements : {
      view : $('.view-overview'),
      remote_command : $('.overview-remote-command'),
      remote_command_buttons : $('.overview-remote-command-actions .action-button'),
      refresh_buttons : $('.view-overview [data-action="refresh-page"]'),
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
        window.remoteCommands.elements.view.addClass('communicating');

        setTimeout(() => {
          $this_command.find(`.state-${first_state}`).removeClass('active');
          $this_command.find(`.state-${new_state}`).addClass('active');
          $this_command.removeClass('communicating');
          window.remoteCommands.elements.view.removeClass('communicating');
        }, 1000);
      },
      _refresh : () => {
        if( window.remoteCommands.elements.view.hasClass('refreshing') ) {
          return;
        }
        window.remoteCommands.elements.view.addClass('refreshing');
        setTimeout(() => {
          $('.last-refreshed .time').text('just now');
          window.remoteCommands.elements.view.removeClass('refreshing');
        }, 1500);
      },
    }
  };
  // EVENTS
  window.remoteCommands.elements.remote_command_buttons.on('click', window.remoteCommands.methods._communicate);
  window.remoteCommands.elements.refresh_buttons.on('click', window.remoteCommands.methods._refresh);
});
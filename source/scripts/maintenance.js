$(document).ready(() => {
  window.maintenance = {
    elements : {
      collapse_toggle : $('.toggle-collapse'),
      collapse : $('.collapse'),
      timeline_header : $('.timeline-header'),
    },
    methods : {
      _toggle_collapse : () => {
        if(window.maintenance.elements.collapse_toggle.text().toLowerCase().trim() === 'expand all') {
          window.maintenance.methods._expand_all();
          window.maintenance.elements.collapse_toggle.text('collapse all');
        }else{
          window.maintenance.methods._collapse_all();
          window.maintenance.elements.collapse_toggle.text('expand all');
        }
      },
      _expand_all : () => {
        window.maintenance.elements.collapse.collapse('show');
      },
      _collapse_all : () => {
        window.maintenance.elements.collapse.collapse('hide');
      },
      _update_status : () => {
        setTimeout(() => {
          if(window.maintenance.elements.collapse.filter('[aria-expanded="true"]').length) {
            window.maintenance.elements.collapse_toggle.text('collapse all');
          }else{
            window.maintenance.elements.collapse_toggle.text('expand all');
          }
        }, 100);
      },
    }
  };
  // EVENTS
  window.maintenance.elements.collapse_toggle.on('click', window.maintenance.methods._toggle_collapse);
  window.maintenance.elements.timeline_header.on('click', window.maintenance.methods._update_status);
});

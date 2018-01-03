$(document).ready(() => {
  window.tooltips = {
    elements : {
      tooltip : $('[data-toggle="tooltip"]'),
    },
    methods : {
      _init : () => {
        window.tooltips.elements.tooltip.tooltip();
      },
    }
  };
  // EVENTS
  window.tooltips.methods._init();
});

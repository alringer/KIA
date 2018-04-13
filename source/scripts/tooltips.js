$(document).ready(() => {
  window.tooltips = {
    elements : {
      tooltip : $('[data-toggle="tooltip"]'),
      warranty_tip : $('.view-warranty-info [data-toggle="tooltip"]'),
    },
    methods : {
      _init : () => {
        window.tooltips.elements.tooltip.not('.special').tooltip();

        window.tooltips.elements.warranty_tip.tooltip({
          html: true,
          trigger: "click",
          viewport: ".text-content",
        });
      },
      _close : function() {
        $(this).parents('.tooltip').prev('[data-toggle="tooltip"]').trigger('click');
      }
    }
  };

  $('body').delegate('.tooltip-close', 'click', window.tooltips.methods._close);

  // EVENTS
  window.tooltips.methods._init();
});

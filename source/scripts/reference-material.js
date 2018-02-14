$(document).ready(() => {
  window.refMaterial = {
    elements : {
      tab_nav : $('.nav-tabs > [data-toggle="tab"]'),
    },
    methods : {
      _switch_views: function() {
        var $this = $(this);
        window.refMaterial.elements.tab_nav.removeClass('active');
        $this.addClass('active');
      },
    }
  };
  // EVENTS
  window.refMaterial.elements.tab_nav.on('click', window.refMaterial.methods._switch_views);
});

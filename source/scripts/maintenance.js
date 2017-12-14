$(document).ready(() => {
  window.maintenance = {
    elements : {
      collapse_all : $('.collapse-all'),
    },
    methods : {
      _collapse_all : () => {
        console.log('run');
        $('.collapse').collapse('hide');
      },
    }
  };
  // EVENTS
  window.maintenance.elements.collapse_all.on('click', window.maintenance.methods._collapse_all);
});

$(document).ready(() => {
  window.mydocuments = {
    elements : {
      view : $('.view-my-documents'),
      edit_checkbox : $('input[name="edit"]'),
      edit_start : $('[data-action="editing-start"]'),
      edit_stop : $('[data-action="editing-stop"]'),
      edit_select_all : $('.ulility-nav-edit .select-all'),
      edit_deselect_all : $('.ulility-nav-edit .deselect-all'),
      edit_delete : $('.ulility-nav-edit .delete-selected'),
      edit_toggle_select_all : $('.view-my-documents .toggle-select-all'),
    },
    methods : {
      editing : {
        // Starts editing
        _start : () => {
          window.mydocuments.elements.view.addClass('editing');
          // Auto detect available options
          window.mydocuments.methods.editing._enable_options();
        },
        _stop : () => {
          // Reset view out of editing mode
          window.mydocuments.elements.view.removeClass('editing');
          // Deselect all checkboxes
          window.mydocuments.methods.editing._deselect_all();
          // Reset the available options
          window.mydocuments.methods.editing._enable_options();
        },
        // Select all checkboxes
        _select_all : () => {
          console.log('test');
          window.mydocuments.elements.edit_checkbox.prop('checked', true);
          window.mydocuments.methods.editing._enable_options();
        },
        // Deselect all checkboxes
        _deselect_all : () => {
          window.mydocuments.elements.edit_checkbox.prop('checked', false);
          window.mydocuments.methods.editing._enable_options();
        },
        // Auto detect which options are available
        _enable_options : () => {
          // If any checkboxes are checked
          if(window.mydocuments.elements.edit_checkbox.filter(':checked').length) {
            // Allow user to use "deselect all"
            window.mydocuments.elements.edit_deselect_all.removeClass('disabled');
            // Allow user to "delete"
            window.mydocuments.elements.edit_delete.removeClass('disabled');
          }else{
            // Block user from using "deselect all"
            window.mydocuments.elements.edit_deselect_all.addClass('disabled');
            // Block user from using "delete"
            window.mydocuments.elements.edit_delete.addClass('disabled');
          }
          // If all checkboxes are checked
          if(window.mydocuments.elements.edit_checkbox.filter(':checked').length === window.mydocuments.elements.edit_checkbox.length) {
            window.mydocuments.elements.edit_select_all.addClass('disabled');
          }else {
            window.mydocuments.elements.edit_select_all.removeClass('disabled');
          }
        },
        // Toggles all checkboxes
        _toggle_select_all : function() {
          var $this = $(this);
          if($this.is(':checked')) {
            window.mydocuments.methods.editing._select_all();
          }else{
            window.mydocuments.methods.editing._deselect_all();
          }
          window.mydocuments.methods.editing._enable_options();
        },
        // Fired on checkbox change
        _checkbox_change : (e) => {
          var $this = $(e.target);
          // If a checbox is checked, start editing mode
          if($this.is(':checked')) {
            window.mydocuments.methods.editing._start();
          }
          // Auto-detect options
          window.mydocuments.methods.editing._enable_options();
        }
      },
    }
  };
  // EVENTS
  window.mydocuments.elements.edit_checkbox.on('change.edit', window.mydocuments.methods.editing._checkbox_change);
  window.mydocuments.elements.edit_select_all.on('click', window.mydocuments.methods.editing._select_all);
  window.mydocuments.elements.edit_deselect_all.on('click', window.mydocuments.methods.editing._deselect_all);
  window.mydocuments.elements.edit_stop.on('click', window.mydocuments.methods.editing._stop);
  window.mydocuments.elements.edit_start.on('click', window.mydocuments.methods.editing._start);
  window.mydocuments.elements.edit_toggle_select_all.on('change._select_all', window.mydocuments.methods.editing._toggle_select_all);
});

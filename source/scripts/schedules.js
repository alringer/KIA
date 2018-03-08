$(document).ready(() => {
  window.schedules = {
    elements : {
      stop_prop  : $('.stop-prop'),
      tab_enable  : $('a[data-toggle] .toggle input'),
      tab_active  : $('a[data-toggle]'),
      charge_chooser : $('.charge-settings-options label input'),
      off_peak : $('.off-peak-picker'),
      charge_label : $('.charge-label'),
      off_peak_start_time : $('.off-peak-start'),
      off_peak_start_time_tod : $('.off-peak-start-tod'),
      off_peak_stop_time : $('.off-peak-stop'),
      off_peak_stop_time_tod : $('.off-peak-stop-tod'),
      off_peak_update : $('.off-peak-update'),
      climate_footer_toggle : $('.climate-footer .toggle input'),
      inputs : $('.schedules-tabs input'),
      save_button : $('.save-schedules-button'),
    },
    methods : {
      _stop_prop : (e) => {
        e.stopPropagation();
      },
      _tab_active : function() {
        var $this = $(this);
        window.schedules.elements.tab_active.removeClass('active');
        $this.addClass('active');
      },
      _tab_enable : function() {
        var $this = $(this),
            checked = $this.prop('checked'),
            $parent = $this.parents('a[data-toggle]');
        if(checked) {
          $parent.addClass('enabled');
        }else{
          $parent.removeClass('enabled');
        }
      },
      _off_peak : function() {
        var $this = $(this);
        if($this.val() === 'off-peak' && $this.prop('checked')) {
          window.schedules.elements.off_peak.addClass('show');
        }else{
          window.schedules.elements.off_peak.removeClass('show');
        }
        window.schedules.methods._set_charge_label();
      },
      _set_charge_label : () => {
        var val = window.schedules.elements.charge_chooser.filter(':checked').val();
        if(val === 'plug') {
          window.schedules.elements.charge_label.text('When I plug it in');
        }else{
          var update_text = "";
          update_text += window.schedules.elements.off_peak_start_time.val();
          update_text += " ";
          update_text += window.schedules.elements.off_peak_start_time_tod.filter(':checked').val();
          update_text += " - ";
          update_text += window.schedules.elements.off_peak_stop_time.val();
          update_text += " ";
          update_text += window.schedules.elements.off_peak_stop_time_tod.filter(':checked').val();
          update_text = update_text.toUpperCase();
          window.schedules.elements.charge_label.text(update_text);
        }
      },
      _climate_footer_toggle : function() {
        var $this = $(this),
            $parent = $this.parents('.climate-footer-col');
        if($this.prop('checked')) {
          $parent.find('i').addClass('green');
        }else{
          $parent.find('i').removeClass('green');
        }
      },
      _changes_made : () => {
        window.schedules.elements.save_button.removeClass('disabled');
        window.schedules.methods._confirm_changes();
      },
      _confirm_changes : () => {
        $('a:not([data-toggle])').on('click', function(e){
          e.preventDefault();
          $('#confirm-changes').modal('show');
        });
      },
    }
  };
  // EVENTS
  window.schedules.elements.stop_prop.on('click', window.schedules.methods._stop_prop);
  window.schedules.elements.tab_enable.on('change', window.schedules.methods._tab_enable);
  window.schedules.elements.tab_active.on('click', window.schedules.methods._tab_active);
  window.schedules.elements.charge_chooser.on('change', window.schedules.methods._off_peak);
  window.schedules.elements.off_peak_update.on('change', window.schedules.methods._set_charge_label);
  window.schedules.elements.climate_footer_toggle.on('change', window.schedules.methods._climate_footer_toggle);
  window.schedules.elements.inputs.on('change', window.schedules.methods._changes_made);
});

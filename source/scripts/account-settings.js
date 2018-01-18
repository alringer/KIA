$(document).ready(() => {
  window.accountSettings = {
    elements : {
      info_fields : $('.modal-settings input, .modal-settings select'),
      save_info_btn : $('.save-personal-info-btn'),
      save_notifs_btn : $('.save-notifications-btn'),
      save_multiple_notifs_btn : $('.save-multiple-notifications-btn'),
      change_pw_btn : $('.change-password-btn'),
      verify_number_btn : $('.verify-number-btn'),
      resend_code_btn : $('.resend-code-btn'),
      select_all : $('.modal-notification-settings-apply-to .select-all'),
      checkboxes : $('.modal-notification-settings-apply-to input[type="checkbox"]'),
      dropdown_options : $('.modal-notification-settings .dropdown .dropdown-menu li'),
      create_password_validator: $('.modal-change-password .inline-validator'),
      create_password: $('.modal-change-password .password-field'),
      toggle_show_password_rules : $('.modal-change-password .toggle-show-password-rules'),
      toggle_show_password : $('.toggle-show-password'),
      change_pw_fields : $('.modal-change-password input')
    },
    methods : {
      _disable : () => {
        $("#settings").addClass('disable-modal');
      },
      _enable : () => {
        $("#settings").removeClass('disable-modal');
      },
      _update_info_save : () => {
        window.accountSettings.elements.save_info_btn.addClass('spinning');
        window.loading.methods._loading_start();
        window.accountSettings.methods._disable();
        setTimeout(() => {
          window.accountSettings.methods._enable();
          window.loading.methods._loading_stop();
          window.accountSettings.elements.save_info_btn.removeClass('spinning');
          $("#settings").modal('hide');
          window.alerts.methods.open._success();
        }, 2000);
      },
      _save_notifications : () => {
        window.accountSettings.elements.save_notifs_btn.addClass('spinning');
        window.loading.methods._loading_start();
        window.accountSettings.methods._disable();
        setTimeout(() => {
          window.accountSettings.methods._enable();
          window.loading.methods._loading_stop();
          window.accountSettings.elements.save_notifs_btn.removeClass('spinning');
          $("#settings").modal('hide');
          window.alerts.methods.open._success();
        }, 2000);
      },
      _save_multiple_notifications : () => {
        window.accountSettings.elements.save_multiple_notifs_btn.addClass('spinning');
        window.loading.methods._loading_start();
        window.accountSettings.methods._disable();
        setTimeout(() => {
          window.accountSettings.methods._enable();
          window.loading.methods._loading_stop();
          window.accountSettings.elements.save_multiple_notifs_btn.removeClass('spinning');
          $("#settings").modal('hide');
          window.alerts.methods.open._success();
        }, 2000);
      },
      _change_pw_disable : () => {
        var valid = true;
        window.accountSettings.elements.change_pw_fields.each(function(){
          if(!$(this).val()) {
            valid = false;
          }
        });
        if(valid) {
          window.accountSettings.elements.change_pw_btn.removeClass('disabled');
        }
      },
      _change_password : () => {
        window.accountSettings.elements.change_pw_btn.addClass('spinning');
        window.loading.methods._loading_start();
        window.accountSettings.methods._disable();
        setTimeout(() => {
          window.accountSettings.methods._enable();
          window.loading.methods._loading_stop();
          window.accountSettings.elements.change_pw_btn.removeClass('spinning');
          $("#modal-settings-slider").carousel(0);
          window.alerts.methods.open._success();
        }, 2000);
      },
      _verify_number : () => {
        window.accountSettings.elements.verify_number_btn.addClass('spinning');
        window.accountSettings.elements.resend_code_btn.addClass('disabled');
        window.loading.methods._loading_start();
        window.accountSettings.methods._disable();
        setTimeout(() => {
          window.loading.methods._loading_stop();
          window.accountSettings.elements.verify_number_btn.removeClass('spinning');
          window.accountSettings.elements.resend_code_btn.removeClass('disabled');
          window.accountSettings.methods._enable();
          $("#modal-settings-slider").carousel(0);
          window.alerts.methods.open._success();
        }, 2000);
      },
      _select_all : () => {
        window.accountSettings.elements.select_all.toggleClass('all-selected');
        if(window.accountSettings.elements.select_all.hasClass('all-selected')) {
          window.accountSettings.elements.select_all.text('Deselect All');
          window.accountSettings.elements.checkboxes.prop('checked', true);
        }else{
          window.accountSettings.elements.select_all.text('Select All');
          window.accountSettings.elements.checkboxes.prop('checked', false);
        }
        window.accountSettings.methods._apply_settings_disabled();
      },
      _checkbox_change : () => {
        var all_checked = true;
        window.accountSettings.elements.checkboxes.each(function(){
          if(!$(this).prop('checked')) {
            all_checked = false;
          }
        });
        if(!all_checked) {
          window.accountSettings.elements.select_all
            .text('Select All')
            .removeClass('all-selected');
        }else{
          window.accountSettings.elements.select_all
            .text('Deselect All')
            .addClass('all-selected');
        }
      },
      _dropdown_select : function() {
        var $this = $(this),
            $dropdown = $this.parents('.dropdown'),
            $button = $dropdown.find('button');
        $button.find('.car-data').html($this.find('.car-data').html());
        $dropdown.dropdown('toggle');
        $button.dropdown();
      },
      _personal_info_change : () => {
        window.accountSettings.elements.save_info_btn.removeClass('disabled');
      },
      _apply_settings_disabled : () => {
        var any_checked = false;
        window.accountSettings.elements.checkboxes.each(function(){
          if($(this).prop('checked')) {
            any_checked = true;
          }
        });
        if(any_checked) {
          window.accountSettings.elements.save_multiple_notifs_btn.removeClass('disabled');
        }else{
          window.accountSettings.elements.save_multiple_notifs_btn.addClass('disabled');
        }
      },
      _password_validation : (e) => {
        var $this = $(e.currentTarget);
        // If there is a value, add the "show" class to transition in the validation elemenbt
        if ($this.val()) {
          window.accountSettings.elements.create_password_validator.addClass('show');
        } else {
          window.accountSettings.elements.create_password_validator.removeClass('show');
        }
      },
      // Globally closes the validation element
      _password_validation_close: () => {
        window.accountSettings.elements.create_password_validator.removeClass('show');
      },
      // Used on mobile to force toggle the password validation rules
      _toggle_show_password_rules: () => {
        window.accountSettings.elements.create_password_validator.toggleClass('toggle-show');
      },
      // Swaps the input type from text <-> password ( used on mobile for password creation )
      _toggle_show_password : function() {
        var $this = $(this),
            $input = $this.prev('input');
        // If it's a password, swap for text, and vice versa
        if($input.is('[type="password"]')) {
          $input.attr('type', 'text');
        }else{
          $input.attr('type', 'password');
        }
      },
    }
  };
  // EVENTS
  window.accountSettings.elements.save_info_btn.on('click', window.accountSettings.methods._update_info_save);
  window.accountSettings.elements.save_notifs_btn.on('click', window.accountSettings.methods._save_notifications);
  window.accountSettings.elements.save_multiple_notifs_btn.on('click', window.accountSettings.methods._save_multiple_notifications);
  window.accountSettings.elements.change_pw_btn.on('click', window.accountSettings.methods._change_password);
  window.accountSettings.elements.verify_number_btn.on('click', window.accountSettings.methods._verify_number);
  window.accountSettings.elements.select_all.on('click', window.accountSettings.methods._select_all);
  window.accountSettings.elements.checkboxes.on('change', window.accountSettings.methods._checkbox_change);
  window.accountSettings.elements.checkboxes.on('change', window.accountSettings.methods._apply_settings_disabled);
  window.accountSettings.elements.dropdown_options.on('click', window.accountSettings.methods._dropdown_select);
  window.accountSettings.elements.info_fields.on('change', window.accountSettings.methods._personal_info_change);
  window.accountSettings.elements.info_fields.on('keyup', window.accountSettings.methods._personal_info_change);
  window.accountSettings.elements.change_pw_fields.on('change', window.accountSettings.methods._change_pw_disable);
  window.accountSettings.elements.change_pw_fields.on('keyup', window.accountSettings.methods._change_pw_disable);

  window.accountSettings.elements.create_password.on('change', window.accountSettings.methods._password_validation);
  window.accountSettings.elements.create_password.on('keyup', window.accountSettings.methods._password_validation);
  window.accountSettings.elements.create_password.on('blur', window.accountSettings.methods._password_validation_close);
  window.accountSettings.elements.create_password.on('focus', window.accountSettings.methods._password_validation);
  window.accountSettings.elements.toggle_show_password_rules.on('click', window.accountSettings.methods._toggle_show_password_rules);
  window.accountSettings.elements.toggle_show_password.on('click', window.accountSettings.methods._toggle_show_password);
});

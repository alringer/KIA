$(document).ready(() => {
  window.login = {
    elements : {
      login_email : $('.login-form .login-email'),
      create_email : $('.create-form .create-email'),
      reset_email : $('.recover-form .reset-email'),
      create_password : $('.create-form .create-password'),
      create_password_validator : $('.create-form .create-password-validator'),

      use_email_to_create : $('.use-email-to-craete'),
      use_email_to_recover : $('.create-form .use-email-to-recover'),

      reset_email_button : $('[data-action="login.reset_link"]'),
      reset_password_flow : $('.reset-password-flow'),

      back_to_signin : $('[data-action="back-to-sign-in"]'),

      demo_error_button : $('[data-action="login.demo.error"]'),
      demo_error_create_button : $('[data-action="login.demo.error_create"]'),
    },
    methods : {
      _use_email_to_create : () => {
        var value = window.login.elements.login_email.val();
        window.login.elements.create_email.val(value);
      },
      _use_email_to_recover : () => {
        var value = window.login.elements.create_email.val();
        window.login.elements.reset_email.val(value);
      },

      _password_validation : (e) => {
        var $this = $(e.currentTarget);
        if( $this.val() ) {
          window.login.elements.create_password_validator.addClass('show');
        }else{
          window.login.elements.create_password_validator.removeClass('show');
        }
      },

      _error : ($field) => {
        $field.addClass('error');

        var $error_message = $field.find('.error-message'),
            $error_message_inner = $error_message.find('.error-message-inner');

        $error_message.css({
          'height' : `${$error_message_inner[0].clientHeight}px`
        });

        $error_message_inner.addClass('show');
        setTimeout(window.modals.methods._reset_size, 250);
      },

      _error_resize : () => {

      },

      _reset_email : (e) => {
        e.preventDefault();
        var $active_modal = window.modals.elements.modal.filter('.active'),
            modal_width = $active_modal.outerWidth();
        window.login.elements.reset_password_flow.css('left', -modal_width);
        $active_modal.addClass('reset-flow-finished');
      },

      _back_to_signin : () => {
        var $active_modal = window.modals.elements.modal.filter('.active'),
            $errors = $active_modal.find('.error');
        $errors.removeClass('error');
        $errors.find('.error-message').removeAttr('style');
        $active_modal.removeClass('reset-flow-finished');
        $active_modal.addClass('back-to-sign-in');
        window.modals.methods._nav_to(1);
        window.modals.methods._overlay_toggle('close');
        window.login.elements.reset_password_flow.css('left', 0);

        var value = window.login.elements.reset_email.val();
        window.login.elements.login_email.val(value);
        window.login.elements.create_email.val(value);

        setTimeout(() => {
          $active_modal.removeClass('back-to-sign-in');
        }, 550);
      },


      demo : {
        _error : (e) => {
          e.preventDefault();
          window.login.methods._error($('.login-form li').first());
        },

        _error_create : (e) => {
          e.preventDefault();
          window.login.methods._error($('.create-form li').first());
        },
      }
    }
  };
  // EVENTS
  window.login.elements.use_email_to_create.on('click', window.login.methods._use_email_to_create);
  window.login.elements.use_email_to_recover.on('click', window.login.methods._use_email_to_recover);
  window.login.elements.create_password.on('change', window.login.methods._password_validation);
  window.login.elements.create_password.on('keyup', window.login.methods._password_validation);
  window.login.elements.reset_email_button.on('click', window.login.methods._reset_email);
  window.login.elements.back_to_signin.on('click', window.login.methods._back_to_signin);

  // DEMO EVENTS
  window.login.elements.demo_error_button.on('click', window.login.methods.demo._error);
  window.login.elements.demo_error_create_button.on('click', window.login.methods.demo._error_create);
});

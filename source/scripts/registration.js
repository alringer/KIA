$(document).ready(() => {
  window.registration = {
    elements : {
      registration_form : $('.registration-block form'),
      registration_year : $('.vehicle-lookup-form .registration-year'),
      registration_model : $('.vehicle-lookup-form .registration-model'),
      registration_extra : $('.vehicle-lookup-form .registration-extra'),
      registration_vin : $('.vehicle-vin-form .registration-vin'),
      registration_send_code_to : $('.vehicle-activate-form [name="send-code-to"]'),
      registration_block_hidden_options : $('.vehicle-lookup-form .registration-block-hidden-options'),
      registration_submit_button : $('.registration-block form input[type="submit"]'),
      registration_slider : $('.view-registration-header-context-steps'),
    },
    methods : {
      _reveal_exta : () => {
        if(
          window.registration.elements.registration_year.val().length
          && window.registration.elements.registration_model.val().length
        ) {
          window.registration.elements.registration_block_hidden_options.addClass('open');
        }else{
          window.registration.elements.registration_block_hidden_options.removeClass('open');
          window.registration.elements.registration_extra.prop('checked', false);
        }
      },
      _toggle_disable : function() {
        var $this = $(this);
        if( window.registration.elements.registration_form.is('.vehicle-lookup-form') ) {
          if(
            window.registration.elements.registration_year.val().length
            && window.registration.elements.registration_model.val().length
            && window.registration.elements.registration_extra.filter(':checked').val()
          ) {
            window.registration.elements.registration_submit_button.removeClass('disabled');
          }else{
            window.registration.elements.registration_submit_button.addClass('disabled');
          }
        } else if( window.registration.elements.registration_form.is('.vehicle-vin-form') ) {
          if( window.registration.elements.registration_vin.val().length === 17 ) {
            window.registration.elements.registration_submit_button.removeClass('disabled');
          }else{
            window.registration.elements.registration_submit_button.addClass('disabled');
          }
        } else if( window.registration.elements.registration_form.is('.vehicle-activate-form') ) {
          if( $this.is(':checked') && $this.parents('.dual-inputs').find('input').not('[type="radio"]').val() ) {
            window.registration.elements.registration_submit_button.removeClass('disabled');
          }else{
            window.registration.elements.registration_submit_button.addClass('disabled');
          }
        }
      },
      _submit : (e) => {
        if(window.registration.elements.registration_submit_button.hasClass('disabled')) {
          e.preventDefault();
        }
      },
      _slick : () => {
        window.registration.elements.registration_slider.slick({
          arrows : false,
          infinite : false,
          centerMode : true,
          slidesToShow: 3,
          responsive: [
            {
              breakpoint: 590,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
                variableWidth: true,
              }
            },
          ]
        });
      },
      error : {
        _vin_submit : (e) => {
          if(window.registration.elements.registration_form.is('.vehicle-vin-form')) {
            e.preventDefault();
            window.forms.methods._error($('.vehicle-vin-form li:first-child'));
          }
        }
      }
    }
  };

  // EVENTS
  window.registration.elements.registration_year.on('change', window.registration.methods._reveal_exta);
  window.registration.elements.registration_model.on('change', window.registration.methods._reveal_exta);

  window.registration.elements.registration_model.on('change', window.registration.methods._toggle_disable);
  window.registration.elements.registration_year.on('change', window.registration.methods._toggle_disable);
  window.registration.elements.registration_extra.on('change', window.registration.methods._toggle_disable);
  window.registration.elements.registration_send_code_to.on('change', window.registration.methods._toggle_disable);
  window.registration.elements.registration_vin.on('keyup', window.registration.methods._toggle_disable);
  window.registration.elements.registration_form.on('submit', window.registration.methods._toggle_disable);

  window.registration.elements.registration_form.on('submit', window.registration.methods.error._vin_submit);
  window.registration.elements.registration_submit_button.on('click', window.registration.methods.error._vin_submit);

  window.registration.methods._slick();
});

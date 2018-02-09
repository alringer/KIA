$(document).ready(() => {
  window.myTrips = {
    elements : {
      view : $('.my-trips-page-view'),
      trip : $('.trip'),
      trip_collapse : $('.trip .collapse'),
      badge_input : $('.trip .badge input'),
      badge_cancel : $('.trip .badge em'),
      trip_list_scroll : $('.trips-list-inner'),
      scroll_top : $('.scroll-top'),
      stop_propagation : $('.stop-propagation'),
      start_edit : $('.start-edit'),
      stop_edit : $('.stop-edit'),
      toggle_edit : $('.toggle-edit'),
      trip_checkboxes : $('.trip .checkbox input'),
      merge_buttons_wrap : $('.merge-toggle'),
      merge : $('.merge-toggle .merge'),
      unmerge : $('.merge-toggle .unmerge'),
      delete : $('.edit-toolbar .delete'),
      select_all : $('.select-all'),
      choose_format : $('.modal-export .choose-format input'),
      email : $('.modal-export input[type="email"]'),
    },
    methods : {
      _stop_prop : (e) => {
        e.stopPropagation()
      },
      _toggle : function() {
        var $this = $(this),
            $collapse = $this.find('.collapse');
        if($this.hasClass('active')) {
          return;
        }
        window.myTrips.elements.trip_collapse.collapse('hide');
        window.myTrips.elements.trip.removeClass('active');
        $this.addClass('active');
        $collapse.collapse('show');
      },
      tags : {
        _add : function() {
          window.myTrips.methods.tags._save();
          var $this = $(this),
              $badge = $this.parents('.badge');
          $badge.addClass('adding');
          $badge.parents('.trip-tags').addClass('focused');
        },
        _keyup : function(e) {
          var $this = $(this),
              $badge = $this.parents('.badge'),
              $text = $badge.find('span'),
              val = $this.val();
          if(e.keyCode === 32) {
            e.preventDefault();
            return;
          }
          if(val.length > 30) {
            val = val.substr(0, 30);
            $this.val(val);

          }
          $text.text(val.toLowerCase());
          var that = this;
          setTimeout(function(){ that.selectionStart = that.selectionEnd = 10000; }, 0);
          if(e.keyCode === 13) {
            window.myTrips.methods.tags._save();
            var $input = $badge.find('input');
          }
          if(e.keyCode === 27) {
            window.myTrips.methods.tags._cancel_element($badge, true);
          }
        },
        _cancel : function() {
          var $this = $(this),
              $badge = $this.parents('.badge');
          window.myTrips.methods.tags._cancel_element($badge);
        },
        _cancel_element : ($badge, no_delete) => {
          var $input = $badge.find('input'),
              $text = $badge.find('span'),
              $badges = $badge.parents('.trip-tags').find('.badge'),
              index = $badges.index($badge);
          $input.val('');
          $text.text('');
          $badge.removeClass('adding');
          $badge.parents('.trip-tags').removeClass('focused');
          if($badges.length > 1 && index < $badges.length - 1 && !no_delete) {
            $badge.addClass('remove');
          }
        },
        _save : () => {
          var $trip = (window.innerWidth < 768 ) ? $('.modal.in .trip') : $('.trip.active'),
              $badge = $trip.find('.badge.adding'),
              text = $badge.find('span').text(),
              $input = $badge.find('input'),
              $badges = $badge.parents('.trip-tags').find('.badge'),
              index = $badges.index($badge);
          if(!text.length) {
            window.myTrips.methods.tags._cancel_element($badge);
          }else{
            $badge.removeClass('add adding');
            if(index === $badges.length - 1) {
              var html = `<span class="badge add">
                    <span></span>
                    <input type="text" name="" value="" tabindex="-1">
                    <em>+</em>
                  </span>`;
              $(html).appendTo($trip.find('.trip-tags')).find('input');
            }
            setTimeout(() => {
              $input.blur();
            }, 100);
          }
        }
      },
      scroll : {
        onscroll : (e) => {
          var y = window.myTrips.elements.trip_list_scroll.scrollTop();
          if(y > 10) {
            window.myTrips.elements.trip_list_scroll.addClass('scrolled');
          }else{
            window.myTrips.elements.trip_list_scroll.removeClass('scrolled');
          }
        },
        scrolltop : (e) => {
          window.myTrips.elements.trip_list_scroll.scrollTop(0);
        },
      },
      edit : {
        _start : () => {
         $('body').addClass('editing');
        },
        _stop : () => {
          $('body').removeClass('editing');
          window.myTrips.elements.trip_checkboxes.prop('checked', false);
          window.myTrips.elements.select_all.prop('checked', false);
        },
        _checkbox_change : () => {
          var $checkboxes = window.myTrips.elements.trip_checkboxes.filter(':checked');
          if($checkboxes.length > 1) {
            window.myTrips.elements.merge_buttons_wrap.removeClass('disabled');
          }else{
            window.myTrips.elements.merge_buttons_wrap.addClass('disabled');
          }
          if($checkboxes.length) {
            window.myTrips.elements.delete.removeClass('disabled');
          }else{
            window.myTrips.elements.delete.addClass('disabled');
          }
          var merge = true;
          if($checkboxes.length === 1) {
            if($checkboxes.parents('.trip.merged').length) {
              window.myTrips.elements.merge_buttons_wrap.removeClass('disabled');
              merge = false;
            }
          }
          var $btns = window.myTrips.elements.merge_buttons_wrap.find('span');
          $btns.removeClass('active');
          if(merge) {
            $btns.filter('.merge').addClass('active');
          }else{
            $btns.filter('.unmerge').addClass('active');
          }
        },
        _merge : () => {
          var $trips = window.myTrips.elements.trip_checkboxes.filter(':checked').parents('.trip');
          $trips.addClass('merged');
          $trips.not('.active').each(function(){
            var $this = $(this);
            $this.css('height', $this.outerHeight());
            setTimeout(() => {
              $this.addClass('hide-trip');
            }, 10);
          });
          window.myTrips.elements.trip_checkboxes.prop('checked', false);
          window.myTrips.methods.edit._checkbox_change();
          window.myTrips.methods.edit._stop();
        },
        _delete : () => {
          var $trips = window.myTrips.elements.trip_checkboxes.filter(':checked').parents('.trip');
          $trips.each(function(){
            var $this = $(this);
            $this.css('height', $this.outerHeight());
            setTimeout(() => {
              $this.addClass('hide-trip');
            }, 10);
          });
          window.myTrips.elements.trip_checkboxes.prop('checked', false);
          window.myTrips.methods.edit._checkbox_change();
          window.myTrips.methods.edit._stop();
        },
        _unmerge : () => {
          var $trips = window.myTrips.elements.trip;
          $trips.removeClass('merged hide-trip');
          setTimeout(() => {
            $trips.css('height', 'auto');
          }, 550);
          window.myTrips.methods.edit._checkbox_change();
          window.myTrips.methods.edit._stop();
        },
        _select_all : function() {
          var $this = $(this),
              checked = $this.prop('checked');
          window.myTrips.elements.select_all.prop('checked', checked);
          window.myTrips.elements.trip_checkboxes.each(function() {
            var $this = $(this),
                $trip = $this.parents('.trip');
            if($trip.hasClass('hide-trip')) {
              return;
            }else{
              $this.prop('checked', checked);
            }
          });
          window.myTrips.methods.edit._checkbox_change();
        }
      },
      export : {
        _disable : () => {
          var checked = window.myTrips.elements.choose_format.filter(':checked').length,
              email = window.myTrips.elements.email.val().length;
          if(checked && email) {
            $('.export-button').removeClass('disabled');
          }else{
            $('.export-button').addClass('disabled');
          }
        }
      }
    }
  };
  // EVENTS
  window.myTrips.elements.trip.on('click', window.myTrips.methods._toggle);
  $('body').delegate('.trip .badge input', 'focus', window.myTrips.methods.tags._add);
  $('body').delegate('.trip .badge input', 'paste keyup keydown', window.myTrips.methods.tags._keyup);
  $('body').delegate('.trip .badge input', 'blur', window.myTrips.methods.tags._save);
  $('body').delegate('.trip .badge em', 'click', window.myTrips.methods.tags._cancel);
  window.myTrips.elements.trip_list_scroll.on('scroll', window.myTrips.methods.scroll.onscroll);
  window.myTrips.elements.scroll_top.on('click', window.myTrips.methods.scroll.scrolltop);
  window.myTrips.elements.stop_propagation.on('click', window.myTrips.methods._stop_prop);
  window.myTrips.elements.start_edit.on('click', window.myTrips.methods.edit._start);
  window.myTrips.elements.stop_edit.on('click', window.myTrips.methods.edit._stop);
  window.myTrips.elements.trip_checkboxes.on('change', window.myTrips.methods.edit._checkbox_change);
  window.myTrips.elements.merge.on('click', window.myTrips.methods.edit._merge);
  window.myTrips.elements.unmerge.on('click', window.myTrips.methods.edit._unmerge);
  window.myTrips.elements.delete.on('click', window.myTrips.methods.edit._delete);
  window.myTrips.elements.select_all.on('change', window.myTrips.methods.edit._select_all);
  window.myTrips.elements.choose_format.on('change', window.myTrips.methods.export._disable);
  window.myTrips.elements.email.on('keyup change paste', window.myTrips.methods.export._disable);
});

$(document).ready(() => {
  window.myTrips = {
    elements : {
      trip : $('.trip'),
      trip_collapse : $('.trip .collapse'),
      badge_input : $('.trip .badge input'),
      badge_cancel : $('.trip .badge em'),
    },
    methods : {
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
          }
          if(e.keyCode === 27) {
            // window.myTrips.methods.tags._cancel_element($badge, true);
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
          $input.blur();
          if($badges.length > 1 && index < $badges.length - 1 && !no_delete) {
            $badge.addClass('remove');
          }
        },
        _save : () => {
          var $trip = $('.trip.active'),
              $badge = $trip.find('.badge.adding'),
              $text = $badge.find('span'),
              $input = $badge.find('input'),
              $badges = $badge.parents('.trip-tags').find('.badge'),
              index = $badges.index($badge);
          $input.blur();
          console.log('saving');
          if(!$text.text().length) {
            window.myTrips.methods.tags._cancel_element($badge);
          }else{
            $badge.removeClass('add adding');
            if(index === $badges.length - 1) {
              var html = `<span class="badge add">
                    <span></span>
                    <input type="text" name="" value="" tabindex="-1">
                    <em>+</em>
                  </span>`;
            }
            $(html).appendTo($trip.find('.trip-tags')).find('input');
          }
        }
      }
    }
  };
  // EVENTS
  window.myTrips.elements.trip.on('click', window.myTrips.methods._toggle);
  $('body').delegate('.trip .badge input', 'focus', window.myTrips.methods.tags._add);
  $('body').delegate('.trip .badge input', 'change paste keyup keydown', window.myTrips.methods.tags._keyup);
  $('body').delegate('.trip .badge em', 'click', window.myTrips.methods.tags._cancel);
});

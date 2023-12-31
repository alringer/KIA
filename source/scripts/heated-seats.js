$(document).ready(() => {
  window.heatedSeats = {
    elements : {
      apply_seat_temp : $('.apply-seat-temp'),
      seats : $('.heated-seats-vehicle > span'),
      modal : $('.modal-heated-seats'),
      dials : $('.modal-heated-seats .ui-dial')
    },
    methods : {
      _open_seat_dial : function() {
        var $this = $(this),
            $modal = $this.parents('.modal-heated-seats'),
            $dials = $modal.find('.ui-dial'),
            index = $modal.find('.heated-seats-vehicle > span').index($this);
        $modal.addClass('seat-open');
        $modal.removeClass('top bottom');
        $modal.removeClass('seat-1 seat-2 seat-3 seat-4');
        $modal.addClass(`seat-${index + 1}`);
        window.heatedSeats.elements.dials.removeClass('active');
        if(index < 2) {
          $modal.addClass('top');
        }else{
          $modal.addClass('bottom');
        }
        $dials.eq(index).addClass('active');
      },
      _reset : function() {
        window.heatedSeats.elements.dials.removeClass('active');
        window.heatedSeats.elements.modal.removeClass('seat-open top bottom');
        window.heatedSeats.elements.modal.removeClass('seat-1 seat-2-seat-3 seat-4');
      },
      _apply_seat_temp : function() {
        var $this = $(this),
            seat = $this.data('seat'),
            value = $this.parents('.ui-dial').find('.ui-dial-value').val(),
            seat_class = "off",
            $seat = $this.parents('.modal').find('.heated-seats-vehicle > span').filter(`.heated-seat-${seat}`);
        if(value > 4) {
          seat_class = "hot";
        }else if(value < 4){
          seat_class = "cold";
        }
        $seat.removeClass('hot cold off')
          .addClass(seat_class);
        window.heatedSeats.methods._reset();

      },
    }
  };
  // EVENTS
  window.heatedSeats.elements.apply_seat_temp.on('click', window.heatedSeats.methods._apply_seat_temp);
  window.heatedSeats.elements.seats.on('click', window.heatedSeats.methods._open_seat_dial);
});

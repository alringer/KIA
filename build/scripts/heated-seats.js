"use strict";$(document).ready(function(){window.heatedSeats={elements:{apply_seat_temp:$(".apply-seat-temp"),seats:$(".heated-seats-vehicle > span"),modal:$(".modal-heated-seats"),dials:$(".modal-heated-seats .ui-dial")},methods:{_open_seat_dial:function e(){var a=$(this),t=a.parents(".modal-heated-seats"),s=t.find(".ui-dial"),d=t.find(".heated-seats-vehicle > span").index(a);t.addClass("seat-open"),t.removeClass("top bottom"),t.removeClass("seat-1 seat-2 seat-3 seat-4"),t.addClass("seat-"+(d+1)),window.heatedSeats.elements.dials.removeClass("active"),d<2?t.addClass("top"):t.addClass("bottom"),s.eq(d).addClass("active")},_reset:function e(){window.heatedSeats.elements.dials.removeClass("active"),window.heatedSeats.elements.modal.removeClass("seat-open top bottom"),window.heatedSeats.elements.modal.removeClass("seat-1 seat-2-seat-3 seat-4")},_apply_seat_temp:function e(){var a=$(this),t=a.data("seat"),s=a.parents(".ui-dial").find(".ui-dial-value").val(),d="off",o=a.parents(".modal").find(".heated-seats-vehicle > span").filter(".heated-seat-"+t);s>4?d="hot":s<4&&(d="cold"),o.removeClass("hot cold off").addClass(d),window.heatedSeats.methods._reset()}}},window.heatedSeats.elements.apply_seat_temp.on("click",window.heatedSeats.methods._apply_seat_temp),window.heatedSeats.elements.seats.on("click",window.heatedSeats.methods._open_seat_dial)});
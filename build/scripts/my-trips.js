"use strict";$(document).ready(function(){window.myTrips={elements:{trip:$(".trip"),trip_collapse:$(".trip .collapse"),badge_input:$(".trip .badge input"),badge_cancel:$(".trip .badge em"),trip_list_scroll:$(".trips-list-inner"),scroll_top:$(".scroll-top")},methods:{_toggle:function e(){var s=$(this),t=s.find(".collapse");s.hasClass("active")||(window.myTrips.elements.trip_collapse.collapse("hide"),window.myTrips.elements.trip.removeClass("active"),s.addClass("active"),t.collapse("show"))},tags:{_add:function e(){window.myTrips.methods.tags._save();var s=$(this),t=s.parents(".badge");t.addClass("adding"),t.parents(".trip-tags").addClass("focused")},_keyup:function e(s){var t=$(this),i=t.parents(".badge"),n=i.find("span"),l=t.val();if(32===s.keyCode)return void s.preventDefault();l.length>30&&(l=l.substr(0,30),t.val(l)),n.text(l.toLowerCase());var a=this;setTimeout(function(){a.selectionStart=a.selectionEnd=1e4},0),13===s.keyCode&&window.myTrips.methods.tags._save(),s.keyCode},_cancel:function e(){var s=$(this),t=s.parents(".badge");window.myTrips.methods.tags._cancel_element(t)},_cancel_element:function e(s,t){var i=s.find("input"),n=s.find("span"),l=s.parents(".trip-tags").find(".badge"),a=l.index(s);i.val(""),n.text(""),s.removeClass("adding"),s.parents(".trip-tags").removeClass("focused"),i.blur(),l.length>1&&a<l.length-1&&!t&&s.addClass("remove")},_save:function e(){var s=$(".trip.active"),t=s.find(".badge.adding"),i=t.find("span"),n=t.find("input"),l=t.parents(".trip-tags").find(".badge"),a=l.index(t);if(n.blur(),console.log("saving"),i.text().length){if(t.removeClass("add adding"),a===l.length-1)var o='<span class="badge add">\n                    <span></span>\n                    <input type="text" name="" value="" tabindex="-1">\n                    <em>+</em>\n                  </span>';$(o).appendTo(s.find(".trip-tags")).find("input")}else window.myTrips.methods.tags._cancel_element(t)}},scroll:{onscroll:function e(s){window.myTrips.elements.trip_list_scroll.scrollTop()>10?window.myTrips.elements.trip_list_scroll.addClass("scrolled"):window.myTrips.elements.trip_list_scroll.removeClass("scrolled")},scrolltop:function e(s){window.myTrips.elements.trip_list_scroll.scrollTop(0)}}}},window.myTrips.elements.trip.on("click",window.myTrips.methods._toggle),$("body").delegate(".trip .badge input","focus",window.myTrips.methods.tags._add),$("body").delegate(".trip .badge input","change paste keyup keydown",window.myTrips.methods.tags._keyup),$("body").delegate(".trip .badge em","click",window.myTrips.methods.tags._cancel),window.myTrips.elements.trip_list_scroll.on("scroll",window.myTrips.methods.scroll.onscroll),window.myTrips.elements.scroll_top.on("click",window.myTrips.methods.scroll.scrolltop)});
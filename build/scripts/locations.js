"use strict";$(document).ready(function(){window.locations={elements:{html:$("html"),poi_edit_input:$(".poi-edit-input"),poi_edit_title:$(".poi-edit-title"),poi_edit_title_text:$(".poi-edit-title-text"),location_utility_tools:$(".locations-utility-tools > *"),location_utility_collapse:$("#locations-utility-collapse"),location_search_input:$(".location-search-input"),location_carousel:$("#locations-utility-carousel"),reset_btn:$(".locations-utility .reset-btn"),save_poi_btn:$(".save-poi-btn"),nav_toggle_search:$(".nav-toggle-search"),location_utility:$(".locations-utility")},methods:{collapse:{_open:function o(){window.locations.elements.location_utility_collapse.collapse("show")},_close:function o(){window.locations.elements.location_utility_collapse.collapse("hide")}},carousel:{_carousel_slide:function o(t){var e=window.locations.elements.location_carousel.find(".carousel-inner"),i=e.children(".item"),n=$(t.relatedTarget),s=i.filter(".active");e.removeClass("overflow-visible"),e.css("height",parseInt(i.filter(".active").innerHeight(),10)),setTimeout(function(){e.css("height",parseInt(n.innerHeight(),10))},10),n.hasClass("top")&&window.locations.elements.location_utility.removeClass("slide-down"),n.hasClass("bottom")&&window.locations.elements.location_utility.addClass("slide-down"),n.hasClass("hide-search")&&window.locations.elements.location_utility.addClass("hide-search"),n.hasClass("show-search")&&window.locations.elements.location_utility.removeClass("hide-search")}},poi:{_open:function o(t){t.stopPropagation(),window.locations.elements.poi_edit_title.addClass("editing")},_close:function o(){window.locations.elements.poi_edit_title.removeClass("editing");var t=window.locations.elements.poi_edit_input.val();t&&window.locations.elements.poi_edit_title_text.text(t)},_keyup:function o(t){13===t.keyCode&&window.locations.methods.poi._close()},_save:function o(){window.locations.elements.save_poi_btn.addClass("spinning"),window.loading.methods._loading_start(),setTimeout(function(){window.loading.methods._loading_stop(),window.locations.elements.save_poi_btn.removeClass("spinning"),window.locations.elements.location_carousel.carousel(4)},2e3)}},utility:{_toggle_utlity:function o(){var t=$(this),e=!t.hasClass("active");window.locations.elements.location_utility_tools.removeClass("active"),e?(t.addClass("active"),window.locations.methods.collapse._open()):window.locations.methods.collapse._close()}},search:{_keyup:function o(t){window.locations.elements.location_carousel.carousel(0),window.locations.elements.location_utility_tools.removeClass("active"),27===t.keyCode?window.locations.methods.collapse._close():window.locations.elements.location_search_input.val().length?window.locations.methods.collapse._open():window.locations.methods.collapse._close()}},_reset_btn:function o(){window.locations.elements.location_utility_tools.removeClass("active")},mobile:{_toggle_search:function o(){console.log("run");var t=$(this),e=t.hasClass("active");if(window.locations.elements.nav_toggle_search.removeClass("active"),e)return window.locations.elements.location_utility.removeClass("open"),void window.locations.methods.collapse._close();window.locations.elements.location_utility.addClass("open"),t.addClass("active"),(t.is(".icon-settings")||t.is(".icon-poi"))&&window.locations.methods.collapse._open()}}}},window.locations.elements.location_carousel.carousel({interval:!1}),window.locations.elements.poi_edit_input.on("focus",window.locations.methods.poi._open),window.locations.elements.poi_edit_input.on("blur",window.locations.methods.poi._close),window.locations.elements.poi_edit_input.on("keyup",window.locations.methods.poi._keyup),window.locations.elements.location_utility_tools.on("click",window.locations.methods.utility._toggle_utlity),window.locations.elements.location_search_input.on("keyup",window.locations.methods.search._keyup),window.locations.elements.location_carousel.on("slide.bs.carousel",window.locations.methods.carousel._carousel_slide),window.locations.elements.reset_btn.on("click",window.locations.methods._reset_btn),window.locations.elements.save_poi_btn.on("click",window.locations.methods.poi._save),window.locations.elements.nav_toggle_search.on("click",window.locations.methods.mobile._toggle_search)});
"use strict";$(document).ready((function(){window.driverPrefs={elements:{toggle:$(".driver-preferences-setting .toggle input")},methods:{_enable:function e(){var r=$(this),s=r.parents(".driver-preferences-setting");r.prop("checked")?s.removeClass("disabled"):s.addClass("disabled")}}},window.driverPrefs.elements.toggle.on("change",window.driverPrefs.methods._enable)}));
"use strict";$(document).ready((function(){window.fixed={elements:{fix_start:$(".fix-start"),window:$(window)},methods:{_fix:function e(){window.fixed.elements.fix_start.each((function(){var e=$(this);window.pageYOffset>e.offset().top-60?e.addClass("fixed"):e.removeClass("fixed")}))}}},window.fixed.elements.window.on("scroll",window.fixed.methods._fix)}));
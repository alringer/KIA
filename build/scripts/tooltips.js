"use strict";$(document).ready((function(){window.tooltips={elements:{tooltip:$('[data-toggle="tooltip"]'),warranty_tip:$('.view-warranty-info [data-toggle="tooltip"]')},methods:{_init:function t(){window.tooltips.elements.tooltip.not(".special").tooltip(),window.tooltips.elements.warranty_tip.tooltip({html:!0,trigger:"click",viewport:".text-content"})},_close:function t(){$(this).parents(".tooltip").prev('[data-toggle="tooltip"]').trigger("click")}}},$("body").delegate(".tooltip-close","click",window.tooltips.methods._close),window.tooltips.methods._init()}));
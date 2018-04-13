/**
 * @file { print.js }
 * @uses { maintenance.js } 
 * This file is to show the interaction 
 * once the .print button is clicked
 * -> Print the maintenance history page
 * -> opens all panels and prints
 */

$(document).ready(() => {
    window.printRef = {
        elements: {
            print: $('.print'),
            timeOffset: 300
        },
        methods: {
            _show_all_panels_print: () => {
                /**
                 * Reference ._expand_all() from maintenance.js
                 */
                window.maintenance.methods._expand_all();
                setTimeout(() => {
                    window.print();
                }, window.printRef.elements.timeOffset);
            }
        }
    };
    /** 
     * On .print click
     */ 
    window.printRef.elements.print.on('click', window.printRef.methods._show_all_panels_print);
});
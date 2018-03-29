'use strict';

$(document).ready(function () {
  window.finance = {
    elements: {
      mixitup: $('.mixitup'),
      mixitup_sortby: $('[data-mixsort]')
    },
    methods: {
      sorting: {
        // Initializes mixitup plugin
        _setup: function _setup() {
          if (window.finance.elements.mixitup.length) {
            window.financeHistory = window.mixitup('#mixitup', {
              selectors: {
                target: '.table-row',
                control: '[data-mixitup-control]'
              }
            });
          }
        },
        // Toggles the sort by asc/desc based on the header clicked
        _sort: function _sort() {
          var $this = $(this),
              sortby = $this.data('mixsort');
          $this.toggleClass('asc');
          var order = $this.hasClass('asc') ? 'asc' : 'desc';
          // run the mixitup sort function
          window.financeHistory.sort(sortby + ':' + order);
          // Set header classes
          window.finance.elements.mixitup_sortby.removeClass('active');
          $this.addClass('active');
        }
      }
    }
  };
  window.finance.methods.sorting._setup();
  // EVENTS
  window.finance.elements.mixitup_sortby.on('click.fire', window.finance.methods.sorting._sort);
});

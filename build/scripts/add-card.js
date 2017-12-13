'use strict';

$(document).ready(function () {
  window.addCards = {
    elements: {
      mixitup: $('.add-card #add-card-list'),
      category_selector: $('.add-card .category-selector'),
      category_selector_options: $('.add-card .category-selector .dropdown-menu li'),
      add_card: $('[data-dynamic-card-action="add"]'),
      remove_card: $('[data-dynamic-card-action="remove"]'),
      draggable: $('.draggable')
    },
    methods: {
      _add_card: function _add_card() {
        var $this = $(this),
            $relationships = $('[data-dynamic-card="' + $this.data('dynamic-card') + '"]'),
            $cards = $relationships.filter('.dynamic-card'),
            $buttons = $relationships.filter('.button');
        $cards.addClass('active');
        $buttons.removeClass('active');
        $buttons.filter('[data-dynamic-card-action="remove"]').addClass('active');
      },
      _remove_card: function _remove_card() {
        var $this = $(this),
            $relationships = $('[data-dynamic-card="' + $this.data('dynamic-card') + '"]'),
            $cards = $relationships.filter('.dynamic-card'),
            $buttons = $relationships.filter('.button');
        $cards.removeClass('active');
        $buttons.removeClass('active');
        $buttons.filter('[data-dynamic-card-action="add"]').addClass('active');
      },
      _drag_cards: function _drag_cards() {
        window.addCards.elements.draggable.sortable({
          cursor: 'move',
          // containment: "parent",
          delay: 0
        });
      },
      sorting: {
        // Initializes mixitup plugin
        _setup: function _setup() {
          if (window.addCards.elements.mixitup.length) {
            window.addCardsList = window.mixitup('#add-card-list', {
              selectors: {
                target: '.card-item',
                control: '[data-mixitup-control]'
              }
            });
          }
        },
        // Toggles the sort by asc/desc based on the header clicked
        _sort: function _sort() {
          var $this = $(this);
          window.addCards.elements.category_selector.find('button .active-filter').text($this.text());
          window.addCardsList.filter($this.data('mix-filter'));
        }
      }
    }
  };
  // EVENTS
  window.addCards.elements.category_selector_options.on('click', window.addCards.methods.sorting._sort);
  window.addCards.elements.add_card.on('click', window.addCards.methods._add_card);
  window.addCards.elements.remove_card.on('click', window.addCards.methods._remove_card);

  // METHODS
  window.addCards.methods.sorting._setup();
  window.addCards.methods._drag_cards();
});

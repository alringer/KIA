'use strict';

$(document).ready(function () {
  window.myVehicles = {
    elements: {
      view: $('.view-my-vehicles'),
      switch_view: $('.my-vehicles-switch-views li a'),
      vehicle_listings_views_wrap: $('.my-vehicles-car-listings'),
      vehicle_listings_views: $('.my-vehicles-car-listings > *'),
      edit_checkbox: $('input[name="edit"]'),
      edit_start: $('[data-action="editing-start"]'),
      edit_stop: $('[data-action="editing-stop"]'),
      edit_select_all: $('.my-vehicles-ulility-nav-edit .select-all'),
      edit_deselect_all: $('.my-vehicles-ulility-nav-edit .deselect-all'),
      edit_delete: $('.my-vehicles-ulility-nav-edit .delete-selected'),
      edit_toggle_select_all: $('.view-my-vehicles .toggle-select-all'),
      mixitup_sortby: $('[data-mixsort]'),
      search_boxes: $('input[name="my-vehicles-text-filter"]'),
      search_items: $('.my-vehicles-grid-item, .my-vehicles-list-item'),
      mixitup: $('#mixitup'),
      no_results_found: $('.no-results-found')
    },
    methods: {
      _switch_views: function _switch_views(e) {
        e.preventDefault();
        var $this = $(this),
            requested_view_index = window.myVehicles.elements.switch_view.index($this),
            $requested_view = window.myVehicles.elements.vehicle_listings_views.eq(requested_view_index);

        window.myVehicles.elements.switch_view.removeClass('active');
        $this.addClass('active');
        window.myVehicles.elements.vehicle_listings_views.removeClass('active');
        $requested_view.addClass('active');
        window.myVehicles.methods._resize_view();
      },
      _resize_view: function _resize_view() {
        var tab_height = window.myVehicles.elements.vehicle_listings_views.filter('.active').outerHeight();
        window.myVehicles.elements.vehicle_listings_views_wrap.css('height', tab_height);
      },
      editing: {
        _start: function _start() {
          window.myVehicles.elements.view.addClass('editing');
          window.myVehicles.methods.editing._enable_options();
        },
        _stop: function _stop() {
          window.myVehicles.elements.view.removeClass('editing');
          window.myVehicles.methods.editing._deselect_all();
          window.myVehicles.methods.editing._enable_options();
        },
        _select_all: function _select_all() {
          window.myVehicles.elements.edit_checkbox.prop('checked', true);
          window.myVehicles.methods.editing._enable_options();
        },
        _deselect_all: function _deselect_all() {
          window.myVehicles.elements.edit_checkbox.prop('checked', false);
          window.myVehicles.methods.editing._enable_options();
        },
        _enable_options: function _enable_options() {
          if (window.myVehicles.elements.edit_checkbox.filter(':checked').length) {
            window.myVehicles.elements.edit_deselect_all.removeClass('disabled');
            window.myVehicles.elements.edit_delete.removeClass('disabled');
          } else {
            window.myVehicles.elements.edit_deselect_all.addClass('disabled');
            window.myVehicles.elements.edit_delete.addClass('disabled');
          }
        },
        _toggle_select_all: function _toggle_select_all(e) {
          var $this = $(e.target);
          if ($this.is(':checked')) {
            window.myVehicles.methods.editing._select_all();
          } else {
            window.myVehicles.methods.editing._deselect_all();
          }
          window.myVehicles.methods.editing._enable_options();
        },
        _checkbox_change: function _checkbox_change(e) {
          var $this = $(e.target);
          if ($this.is(':checked')) {
            window.myVehicles.methods.editing._start();
          }
          window.myVehicles.methods.editing._enable_options();
        }
      },
      sorting: {
        _setup: function _setup() {
          if (window.myVehicles.elements.mixitup.length) {
            window.myVehiclesList = window.mixitup('#mixitup', {
              selectors: {
                target: '.my-vehicles-list-item'
              }
            });
          }
        },
        _sort: function _sort() {
          var $this = $(this),
              sortby = $this.data('mixsort');
          $this.toggleClass('asc');
          var order = $this.hasClass('asc') ? 'asc' : 'desc';
          window.myVehiclesList.sort(sortby + ':' + order);
          window.myVehicles.elements.mixitup_sortby.removeClass('active');
          $this.addClass('active');
        }
      },
      _text_search: function _text_search() {
        var $this = $(this),
            value = $this.val(),
            item_found = false;

        window.myVehicles.elements.search_boxes.val(value);
        value = value.toLowerCase().replace("'", '');

        window.myVehicles.elements.search_items.each(function () {
          var $item = $(this),
              hide = true,
              nickname = $item.data('nickname').toString().toLowerCase(),
              model = $item.data('model').toString().toLowerCase(),
              year = $item.data('year').toString().toLowerCase();
          if (nickname.indexOf(value) >= 0 || model.indexOf(value) >= 0 || year.indexOf(value) >= 0 || ('' + year + model).indexOf(value.replace(' ', '')) >= 0 || ('' + model + year).indexOf(value.replace(' ', '')) >= 0) {
            hide = false;
          }
          if (hide) {
            $item.addClass('hide');
          } else {
            item_found = true;
            $item.removeClass('hide');
          }
        });
        if (!item_found) {
          window.myVehicles.elements.no_results_found.addClass('show');
        } else {
          window.myVehicles.elements.no_results_found.removeClass('show');
        }
        window.myVehicles.methods._resize_view();
      }
    }
  };

  window.myVehicles.methods.sorting._setup();
  window.myVehicles.methods._resize_view();

  // EVENTS
  window.myVehicles.elements.edit_checkbox.on('change.edit', window.myVehicles.methods.editing._checkbox_change);
  window.myVehicles.elements.edit_select_all.on('click', window.myVehicles.methods.editing._select_all);
  window.myVehicles.elements.edit_deselect_all.on('click', window.myVehicles.methods.editing._deselect_all);
  window.myVehicles.elements.edit_stop.on('click', window.myVehicles.methods.editing._stop);
  window.myVehicles.elements.edit_start.on('click', window.myVehicles.methods.editing._start);
  window.myVehicles.elements.edit_toggle_select_all.on('change._select_all', window.myVehicles.methods.editing._toggle_select_all);
  window.myVehicles.elements.mixitup_sortby.on('click.fire', window.myVehicles.methods.sorting._sort);
  window.myVehicles.elements.search_boxes.on('keyup', window.myVehicles.methods._text_search);
  window.myVehicles.elements.switch_view.on('click', window.myVehicles.methods._switch_views);
  $(window).on('resize', function () {
    clearTimeout(window.myVehicles_tab_size);
    window.myVehicles_tab_size = setTimeout(function () {
      console.log('run');
      window.myVehicles.methods._resize_view();
    }, 500);
  });
});

'use strict';

$(document).ready(function () {
  window.myVehicles = {
    elements: {
      view: $('.view-my-vehicles'),
      switch_view: $('.my-vehicles-switch-views a'),
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
      no_results_found: $('.no-results-found'),
      list_item_toggle: $('.my-vehicles-list-item-toggle'),
      add_vehicle_button: $('.add-vehicle-button'),
      add_vin: $('input.vin')
    },
    methods: {
      // Switches between the different views
      _switch_views: function _switch_views(e) {
        e.preventDefault();
        var $this = $(this),

        // Auto detect the requested view based on indexs
        requested_view_index = window.myVehicles.elements.switch_view.index($this),
            $requested_view = window.myVehicles.elements.vehicle_listings_views.eq(requested_view_index);
        // Remove active class from all nav items
        window.myVehicles.elements.switch_view.removeClass('active');
        // Set the active class on this nav item
        $this.addClass('active');

        if ($this) {
          return;
        }
        // Remove the active class from all views
        window.myVehicles.elements.vehicle_listings_views.removeClass('active');
        // Add the active class to the requested view
        $requested_view.addClass('active');
        // Resizes the view (this functionality relies upon absolute positioning)
        window.myVehicles.methods._resize_view();
      },
      // Adjusts the view based on the height of the current active view
      _resize_view: function _resize_view() {
        var tab_height = window.myVehicles.elements.vehicle_listings_views.filter('.active').outerHeight();
        window.myVehicles.elements.vehicle_listings_views_wrap.css('height', tab_height);
      },
      // EDITING METHODS
      editing: {
        // Starts editing
        _start: function _start() {
          window.myVehicles.elements.view.addClass('editing');
          // Auto detect available options
          window.myVehicles.methods.editing._enable_options();
        },
        _stop: function _stop() {
          // Reset view out of editing mode
          window.myVehicles.elements.view.removeClass('editing');
          // Deselect all checkboxes
          window.myVehicles.methods.editing._deselect_all();
          // Reset the available options
          window.myVehicles.methods.editing._enable_options();
        },
        // Select all checkboxes
        _select_all: function _select_all() {
          window.myVehicles.elements.edit_checkbox.prop('checked', true);
          window.myVehicles.methods.editing._enable_options();
        },
        // Deselect all checkboxes
        _deselect_all: function _deselect_all() {
          window.myVehicles.elements.edit_checkbox.prop('checked', false);
          window.myVehicles.methods.editing._enable_options();
        },
        // Auto detect which options are available
        _enable_options: function _enable_options() {
          // If any checkboxes are checked
          if (window.myVehicles.elements.edit_checkbox.filter(':checked').length) {
            // Allow user to use "deselect all"
            window.myVehicles.elements.edit_deselect_all.removeClass('disabled');
            // Allow user to "delete"
            window.myVehicles.elements.edit_delete.removeClass('disabled');
          } else {
            // Block user from using "deselect all"
            window.myVehicles.elements.edit_deselect_all.addClass('disabled');
            // Block user from using "delete"
            window.myVehicles.elements.edit_delete.addClass('disabled');
          }
          // If all checkboxes are checked
          if (window.myVehicles.elements.edit_checkbox.filter(':checked').length === window.myVehicles.elements.edit_checkbox.length) {
            window.myVehicles.elements.edit_select_all.addClass('disabled');
          } else {
            window.myVehicles.elements.edit_select_all.removeClass('disabled');
          }
        },
        // Toggles all checkboxes
        _toggle_select_all: function _toggle_select_all() {
          var $this = $(this);
          if ($this.is(':checked')) {
            window.myVehicles.methods.editing._select_all();
          } else {
            window.myVehicles.methods.editing._deselect_all();
          }
          window.myVehicles.methods.editing._enable_options();
        },
        // Fired on checkbox change
        _checkbox_change: function _checkbox_change(e) {
          var $this = $(e.target);
          // If a checbox is checked, start editing mode
          if ($this.is(':checked')) {
            window.myVehicles.methods.editing._start();
          }
          // Auto-detect options
          window.myVehicles.methods.editing._enable_options();
        }
      },
      // Sort through the list view
      sorting: {
        // Initializes mixitup plugin
        _setup: function _setup() {
          if (window.myVehicles.elements.mixitup.length) {
            window.myVehiclesList = window.mixitup('#mixitup', {
              selectors: {
                target: '.my-vehicles-list-item',
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
          window.myVehiclesList.sort(sortby + ':' + order);
          // Set header classes
          window.myVehicles.elements.mixitup_sortby.removeClass('active');
          $this.addClass('active');
        }
      },
      // Filter the grid / list view by text search
      _text_search: function _text_search() {
        var $this = $(this),
            value = $this.val(),

        // determine if ANY results are found
        item_found = false;
        // Get the value
        window.myVehicles.elements.search_boxes.val(value);
        // Remove any unwanted fucntions (note to backend team: this requirement should be defined further)
        // Currently stripping out apostrophes due to expected user data / behavior
        value = value.toLowerCase().replace("'", '');

        // Loop through the search items to filter
        window.myVehicles.elements.search_items.each(function () {
          var $item = $(this),

          // Hide unless criteria below is met
          hide = true,

          // get data to search with
          nickname = $item.data('nickname').toString().toLowerCase(),
              model = $item.data('model').toString().toLowerCase(),
              year = $item.data('year').toString().toLowerCase();
          if (
          // Does nickname match
          nickname.indexOf(value) >= 0
          // Does model match
          || model.indexOf(value) >= 0
          // Does year match
          || year.indexOf(value) >= 0
          // Does "Year Model" Match (removes spaces to check)
          || ('' + year + model).indexOf(value.replace(' ', '')) >= 0
          // Does "Model Year" match (removes spaces to check)
          || ('' + model + year).indexOf(value.replace(' ', '')) >= 0) {
            hide = false;
          }
          // If criteria isn't met, "hide" will be true
          if (hide) {
            $item.addClass('hide');
          } else {
            // An item has been found!
            item_found = true;
            $item.removeClass('hide');
          }
        });
        // If no items were found, adjust the UI
        if (!item_found) {
          window.myVehicles.elements.no_results_found.addClass('show');
        } else {
          window.myVehicles.elements.no_results_found.removeClass('show');
        }
        // Items will be moving in and out of field, adjust the view height as needed
        window.myVehicles.methods._resize_view();
      },
      // Toggles the list view item on mobile
      _list_item_toggle: function _list_item_toggle() {
        var $this = $(this),
            $list_item = $this.parents('.my-vehicles-list-item'),
            $meta_data = $list_item.find('.cell-meta-data'),
            $meta_data_inner = $meta_data.find('.meta-data-inner'),
            $view = window.myVehicles.elements.view,
            $list_view = window.myVehicles.elements.vehicle_listings_views_wrap,
            view_height = parseInt($view.css('height'), 10),
            list_view_height = parseInt($list_view.css('height'), 10),
            meta_height = $meta_data_inner.outerHeight();
        // Toggle the arrow
        $this.toggleClass('flip');

        // Toggle between showing and hiding the meta data
        if (!$meta_data.hasClass('show')) {
          $meta_data.addClass('show').css('height', meta_height);
          // Adjust the view and list item heights as needed ( this makes for a really smooth css transtion )
          $view.css('height', view_height + meta_height);
          $list_view.css('height', list_view_height + meta_height);
        } else {
          $meta_data.removeClass('show').css('height', 0);
          // Adjust the view and list item heights as needed ( this makes for a really smooth css transtion )
          $view.css('height', view_height - meta_height);
          $list_view.css('height', list_view_height - meta_height);
        }
      },
      _toggle_disable: function _toggle_disable() {
        // VIN must be 17 chars
        if (window.myVehicles.elements.add_vin.val().length === 17) {
          window.myVehicles.elements.add_vehicle_button.removeClass('disabled');
        } else {
          window.myVehicles.elements.add_vehicle_button.addClass('disabled');
        }
      },
      demo: {
        _add_vehicle_error: function _add_vehicle_error(e) {
          e.preventDefault();
          window.forms.methods._error($('.add-vehicle-form'));
          window.forms.methods._error($('.add-vehicle-form .form-fields li'));
        }
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
  window.myVehicles.elements.list_item_toggle.on('click', window.myVehicles.methods._list_item_toggle);
  window.myVehicles.elements.add_vin.on('keyup', window.myVehicles.methods._toggle_disable);
  window.myVehicles.elements.add_vehicle_button.on('click', window.myVehicles.methods.demo._add_vehicle_error);

  $(window).on('resize', function () {
    clearTimeout(window.myVehicles_tab_size);
    window.myVehicles_tab_size = setTimeout(function () {
      // Resize the view based on responsive media quiries making UI adjustments
      window.myVehicles.methods._resize_view();
    }, 500);
  });
});

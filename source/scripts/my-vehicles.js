$(document).ready(() => {
  window.myVehicles = {
    elements : {
      view : $('.view-my-vehicles'),
      switch_view : $('.my-vehicles-switch-views li a'),
      vehicle_listings_views_wrap : $('.my-vehicles-car-listings'),
      vehicle_listings_views : $('.my-vehicles-car-listings > *'),
      edit_checkbox : $('input[name="edit"]'),
      edit_cancel : $('.my-vehicles-ulility-nav-edit .cancel'),
      edit_select_all : $('.my-vehicles-ulility-nav-edit .select-all'),
      edit_deselect_all : $('.my-vehicles-ulility-nav-edit .deselect-all'),
      edit_toggle_select_all : $('.view-my-vehicles .toggle-select-all'),
      mixitup_sortby : $('[data-mixsort]'),
      search_boxes : $('input[name="my-vehicles-text-filter"]'),
      search_items : $('.my-vehicles-grid-item, .my-vehicles-list-item'),
      mixitup : $('#mixitup'),
      no_results_found : $('.no-results-found'),
    },
    methods : {
      _switch_views : function(e) {
        e.preventDefault();
        var $this = $(this),
            requested_view_index = window.myVehicles.elements.switch_view.index($this),
            $requested_view = window.myVehicles.elements.vehicle_listings_views.eq(requested_view_index);

        window.myVehicles.elements.switch_view.removeClass('active');
        $this.addClass('active');
        window.myVehicles.elements.vehicle_listings_views.removeClass('active');
        $requested_view.addClass('active');
        window.myVehicles.elements.vehicle_listings_views_wrap.css('height', $requested_view.outerHeight());
      },
      editing : {
        _start : () => {
          window.myVehicles.elements.view.addClass('editing');
        },
        _stop : () => {
          window.myVehicles.elements.view.removeClass('editing');
          window.myVehicles.methods.editing._deselect_all();
        },
        _select_all : () => {
          window.myVehicles.elements.edit_checkbox.prop('checked', true);
        },
        _deselect_all : () => {
          window.myVehicles.elements.edit_checkbox.prop('checked', false);
        },
        _toggle_select_all : (e) => {
          var $this = $(e.target);
          if($this.is(':checked')) {
            window.myVehicles.methods.editing._select_all();
          }else{
            window.myVehicles.methods.editing._deselect_all();
          }
        },
        _checkbox_change : (e) => {
          var $this = $(e.target);
          if($this.is(':checked')) {
            window.myVehicles.methods.editing._start();
          }
        }
      },
      sorting : {
        _setup : () => {
          if(window.myVehicles.elements.mixitup.length) {
            window.myVehiclesList = window.mixitup('#mixitup', {
              selectors : {
                target : '.my-vehicles-list-item'
              }
            });
          }
        },
        _sort : function() {
          var $this = $(this),
              sortby = $this.data('mixsort');
          $this.toggleClass('asc');
          var order = $this.hasClass('asc') ? 'asc' : 'desc';
          window.myVehiclesList.sort(`${sortby}:${order}`);
          window.myVehicles.elements.mixitup_sortby.removeClass('active');
          $this.addClass('active');
        }
      },
      _text_search : function() {
        var $this = $(this),
            value = $this.val(),
            item_found = false;

        window.myVehicles.elements.search_boxes.val(value);
        value = value.toLowerCase().replace("'", '');

        window.myVehicles.elements.search_items.each(function(){
          var $item = $(this),
              hide = true,
              nickname = $item.data('nickname').toString().toLowerCase(),
              model = $item.data('model').toString().toLowerCase(),
              year = $item.data('year').toString().toLowerCase();
          if(
            nickname.indexOf(value) >= 0
            || model.indexOf(value) >= 0
            || year.indexOf(value) >= 0
            || `${year}${model}`.indexOf(value.replace(' ', '')) >= 0
            || `${model}${year}`.indexOf(value.replace(' ', '')) >= 0
          ) {
            hide = false;
          }
          if( hide ) {
            $item.addClass('hide');
          } else {
            item_found = true;
            $item.removeClass('hide');
          }
        });
        if( !item_found ) {
          window.myVehicles.elements.no_results_found.addClass('show');
        } else {
          window.myVehicles.elements.no_results_found.removeClass('show');
        }
      }
    }
  };

  window.myVehicles.methods.sorting._setup()

  // EVENTS
  window.myVehicles.elements.edit_checkbox.on('change.edit', window.myVehicles.methods.editing._checkbox_change);
  window.myVehicles.elements.edit_select_all.on('click', window.myVehicles.methods.editing._select_all);
  window.myVehicles.elements.edit_deselect_all.on('click', window.myVehicles.methods.editing._deselect_all);
  window.myVehicles.elements.edit_cancel.on('click', window.myVehicles.methods.editing._stop);
  window.myVehicles.elements.edit_toggle_select_all.on('change._select_all', window.myVehicles.methods.editing._toggle_select_all);
  window.myVehicles.elements.mixitup_sortby.on('click.fire', window.myVehicles.methods.sorting._sort);
  window.myVehicles.elements.search_boxes.on('keyup', window.myVehicles.methods._text_search);
  window.myVehicles.elements.switch_view.on('click', window.myVehicles.methods._switch_views);
});

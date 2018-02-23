'use strict';

$(document).ready(function () {
  window.locations = {
    elements: {
      html: $('html'),
      poi_edit_input: $('.poi-edit-input'),
      poi_edit_title: $('.poi-edit-title'),
      poi_edit_title_text: $('.poi-edit-title-text'),
      location_utility_tools: $('.locations-utility-tools > *'),
      location_utility_collapse: $('#locations-utility-collapse'),
      location_search_input: $('.location-search-input'),
      location_search_clear: $('.search-clear'),
      location_carousel: $('#locations-utility-carousel'),
      reset_btn: $('.locations-utility .reset-btn'),
      save_poi_btn: $('.save-poi-btn'),
      nav_toggle_search: $('.nav-toggle-search'),
      location_utility: $('.locations-utility'),
      filter_badge: $('.filter-list .badge'),
      toggle_detail: $('.toggle-detail'),
      pin_refresh_start: $('.pin-refresh-start'),
      waypoints: $('.waypoints'),
      waypoint: $('.waypoint'),
      waypoint_search: $('.waypoint-search'),
      waypoint_clear: $('[data-waypoint="clear"]'),
      waypoint_delete: $('.waypoint .delete, [data-waypoint="delete"]'),
      waypoint_mobile_add: $('.modal .locations-search-results-item'),
      draggable: $('.draggable'),
      waypoint_select: $('.waypoint-input .locations-search-results-item'),
      waypoint_add: $('[data-waypoint="add"]')
    },
    methods: {
      collapse: {
        _open: function _open() {
          window.locations.elements.location_utility_collapse.collapse("show");
          window.locations.elements.toggle_detail.removeClass("flip");
        },
        _close: function _close() {
          window.locations.elements.location_utility_collapse.collapse("hide");
          window.locations.elements.toggle_detail.addClass("flip");
        },
        _toggle: function _toggle() {
          var $this = $(this);
          if (!$this.hasClass('flip')) {
            window.locations.methods.collapse._close();
          } else {
            window.locations.methods.collapse._open();
          }
        }
      },
      carousel: {
        _carousel_slide: function _carousel_slide(data) {
          var $carousel_inner = window.locations.elements.location_carousel.find('.carousel-inner'),
              $items = $carousel_inner.children('.item'),
              $target = $(data.relatedTarget),
              $active_item = $items.filter('.active');

          $carousel_inner.removeClass('overflow-visible');

          // Use CSS to animate the height of the slider while transitioning
          $carousel_inner.css('height', parseInt($items.filter('.active').innerHeight(), 10));
          setTimeout(function () {
            // Then remove the height
            $carousel_inner.css('height', parseInt($target.innerHeight(), 10));
            setTimeout(function () {
              $carousel_inner.css('height', 'auto');
            }, 550);
          }, 10);

          if ($target.hasClass('top')) {
            window.locations.elements.location_utility.removeClass('slide-down');
          }

          if ($target.hasClass('bottom')) {
            window.locations.elements.location_utility.addClass('slide-down');
          }

          if ($target.hasClass('hide-search')) {
            window.locations.elements.location_utility.addClass('hide-search');
          }

          if ($target.hasClass('show-search')) {
            window.locations.elements.location_utility.removeClass('hide-search');
          }

          if ($target.hasClass('show-toggle')) {
            window.locations.elements.location_utility.addClass('show-toggle');
          } else {
            window.locations.elements.location_utility.removeClass('show-toggle');
          }
        }
      },
      form_submit: function form_submit(e) {
        e.preventDefault();
      },
      poi: {
        _open: function _open(e) {
          e.stopPropagation();
          var $this = $(this),
              $edit_title = $this.parents('.poi-edit-title');
          $edit_title.addClass('editing');
        },
        _close: function _close(e, $input) {
          var $this = $input || $(this),
              $edit_title = $this.parents('.poi-edit-title');
          $edit_title.removeClass('editing');
          var val = $this.val();
          if (val) {
            $edit_title.find('.poi-edit-title-text').text(val);
          }
          $this.blur();
        },
        _keyup: function _keyup(e) {
          if (e.keyCode === 13) {
            window.locations.methods.poi._close(null, $(this));
          }
        },
        _save: function _save() {
          window.locations.elements.save_poi_btn.addClass('spinning');
          window.locations.methods.poi._close(null, $('.poi-edit-title.editing input'));
          window.loading.methods._loading_start();
          setTimeout(function () {
            window.loading.methods._loading_stop();
            window.locations.elements.save_poi_btn.removeClass('spinning');
            window.locations.elements.location_carousel.carousel(4);
          }, 2000);
        },
        waypoints: {
          _keyup: function _keyup(e) {
            var $this = $(this),
                $parent = $this.parents('li'),
                $search_results = $parent.find('.locations-search-results-list');
            if (e.keyCode === 27) {
              $search_results.removeClass('show');
            } else {
              if ($this.val().length) {
                $parent.addClass('has-text');
                $search_results.addClass('show');
              } else {
                $search_results.removeClass('show');
                $parent.removeClass('has-text');
              }
            }
          },
          _close: function _close() {
            var _this = this;

            setTimeout(function () {
              var $this = $(_this),
                  $parent = $this.parents('li'),
                  $search_results = $parent.find('.locations-search-results-list');
              $search_results.removeClass('show');
              $parent.removeClass('has-text');
            }, 1000);
          },
          _clear: function _clear() {
            var $this = $(this),
                $parent = $this.parents('li'),
                $input = $parent.find('input'),
                $search_results = $parent.find('.locations-search-results-list');
            $input.val('');
            $parent.removeClass('has-text');
            $search_results.removeClass('show');
          },
          _recount: function _recount() {
            var c = 1;
            window.locations.elements.waypoints.find('.waypoint').each(function () {
              var $this = $(this),
                  $title = $this.find('.waypoint-title');
              $title.text('Waypoint ' + c);
              c++;
            });
          },
          _drag: function _drag() {
            window.locations.elements.draggable.sortable({
              cursor: 'move',
              handle: ".drag",
              delay: 0,
              stop: function stop() {
                window.locations.methods.poi.waypoints._recount();
                window.locations.elements.location_carousel.find('.carousel-inner').removeAttr('style');
              },
              start: function start() {
                if (window.innerWidth >= 992) {
                  window.locations.elements.location_carousel.find('.carousel-inner').css('overflow', 'visible');
                }
              }
            });
          },
          _add: function _add() {
            window.locations.elements.waypoint.filter('.hide').first().removeClass('hide');
            window.locations.elements.waypoints.removeClass('addable');
          },
          _add_mobile: function _add_mobile() {
            var $waypoint = window.locations.elements.waypoint.filter('.hide').first();
            $waypoint.removeClass('hide');
            $waypoint.addClass('selected');
            window.locations.methods.poi.waypoints._is_addable();
            $('#waypoint-add').modal('hide');
          },
          _is_addable: function _is_addable() {
            if (window.locations.elements.waypoint.not('.hide').length < 2) {
              window.locations.elements.waypoints.addClass('addable');
            } else {
              window.locations.elements.waypoints.removeClass('addable');
            }
            if (window.locations.elements.waypoint.not('.hide').length > 1) {
              window.locations.elements.waypoints.addClass('can-drag');
            } else {
              window.locations.elements.waypoints.removeClass('can-drag');
            }
          },
          _delete: function _delete() {
            var $this = $(this),
                $waypoint = $this.parents('.waypoint'),
                $parent = $waypoint.parents('.waypoints');
            $waypoint.appendTo($parent);
            $waypoint.removeClass('selected');
            $waypoint.find('input').val('');
            window.locations.methods.poi.waypoints._recount();
            $waypoint.addClass('hide');
            window.locations.methods.poi.waypoints._is_addable();
          },
          _select: function _select() {
            var $this = $(this),
                $waypoint = $this.parents('.waypoint');
            $waypoint.addClass('selected');
            window.locations.methods.poi.waypoints._is_addable();
          }
        }
      },
      utility: {
        _toggle_utlity: function _toggle_utlity() {
          var $this = $(this),
              is_active = !$this.hasClass('active');
          window.locations.elements.location_utility_tools.removeClass('active');

          if (is_active) {
            $this.addClass('active');
            window.locations.methods.collapse._open();
          } else {
            window.locations.methods.collapse._close();
          }
        }
      },
      search: {
        _keyup: function _keyup(e) {
          window.locations.elements.location_carousel.carousel(0);
          window.locations.elements.location_utility_tools.removeClass('active');
          if (e.keyCode === 27) {
            window.locations.methods.collapse._close();
          } else {
            if (window.locations.elements.location_search_input.val().length) {
              window.locations.methods.collapse._open();
              window.locations.elements.location_search_input.addClass('has-text');
            } else {
              window.locations.methods.collapse._close();
              window.locations.elements.location_search_input.removeClass('has-text');
            }
          }
        },
        _clear: function _clear() {
          window.locations.methods.collapse._close();
          window.locations.elements.location_search_input.val('').removeClass('has-text');
        }
      },
      _reset_btn: function _reset_btn() {
        window.locations.elements.location_utility_tools.removeClass('active');
      },
      filters: {
        _remove: function _remove() {
          $(this).parents('.badge').remove();
          if (!$('.filter-list .badge').length) {
            window.locations.methods.filters._close();
          }
        },
        _close: function _close() {
          var $list = $('.filter-list');
          $list.css('height', $list.outerHeight());
          setTimeout(function () {
            $list.addClass('close');
          }, 10);
        }
      },
      mobile: {
        _toggle_search: function _toggle_search() {
          var $this = $(this),
              is_active = $this.hasClass('active');
          window.locations.elements.nav_toggle_search.removeClass('active');
          if (is_active) {
            window.locations.elements.location_utility.removeClass('open');
            window.locations.methods.collapse._close();
            $('body').removeClass('hide-subnav');
            return;
          }
          $('body').addClass('hide-subnav');
          window.locations.elements.location_utility.addClass('open');
          $this.addClass('active');
          if ($this.is('.icon-settings') || $this.is('.icon-poi')) {
            window.locations.methods.collapse._open();
          }
        }
      },
      pin: {
        _refresh: function _refresh() {
          var $pin = $(this).parents('.pin');
          $pin.addClass('pin-refreshing');
          window.loading.methods._loading_start();
          setTimeout(function () {
            window.loading.methods._loading_stop();
            $pin.removeClass('pin-refreshing');
            $pin.find('.timestamp').text('Last updated just now');
          }, 1500);
        }
      }
    }
  };
  // EVENTS
  window.locations.elements.location_carousel.carousel({
    interval: false
  });
  window.locations.elements.poi_edit_input.on('focus', window.locations.methods.poi._open);
  window.locations.elements.poi_edit_input.on('blur', window.locations.methods.poi._close);
  window.locations.elements.poi_edit_input.on('keyup', window.locations.methods.poi._keyup);
  window.locations.elements.location_utility_tools.on('click', window.locations.methods.utility._toggle_utlity);
  window.locations.elements.location_search_input.on('keyup', window.locations.methods.search._keyup);
  window.locations.elements.location_search_clear.on('click', window.locations.methods.search._clear);
  window.locations.elements.location_carousel.on('slide.bs.carousel', window.locations.methods.carousel._carousel_slide);
  window.locations.elements.reset_btn.on('click', window.locations.methods._reset_btn);
  window.locations.elements.save_poi_btn.on('click', window.locations.methods.poi._save);
  window.locations.elements.nav_toggle_search.on('click', window.locations.methods.mobile._toggle_search);
  window.locations.elements.filter_badge.find('i').on('click', window.locations.methods.filters._remove);
  window.locations.elements.toggle_detail.on('click', window.locations.methods.collapse._toggle);
  window.locations.elements.pin_refresh_start.on('click', window.locations.methods.pin._refresh);
  window.locations.elements.waypoint_search.on('keyup', window.locations.methods.poi.waypoints._keyup);
  window.locations.elements.waypoint_clear.on('click', window.locations.methods.poi.waypoints._clear);
  window.locations.elements.waypoint_search.on('blur', window.locations.methods.poi.waypoints._close);
  window.locations.elements.waypoint_delete.on('click', window.locations.methods.poi.waypoints._delete);
  window.locations.elements.waypoint_select.on('click', window.locations.methods.poi.waypoints._select);
  window.locations.elements.waypoint_add.on('click', window.locations.methods.poi.waypoints._add);
  window.locations.elements.waypoint_mobile_add.on('click', window.locations.methods.poi.waypoints._add_mobile);
  $('form').on('submit', window.locations.methods.form_submit);

  window.locations.methods.poi.waypoints._drag();
});

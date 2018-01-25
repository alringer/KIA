$(document).ready(() => {
  window.locations = {
    elements : {
      html : $('html'),
      poi_edit_input : $('.poi-edit-input'),
      poi_edit_title : $('.poi-edit-title'),
      poi_edit_title_text : $('.poi-edit-title-text'),
      location_utility_tools : $('.locations-utility-tools > *'),
      location_utility_collapse : $('#locations-utility-collapse'),
      location_search_input : $('.location-search-input'),
      location_search_clear : $('.search-clear'),
      location_carousel : $('#locations-utility-carousel'),
      reset_btn : $('.locations-utility .reset-btn'),
      save_poi_btn : $('.save-poi-btn'),
      nav_toggle_search : $('.nav-toggle-search'),
      location_utility : $('.locations-utility'),
    },
    methods : {
      collapse : {
        _open : () => {
          window.locations.elements.location_utility_collapse.collapse("show");
          // $('body').addClass('hide-subnav');
        },
        _close : () => {
          window.locations.elements.location_utility_collapse.collapse("hide");
          // $('body').removeClass('hide-subnav');
        }
      },
      carousel : {
        _carousel_slide : (data) => {
          var $carousel_inner = window.locations.elements.location_carousel.find('.carousel-inner'),
              $items = $carousel_inner.children('.item'),
              $target = $(data.relatedTarget),
              $active_item = $items.filter('.active');

          $carousel_inner.removeClass('overflow-visible');

          // Use CSS to animate the height of the slider while transitioning
          $carousel_inner.css('height', parseInt($items.filter('.active').innerHeight(), 10));
          setTimeout(function(){
            // Then remove the height
            $carousel_inner.css('height', parseInt($target.innerHeight(), 10));
          }, 10);


          if($target.hasClass('top')) {
            window.locations.elements.location_utility.removeClass('slide-down');
          }

          if($target.hasClass('bottom')) {
            window.locations.elements.location_utility.addClass('slide-down');
          }

          if($target.hasClass('hide-search')) {
            window.locations.elements.location_utility.addClass('hide-search');
          }

          if($target.hasClass('show-search')) {
            window.locations.elements.location_utility.removeClass('hide-search');
          }
        },
      },
      form_submit : (e) => {
        e.preventDefault();
      },
      poi : {
        _open : function(e) {
          e.stopPropagation();
          var $this = $(this),
              $edit_title = $this.parents('.poi-edit-title');
          $edit_title.addClass('editing');
        },
        _close : function(e, $input) {
          var $this = $input || $(this),
              $edit_title = $this.parents('.poi-edit-title');
          $edit_title.removeClass('editing');
          var val = $this.val();
          if(val) {
            $edit_title.find('.poi-edit-title-text').text(val);
          }
          $this.blur();
        },
        _keyup : function(e) {
          if(e.keyCode === 13) {
            window.locations.methods.poi._close(null, $(this));
          }
        },
        _save : () => {
          window.locations.elements.save_poi_btn.addClass('spinning');
          window.locations.methods.poi._close(null, $('.poi-edit-title.editing input'));
          window.loading.methods._loading_start();
          setTimeout(() => {
            window.loading.methods._loading_stop();
            window.locations.elements.save_poi_btn.removeClass('spinning');
            window.locations.elements.location_carousel.carousel(4);
          }, 2000)
        }
      },
      utility : {
        _toggle_utlity : function() {
          var $this = $(this),
              is_active = !$this.hasClass('active');
          window.locations.elements.location_utility_tools.removeClass('active');

          if(is_active) {
            $this.addClass('active');
            window.locations.methods.collapse._open();
          }else{
            window.locations.methods.collapse._close();
          }
        }
      },
      search : {
        _keyup : (e) => {
          window.locations.elements.location_carousel.carousel(0);
          window.locations.elements.location_utility_tools.removeClass('active');
          if(e.keyCode === 27) {
            window.locations.methods.collapse._close();
          }else{
            if(window.locations.elements.location_search_input.val().length) {
              window.locations.methods.collapse._open();
              window.locations.elements.location_search_input.addClass('has-text');
            }else{
              window.locations.methods.collapse._close();
              window.locations.elements.location_search_input.removeClass('has-text');
            }
          }
        },
        _clear : () => {
          window.locations.methods.collapse._close();
          window.locations.elements.location_search_input.val('').removeClass('has-text');
        }
      },
      _reset_btn : () => {
        window.locations.elements.location_utility_tools.removeClass('active');
      },
      mobile : {
        _toggle_search : function() {
          var $this = $(this),
              is_active = $this.hasClass('active');
          window.locations.elements.nav_toggle_search.removeClass('active');
          if(is_active) {
            window.locations.elements.location_utility.removeClass('open');
            window.locations.methods.collapse._close();
            $('body').removeClass('hide-subnav');
            return;
          }
          $('body').addClass('hide-subnav');
          window.locations.elements.location_utility.addClass('open');
          $this.addClass('active');
          if($this.is('.icon-settings') || $this.is('.icon-poi')) {
            window.locations.methods.collapse._open();
          }

        }
      },
    },
  };
  // EVENTS
  window.locations.elements.location_carousel.carousel({
    interval : false,
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
  $('form').on('submit', window.locations.methods.form_submit);
});

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
      location_carousel : $('#locations-utility-carousel'),
      reset_btn : $('.locations-utility .reset-btn'),
      save_poi_btn : $('.save-poi-btn'),
    },
    methods : {
      collapse : {
        _open : () => {
          window.locations.elements.location_utility_collapse.collapse("show");
        },
        _close : () => {
          window.locations.elements.location_utility_collapse.collapse("hide");
        }
      },
      carousel : {
        _carousel_slide : (data) => {
          var $carousel_inner = window.locations.elements.location_carousel.find('.carousel-inner'),
              $items = $carousel_inner.children('.item'),
              $target = $(data.relatedTarget);

          $carousel_inner.removeClass('overflow-visible');

          // Use CSS to animate the height of the slider while transitioning
          $carousel_inner.css('height', parseInt($items.filter('.active').innerHeight(), 10));
          setTimeout(function(){
            // Then remove the height
            $carousel_inner.css('height', parseInt($target.innerHeight(), 10));
          }, 10);
        },
      },
      poi : {
        _open : (e) => {
          e.stopPropagation();
          window.locations.elements.poi_edit_title.addClass('editing');
        },
        _close : () => {
          window.locations.elements.poi_edit_title.removeClass('editing');
          var val = window.locations.elements.poi_edit_input.val();
          if(val) {
            window.locations.elements.poi_edit_title_text.text(val);
          }
        },
        _keyup : (e) => {
          if(e.keyCode === 13) {
            window.locations.methods.poi._close();
          }
        },
        _save : () => {
          window.locations.elements.save_poi_btn.addClass('spinning');
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
            }
          }
        },
      },
      _reset_btn : () => {
        window.locations.elements.location_utility_tools.removeClass('active');
      }
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
  window.locations.elements.location_carousel.on('slide.bs.carousel', window.locations.methods.carousel._carousel_slide);
  window.locations.elements.reset_btn.on('click', window.locations.methods._reset_btn);
  window.locations.elements.save_poi_btn.on('click', window.locations.methods.poi._save);
  console.log(window.locations.elements.save_poi_btn.length);
});

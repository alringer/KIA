$(document).ready(function() {
  window.modals = {
    elements : {
      modals : $('.modals'),
      modal : $('.modals .modal'),
      modal_open : $('[data-action="modal-open"]'),
      modal_close : $('[data-action="modal-close"]'),
      modal_nav : $('[data-action="modal-nav"]'),
      modal_nav_next : $('[data-action="modal-nav-next"]'),
      modal_nav_prev : $('[data-action="modal-nav-prev"]'),
      modal_body : $('.modal .modal-body'),
      overlay_open : $('[data-action="modal-overlay-open"]'),
      overlay_close : $('[data-action="modal-overlay-close"]'),
      modal_slider : $('.modal .slider'),
    },
    methods : {
      _stop_propgagation : (e) => {
        e.stopPropagation();
      },
      _open : function(e) {
          e.preventDefault();
          var $this = $(this),
              $modal = window.modals.elements.modal.filter(`.${$this.data('modal')}`);
          if( $modal.length ) {
            setTimeout(function(){
              $modal.addClass('active');
              window.modals.methods._reset_size();
            }, 100);
            window.modals.elements.modals.addClass('open');
          }
      },
      _close : () => {
        window.modals.methods._overlay_close();
        window.modals.methods._nav_to(1);
        window.modals.elements.modals.removeClass('open');
        window.modals.elements.modal.removeClass('active');
      },
      _nav : (e) => {
        var $this = $(e.currentTarget),
            nav_to = parseInt($this.attr('data-modal-nav'), 10);

        window.modals.methods._nav_to(nav_to);
      },
      _nav_to : (nav_to) => {
        window.modals.methods._reset_size();

        var $active_modal = $('.modal.active'),
            $all_nav_items = $active_modal.find('[data-action="modal-nav"]'),
            modal_width = $active_modal.outerWidth(),
            $modal_body = $active_modal.find('.modal-body'),
            $modal_tabs = $modal_body.find('.modal-body-tab'),
            $active_tab = $modal_tabs.eq(nav_to - 1).addClass('active');

        $all_nav_items.removeClass('active');
        $all_nav_items.filter(`[data-modal-nav="${nav_to}"]`).addClass('active');

        $modal_tabs.removeClass('active');
        $active_tab.addClass('active');
        $modal_body.css({
          'left' : -(((modal_width * nav_to) - modal_width)),
        });
        window.modals.methods._reset_size();
      },
      _nav_to_adjacent : (direction) => {
        var $active_modal = window.modals.elements.modal.filter('.active'),
            $modal_tabs = $active_modal.find('.modal-body-tab'),
            $active_tab = $modal_tabs.filter('.active'),
            $next_tab = $active_tab.next('.modal-body-tab'),
            $prev_tab = $active_tab.prev('.modal-body-tab'),
            $request_tab = direction === 'next' ? $next_tab : $prev_tab;
        if( $request_tab.length ) {
          window.modals.methods._nav_to( $modal_tabs.index($request_tab) + 1);
        }
      },
      _nav_to_next : () => {
        window.modals.methods._nav_to_adjacent('next');
      },
      _nav_to_prev : () => {
        window.modals.methods._nav_to_adjacent('prev');
      },
      _reset_size : () => {
        var $active_modal = window.modals.elements.modal.filter('.active'),
            $modal_body = $active_modal.find('.modal-body'),
            $modal_tabs = $modal_body.find('.modal-body-tab'),
            $active_tab = $modal_tabs.filter('.active'),
            $modal_nav = $active_modal.find('.modal-nav'),
            $open_overlay = $active_modal.find('.modal-overlay.active'),
            height = false;

        if( $active_tab.length || $open_overlay.length ) {
          if( $open_overlay.length ) {
            height =
              $open_overlay.outerHeight()
              - parseInt($active_modal.css('paddingTop'), 10)
              - parseInt($active_modal.css('paddingBottom'), 10)
            ;
            if( $modal_nav.length ) {
              height -= parseInt($modal_nav.outerHeight(), 10);
            }
          } else {
            height = $active_tab.outerHeight();
          }

          if( height ) {
            $modal_body.css({
              'height' : height,
            });
          }
        }
      },
      _overlay_toggle : (action) => {
        window.modals.methods._reset_size();
        var $active_modal = window.modals.elements.modal.filter('.active'),
            $overlay = $active_modal.find('.modal-overlay'),
            $nav = $active_modal.find('.modal-nav'),
            $body_wrap = $active_modal.find('.modal-body-wrap'),
            modal_width = $active_modal.outerWidth();

        if( action === 'open' ) {
          $overlay.addClass('active');
          $active_modal.addClass('overlay-open');

          $nav.css('left', -modal_width);
          $body_wrap.css('left', -modal_width);
        } else {
          $overlay.removeClass('active');
          $active_modal.removeClass('overlay-open');

          $nav.css('left', 0);
          $body_wrap.css('left', 0);
        }
        window.modals.methods._reset_size();
      },
      _overlay_open : (e) => {
        e.preventDefault();
        window.modals.methods._overlay_toggle('open');
      },
      _overlay_close : () => {
        window.modals.methods._overlay_toggle('close');
      },
      _modal_slider : () => {
        window.modals.elements.modal_slider.slick({
          infinite : false,
          slidesToShow: 1,
          dots: true,
          prevArrow : '<button type="button" class="slick-prev">Back</button>'
        });
      }
    }
  };

  // EVENTS
  window.modals.elements.modal_open.on('click', window.modals.methods._open);
  window.modals.elements.modal_close.on('click', window.modals.methods._close);
  window.modals.elements.modal_nav.on('click', window.modals.methods._nav);
  window.modals.elements.modal_nav_next.on('click', window.modals.methods._nav_to_next);
  window.modals.elements.modal_nav_prev.on('click', window.modals.methods._nav_to_prev);
  window.modals.elements.overlay_open.on('click', window.modals.methods._overlay_open);
  window.modals.elements.overlay_close.on('click', window.modals.methods._overlay_close);
  window.modals.elements.modal.on('click', window.modals.methods._stop_propgagation);

  // SETUP
  window.modals.methods._modal_slider();
  window.modals.methods._reset_size();
});

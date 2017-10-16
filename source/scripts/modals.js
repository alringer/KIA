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
      // Stops events from bubbling up
      _stop_propgagation : (e) => {
        e.stopPropagation();
      },
      // Opens a modal
      _open : function(e) {
          e.preventDefault();
          // Find the requested modal
          var $this = $(this),
              $modal = window.modals.elements.modal.filter(`.${$this.data('modal')}`);
          // If modal is found, open it.
          if( $modal.length ) {
            // Slight delay to correct for how CSS animates
            setTimeout(function(){
              $modal.addClass('active');
              window.modals.methods._reset_size();
            }, 100);
            // Add the open class to display the modal warpper
            window.modals.elements.modals.addClass('open');
          }
      },
      // Cloases all modals
      _close : () => {
        // Closes a modal overlay ( modal overlays cover the content of a modal -- not to be confused with the transparent background )
        window.modals.methods._overlay_close();
        // Resets the tabs of a modal
        window.modals.methods._nav_to(1);
        // Remove classes to animate the close of a modal
        window.modals.elements.modals.removeClass('open');
        window.modals.elements.modal.removeClass('active');
      },
      // Auto-detect the modal tab navigation
      _nav : (e) => {
        var $this = $(e.currentTarget),
            nav_to = parseInt($this.attr('data-modal-nav'), 10);

        window.modals.methods._nav_to(nav_to);
      },
      // Navigate to a specific modal tab -- nav_to is base 1 (ie, first tab is 1, not 0)
      _nav_to : (nav_to) => {
        window.modals.methods._reset_size();

        // Use the active modal
        var $active_modal = window.modals.elements.modal.filter('.active'),
            // Get the modal nav items ( to update classes )
            $all_nav_items = $active_modal.find('[data-action="modal-nav"]'),
            // Get the modal so we can automatically detect the animation required
            modal_width = $active_modal.outerWidth(),
            // Further grab the required elements below:
            $modal_body = $active_modal.find('.modal-body'),
            $modal_tabs = $modal_body.find('.modal-body-tab'),
            $active_tab = $modal_tabs.eq(nav_to - 1).addClass('active');

        // Remove the active class of all nav items
        $all_nav_items.removeClass('active');
        // Update the specific tab nav item
        $all_nav_items.filter(`[data-modal-nav="${nav_to}"]`).addClass('active');

        // Remove the active class from all modal tabs
        $modal_tabs.removeClass('active');
        // Add the active class to the correct tab
        $active_tab.addClass('active');
        // Move the tab wrapper over
        $modal_body.css({
          'left' : -(modal_width * (nav_to - 1)),
        });
        // Adjust the size of the modal (this is what gives us the fluid height of the modals)
        window.modals.methods._reset_size();
      },
      // Helper function to quickly navigate the tabs forward or backward
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
      // Quickly navigate the active modal tab to the next tab
      _nav_to_next : () => {
        window.modals.methods._nav_to_adjacent('next');
      },
      // Quickly navigate the active modal tab to the prev tab
      _nav_to_prev : () => {
        window.modals.methods._nav_to_adjacent('prev');
      },
      // Resets the height of the modal based on either the active modal tab or modal overlay ( modal overlays cover the content of a modal -- not to be confused with the transparent background )
      _reset_size : () => {
        // Work from the active modal
        var $active_modal = window.modals.elements.modal.filter('.active'),
            $modal_body = $active_modal.find('.modal-body'),
            $modal_tabs = $modal_body.find('.modal-body-tab'),
            // Get the active tab
            $active_tab = $modal_tabs.filter('.active'),
            // Get modal nav ( modal nav is consistant, and it's height may need to be accounted for )
            $modal_nav = $active_modal.find('.modal-nav'),
            // Detect if a modal overlay is open
            $open_overlay = $active_modal.find('.modal-overlay.active'),
            // Var used to determine if we need to set a height or not
            height = false;

        // If we have an active tab, or active overlay, make adjustments
        if( $active_tab.length || $open_overlay.length ) {
          // Prioritize an active overlay
          if( $open_overlay.length ) {
            // Get the appropriate height
            height =
              $open_overlay.outerHeight()
              - parseInt($active_modal.css('paddingTop'), 10)
              - parseInt($active_modal.css('paddingBottom'), 10)
            ;
            // If there is a nav, remove that height from calucations
            if( $modal_nav.length ) {
              height -= parseInt($modal_nav.outerHeight(), 10);
            }
          } else {
            // If no active overlay, get the height of the active tab
            height = $active_tab.outerHeight();
          }

          // If we need to set a height, do it. Transitions handled via CSS3
          if( height ) {
            $modal_body.css({
              'height' : height,
            });
          }
        }
      },
      // Taggles open the modal overlay ( modal overlays cover the content of a modal -- not to be confused with the transparent background )
      _overlay_toggle : (action) => {
        // First set the size, just incase it hasn't been set yet
        window.modals.methods._reset_size();
        // Work with the active modal
        var $active_modal = window.modals.elements.modal.filter('.active'),
            // Grab the overlay
            $overlay = $active_modal.find('.modal-overlay'),
            // Get the modal nav
            $nav = $active_modal.find('.modal-nav'),
            // get the modal body wrapper
            $body_wrap = $active_modal.find('.modal-body-wrap'),
            // Auto-detect width to slide by
            modal_width = $active_modal.outerWidth();

        // Open the overlay
        if( action === 'open' ) {
          // Set the overlay to active
          $overlay.addClass('active');
          $active_modal.addClass('overlay-open');

          // Use CSS3 to slide out the nav and the tabs
          $nav.css('left', -modal_width);
          $body_wrap.css('left', -modal_width);
        } else {
          // or reset all elements
          $overlay.removeClass('active');
          $active_modal.removeClass('overlay-open');

          $nav.css('left', 0);
          $body_wrap.css('left', 0);
        }
        // Reset the hieght of the modal
        window.modals.methods._reset_size();
      },
      // Quick open an overla
      _overlay_open : (e) => {
        e.preventDefault();
        window.modals.methods._overlay_toggle('open');
      },
      // Quick close an overlay
      _overlay_close : () => {
        window.modals.methods._overlay_toggle('close');
      },
      // Setup a modal slideshow (different than modal tabs)
      _modal_slider : () => {
        window.modals.elements.modal_slider.slick({
          infinite : false,
          slidesToShow: 1,
          dots: true,
          prevArrow : '<button type="button" class="slick-prev">Back</button>'
        });
      },
      // Adjusts the left positioning of tabs on active modals by auto detecting if a modal has an active tab
      // Then using the nav_to function to "move" to that tab
      _resize_fix : () => {
        var $active_modal = window.modals.elements.modal.filter('.active'),
            $overlay = $active_modal.find('.modal-overlay'),
            $nav = $active_modal.find('.modal-nav'),
            $body_wrap = $active_modal.find('.modal-body-wrap'),
            $body_tabs = $active_modal.find('.modal-body-tab'),
            $active_tab = $body_tabs.filter('.active'),
            modal_width = $active_modal.outerWidth();

        if($active_tab.length) {
          window.modals.methods._nav_to( $body_tabs.index( $active_tab ) + 1 );
        }
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

  $(window).on('resize', () => {
    // Reset height of the modal
    window.modals.methods._reset_size();
    window.setTimeout(() => {
      // Adjust the left positioning of active modals with active tabs
      window.modals.methods._resize_fix();
    }, 100);
  });

  // SETUP
  window.modals.methods._modal_slider();
  window.modals.methods._reset_size();
});

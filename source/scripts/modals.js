$(document).ready(function() {
  window.modals = {
    elements : {
      carousel : $('.modal .carousel'),
    },
    methods : {
      _carousel_slide : function(data) {
        var $this = $(this),
            $target = $(data.relatedTarget),
            $modal = $this.parents('.modal'),
            $items = $this.find('.item'),
            $nav_items = $modal.find('.modal-nav li'),
            slide_index = $items.index($target),
            $carousel_inner = $modal.find('.carousel-inner'),
            $back = $modal.find('.back');

        // If we are not inside of a modal, exit.
        if(!$modal.length || !$modal.hasClass('in')) {
          return;
        }

        // Update the UI to hide the nav
        if($target.hasClass('no-nav')) {
          $modal.addClass('hide-nav');
        }else{
          $modal.removeClass('hide-nav');
        }

        // Update the nav to show the back button
        if($target.hasClass('show-back')) {
          $modal.addClass('show-back');
        }else{
          $modal.removeClass('show-back');
        }

        // Update the back button's slide to property
        if($target.hasClass('remember-back')) {
          $back.attr('data-slide-to', slide_index);
        }

        // Update nav items active state
        $nav_items.removeClass('active').eq(slide_index).addClass('active');

        // Use CSS to animate the height of the slider while transitioning
        $carousel_inner.css('height', parseInt($items.filter('.active').innerHeight(), 10));
        setTimeout(function(){
          // Then remove the height
          $carousel_inner.css('height', parseInt($target.innerHeight(), 10));
        }, 10);
      },
      _carousel_slid : () => {
        $('.modal.in .carousel-inner').css('height', 'auto');
      }
    }
  };

  // EVENTS
  window.modals.elements.carousel.on('slide.bs.carousel', window.modals.methods._carousel_slide);
  window.modals.elements.carousel.on('slid.bs.carousel', window.modals.methods._carousel_slid);

});

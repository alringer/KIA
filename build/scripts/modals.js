'use strict';

$(document).ready(function () {
  window.modals = {
    elements: {
      modal: $('.modal'),
      carousel: $('.modal .carousel'),
      modal_slider: $('.modal .slider'),
      body: $('body'),
      html: $('html'),
      switch_modals: $('.switch-modals')
    },
    methods: {
      _stop_scroll: function _stop_scroll(e) {
        if (window.modals.elements.body.hasClass('stop-scroll')) {
          e.preventDefault();
        }
      },
      _carousel_slide: function _carousel_slide(data) {
        var $this = $(this),
            $target = $(data.relatedTarget),
            $modal = $this.parents('.modal'),
            $items = $this.find('.item'),
            $nav_items = $modal.find('.modal-nav li'),
            slide_index = $items.index($target),
            $carousel_inner = $modal.find('.carousel-inner'),
            $back = $modal.find('.back');

        // If we are not inside of a modal, exit.
        if (!$modal.length || !$modal.hasClass('in')) {
          return;
        }
        $carousel_inner.removeClass('overflow-visible');

        // Update the UI to hide the nav
        if ($target.hasClass('hide-nav')) {
          $modal.addClass('hide-nav');
        } else {
          $modal.removeClass('hide-nav');
        }

        // Update the nav to show the back button
        if ($target.hasClass('show-back')) {
          $modal.addClass('show-back');
        } else {
          $modal.removeClass('show-back');
        }

        // Update the nav to show the back button
        if ($target.hasClass('hide-close')) {
          $modal.addClass('hide-close');
        } else {
          $modal.removeClass('hide-close');
        }
        if ($target.hasClass('stop-scroll')) {
          window.modals.elements.body.addClass('stop-scroll');
        } else {
          window.modals.elements.body.removeClass('stop-scroll');
        }

        // Update the back button's slide to property
        if ($target.hasClass('remember-back')) {
          $back.attr('data-slide-to', slide_index);
        }

        // Update nav items active state
        $nav_items.removeClass('active').eq(slide_index).addClass('active');

        // Use CSS to animate the height of the slider while transitioning
        $carousel_inner.css('height', parseInt($items.filter('.active').innerHeight(), 10));
        setTimeout(function () {
          // Then remove the height
          $carousel_inner.css('height', parseInt($target.innerHeight(), 10));
        }, 10);
      },
      _carousel_slid: function _carousel_slid() {
        $('.modal.in .carousel-inner').css('height', 'auto').addClass('overflow-visible');
      },
      // Setup a modal slidershow
      _modal_slider: function _modal_slider() {
        if (!window.modals.elements.modal_slider.length) {
          return;
        }
        window.modals.elements.modal_slider.slick({
          infinite: false,
          slidesToShow: 1,
          dots: true,
          prevArrow: '<button type="button" class="slick-prev">Back</button>'
        });
      },
      // Issue with bootstrap + slick -- this rebuilds the slider
      _modal_slider_fix: function _modal_slider_fix() {
        if (!window.modals.elements.modal_slider.length) {
          return;
        }
        window.modals.elements.modal_slider.slick('unslick');
        window.modals.methods._modal_slider();
        window.modals.elements.modal_slider.resize();
      },
      _overflow_hidden: function _overflow_hidden() {
        $('.modal.in .carousel-inner').addClass('overflow-visible');
      },
      _switch_modals: function _switch_modals() {
        var $this = $(this),
            $this_modal = $this.parents('.modal'),
            next_modal = $this.data('next-modal');
        $this_modal.modal('hide');
        setTimeout(function () {
          $(next_modal).modal('show');
        }, 400);
      },
      _reset: function _reset() {
        window.modals.elements.modal.find('.carousel').carousel(0);
        window.modals.elements.modal.find('.nav-tabs li').removeClass('active');
        window.modals.elements.modal.find('.nav-tabs li').first().addClass('active');
        window.modals.elements.modal.find('.tab-content').each(function () {
          var $this = $(this),
              tab_id = $this.find('.tab-pane').first().attr('id');
          $('a[href="#' + tab_id + '"]').tab('show');
        });
        window.modals.elements.modal.removeClass('hide-close');
      },
      _go_to_setting: function _go_to_setting() {
        var $this = $(this),
            settings = $this.data('go-to-settings');
        setTimeout(function () {
          $('#settings .carousel-inner').removeClass('overflow-visible');
          $('#settings .carousel').carousel(1);
          setTimeout(function () {
            var $form = $('.modal-notification-settings form'),
                $settings = $('#' + settings);
            $form.scrollTop(0);
            var offset = $settings.offset().top - $form.offset().top;
            $form.scrollTop(offset);
          }, 250);
        }, 450);
      },
      _go_to_slide: function _go_to_slide() {
        var $this = $(this),
            slide = $this.data('go-to-slide');
        setTimeout(function () {
          $('.modal.in .carousel-inner').removeClass('overflow-visible');
          $('.modal.in .carousel').carousel(slide);
        }, 450);
      }
    }
  };

  // EVENTS
  window.modals.elements.carousel.on('slide.bs.carousel', window.modals.methods._carousel_slide);
  window.modals.elements.carousel.on('slide.bs.carousel', window.modals.methods._modal_slider_fix);
  window.modals.elements.carousel.on('slid.bs.carousel', window.modals.methods._carousel_slid);
  window.modals.elements.carousel.on('slid.bs.carousel', window.modals.methods._modal_slider_fix);
  window.modals.elements.modal.on('shown.bs.modal', window.modals.methods._modal_slider_fix);
  window.modals.elements.modal.on('shown.bs.modal', window.modals.methods._overflow_hidden);
  window.modals.elements.modal.on('hidden.bs.modal', window.modals.methods._reset);
  window.modals.elements.switch_modals.on('click', window.modals.methods._switch_modals);
  $('[data-go-to-settings]').on('click', window.modals.methods._go_to_setting);
  $('[data-go-to-slide]').on('click', window.modals.methods._go_to_slide);
  // window.modals.elements.body.on('touchmove', window.modals.methods._stop_scroll);
  // window.modals.elements.html.on('touchmove', window.modals.methods._stop_scroll);

  // SETUP
  window.modals.methods._modal_slider();
});

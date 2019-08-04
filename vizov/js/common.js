$(function() {

	$('#parts-carousel').owlCarousel({
		items: 4,
		margin: 30,
		nav: true,
		navText: ['<span class="icon fas"></span>','<span class="icon fas"></span>'],
		responsive: {
			0 : {
				items: 1
			},
			480 : {
				items: 2
			},
			768 : {
				items: 3
			},
			992: {
				items: 4
			}
		}	
	});

	$('#reviews-carousel').owlCarousel({
		items: 3,
		margin: 30,
		nav: true,
		navText: ['<span class="icon fas"></span>','<span class="icon fas"></span>'],
		responsive: {
			0 : {
				items: 1
			},
			768 : {
				items: 2
			},
			992: {
				items: 3
			}
		}
	});

	$('.accordion-item-title').click(function() {
    var $item = $(this).parents('.accordion-item');
    
    $item.toggleClass('accordion-item--active').siblings('.accordion-item--active').removeClass('accordion-item--active');
  });

	$('.popup-link').magnificPopup({
		type: 'inline',
		fixedContentPos: true,
		removalDelay: 300,
		mainClass: 'mfp-zoom-out'
	});
	
	// Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "" && !this.className.includes('popup-link')) {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });

});

$('.nav-tabs a').click(function() { return false; });
$('.s-stock .owl-carousel').owlCarousel({
	items:1,
	nav: true,
	navText: ['', ''],
	loop:false,
	autoplayHoverPause:true,
});

$('.s-clients .owl-carousel').owlCarousel({
	items:1,
	nav: true,
	navText: ['', ''],
	loop:false
})
$( ".slider-tabs a" ).click(function() {
	$(this).parent().siblings().find('a').removeClass( "active" );
	$(this).addClass( "active" );
	var slidenumber = $(this).parent().index();
	$('.s-stock .owl-carousel').trigger('to.owl.carousel', slidenumber);
});
$( ".s-stock .owl-carousel .owl-prev" ).click(function(){
	var datahash = $(".s-stock .owl-carousel .active").children().attr( 'data-link' );
	$(".slider-tabs a").removeClass( "active" );
	$(".slider-tabs a[data-href='"+datahash+"']").addClass( "active" );
});
$( ".s-stock .owl-carousel .owl-next" ).click(function(){
	var datahash = $(".s-stock .owl-carousel .active").children().attr( 'data-link' );
	$(".slider-tabs a").removeClass( "active" );
	$(".slider-tabs a[data-href='"+datahash+"']").addClass( "active" );
});
$('.s-always-stock .owl-carousel').owlCarousel({
	items: 3,
	autoplay: true,
	loop: true,
	responsive : {
    // breakpoint from 0 up
    0 : {
    	items: 2
    },
    768 : {
    	items: 3
    },
    1200 : {
    	items: 4
    }
  }
})
$('.popup-link').magnificPopup({
	type:'image',
	gallery:{
		enabled:true
	}
});
$('.docs-popup').magnificPopup({
	type:'image',
	gallery:{
		enabled:true
	}
});
$('.docs-popup-inline').magnificPopup({
	type:'inline',
	gallery:{
		enabled:true
	}
});

$('.protect-popup').magnificPopup({
	type:'image',
	gallery:{
		enabled:true
	}
});
$('.footer-popup').magnificPopup({
	type:'inline',
	midClick: true,
	mainClass: 'mfp-fade'
});
$('.icon-popup-link').magnificPopup({
	type:'inline',
	midClick: true,
	mainClass: 'mfp-fade'
});
$(".s-clients .eh").equalHeights();
$(".s-offer-2 .eh").equalHeights();
$(".s-placement-item").equalHeights();
$(".delivery-list-item").equalHeights();
$("#head_menu").on("click","a", function (event) {
  //отменяем стандартную обработку нажатия по ссылке
  event.preventDefault();
  //забираем идентификатор бока с атрибута href
  var id  = $(this).attr('href'),
  //узнаем высоту от начала страницы до блока на который ссылается якорь
  top = $(id).offset().top;
  //анимируем переход на расстояние - top за 1500 мс
  $('body,html').animate({scrollTop: top}, 1500);
});
$.mask.definitions['9']='[0-9]';
$("input.phone").mask("+7 ( 999 ) 999 - 99 - 99");
// $("form").submit(function() { //Change
// 	var th = $(this);
// 	$.ajax({
// 		type: "POST",
// 			url: "../mail.php", //Change
// 			data: th.serialize()
// 		}).done(function() {
// 			$('#form-success').addClass('active').css('display', 'block').hide().fadeIn();
// 			setTimeout(function() {
// 				$('#form-success').removeClass('active').fadeOut();
// 				th.trigger("reset");
// 			}, 2000);
// 		});
// 		return false;
// 	});

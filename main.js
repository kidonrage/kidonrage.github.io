$(function() {
  $('a.menu_link').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});
$(".rd_slider1").lightSlider({
    loop:false,
    keyPress:true,
    item:1,
    pager: false,
    nextHtml: "<button class='slider-nav sn-next'><i class='icon-right-open-big'></i></button>",
    prevHtml: "<button class='slider-nav sn-prev'><i class='icon-left-open-big'></i></button>",
});

$('.image-gallery1').lightSlider({
    gallery:true,
    item:1,
    autoWidth: true,
    thumbMargin: 2,
    slideMargin: 15,
    speed:500,
    auto:true,
    loop:false,
    nextHtml: "<button class='slider-nav sn-next'><i class='icon-right-open-big'></i></button>",
    prevHtml: "<button class='slider-nav sn-prev'><i class='icon-left-open-big'></i></button>",
    currentPagerPosition:'middle',
    onSliderLoad: function() {
        $('.image-gallery').removeClass('cS-hidden');
    }  
});
var i = 0;
var j = 0;
var k = 0;
var d = 0;
$('a[href="#room2"]').on('shown.bs.tab', function (e) {
    i++
    if(i==1){
       $('.image-gallery2').lightSlider({
        gallery:true,
        item:1,
        autoWidth: true,
        thumbMargin: 2,
        slideMargin: 15,
        speed:500,
        auto:true,
        loop:false,
        nextHtml: "<button class='slider-nav sn-next'><i class='icon-right-open-big'></i></button>",
        prevHtml: "<button class='slider-nav sn-prev'><i class='icon-left-open-big'></i></button>",
        currentPagerPosition:'middle',
        onSliderLoad: function() {
            $('.image-gallery2').removeClass('cS-hidden');
        }  
    });
       $(".rd_slider2").lightSlider({
        loop:false,
        keyPress:true,
        item:2,
        slideMove: 2,
        pager: false,
        nextHtml: "<button class='slider-nav sn-next'><i class='icon-right-open-big'></i></button>",
        prevHtml: "<button class='slider-nav sn-prev'><i class='icon-left-open-big'></i></button>",
        responsive : [
        {
            breakpoint:768,
            settings: {
                item:1,
                slideMove:1
            }
        }
        ]
    });
   }
});
$('a[href="#room3"]').on('shown.bs.tab', function (e) {
    j++
    if(j==1){
       $('.image-gallery3').lightSlider({
        gallery:true,
        item:1,
        autoWidth: true,
        thumbMargin: 2,
        slideMargin: 15,
        speed:500,
        auto:true,
        loop:false,
        nextHtml: "<button class='slider-nav sn-next'><i class='icon-right-open-big'></i></button>",
        prevHtml: "<button class='slider-nav sn-prev'><i class='icon-left-open-big'></i></button>",
        currentPagerPosition:'middle',
        onSliderLoad: function() {
            $('.image-gallery3').removeClass('cS-hidden');
        }  
    });
       $(".rd_slider3").lightSlider({
        loop:false,
        keyPress:true,
        item:1,
        pager: false,
        nextHtml: "<button class='slider-nav sn-next'><i class='icon-right-open-big'></i></button>",
        prevHtml: "<button class='slider-nav sn-prev'><i class='icon-left-open-big'></i></button>",
    });
   }
});
$('a[href="#room4"]').on('shown.bs.tab', function (e) {
    k++
    if(k==1){
       $('.image-gallery4').lightSlider({
        gallery:true,
        item:1,
        autoWidth: true,
        thumbMargin: 2,
        slideMargin: 15,
        speed:500,
        auto:true,
        loop:false,
        nextHtml: "<button class='slider-nav sn-next'><i class='icon-right-open-big'></i></button>",
        prevHtml: "<button class='slider-nav sn-prev'><i class='icon-left-open-big'></i></button>",
        currentPagerPosition:'middle',
        onSliderLoad: function() {
            $('.image-gallery4').removeClass('cS-hidden');
        }  
    });
       $(".rd_slider4").lightSlider({
        loop:false,
        keyPress:true,
        item:1,
        pager: false,
        nextHtml: "<button class='slider-nav sn-next'><i class='icon-right-open-big'></i></button>",
        prevHtml: "<button class='slider-nav sn-prev'><i class='icon-left-open-big'></i></button>",
    });
   }
});
$('a[href="#room5"]').on('shown.bs.tab', function (e) {
    d++
    if(d==1){
       $('.image-gallery5').lightSlider({
        gallery:true,
        item:1,
        autoWidth: true,
        thumbMargin: 2,
        slideMargin: 15,
        speed:500,
        auto:true,
        loop:false,
        nextHtml: "<button class='slider-nav sn-next'><i class='icon-right-open-big'></i></button>",
        prevHtml: "<button class='slider-nav sn-prev'><i class='icon-left-open-big'></i></button>",
        currentPagerPosition:'middle',
        onSliderLoad: function() {
            $('.image-gallery5').removeClass('cS-hidden');
        }  
    });
   }
});
$('.prom_slider').slick({
    slidesToShow: 2,
    slidesToScroll: 2,
    centerMode: true,
    centerPadding: '10px',
    prevArrow: "<button class='slider-nav sn-prev'><i class='icon-left-open-big'></i></button>",
    nextArrow: "<button class='slider-nav sn-next'><i class='icon-right-open-big'></i></button>",
    responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerPadding: '0px'
    }
},
{
  breakpoint: 768,
  settings: {
    slidesToShow: 1
}
},
{
  breakpoint: 480,
  settings: {
    slidesToShow: 1,
    arrows: false
}
}
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
    ]
});
$( document ).ready( function( )
{
    $( ".scrollflow_container" ).ScrollFlow({
        durationOnScroll: 800
    });
} );


(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }


let homeHeader = select('.home #header')
  if (homeHeader) {
    const homeScrolled = () => {
      if (window.scrollY > innerHeight) {
        homeHeader.classList.add('header-scrolled')
      } else {
        homeHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', homeScrolled)
    onscroll(document, homeScrolled)
  }



//   var header = $("#guide-template");
//   $(window).scroll(function() {    
//     var scroll = $(window).scrollTop();
//        if (scroll >= window.innerHeight) {
//           header.addClass("fixed");
//         } else {
//           header.removeClass("fixed");
//         }
// });



  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)


  
    /**
   * Gallery Slider
   */
  new Swiper('.gallery-slider', {
    speed: 400,
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      992: {
        slidesPerView: 5,
        spaceBetween: 30
      },
      1200: {
        slidesPerView: 7,
        spaceBetween: 30
      }
    }
  });

  /**
   * Testimonials slider
   */
  // new Swiper('.testimonials-slider', {
  //   speed: 600,
  //   loop: true,
  //   autoplay: {
  //     delay: 5000,
  //     disableOnInteraction: false
  //   },
  //   slidesPerView: 'auto',
  //   pagination: {
  //     el: '.swiper-pagination',
  //     type: 'bullets',
  //     clickable: true
  //   }
  // });
  // core version + navigation, pagination modules:


  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    observer: true, 
    observeParents: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',

    pagination: {
      el: '.swiper-pagination',
      // type: 'bullets',
      clickable: true
    },
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      600: {
        slidesPerView: 1,
        spaceBetween: 40
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 40
      },

      1400: {
        slidesPerView: 4,
        spaceBetween: 40
      }
    }




  });
  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });
})()

// hover home baner
jQuery(document).ready(function() { 
    jQuery('.step')
      .on('mouseenter', function(e) {
        var parentOffset = jQuery(this).offset(),
            relX = e.pageX - parentOffset.left,
            relY = e.pageY - parentOffset.top;
        jQuery(this).find('span').css({top:relY, left:relX})
      })
      .on('mouseout', function(e) {
        var parentOffset = $(this).offset(),
            relX = e.pageX - parentOffset.left,
            relY = e.pageY - parentOffset.top;
        jQuery(this).find('span').css({top:relY, left:relX})
      })

      jQuery(window).mousemove(
        function (e) {
          var pagex = e.pageX;
          var pagey = e.pageY;
          console.log(x, y);

          var x = pagex - jQuery("section#hero").offset().left;
          var y = pagey - jQuery("section#hero").offset().top;

          jQuery("#bee").css("left", x - 270 + "px")
          jQuery("#bee").css("top", y - 270 + "px")

          if (y < 0 || y > jQuery("section#about").outerHeight())
            jQuery("#bee").css("display", "none");
          else
            jQuery("#bee").css("display", "");

          var cham_p = jQuery("#chameleon").offset().left + jQuery("#chameleon").width() / 2;
          var cham_p2 = jQuery("#chameleon").offset().top;

          if (pagex > cham_p + 50)
            jQuery("#chameleon").attr("src", "assets/img/chameleon/chameleon_right-top.svg");
          else if (pagex < cham_p - 50)
            jQuery("#chameleon").attr("src", "assets/img/chameleon/chameleon-left.svg"); //chameleon-left
          else
            jQuery("#chameleon").attr("src", "assets/img/chameleon/chameleon-top.svg"); //chameleon-top
          if (pagex < cham_p - 50 && pagey < cham_p2)
            jQuery("#chameleon").attr("src", "assets/img/chameleon/chameleon-left-top.svg"); //chameleon-top_left-top
          if (pagex < cham_p - 50 && pagey > cham_p2 + 100)
            jQuery("#chameleon").attr("src", "assets/img/chameleon.svg"); //chameleon

        })


  // Modal
  var myModal = document.getElementById('myModal')
  var myInput = document.getElementById('myInput')

  myModal.addEventListener('shown.bs.modal', function () {
    myInput.focus()
  })
});

jQuery(document).ready(function() { 
class Underliner {
    constructor(selector, color1, color2, thickness1, thickness2, strokeLinecap, rtl) {
        this.links = document.querySelectorAll(selector)
        this.fill = 'transparent';
        this.color1 = color1;
        this.color2 = color2;
        this.thickness1 = thickness1;
        this.thickness2 = thickness2;
        this.strokeLinecap = strokeLinecap;
        this.rtl = rtl;
        this.init();
    }

    init() {
        let self = this;

        self.links.forEach(function (link) {
            let linkWidth = parseInt(link.offsetWidth);
            let svg = self.createSVG(linkWidth);
            self.insertAfter(svg, link);
        });
    }

    setPath(pathD, color, thickness, strokeLinecap) {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

        path.setAttribute("d", pathD);
        path.setAttribute("fill", this.fill);
        path.setAttribute("stroke", color);
        path.setAttribute("stroke-width", thickness);
        path.setAttribute("stroke-linecap", strokeLinecap);
        path.setAttribute("stroke-dasharray", path.getTotalLength() + 10);
        path.setAttribute("stroke-dashoffset", path.getTotalLength() + 10);

        return path;
    }

    randomizePath(linkWidth) {
        let moveYMin = 5;
        let moveYMax = 12;

        let curveXMin = 15;
        let curveXMax = linkWidth; /* Width of the link */
        let curveYMin = 7;
        let curveYMax = linkWidth * 0.12; /* Making the quadratic propotional to the link width */
        //let curveYMax = 20

        let endYMin = 5;
        let endYMax = 11;

        let moveY = Math.floor(Math.random() * (moveYMax - moveYMin)) + moveYMin;
        let curveX = Math.floor(Math.random() * (curveXMax - curveXMin)) + curveXMin;
        let curveY = Math.floor(Math.random() * (curveYMax - curveYMin)) + curveYMin;
        let endY = Math.floor(Math.random() * (endYMax - endYMin)) + endYMin;

        return `M5 ${moveY} Q ${curveX} ${curveY} ${linkWidth - 7} ${endY}`
    }

    createSVG(linkWidth) {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

        svg.setAttribute("width", linkWidth);
        svg.setAttribute("height", "35");

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");

        let pathD = this.randomizePath(linkWidth);
        let pathD2 = this.randomizePath(linkWidth);

        if(this.rtl === true) {
            pathD = this.reverseMe(pathD);
            pathD2 = this.reverseMe(pathD2);
        }

        svg.appendChild(this.setPath(pathD, this.color1, this.thickness1, this.strokeLinecap));
        svg.appendChild(this.setPath(pathD2, this.color2, this.thickness2, this.strokeLinecap));

        svg.setAttribute("focusable", false);

        return svg;
    }

    reverseMe(path) {
        /* Regex functions borrwed from 
        https://github.com/krispo/svg-path-utils/blob/master/src/svg-path-utils.js */
        let pathOperators = path.replace(/[\d,\-\s]+/g, '').split('');
        let pathNums = path.replace(/[A-Za-z,]+/g, ' ').trim().replace(/\s\s+/g, ' ').split(' ');
    
        return `${pathOperators[0]} ${pathNums[4]} ${pathNums[5]} ${pathOperators[1]} ${pathNums[2]} ${pathNums[3]} ${pathNums[0]} ${pathNums[1]}`;
    }

    // https://plainjs.com/javascript/manipulation/insert-an-element-after-or-before-another-32/
    insertAfter(el, referenceNode) {
        referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
      }
    }

    let test = new Underliner(".navbar > ul > li > a", "url(#gradient)", "url(#gradient2)", 2, 12, "round", false);

    let test2 = new Underliner(".underliner-small a", "url(#gradient)", "url(#gradient2)", 3, 6, "round");
  });




jQuery(document).ready(function() { 
//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

jQuery(".next").click(function(){
  if(animating) return false;
  animating = true;
  
  current_fs = jQuery(this).parent();
  next_fs = jQuery(this).parent().next();
  
  //activate next step on progressbar using the index of next_fs
  jQuery("#progressbar li").eq(jQuery("fieldset").index(next_fs)).addClass("active");
  
  //show the next fieldset
  next_fs.show(); 
  //hide the current fieldset with style
  current_fs.animate({opacity: 0}, {
    step: function(now, mx) {
      //as the opacity of current_fs reduces to 0 - stored in "now"
      //1. scale current_fs down to 80%
      scale = 1 - (1 - now) * 0.2;
      //2. bring next_fs from the right(50%)
      left = (now * 50)+"%";
      //3. increase opacity of next_fs to 1 as it moves in
      opacity = 1 - now;
      current_fs.css({
        'transform': 'scale('+scale+')',
        'position': 'absolute'
      });
      next_fs.css({'left': left, 'opacity': opacity});
    }, 
    duration: 800, 
    complete: function(){
      current_fs.hide();
      animating = false;
    }, 
    //this comes from the custom easing plugin
    easing: 'easeInOutBack'
  });
});

jQuery(".previous").click(function(){
  if(animating) return false;
  animating = true;
  
  current_fs = jQuery(this).parent();
  previous_fs = jQuery(this).parent().prev();
  
  //de-activate current step on progressbar
jQuery("#progressbar li").eq(jQuery("fieldset").index(current_fs)).removeClass("active");
  
  //show the previous fieldset
  previous_fs.show(); 
  //hide the current fieldset with style
  current_fs.animate({opacity: 0}, {
    step: function(now, mx) {
      //as the opacity of current_fs reduces to 0 - stored in "now"
      //1. scale previous_fs from 80% to 100%
      scale = 0.8 + (1 - now) * 0.2;
      //2. take current_fs to the right(50%) - from 0%
      left = ((1-now) * 50)+"%";
      //3. increase opacity of previous_fs to 1 as it moves in
      opacity = 1 - now;
      current_fs.css({'left': left});
      previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
    }, 
    duration: 800, 
    complete: function(){
      current_fs.hide();
      animating = false;
    }, 
    //this comes from the custom easing plugin
    easing: 'easeInOutBack'
  });
});

jQuery(".submit").click(function(){
  return false;
});

  jQuery('#datetimepicker4').datetimepicker();
  jQuery('#open').click(function(){
    jQuery('#datetimepicker4').datetimepicker('show');
  });
  jQuery('#close').click(function(){
    jQuery('#datetimepicker4').datetimepicker('hide');
  });
  jQuery('#reset').click(function(){
    jQuery('#datetimepicker4').datetimepicker('reset');
  });


new Typed('.typed',{
 strings: ["vous laisse tranquille", "plante des arbres", "vous donne les meilleures prix"],
    // Optionally use an HTML element to grab strings from (must wrap each string in a <p>)
    stringsElement: null,
    // typing speed
    typeSpeed: 70,
    // time before typing starts
    startDelay: 1200,
    // backspacing speed
    backSpeed: 20,
    // time before backspacing
    backDelay: 500,
    // loop
    loop: true,
    // false = infinite
    loopCount: 100,
    // show cursor
    showCursor: false,
    // character for cursor
    cursorChar: "|",
    // attribute to type (null == text)
    attr: null,
    // either html or text
    contentType: 'html',
    // call when done callback function
    callback: function() {},
    // starting callback function before each string
    preStringTyped: function() {},
    //callback for every typed string
    onStringTyped: function() {},
    // callback for reset
    resetCallback: function() {}
});

});


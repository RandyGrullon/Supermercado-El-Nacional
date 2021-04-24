

jQuery(document).ready(function($){
    
    
    var  logout= document.getElementById("logoutHome"); 
    var  login = document.getElementById("loginHome");
    var  email = document.getElementById("user");
    var  mapa = [] ;
    var docRef = db.collection("Item").get().then((snapshot) => { 

        snapshot.docs.forEach(element => {
            
            mapa.unshift(element.data());
            console.log(element.data());
           console.log(typeof(mapa));
        });
        
        document.getElementById('test1').innerHTML = mapa.map(item => 
            `<div class="single-wid-product">
                <a href="single-product.html"><img src=${item.img} alt="" class="product-thumb"></a>
                <h2><a href="single-product.html">${item.nombre}</a></h2>
                <div class="product-wid-rating">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                </div>
                <div class="product-wid-price">
                    <ins>${item.precio}</ins> <del>$175.00</del>
                </div>       
            </div>`
    
    
            ).join('')

            console.log(mapa);
    });
    
    


    console.log(docRef);

    firebase.auth().onAuthStateChanged(user => {
    if (user) {
    console.log(user);
    // display logout button// 
    logout.classList.remove("hidden");
    email.classList.remove("hidden");
    // display loggeduser email // 
    email.innerText= user.email;

        // hides login button 
    login.classList.add("hidden");
    }
    else {
        logout.classList.add("hidden");
        email.classList.add("hidden");
        login.classList.remove("hidden");
        }
    })


	$(".mainmenu-area").sticky({topSpacing:0});
    
    
    $('.product-carousel').owlCarousel({
        loop:true,
        nav:true,
        margin:20,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
            },
            600:{
                items:3,
            },
            1000:{
                items:5,
            }
        }
    });  
    
    $('.related-products-carousel').owlCarousel({
        loop:true,
        nav:true,
        margin:20,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
            },
            600:{
                items:2,
            },
            1000:{
                items:2,
            },
            1200:{
                items:3,
            }
        }
    });  
    
    $('.brand-list').owlCarousel({
        loop:true,
        nav:true,
        margin:20,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
            },
            600:{
                items:3,
            },
            1000:{
                items:4,
            }
        }
    });    
    
    

    // Bootstrap Mobile Menu fix
    $(".navbar-nav li a").click(function(){
        $(".navbar-collapse").removeClass('in');
    });    
    
    // jQuery Scroll effect
    $('.navbar-nav li a, .scroll-to-up').bind('click', function(event) {
        var $anchor = $(this);
        var headerH = $('.header-area').outerHeight();
        $('html, body').stop().animate({
            scrollTop : $($anchor.attr('href')).offset().top - headerH + "px"
        }, 1200, 'easeInOutExpo');

        event.preventDefault();
    });    
    
    // Bootstrap ScrollPSY
    $('body').scrollspy({ 
        target: '.navbar-collapse',
        offset: 95
    })      
});

function Logout(){
    firebase.auth().signOut().then(() => {

     
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
}

function Logout(){
    firebase.auth().signOut().then(() => {

     // close carrito // 

        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
}

function AddItem(id){
    // selected item price 

    var itemPrice = document.getElementById("");

    // selectores carrito 
    var cart = document.getElementsByClassName("shopping-item"); 
    var amount =  document.getElementsByClassName('cart-amunt');
    var count = document.getElementsByClassName("product-count");
    
    // trigger cambio monto en el carrito  // 
    count[0].innerText = parseInt(count[0].innerText) +1;

    amount[0].innerText = parseFloat(amount[0].innerText) + parseFloat(itemPrice)  ;
    console.log(parseFloat(amount[0].innerText).toPrecision(2));

    console.log(Event.srcElement);
    console.log(this);
   
    //agregar item en firebase al objeto carrito del usuario en curso // 

    // agrega un carrito 
    var frankDocRef = db.collection("Cart").doc("frank");
        frankDocRef.set({
            name: "Frank",
            favorites: { food: "Pizza", color: "Blue", subject: "recess" },
            age: 12
        });


}


function createCart(){

}

jQuery(document).ready(function($){
    
    

    var  logout= document.getElementById("logoutHome"); 
    var  login = document.getElementById("loginHome");
    var  email = document.getElementById("user");
    var  items = [] ;
    var  carts = [] ; 
    
    // popula array items/ 
    var docRef = db.collection("Item").get().then((snapshot) => { 

        snapshot.docs.forEach(element => {
            
            items.unshift(element.data());
            
        });
    
    // popular array cart del usuario logeado/ 
    // var cartRef = db.collection("Cart").get().then((snapshot) => { 

    //     snapshot.docs.forEach(element => {
            
    //         carts.unshift(element.data());
            
    //     });
    //     console.log(carts);
    // });

        document.getElementById('test1').innerHTML = items.map(item => 
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



        document.getElementById('product-carousel').innerHTML = items.map(item=>
            
         ` <div class="single-product" id="${item.nombre}">
                <div class="product-f-image" style="min-height: 225px">
                    <img src="${item.img}" alt="">
                    <div class="product-hover">
                        <a  class="add-to-cart-link" onclick="AddItem(this.id)"><i class="fa fa-shopping-cart"></i> Add to cart</a>
                        <a href="single-product.html" class="view-details-link"><i class="fa fa-link"></i> See details</a>
                    </div>
                </div>
                
                <h2><a href="single-product.html">${item.nombre}</a></h2>
                
                <div class="product-carousel-price">
                    <ins>${item.precio}</ins> <del>$800.00</del>
                </div> 
            </div> `

        ).join('')    
           

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
    });
    
    


    

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

    //
    


    }
    else {
        logout.classList.add("hidden");
        email.classList.add("hidden");
        login.classList.remove("hidden");
        }
    })


	$(".mainmenu-area").sticky({topSpacing:0});
    
    
    
    
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

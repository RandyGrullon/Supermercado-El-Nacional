
var item1 = {
    nombre: 'Arroz',
    precio: 225.00,
    descripcion : '3 lib', 
    img: "https://firebasestorage.googleapis.com/v0/b/procesos-26465.appspot.com/o/arroz.jpg?alt=media&token=4eb1234b-eaa0-433b-8eae-92389791fdf0"
}
var item3 = {
    nombre: 'Aceite',
    precio: 150.00,
    descripcion : '3 lib', 
    img: "https://firebasestorage.googleapis.com/v0/b/procesos-26465.appspot.com/o/aceite.jpg?alt=media&token=8ac6a94e-b193-4c4e-a80f-4b19135d6a56"
}
var item4 = {
    nombre: 'Habichuela',
    precio: 55.77,
    descripcion : '3 lib', 
    img: "https://firebasestorage.googleapis.com/v0/b/procesos-26465.appspot.com/o/habichuela.jpg?alt=media&token=3c6bde65-b989-4376-87a6-c9f273a8da6c"
}
var item2 = {
    nombre: 'Pollo',
    precio: 90.85,
    descripcion : '3 lib', 
    img: "https://firebasestorage.googleapis.com/v0/b/procesos-26465.appspot.com/o/pollo.jpg?alt=media&token=19db9299-1f99-47ae-a9f9-b7f22fba6454"
}
let arr = new Array(item1, item2, item3,item4); 
var carrito =[];
var carro = { 
    total : 0, 
    articulos : 0
}
var carts = [];

firebase.auth().onAuthStateChanged(user => {
    if (user) {
    console.log(user);
    loadCart();
    PopulateCart();
    var cartRef = db.collection("Cart").where("owner",'==',user.email).get().then((snapshot) => { 

        snapshot.docs.forEach(element => {
            
            carts.unshift(element.data());
            
        });

        
        if(carts.length<1){
            db.collection("Cart").add({
                owner: user.email,
                articulos: 0
            })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
            
            }
        console.log(carts);
    });
    }

    else {
        
        }
    })

function AddItem(id){
        // selected item

    var  parent = id.parentElement.nodeName;
    console.log(parent);
        // selected item price 
    
        var itemID = arr.find(element => element.nombre == id.id);
        console.log(itemID);
        console.log(id.id);
        // selectores carrito 
        var cart = document.getElementsByClassName("shopping-item"); 
        var amount =  document.getElementsByClassName('cart-amunt');
        var count = document.getElementsByClassName("product-count");
        
        // trigger cambio monto en el carrito  // 
        carro.articulos = parseInt(count[0].innerText) +1;
        count[0].innerText = carro.articulos; 

        // 

        carro.total += itemID.precio;
        amount[0].innerText = carro.total ;
        console.log(parseFloat(amount[0].innerText).toPrecision(2));
    
        //agregar item en firebase al objeto carrito del usuario en curso // 
    
        // agrega un carrito 
    
           carrito.unshift(itemID);

           localStorage.setItem('cart', JSON.stringify(carro));   
           localStorage.setItem('cartItems', JSON.stringify(carrito));   
    }


function loadCart( ){
    var cart = document.getElementsByClassName("shopping-item"); 
    var amount =  document.getElementsByClassName('cart-amunt');
    var count = document.getElementsByClassName("product-count");
    var carro = JSON.parse(localStorage.getItem('cart'));
    var items = JSON.parse( localStorage.getItem('cartItems'));

    amount[0].innerText= carro.total;
    count[0].innerText= items.length;

    document.getElementById('total').innerText= carro.total;
    document.getElementById('total1').innerText= carro.total;
}

function PopulateCart(){
    var items = JSON.parse( localStorage.getItem('cartItems'));
    document.getElementById('cart-item').innerHTML = items.map(item=> ` <tr class="cart_item" id="cart-item">
    <td class="product-remove">
    <a title="Remove this item" class="remove" href="#">×</a> 
</td>

<td class="product-thumbnail">
    <a href="single-product.html"><img width="145" height="145" alt="poster_1_up" class="shop_thumbnail" src='${item.img}'></a>
</td>

<td class="product-name">
    <a href="single-product.html">${item.nombre}</a> 
</td>

<td class="product-price">
    <span class="amount">$${item.precio}</span> 
</td>

<td class="product-quantity">
    <div class="quantity buttons_added">
        <input type="button" class="minus" value="-">
        <input type="number" size="4" class="input-text qty text" title="Qty" value="1" min="0" step="1">
        <input type="button" class="plus" value="+">
    </div>
</td>

<td class="product-subtotal">
    <span class="amount">${item.precio}</span> 
</td>
</tr>
    `)

    
}
var carts = [];
firebase.auth().onAuthStateChanged(user => {
    if (user) {
    console.log(user);

    
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
      
           
  
            var messageRef = carts.collection('Item').set({
                        nombre: this.innerText,
                        favorites: { food: "Pizza", color: "Blue", subject: "recess" },
                        age: 12
                    });
    }


    var item1 = {
        nombre: 'Arroz',
        precio: 225.00,
        descripcion : '3 lib', 
        img: "",
     }
    var item3 = {
        nombre: 'Aceite',
        precio: 150.00,
        descripcion : '3 lib', 
        img: "",
     }
    var item4 = {
        nombre: 'Habichuela',
        precio: 55.77,
        descripcion : '3 lib', 
        img: "",
     }
    var item2 = {
        nombre: 'Pollo',
        precio: 90.85,
        descripcion : '3 lib', 
        img: "",
     }
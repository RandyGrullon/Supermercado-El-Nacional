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

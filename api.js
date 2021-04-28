
var key = "Hfu4n3Y03bYR02mf";
var productid = 1 ; 

var url = "losprecios.co/ítem/detalles?ClaveAPI="+key+"&MunicipioID=1&ID="+productid;
jQuery(document).ready(function($){
fetch(url)
    .then((resp) => resp.json() 
        
).then(function(data){
    let items = data.results; 
    console.log(items);
})
.catch(function(){
        console.log("klk");
    });
});
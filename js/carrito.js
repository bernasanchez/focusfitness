//JS CARRITO CORRESPONDE A PAGINA TIENDA (Deje todo en una sola pagina)//

let cajaProductosSeleccionados = document.getElementById("contenedorSeleccionados");

const validarCarrito=()=>{
    let carritoCompras=[];
    if(localStorage.getItem("carritoLocal")){
        carritoCompras=JSON.parse(localStorage.getItem("carritoLocal"));
    }
    return carritoCompras;
}

let carritoCompras=validarCarrito();

function mostrarProductosCarrito(){
    
    for(producto of carritoCompras){
        cajaProductosSeleccionados.innerHTML+=`
            <div class="card col-md-3 m-3">
                <img src="../${e.img}" class="card-img-top">
                <div class="card-body">            
                    <div class="card-title">
                        <h3>${e.name}</h3>
                    </div>
                    <div class="card-tex">
                        <p>${e.description}</p>
                    </div>
                    <div class="card-title">
                        <h3>${e.precio}</h3>
                    </div>
                    <button href="#" class="btn btn-primary"  onclick="quitar('${e.id}')">Quitar</button>
                </div>
            </div>
        `
    }
}
 
mostrarProductosCarrito();
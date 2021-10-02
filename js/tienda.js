//Array de objetos literales de Productos en venta
let productos = [];

//Funcion para Agregar Producto a Carrito y al Localstore
function capturar(id) {
  let carritoCompras = [];
  if (localStorage.getItem("carritoLocal")) {
    carritoCompras = JSON.parse(localStorage.getItem("carritoLocal"));
  }
  //producto repetido para volverlo a sumar al que ya teniamos
  const productoRepetido = carritoCompras.find(producto => producto.id === id);

  //cantidad del producto seleccionada
  const cantidad = document.getElementById(`cantidadProducto${id}`).value;
  let productoAgregado = productos.find(producto => producto.id == id);

  //variable que suma el total precio del producto que agrego al carrito
  let precioFinal = 0;

  for (let i = 0; i < cantidad; i++) {
    precioFinal += productoAgregado.precio;
  }

  //producto final que se termina agregando al localStorage
  let productoFinal;

  //si el producto es repetido lo borra y agrega un nuevo producto del mismo tipo con el precio sumado
  // y sino pasa normalmente
  if (productoRepetido) {
    carritoCompras = carritoCompras.filter(producto => producto.id != productoRepetido.id);
    productoFinal = { ...productoAgregado, precio: precioFinal + productoRepetido.precio };
  } else {
    productoFinal = { ...productoAgregado, precio: precioFinal };
  }

  //se agrega el producto al carrito
  carritoCompras.push(productoFinal);
  localStorage.setItem("carritoLocal", JSON.stringify(carritoCompras));
  mostrarProductosCarrito();

  //Sweet Alert (NO FUNCIONA)
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Producto agregado",
    showConfirmButton: false,
    timer: 1000
  });
}

//Iteracion de array creando nodos div para cada producto
function mostrarProductosTienda(){
  //Obtengo nodo de Pagina Tienda donde quiero colocar las card
  const seccionTienda = document.getElementById("contenedorTienda");

  seccionTienda.innerHTML = "";
  for (const producto of productos) {
    seccionTienda.innerHTML += `
      <ul class="listaProductos list-group list-group-horizontal">
          <li class="list-group-item">
              <img src= ${producto.img} alt="">
              <p class="ingresarCantidad"> Producto: ${producto.name}</p>
              <b class="ingresarCantidad">Precio: $ ${producto.precio}</b>
              <h3 class="ingresarCantidad">Cantidad  <input type="number" id="cantidadProducto${producto.id}"></h3>
              <button href="#" class="btn btn-success" onclick="capturar(${producto.id})">Agregar</button>
          </li>
      </ul>
      `;
  }
  
}

//Mostrar Productos Seleccionados
let cajaProductosSeleccionados = document.getElementById("contenedorSeleccionados");

const validarCarrito = () => {
  let carritoCompras = [];
  if (localStorage.getItem("carritoLocal")) {
    carritoCompras = JSON.parse(localStorage.getItem("carritoLocal"));
  }
  return carritoCompras;
};

//Mostrar los productos del carrito en Pagina Tienda
function mostrarProductosCarrito() {
  let carritoCompras = validarCarrito();
  cajaProductosSeleccionados.innerHTML = "";
  for (producto of carritoCompras) {
    cajaProductosSeleccionados.innerHTML += `
            <div class="card col-md-3 m-3" id="card">
                <img src="${producto.img}" class="card-img-top">
                <div class="card-body">            
                    <div class="card-title">
                        <h3 class="titulosCard">${producto.name}</h3>
                    </div>
                    <div class="card-title">
                        <h3 class="titulosCard">$${producto.precio}</h3>
                    </div>
                    <button href="#" class="btn btn-primary"  onclick="quitar('${producto.id}')">Quitar</button>
                </div>
            </div>
        `;
  }
}

mostrarProductosCarrito();

//Quitar Productos Seleccionados
function quitar(id) {
  let carritoCompras = validarCarrito();
  const productoIndex = carritoCompras.findIndex(p => p.id === id);
  carritoCompras.splice(productoIndex, 1);
  localStorage.setItem("carritoLocal", JSON.stringify(carritoCompras));
  console.log(JSON.parse(localStorage.getItem("carritoLocal")));

  mostrarProductosCarrito();
  quitarConAnimacion(id);
}

//Quitar productos con Animacion - VER BIEN POR QUÉ NO SALE
function quitarConAnimacion(id) {
  $("#card" + id).fadeOut(5000);
}

//Boton para Vaciar Carrito
const limpiarCarrito = (mostrarAlerta = true) => {
  localStorage.removeItem("carritoLocal");
  mostrarProductosCarrito();
  if (mostrarAlerta) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Carrito borrado",
      showConfirmButton: false,
      timer: 1000
    });
  }

  // const botonVaciarCarrito = document.getElementById("#btnVaciarCarrito");
  // btnVaciarCarrito.addEventListener("click", () => {
  // });
};

//Ocultar Formulario para Confirmar Compra
$("#confirmarCompra").hide();

// Mostrar formulario
$("#btnConfirmarCompra").on("click", () => {
  $("#confirmarCompra").slideDown(4000);
});

//Funiones validadoras
const emailValido = email => {
  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!email) {
    return false;
  }
  if (!regexEmail.test(email)) {
    return false;
  }
  return true;
};

const nombreValido = nombre => {
  if (!nombre) {
    return false;
  }
  return true;
};

const checkValido = check => {
  if (!check) {
    return false;
  }
  return true;
};

//Enviar formulario compra y validacion

const form = document.getElementById(`formularioCompra`);
form.addEventListener("submit", e => {
  e.preventDefault();
  const nombre = document.getElementById(`nombreInput`).value;
  const email = document.getElementById(`emailInput`).value;
  //TODO:Hacer andar checkbox
  //   const checkBox = document.getElementById(`flexCheckDefault`).value;
  //   console.log(checkBox);

  if (!nombreValido(nombre) || !emailValido(email)) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Complete los campos correctamente y acepte las condiciones",
      showConfirmButton: false,
      timer: 1000
    });
  } else {
    limpiarCarrito(false);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Su pedido se ha enviado correctamente.",
      showConfirmButton: true
    });
  }
});

//Boton Finalizar Compra de Formulario

/*Variable Ofertas para productos.json
let ofertas = [];
*/
const obtenerJsonProductos=()=>{
    //LLamar al GETJSON
    const URLJSON="../js/productos.json";
    $.getJSON(URLJSON, function(respuesta, estado){
      console.log(respuesta);
        if(estado === "success"){
            productos = respuesta.stock;
            mostrarProductosTienda();
        }
        
    });
}

obtenerJsonProductos();




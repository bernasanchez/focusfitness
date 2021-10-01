//Array de objetos literales de Productos en venta
let productos = [];
// const productos = [
//   {
//     id: 1,
//     name: "Mancuerna Fundicion",
//     peso: 2,
//     precio: 200,
//     img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fzagorind.com%2Fwp-content%2Fuploads%2F2021%2F03%2Fimagen_2021-03-27_130054-230x230.png&f=1&nofb=1"
//   },
//   { id: 2, name: "Mancuerna Fundicion", peso: 4, precio: 400, img: "../multimedia/mancuerna1.jpg" },
//   { id: 3, name: "Mancuerna Fundicion", peso: 6, precio: 600, img: "../multimedia/mancuerna1.jpg" },
//   { id: 4, name: "Air Bike", peso: 0, precio: 40000, img: "../multimedia/airbike.jpg" },
//   { id: 5, name: "Remo", peso: 0, precio: 50000, img: "../multimedia/remo.jpg" },
//   { id: 6, name: "Bici Fija", peso: 12, precio: 60000, img: "../multimedia/bicifija2.jpg" },
//   { id: 7, name: "Blanco Plano", peso: 0, precio: 20000, img: "../multimedia/banco-plano2.jpg" },
//   { id: 8, name: "Piso Caucho", peso: 0, precio: 2000, img: "../multimedia/pisonuevo1.jpg" },
//   { id: 9, name: "Piso Caucho", peso: 0, precio: 2000, img: "../multimedia/piso2.jpg" },
//   {
//     id: 10,
//     name: "Rack Mancuernero Hex",
//     peso: 0,
//     precio: 30000,
//     img: "../multimedia/rack-mancuernero-mancuernas-hex.png"
//   },
//   {
//     id: 11,
//     name: "Rack Porta Barra",
//     peso: 0,
//     precio: 20000,
//     img: "../multimedia/rack-porta-barras.jpg"
//   },
//   {
//     id: 12,
//     name: "Rack Porta Kb",
//     peso: 0,
//     precio: 40000,
//     img: "../multimedia/rack-porta-kettlebells.jpg"
//   }
// ];

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



//Obtener DOLAR ACTUALIZADO
// const obtenerValorDolar=()=>{
// const APIURL="https://api-dolar-argentina.herokuapp.com/api/dolaroficial";
//     $.ajax({
//         method:"GET",
//         url:APIURL,
//         success: function(data){
//             $("#valorDolar").append(`p alingn="center"> Dolar Compra:$ <b>${data.compra}</b> Dolar Venta:$ <b>${data.venta}</b></p>`);

//         }
//     });
// }

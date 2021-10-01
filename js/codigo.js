//Ingreso del usuario y Bienvenida a la pagina
//let nombreUsuario = prompt("Ingresá tu Nombre Completo");
//let generoUsuario = prompt("Ingresa tu Género(Masculino o Femenino)");
//let emailusuario = prompt("Ingresá tu Email");
//let lugarResidencia = prompt("Ingresá tu Lugar de Residencia");
//if ((generoUsuario == "masculino") || (generoUsuario == "MASCULINO")){
    //alert("BIENVENIDO A TIENDA FOCUS-FITNESS"+" "+nombreUsuario + " "+ "Estamos para AYUDARTE!");
//}else if((generoUsuario == "femenino")|| (generoUsuario == "FEMENINO")){
//    alert("BIENVENIDA A TIENDA FOCUS-FITNESS"+" "+nombreUsuario +". "+ "Estamos para AYUDARTE!");
//}
//alert("DISFUTA DE TODAS LAS OFERTAS QUE TENEMOS PARA VOS!")

/*/Interaccion con el HTML a traves de DOM
let seccionPrincipal = document.getElementById("bienvenidaUsuario");
let usuario = document.createElement("h3");
usuario.innerText = "Elegí tus productos preferidos" + " " +  nombreUsuario;
usuario.setAttribute("class","bienvenidaUsuario");
seccionPrincipal.appendChild(usuario);
*/

/*
//Ingreso de productos
class Mancuerna {
    constructor(id, nombre,peso, precio, calidad){
        this.id = parseInt(id);
        this.nombre = nombre.toUpperCase();
        this.peso = parseFloat(peso);
        this.precio = parseFloat(precio);
        this.calidad = calidad;
    }   
}

let manc1 = new Mancuerna("1","fundicion",2,200,"regular");
let manc2 = new Mancuerna("2","fundicion",4,400,"regular");
let manc3 = new Mancuerna("3","fundicion",6,600,"regular");
let manc4 = new Mancuerna("4","fundicion",8,800,"regular");
let manc5 = new Mancuerna("5","fundicion",10,1000,"regular");

const listaMancuerna = [];
listaMancuerna.push(manc1);
listaMancuerna.push(manc2);
listaMancuerna.push(manc3);
listaMancuerna.push(manc4);
listaMancuerna.push(manc5);
console.log(listaMancuerna);

//Ingreso de Productos (opcion dos)
/
class Medball {
    constructor(nombre, precio, calidad) {
        this.nombre  = nombre.toUpperCase();
        this.precio  = parseFloat(precio);
        this.calidad  = calidad.toUpperCase();
        this.vendido = false;
    }
    sumaIva() {
        this.precio = this.precio * 1.21;
    }
}

//Nuevo array de productos

const listaMedball = [];
listaMedball.push(new Medball("medcuero", "1000", "regular"));
listaMedball.push(new Medball("medcuero", "2000", "gold"));
listaMedball.push(new Medball("medcuero", "3000", "premium"));
//Calculo del precio de Medball con Iva
for (const producto of listaMedball){
    producto.sumaIva();
    console.log(listaMedball);
}
*/

//DOCUMENT READY 

$(document).ready(function() {
    
    //Boton para crear formulario en Seccion Contacto
    $("#botonFormulario").append("<button class='btn btn-dark' id='botonForm'>Hacé tu Consulta</button>");
    $("#botonForm").click(iniciarForm);
    
});

const iniciarForm = () =>{
    //Inputs y boton creados al tocar boton "Hace tu consulta"
    $("#formEnviarConsulta").append('<br><input type="text" id="nombreCliente" class="form-control" placeholder="Nombre y Apellido" aria-label="Nombre y Apellido"></input>');
    $("#formEnviarConsulta").append('<br><input type="email" class="form-control"  placeholder="tuemail@gmail.com">');
    $("#formEnviarConsulta").append('<br><textarea type="text" cols="72" rows="2" placeholder="Ingrese su Consulta"></textarea>');
    $("#formEnviarConsulta").append('<br><button class="btn btn-success" type="submit">Enviar</button>');
    
    //Evento para Boton Enviar (Formulario)
    $("#formEnviarConsulta").submit(function(e){
        e.preventDefault();
        //Sweet Alert para enviar (no me funciona)
        Swal.fire(
            'Nueva suscripcion realizada:',
            $("#nombreCliente").val(),
            'success',
            
        )
         
    });
}  

//Eventos y animaciones - Seccion Portada Index con JQ
$(".seccionPortadaIndex").append('<h3 class="titulosTerciarios">Comprá lo que quieras y cuando quieras</h3>');
$(".seccionPortadaIndex").append('<h1 class="tituloPrincipal">TIENDA FOCUS-FITNESS</h1>');
$(".seccionPortadaIndex").append('<h2 class="tituloSecundario">AL MEJOR PRECIO DEL MERCADO</h2>');
$(".seccionPortadaIndex").append('<a href="index.html#bienvenidaUsuario"><button id="compraAhora" type="button" class="btn btn-outline-warning">COMPRÁ AHORA</button></a>');

//Evento de para Presentacion de Empresa (Boton "Descubrí quienes somos")
$("#nosotros").click(function(){
    $("#parrafoNosotros").fadeIn(5000);
    $("#imagenPresentacion").delay(4500);
    $("#imagenPresentacion").fadeIn(5000);
});


//Evento para Mostrar/Ocultar Productos
$("#bienvenidaUsuario").append('<button id="productosIndex" type="button" class="btn btn-outline-warning">MOSTRAR PRODUCTOS</button>')

$(".pIndex").hide();

$("#productosIndex").click(function (){
    $(".pIndex").fadeToggle(5000,function(){
        if($("#productosIndex").html() == "MOSTRAR PRODUCTOS"){
            $("#productosIndex").html("OCULTAR PRODUCTOS");
        }else{
            $("#productosIndex").html("MOSTRAR PRODUCTOS");
        }
        
    });
    
});


//Obtener DOLAR ACTUALIZADO 
// const obtenerValorDolar=()=>{
//     const APIURL="https://api-dolar-argentina.herokuapp.com/api/dolaroficial";
//     $.ajax({
//         method:"GET",
//         url:APIURL,
//         success: function(data){
//             $("#valorDolar").append(`p alingn="center"> Dolar Compra:$ <b>${data.compra}</b> Dolar Venta:$ <b>${data.venta}</b></p>`);
            
//         }
//     });
// }
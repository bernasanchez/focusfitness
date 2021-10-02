
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


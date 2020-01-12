const socket = io();

let mensaje = document.getElementById('mensaje');
let usuario = document.getElementById('usuario');
let enviar = document.getElementById('enviar');
let salida = document.getElementById('salida');
let acciones = document.getElementById('acciones');


enviar.addEventListener('click', function (){
    
    socket.emit('mensaje', {
        mensaje:mensaje.value,
        usuario:usuario.value
    });
    /*socket.emit('mensajeyo', {
        mensaje:mensaje.value,
        usuario:usuario.value
    });*/
    //alert('click'+usuario.value+mensaje.value);
})
socket.on('mensaje_servidor', function(datos){
    salida.innerHTML+=`
        <p>
            <strong>${datos.usuario}:</strong>
            ${datos.mensaje}
        </p>
        
    `
})

mensaje.addEventListener('keypress', function(){
    socket.emit('escribiendo', usuario.value);
})
socket.on('respuesta_escritura', function(datos){
    //console.log(datos)
    acciones.innerHTML=''
    acciones.innerHTML+=`
        <p>
            <i>${datos} est&aacute; escribiendo</i>
        </p>
    `
})

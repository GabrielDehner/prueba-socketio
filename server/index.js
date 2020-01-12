var express = require('express');
var app = express();
var path = require('path');



app.use(express.static(path.join(__dirname+'/../frontend/vistas/')));

app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), ()=>{
    console.log('Server iniciado en puerto: ' + app.get('port'));
})

var SocketIO = require('socket.io');
const io = SocketIO(server);
io.on('connection', (socket)=>{
    console.log('nueva coneccion: '+socket.id);

    socket.on('mensaje', (datos)=>{
        io.sockets.emit('mensaje_servidor', datos);
        //console.log(datos);
    })
    socket.on('escribiendo', (datos)=>{
        socket.broadcast.emit('respuesta_escritura', datos);
        //console.log(datos);
    })
    socket.on('mensajeyo', (datos)=>{
        console.log(socket.id);
        io.to(socket.id).emit('mensaje_servidor', datos);
        //console.log(datos);
    })
    
});

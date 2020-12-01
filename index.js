var app = require("./app");
var http = require('http').Server(app);
var io = require('socket.io')(http);
const PORT = 3000 || process.env.PORT;

http.listen(PORT, () => {
    console.log(`The api is listening at port ${PORT}`);
});

io.on("connection", (socket) => {

    socket.on("unirmeGrupo", (message) => {

        socket.join(message.id_grupo);
    });
    socket.on("newTarea", (message) => {
        console.log(message.id_grupo);
        io.sockets.in(message.id_grupo).emit("newTarea");
    });
    socket.on("newPublicacion", (message) => {
        console.log(message);
        io.sockets.in(message.id_grupo).emit("newPublicacion");
    });
    socket.on("newExamen", (message) => {
        io.sockets.in(message.id_grupo).emit("newExamen", message);
    });
    socket.on("newEntrega", (message) => {

        io.sockets.in(message.id_grupo).emit("newEntrega", message);
    });
    socket.on("newCali", (message) => {
        console.log(message.id_grupo);
        console.log("Llego la calificacion");
        io.sockets.in(message.id_grupo).emit("newCali", message);
    });
    socket.on("nuevaResource", (message) => {
        io.sockets.in(message.id_grupo).emit("nuevaResource");
    });
});
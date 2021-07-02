module.exports = function (io) {
    io.on('connection', (socket) => {

        // On Socket Connection
        console.log(` * Socket Connected: ${socket.id}`)
        io.emit('new-connection', { id: socket.id })


        // On Disconnect
        socket.on('disconnect', () => {
            console.log(` * Socket Disconnected: ${socket.id}`)
            io.emit('closed-connection', { id: socket.id })
        });


        // On "avenger assembled"
        socket.on('avenger assembled', (avenger) => {
            console.log('New Avenger: ', avenger);
            socket.broadcast.emit('avenger assembled', avenger);
        });
    });
}
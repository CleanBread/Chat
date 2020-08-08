import http from 'http';
import socket from 'socket.io';

export default (http: http.Server) => {
    const io = socket(http)

    io.on('connection', (socket: socket.Socket) => {
        console.log('io connected')
      })

    return io
      
}
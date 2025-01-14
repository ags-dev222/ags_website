//real time communication using socket.io
import { Server } from 'socket.io';

const io = new Server(Server);

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('event-created', (event) => {
    io.emit('new-event', event); // Broadcast this event to all connected client 
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

export const broadcastNewEvent = (event) => {
  io.emit('new-event', event);
};




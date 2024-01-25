// socket.js
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';

export const initializeSocketIO = (server) => {
    const io = new Server(server, {
        cors: {
            origin: ["http://localhost:5173"],
            methods: ["GET", "POST", "PUT", "DELETE"],
            credentials: true,
        },
    });

    io.on('connection', (socket) => {
        const authorizationHeader = socket.handshake.headers.authorization;
        
        if (authorizationHeader) {
            const token = authorizationHeader.split(' ')[1];
    
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const currentUsername = decoded.user.username;
                const userId=decoded.user.id
                let roomName=''
                
                socket.on("join_room",(data)=>{
                    roomName = getPrivateRoomName(userId, data.recipient);
                    socket.join(roomName);
                    
                })
                socket.on("send_message", (data) => {
                    io.to(roomName).emit('receive_message', { message: data.message, sender: currentUsername });
                });
            } catch (error) {
                console.error('Error verifying token:', error.message);
                socket.disconnect(true);
            }
        } else {
            console.error('Authorization header is missing');
            socket.disconnect(true);
        }
    });
    
    function getPrivateRoomName(user1Id, user2Id) {
        // This function should return a unique room name for the private conversation
        // You can use a consistent naming convention, such as sorting user IDs and concatenating them
        const sortedUserIds = [user1Id, user2Id].sort();
        return `private_${sortedUserIds[0]}_${sortedUserIds[1]}`;
    }
}

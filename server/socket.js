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

    // Keep track of online users
    const onlineUsers = new Map();

    io.on('connection', (socket) => {
        const authorizationHeader = socket.handshake.headers.authorization;

        if (authorizationHeader) {
            const token = authorizationHeader.split(' ')[1];

            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const currentUsername = decoded.user.username;
                const userId = decoded.user.id;

                // Store the user's socket in the onlineUsers map
                onlineUsers.set(userId, socket);

                // Notify clients about the updated online users list
                io.emit('online_users', Array.from(onlineUsers.keys()));

                let roomName = '';

                socket.on("join_room", (data) => {
                    // Needs to be changed so it can receive notifications
                    socket.leave(roomName);
                    roomName = getPrivateRoomName(userId, data.recipient);
                    socket.join(roomName);
                });

                socket.on("send_message", (data) => {
                    io.to(roomName).emit('receive_message', { message: data.message, sender: { id: userId, username: currentUsername } });
                });

                // Handle disconnection
                socket.on('disconnect', () => {
                    // Remove the user from the onlineUsers map when they disconnect
                    onlineUsers.delete(userId);

                    // Notify clients about the updated online users list
                    io.emit('online_users', Array.from(onlineUsers.keys()));
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

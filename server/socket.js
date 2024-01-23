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

        if (authorizationHeader && typeof authorizationHeader === 'string') {
            const token = authorizationHeader.split(' ')[1];

            if (token) {
                try {
                    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
                    const userId = decodedToken.user.id;
                    socket.join(userId);
                } catch (error) {
                    console.error('Error verifying token:', error.message);
                   
                }
            } else {
                console.error('Token is empty');
            }
        } else {
            console.error('Authorization header is not a string or not found');
        }
    });
};



export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token invalid or expired" });
    }

    req.user = decoded.user; // Store user information in the request object
    next();
  });
};
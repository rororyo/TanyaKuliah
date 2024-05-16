// useSocket.js
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const useSocket = (token) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        
        if (!token) {
            console.error('Token not provided for Socket.IO connection.');
            return;
        }

        const newSocket = io('http://localhost:4000', {
            withCredentials: true,
            extraHeaders: {
                'Authorization': 'Bearer ' + token,
            },
        });
        setSocket(newSocket);

        return () => newSocket.close();
    }, [token]);

    return socket;
};

export default useSocket;

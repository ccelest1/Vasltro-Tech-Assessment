import { io, Socket } from "socket.io-client";
const socket: Socket = io('http://localhost:3000', { autoConnect: false });

function socketSetup(onConnect: () => void) {
    socket.connect()
    socket.on('connect', () => {
        console.log("✓ Connected to Star Wars API\n");
        onConnect()
    })
    socket.on("connect_error", (error) => {
        console.error("Connection failed", error.message)
        process.exit(1)
    })
    socket.on("disconnect", () => {
        console.log("Disconnected from local server");
    });
}


export {
    socket, socketSetup
}

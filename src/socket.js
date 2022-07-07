import io from "socket.io-client";
export default io(process.env.REACT_APP_SOCKET_IO_SERVER || "http://localhost:5000");

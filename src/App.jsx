import Intro from "./components/Intro";
import { io } from "socket.io-client";
import Game from "./components/Game";
import { useState, useEffect } from "react";

const socketIoUrl = process.env.REACT_APP_SOCKET_IO_SERVER;
const socket = io(socketIoUrl);

const App = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [question, setQuestion] = useState("");
  const [leaderBoard, setLeaderBoard] = useState([]);
  const [player, setPlayer] = useState({});

  useEffect(() => {
    socket.once("player", (player) => {
      setPlayer(player);
    });

    socket.on("question", (question) => {
      setQuestion(`${question} = ?`);
    });

    socket.on("leaderBoard", (leaderBoard) => {
      setLeaderBoard(leaderBoard);
    });

    socket.on("disconnect", () => {
      setPlayer({});
      setIsHidden(true);
    });

    return () => {
      socket.off("player");
      socket.off("question");
      socket.off("leaderBoard");
      socket.off("disconnect");
    };
  }, []);

  const joinUser = (name) => {
    if (name !== "") {
      socket.emit("userJoined", name);
      setIsHidden(false);
    }
  };

  const answerUser = (answer) => {
    const socket = io(socketIoUrl);
    socket.connect();
    socket.emit("answer", { answer, player });
  };

  return (
    <div className="m-0 bg-purple-500">
      <Intro isHidden={!isHidden} joinUser={joinUser} />
      <Game isHidden={isHidden} question={question} leaderBoard={leaderBoard} answerUser={answerUser} player={player} />
    </div>
  );
};

export default App;

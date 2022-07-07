import Intro from "./components/Intro";
import Game from "./components/Game";
import { useState, useEffect } from "react";
import socket from "./socket";

const App = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [question, setQuestion] = useState("");
  const [leaderBoard, setLeaderBoard] = useState([]);
  const [player, setPlayer] = useState({});

  useEffect(() => {
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
      setPlayer({ name });
      setIsHidden(false);
    }
  };

  const answerUser = (answer) => {
    socket.emit("answer", { answer });
  };

  return (
    <div className="m-0 bg-purple-500">
      <Intro isHidden={!isHidden} joinUser={joinUser} />
      <Game isHidden={isHidden} question={question} leaderBoard={leaderBoard} answerUser={answerUser} player={player} />
    </div>
  );
};

export default App;

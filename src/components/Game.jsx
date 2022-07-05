import LeaderBoardItem from "./LeaderBoardItem";

const Game = ({ isHidden, question, leaderBoard, answerUser, player }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const answer = e.target.answer.value;
    answerUser(answer);
    e.target.answer.value = "";
  };

  return (
    <div className={`container flex flex-col justify-center items-center h-screen m-auto ${isHidden ? "hidden" : ""}`}>
      <div className={`fixed top-0 right-0 bg-white rounded p-6 shadow-md mt-2 mr-2 text-center ${isHidden ? "hidden" : ""}`}>
        <h3 className="text-2xl font-bold border-b border-gray-500 pb-4 mb-4">Leader Board</h3>
        <ul>
          {leaderBoard.map((player) => (
            <LeaderBoardItem key={player.id} player={player} />
          ))}
        </ul>
      </div>
      <h1 className="text-2xl font-bold text-white text-center md:text-3xl mb-3">
        <span className="text-purple-800">{player.name}</span>
      </h1>
      <h1 className="text-3xl font-bold text-white text-center md:text-4xl">Answer the following question:</h1>
      <form className="bg-white w-1/2 rounded p-6 shadow-md mt-6 text-center" onSubmit={onSubmit}>
        <h1 className="text-2xl mb-4">{question}</h1>
        <input className="d-block rounded w-full border border-gray-500 shadow p-4" type="text" placeholder="Enter the answer..." name="answer" autoComplete="off" />
      </form>
    </div>
  );
};

export default Game;

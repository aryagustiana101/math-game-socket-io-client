const LeaderBoardItem = ({ player }) => {
  return (
    <li className="flex justify-between">
      <strong>{player.name}</strong> {player.score}
    </li>
  );
};

export default LeaderBoardItem;

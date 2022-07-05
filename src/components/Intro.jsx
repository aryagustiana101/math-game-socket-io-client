const Intro = ({ isHidden, joinUser }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    joinUser(name);
  };

  return (
    <div className={`container flex flex-col justify-center items-center h-screen m-auto ${isHidden ? "hidden" : ""}`}>
      <h1 className="text-4xl font-bold text-white text-center">
        Welcome to the <span className="text-purple-800">Math Geniuses</span> Game!
      </h1>
      <form className="bg-white w-1/2 rounded p-6 shadow-md mt-6 text-center" onSubmit={onSubmit}>
        <h2 className="text-xl mb-4">Enter your name to join:</h2>
        <input className="d-block rounded w-full border border-gray-500 shadow p-4" type="text" placeholder="Enter your name..." name="name" />
      </form>
    </div>
  );
};

export default Intro;

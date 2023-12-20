import React from "react";
import { Link } from "react-router-dom";
import { PropsFromRedux } from ".";


interface Props extends PropsFromRedux {}

const Home = ({ board }: Props) => {
  
  return (
    <div className="container dflex flex-column justify-content-center align-items-center mr-auto h-screen p-5">
      <div className="w-full text-center">
        {/* <img src={logo} className="inline-block w-96" alt="cardz logo" /> */}
      </div>
      <div className="w-full dflex flex-column justify-content-center align-items-cente">
        {board?.id && (
          <Link
            className={`mb-12 btn btn-secondary homebtn-secondary}`}
            to={`/game/${board.id}`}
          >
            Continue Game
          </Link>
        )}

        <Link
          className={`mb-12 btn btn-secondary homebtn-secondary}`}
          to="/new-game"
        >
          New Game
        </Link>
        <Link
          className={`mb-12 btn btn-primary homebtn-primary}`}
          to="/rules"
        >
          Rules
        </Link>
      </div>
    </div>
  );
};

export default Home;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetGame } from "../reducers/playerReducer";
import axios from "axios";
import { StyledButton } from "../style/StyledButton";
import HomeLink from "../components/HomeLink";

const EndgamePage = ({ history }) => {
  const player = useSelector((state) => state.player);
  const dispatch = useDispatch();

  const startNewGame = () => {
    dispatch(resetGame());

    history.push("/game");
  };

  useEffect(() => {
    const updateScore = async () => {
      try {
        await axios.put(`/api/players/update-score`, {
          score: player.score,
        });

        if (player.ratings.length) {
          await axios.post(`/api/ratings/`, {
            ratings: player.ratings,
          });
        }
      } catch (err) {
        console.error(err);
        alert("Sorry, we couldn't update your score 😥");
      }
    };
    updateScore();
  }, [player.score, player.ratings]);

  return (
    <div>
      <HomeLink />
      <h1>Seems like you couldn't handle us... 💁‍♂️</h1>
      <h2>Your final score is: {player.score} </h2>
      <h5>Why won't you try again ?</h5>
      <StyledButton onClick={startNewGame}>Start new game</StyledButton>
    </div>
  );
};

export default EndgamePage;

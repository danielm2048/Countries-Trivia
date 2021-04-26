import React from "react";

const PlayerScore = ({ name, score, number }) => {
	return (
		<div
			className={
				number === 0
					? "first player-score"
					: number === 1
					? "second player-score"
					: number === 2
					? "third player-score"
					: "player-score"
			}
		>
			<span>
				{number === 0
					? `${number + 1} 🥇`
					: number === 1
					? `${number + 1} 🥈`
					: number === 2
					? `${number + 1} 🥉`
					: number + 1}
			</span>
			<span>{name} </span>
			<span>{score} </span>
		</div>
	);
};

export default PlayerScore;

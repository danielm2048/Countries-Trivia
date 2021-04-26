import { useState } from "react";
import { Modal, ModalContent, Close } from "../style/Modal";
import PlayerScore from "./PlayerScore";

const Scoreboard = ({ data }) => {
	const [open, setOpen] = useState(false);

	return (
		<div>
			<button onClick={() => setOpen(true)}>Score Board</button>

			<Modal open={open}>
				<ModalContent>
					<Close onClick={() => setOpen(false)}>&times;</Close>
					<h1>Score Board 🏆</h1>
					<div className="player-score">
						<span style={{ fontSize: 20 }}>
							<strong>Rank</strong>
						</span>
						<span style={{ fontSize: 20 }}>
							<strong>Name</strong>
						</span>
						<span style={{ fontSize: 20 }}>
							<strong>Score</strong>
						</span>
					</div>
					<br />
					<br />
					{data?.map((item, i) => (
						<PlayerScore
							key={i}
							number={i}
							name={item.name}
							score={item.score}
						/>
					))}
				</ModalContent>
			</Modal>
		</div>
	);
};

export default Scoreboard;

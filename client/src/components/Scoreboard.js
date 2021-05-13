import { useState, useRef, useEffect } from "react";
import { Modal, ModalContent, Close } from "../style/Modal";
import PlayerScore from "./PlayerScore";
import { StyledBordersButton } from "../style/StyledButton";
import { Trophy } from "@styled-icons/boxicons-solid";

const Scoreboard = ({ data }) => {
	const [open, setOpen] = useState(false);

	const handleClickOutside = (event) => {
		if (ref.current && !ref.current.contains(event.target)) {
			setOpen(false);
		}
	};

	const ref = useRef(null);
	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref]);

	return (
		<div>
			<StyledBordersButton onClick={() => setOpen(true)}>
				Score Board <Trophy size="25" color="gold" />
			</StyledBordersButton>

			<Modal open={open}>
				<ModalContent ref={ref}>
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

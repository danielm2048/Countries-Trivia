import { Fragment } from "react";
import { Ban, Star } from "@styled-icons/fa-solid";

const Rating = ({ rating, setRating }) => {
	let stars = [];

	for (let i = 1; i <= 5; i++) {
		stars.push(
			<Fragment key={i}>
				<label
					aria-label={`${i} star`}
					htmlFor={`rating-${i}`}
					className="rating__label"
				>
					<Star
						size="52"
						className="rating__icon rating__icon--star fa fa-star"
					/>
				</label>
				<input
					name="rating"
					id={`rating-${i}`}
					value={i}
					checked={i === rating}
					type="radio"
					onChange={() => setRating(i)}
					className="rating__input"
				></input>
			</Fragment>
		);
	}

	return (
		<div className="rating-group">
			<input
				className="rating__input rating__input--none"
				name="rating"
				id="rating-none"
				checked={rating === 0}
				value="0"
				type="radio"
				onChange={() => setRating(0)}
			/>
			<label
				aria-label="No rating"
				className="rating__label"
				htmlFor="rating-none"
			>
				<Ban size="52" className="rating__icon rating__icon--none fa fa-ban" />
			</label>
			{stars}
		</div>
	);
};

export default Rating;

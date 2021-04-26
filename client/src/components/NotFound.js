import not_found from "../images/not_found.gif";

const Loader = () => {
	return (
		<div>
			<img src={not_found} alt="404 page not found" />
		</div>
	);
};

export default Loader;

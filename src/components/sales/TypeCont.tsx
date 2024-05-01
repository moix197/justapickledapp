function TypeCont({ value, coinName }) {
	return (
		<div>
			<div>
				{`Welcome to the ${coinName} ${
					value == "presale" ? "pre sale" : "sale"
				}`}{" "}
			</div>
		</div>
	);
}

export default TypeCont;

function TitleXl({ children }) {
	return (
		<div className="w-full text-yellow-600 text-2xl font-bold uppercase">
			<div>{children}</div>
		</div>
	);
}

function TitleLg({ children }) {
	return (
		<div className="w-full text-center text-lg uppercase text-yellow-600 font-bold">
			<div>{children}</div>
		</div>
	);
}

export { TitleXl, TitleLg };

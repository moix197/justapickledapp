function TokenImage({ src, isRounded = false, width = 20 }) {
	return (
		<div
			className={`flex justify-center w-${width} mb-2 ${
				isRounded && "rounded-full overflow-hidden"
			}`}
		>
			<img className="w-full object-fit" src={src}></img>
		</div>
	);
}

export { TokenImage };

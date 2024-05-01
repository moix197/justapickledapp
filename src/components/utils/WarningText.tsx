function WarningText({ children }) {
	return (
		<div className="w-full flex justify-center text-red-400 text-xs uppercase tracking-wider">
			<div className="w-full max-w-md text-center">
				<div>{children}</div>
			</div>
		</div>
	);
}

export default WarningText;

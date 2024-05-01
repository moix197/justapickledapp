function BasicButton({
	children,
	isLoading = false,
	color = "third",
	className = null,
	background = "",
	error = false,
	disabled = false,
	clickEvent = () => {},
}) {
	return (
		<button
			onClick={() => clickEvent()}
			disabled={disabled}
			className={`w-full pl-5 pr-5 pt-4 pb-4  relative border ${
				!error ? `border-${color}` : "border-red-400"
			} bg-${background ? background : "primary"} ${
				!error ? `text-${color}` : "text-red-400"
			} rounded-lg  
			font-bold uppercase -inner text-center cursor-pointer transition-transform active:opacity-80 
			${!error ? "hover:shadow-third" : "hover:shadow-red"}
			hover:bg-third hover:text-gray-900
			
			${error && "hover:bg-red-400"}
			${
				disabled &&
				"bg-gray-700 hover:bg-gray-700 hover:shadow-none  text-gray-900 hover:text-gray-900 border-gray-900 opacity-50"
			} ${className}`}
		>
			{!isLoading ? (
				children
			) : (
				<span className="loading loading-ring loading-md -mt-1 -mb-1"></span>
			)}
		</button>
	);
}

export { BasicButton };

function BasicButton({
	children,
	isLoading = false,
	color = "third",
	className = null,
}) {
	return (
		<div
			className={`w-full pt-4 pb-4 border border-${color} bg-gray-900 text-${color} rounded-lg  font-bold uppercase -inner text-center cursor-pointer transition-transform active:opacity-80 
			hover:shadow-third 
			hover:bg-third hover:text-gray-900
			${className}`}
		>
			{!isLoading ? (
				children
			) : (
				<span className="loading loading-ring loading-md -mt-1 -mb-1"></span>
			)}
		</div>
	);
}

export { BasicButton };

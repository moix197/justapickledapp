function LoadingCont({ children = null, isLoading = false }) {
	return (
		<div>
			{isLoading ? (
				<span className="loading loading-ring loading-md text-third"></span>
			) : (
				children && children
			)}
		</div>
	);
}

export default LoadingCont;

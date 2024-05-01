function SectionLayout({ className = null, children }) {
	return (
		<div
			className={`bg-primary rounded-lg p-6 border border-fourth ${className}`}
		>
			{children}
		</div>
	);
}

export default SectionLayout;

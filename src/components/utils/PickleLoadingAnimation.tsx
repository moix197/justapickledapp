import { Logo } from "components/brand/Logo";

function PickleLoadingAniamtion({
	title = "",
	description = "",
	width = 40,
	height = 40,
}) {
	return (
		<div className="flex flex-col items-center">
			<div className="animate-bounce">
				<Logo
					width={width}
					height={height}
					alt="Pickle Load"
					priority={true}
				></Logo>
			</div>
			<div className="text-center">
				{title && (
					<div className="animate-pulse uppercase font-bold duration-700 text-xl text-third">
						{title}
					</div>
				)}
				{description && (
					<div className="animate-pulse uppercase duration-700">
						{description}
					</div>
				)}
			</div>
		</div>
	);
}

export default PickleLoadingAniamtion;

import PickleLoadingAniamtion from "./PickleLoadingAnimation";

export default function LoadingScreen({ title = "", description = "" }) {
	return (
		<div className="absolute top-0 left-0 w-full h-full flex justify-center items-center flex-col z-20">
			<div className="absolute top-0 left-0 w-full h-full bg-primary opacity-80"></div>
			<PickleLoadingAniamtion
				title={title}
				description={description}
				width={200}
				height={200}
			></PickleLoadingAniamtion>
		</div>
	);
}

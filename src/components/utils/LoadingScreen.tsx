import Image from "next/image";
import { Logo } from "../brand/Logo";

export default function LoadingScreen({ title = "", description = "" }) {
	return (
		<div className="absolute top-0 left-0 w-full h-full flex justify-center items-center flex-col z-50">
			<div className="absolute top-0 left-0 w-full h-full bg-primary opacity-80"></div>
			<div className="animate-bounce">
				<Logo width={200} height={200} alt="Pickle Load" priority={true}></Logo>
			</div>
			<div className="text-center">
				{title && (
					<div className="animate-pulse uppercase font-bold duration-700 text-3xl text-third">
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
